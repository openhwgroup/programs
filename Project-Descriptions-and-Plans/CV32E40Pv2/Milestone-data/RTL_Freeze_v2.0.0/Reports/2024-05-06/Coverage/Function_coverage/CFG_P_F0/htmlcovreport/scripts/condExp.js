/* global $, document, window, console, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, loadJsonFile, updateUrlHash, hitsRenderer, headerTemplate, queryUrlParamsByPrefix, updateUrlParams, clearUrlParamsByPrefix, urlParams, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa, isValueExcluded */
/* exported processCondExprData, closeDetails, processSrcNamesData */

'use strict';

var startDateCe;
var startDateCeDetails;
var timeDiffCe;
var timeDiffCeDetails;
var dataObj = {};
var covType;
var columnDefs;
var ceColumnDefs, ce1ColumnDefs, ce1ExtColumnDefs, ceMaskColumnDefs, ceInputColumnDefs, ceInputExtColumnDefs, TotalColumnDefs, ceSumColumnDefs ;
var pageSize = 10;
var cePageSize = 25;
var ceItems = [];
var isShowexcludedEnabled;
var sourceMapData;

var gridOptionsDetails = {};
var nodeParams;

var expressionsUrlParams;
var expressionInputsUrlParams;
var expressionRowsUrlParams;
var firstrendering = true;


var CONDEXP_ITEM = {
    SOURCE_LINE: 's',
    BIMODAL: 'bi',
    PATTERN_TYPE: 'hp', //TRUE: Matching input pattern, FALSE: Non-masking condition
    HITS: 'h',
    HINT: 'h',
    ROW: 'r',
    NAME: 'n',
    EXCLUDED: 'e',
    INPUTPATTERN_OR_NON_MASKING_COND: 'm',
    TERM: 't',
    FILE_PATH: 'f',
    LINE_NUMBER: 'l',
    GEN_BLK: 'gi',
    CLASS_PARAM: 'cp',
    COVERED: 'c',
    REASON: 'r',
    COV_PERCENTAGE: 'p',
    TYPE: 'x',  //TRUE: Expression, FALSE: Condition
    EXT_FEC: 'b',
    EXC_COM: 'c',
    THIT: 'th',
    THIT_FILE_NUM: 0,
    THIT_SCOPE: 1,
    COND_EXP: 'ce',
    ROW_INDEX: 'i'
};

var INDEX = {
    TOTAL: 0,
    TO0: 0,
    TO1: 1
};

var PREFIX = {
    EXPRESSIONS: 'ex',
    INPUTS: 'exi',
    ROWS: 'exr'
};

var pageUrl = 'condExp.html?';

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDateCe = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';
    isShowexcludedEnabled = GLOBAL_JSON.hasOwnProperty('showexcluded') && GLOBAL_JSON.showexcluded;

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    covType = (urlParams.t === 'fc') ? 'Conditions' : 'Expressions';

    // load json file
    loadJsonFile('srcn');
});

function processSrcNamesData(g_data) {
    sourceMapData = g_data;
    loadJsonFile('ce' + urlParams.f);
}

function processCondExprData(g_data) {
    dataObj = g_data[Number(urlParams.s)] || g_data[Number(urlParams.oneInst)];
    if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
        if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
            $.merge(dataObj, g_data[urlParams.s + '_sub']);
        }
    }

    topPageDescription(urlParams.pr || dataObj.pr);

    // initialize dataGrid data
    initializeData();

    //getRowData(dataObj);
    $('#page-body').append(getTemplate('ce'));
    var panelBodyId = createPanel('#cePanel', covType + ' Coverage', urlParams.cp);
    $('#' + panelBodyId).append('<div id="ceGrid" style="width:100%;" class="ag-questa grid-container"></div>');

    expressionsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.EXPRESSIONS, {
        pageUrl: pageUrl,
        pageSize: cePageSize
    });

    createDataGridInstance('ceGrid', ceSumColumnDefs, getCE(dataObj[CONDEXP_ITEM.COND_EXP]), {
        isTree: false,
        urlParams: expressionsUrlParams,
        rowSelection: 'single',
        callback: function(firstNodeIndex) {
            var rowId = urlParams.hasOwnProperty(PREFIX.EXPRESSIONS) ? urlParams[PREFIX.EXPRESSIONS] : firstNodeIndex;
            $('a[name="' + rowId + '"]')[0].click();
        }
    });

    if (urlParams.p) {
        timeDiffCe = new Date() - startDateCe;
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod  + ' ' + covType + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getCE(data) {
    var ceData = [];
    var ceId = 0;
    data.forEach(function (item) {
        if (((covType === 'Conditions' && (!item[CONDEXP_ITEM.TYPE])) || (covType === 'Expressions' && (item[CONDEXP_ITEM.TYPE])) )
			&& ((!((typeof item[CONDEXP_ITEM.COV_PERCENTAGE] === 'string') && (!item.t.length))) ||  ((typeof item[CONDEXP_ITEM.COV_PERCENTAGE] === 'string') &&  isShowexcludedEnabled ))) {
            var genblk = item.hasOwnProperty(CONDEXP_ITEM.GEN_BLK) ? item[CONDEXP_ITEM.GEN_BLK] : '';
            var classparam = item.hasOwnProperty(CONDEXP_ITEM.CLASS_PARAM) ? item[CONDEXP_ITEM.CLASS_PARAM] : '';
            var source = (item.hasOwnProperty(CONDEXP_ITEM.SOURCE_LINE)) ?
                item[CONDEXP_ITEM.SOURCE_LINE]  : sourceMapData[item[CONDEXP_ITEM.FILE_PATH]];

            source += genblk;
			source += classparam;
            ceItems.push(item);
            ceData.push({
                covtype: source,
                line: item[CONDEXP_ITEM.LINE_NUMBER],
                covP: item[CONDEXP_ITEM.COV_PERCENTAGE],
                id: ceId++,
                f: item.f,   // file Number
                l: item.l,    // line Number
                exc: item.c  //exclusion comment
            });
        }
    });
    return ceData;
}

function processCeData(item) {
    expressionInputsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.INPUTS, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    gridOptionsDetails.terms = createDataGridInstance('termsGrid', columnDefs, getRowData(item[CONDEXP_ITEM.TERM], 'terms'), {
        isTree: false,
        urlParams: expressionInputsUrlParams
    });

    TotalColumnDefs = (!item[CONDEXP_ITEM.BIMODAL] && !item[CONDEXP_ITEM.PATTERN_TYPE]) ?
        ceColumnDefs.concat(ce1ColumnDefs, ceMaskColumnDefs) :
        (!item[CONDEXP_ITEM.BIMODAL] && item[CONDEXP_ITEM.PATTERN_TYPE]) ?
            ceColumnDefs.concat(ce1ColumnDefs, ceInputColumnDefs) :
            (item[CONDEXP_ITEM.BIMODAL] && !item[CONDEXP_ITEM.PATTERN_TYPE]) ?
                ceColumnDefs.concat(ce1ExtColumnDefs, ceMaskColumnDefs) :
                ceColumnDefs.concat(ce1ExtColumnDefs, ceInputExtColumnDefs) ;

    expressionRowsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.ROWS, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    gridOptionsDetails.rows = createDataGridInstance('rowsGrid', TotalColumnDefs, getRowData(item, 'rows'), {
        isTree: false,
        urlParams: expressionRowsUrlParams
    });

    $('#page-body').append('<br />');

    if (urlParams.p) {
        timeDiffCeDetails = new Date() - startDateCeDetails;
        console.save(urlParams.p + ' ,Total Loading time ' + ((timeDiffCe || 0) + timeDiffCeDetails), 'z_console.txt');
    }
}

function getRowData(data, type) {
    var rowData = [];
    var rowNum = 1;

    if (type === 'terms') { //get terms row data
        data.forEach(function (t) {
            rowData.push({
                inputTerm: t[CONDEXP_ITEM.NAME],
                covered: (t[CONDEXP_ITEM.COVERED])  ? 'Yes' : 'No',
                reason: t[CONDEXP_ITEM.REASON],
                hint: t[CONDEXP_ITEM.HINT],
                excluded: t[CONDEXP_ITEM.EXCLUDED]
            });
        });
        return rowData;
    } else { //rows
        data.r.forEach(function (r) {
            var rowItems = {} ;
            rowItems.rows = 'Row ' + r[CONDEXP_ITEM.ROW_INDEX];
            rowItems.fectarget = r[CONDEXP_ITEM.NAME];
            rowItems.c = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.EXC_COM]; //exclusion comment if exist
            if (((!data[CONDEXP_ITEM.BIMODAL]) && (!data[CONDEXP_ITEM.PATTERN_TYPE])) || ((!data[CONDEXP_ITEM.BIMODAL]) && (data[CONDEXP_ITEM.PATTERN_TYPE]))) {
                rowItems.hits = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.HITS];

                if (r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL].hasOwnProperty(CONDEXP_ITEM.THIT)) {
                    rowItems.thitf = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_FILE_NUM];
                    rowItems.thits = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_SCOPE];
                }

                if ((!data[CONDEXP_ITEM.BIMODAL]) && (data[CONDEXP_ITEM.PATTERN_TYPE])) {
                    rowItems.matchinginput = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.INPUTPATTERN_OR_NON_MASKING_COND];
                } else {
                    rowItems.nonmaskingc = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.INPUTPATTERN_OR_NON_MASKING_COND];
                }
            } else if (((data[CONDEXP_ITEM.BIMODAL]) && (!data[CONDEXP_ITEM.PATTERN_TYPE])) || ((data[CONDEXP_ITEM.BIMODAL]) && (data[CONDEXP_ITEM.PATTERN_TYPE]))) {
                rowItems.hitsTo0 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO0][CONDEXP_ITEM.HITS];
                if (r[CONDEXP_ITEM.EXT_FEC][INDEX.TO0].hasOwnProperty(CONDEXP_ITEM.THIT)) {
                    rowItems.thitf0 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO0][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_FILE_NUM];
                    rowItems.thits0 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO0][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_SCOPE];
                }

                rowItems.hitsTo1 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO1][CONDEXP_ITEM.HITS];
                if (r[CONDEXP_ITEM.EXT_FEC][INDEX.TO1].hasOwnProperty(CONDEXP_ITEM.THIT)) {
                    rowItems.thitf1 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO1][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_FILE_NUM];
                    rowItems.thits1 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO1][CONDEXP_ITEM.THIT][CONDEXP_ITEM.THIT_SCOPE];
                }

                if ((data[CONDEXP_ITEM.BIMODAL]) && (data[CONDEXP_ITEM.PATTERN_TYPE])) {
                    rowItems.matchinginputTo0 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO0][CONDEXP_ITEM.INPUTPATTERN_OR_NON_MASKING_COND];
                    rowItems.matchinginputTo1 = r[CONDEXP_ITEM.EXT_FEC][INDEX.TO1][CONDEXP_ITEM.INPUTPATTERN_OR_NON_MASKING_COND];
                } else {
                    rowItems.nonmaskingc = r[CONDEXP_ITEM.EXT_FEC][INDEX.TOTAL][CONDEXP_ITEM.INPUTPATTERN_OR_NON_MASKING_COND];
                }
            }

            rowData.push(rowItems);
            rowNum++;
        });
    }
    return rowData;
}


function initializeData() {
    columnDefs = [
        {
            headerName: 'Input Term',
            headerTooltip: 'Input Term',
            headerClass: 'justify-left',
            field: 'inputTerm',
            tooltipField: 'inputTerm',
            minWidth: 120,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            },
            cellClassRules: {
                'exclusion': function(params) {
                    return params.data.excluded;
                }
            }
        },
        {
            headerName: 'Covered',
            headerTooltip: 'Covered',
            field: 'covered',
            tooltipField: 'covered',
            minWidth: 100, width: 100,
            filter: 'text',
            cellRenderer: function (params) {
                if (params.data.excluded) {
                    return 'Excluded';
                } else if (params.value === 'Yes') {
                    return '&#10004';
                } else if (params.value === 'No') {
                    return '&#10008';
                } else {
                    return params.value;
                }
            },
            cellClassRules: {
                'undefined': function (params) {
                    return isValueUndefined(params);
                },
                'danger': function (params) {
                    return (params.value === 'No' && !params.data.excluded);
                },
                'success': function (params) {
                    return (params.value === 'Yes' && !params.data.excluded);
                },
                'exclusion': function(params) {
                    return params.data.excluded;
                }
            }
        },
        {
            headerName: 'Reason For No Coverage',
            headerTooltip: 'Reason For No Coverage',
            field: 'reason',
            tooltipField: 'reason',
            minWidth: 100, width: 100,
            filter: 'text',
        },
        {
            headerName: 'Hint',
            headerTooltip: 'Hint',
            field: 'hint',
            tooltipField: 'hints',
            minWidth: 100, width: 100,
            filter: 'text'
        },
    ];
    ceColumnDefs = [
        {
            headerName: 'Rows',
            headerTooltip: 'Rows',
            headerClass: 'justify-left',
            field: 'rows',
            tooltipField: 'rows',
            minWidth: 120, width: 120,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },

        },
        {
            headerName: 'FEC Target',
            headerTooltip: 'FEC Target',
            field: 'fectarget',
            tooltipField: 'fectarget',
            minWidth: 120, width: 120,
            filter: 'text',
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },
        },

    ];
    ce1ColumnDefs = [
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            minWidth: 120, width: 120,
            filter: 'number',
            cellClassRules: {
                'danger': function (params) {
                    return !params.value;
                },
                'exclusion': function (params) {
                    return (isValueExcluded(params));
                },
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf', scope: 'thits', fieldName: 'fectarget'});
            }
        },
    ];
    ce1ExtColumnDefs = [
        {
            headerName: 'Hits (->0)',
            headerTooltip: 'Hits (->0)',
            field: 'hitsTo0',
            tooltipField: 'hitsTo0',
            minWidth: 120, width: 120,
            filter: 'number',
            cellClassRules: {
                'danger': function (params) {
                    return !params.value;
                },
                'exclusion': function (params) {
                    return (isValueExcluded(params));
                },
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf0', scope: 'thits0'});
            }
        },
        {
            headerName: 'Hits (->1)',
            headerTooltip: 'Hits (->1)',
            field: 'hitsTo1',
            tooltipField: 'hitsTo1',
            minWidth: 120, width: 120,
            filter: 'number',
            cellClassRules: {
                'danger': function (params) {
                    return !params.value;
                },
                'exclusion': function (params) {
                    return (isValueExcluded(params));
                },
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf1', scope: 'thits1'});
            }
        },
    ];
    ceMaskColumnDefs = [
        {
            headerName: 'Non-Masking Condition(s)',
            headerTooltip: 'Non-Masking Condition(s)',
            field: 'nonmaskingc',
            tooltipField: 'nonmaskingc',
            minWidth: 120, width: 120,
            filter: 'text',
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },
        },
    ];


    ceInputColumnDefs = [
        {
            headerName: 'Matching Input Pattern',
            headerTooltip: 'Matching Input Pattern',
            field: 'matchinginput',
            tooltipField: 'matchinginput',
            minWidth: 120, width: 120,
            filter: 'text',
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },
        },
    ];

    ceInputExtColumnDefs = [
        {
            headerName: 'Matching Input Pattern (->0)',
            headerTooltip: 'Matching Input Pattern (->0)',
            field: 'matchinginputTo0',
            tooltipField: 'matchinginputTo0',
            minWidth: 120, width: 120,
            filter: 'text',
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },
        },
        {
            headerName: 'Matching Input Pattern (->1)',
            headerTooltip: 'Matching Input Pattern (->1)',
            field: 'matchinginputTo1',
            tooltipField: 'matchinginputTo1',
            minWidth: 120, width: 120,
            filter: 'text',
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.hitsTo0 === 'string') || (typeof params.data.hitsTo1 === 'string');
                },
            },
        },
    ];

    ceSumColumnDefs = [
        {
            headerName: covType,
            headerTooltip: covType,
            headerClass: 'justify-left',
            field: 'covtype',
            tooltipField: 'covtype',
            minWidth: 120, width: 120,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            },
            filter: 'text',
            cellRenderer: NameCellRenderer,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.covP === 'string');
                },
            },

        },
        {
            headerName: 'Line Number',
            headerTooltip: 'Line Number',
            field: 'line',
            tooltipField: 'line',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
        },
        {
            headerName: 'Coverage',
            headerTooltip: 'coverage',
            field: 'covP',
            tooltipField: 'covP',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellRenderer: function (params) {
                if (typeof params.data.covP === 'string') {
                    return 'Excluded';
                } else {
                    return (isValueNa(params)) ? 'na' : params.value + '%';
                }

            },
            cellClassRules: {
                'fg-danger': function (params) {
                    return isValueNa(params);
                },
                'undefined': function (params) {
                    return isValueUndefined(params);
                },
                'danger': function (params) {
                    return isValueBelowThreshold(params);
                },
                'warning': function (params) {
                    return isValueInRange(params);
                },
                'success': function (params) {
                    return isValueAboveThreshold(params);
                },
                'exclusion': function (params) {
                    return (typeof params.data.covP === 'string');
                },
            }
        },
    ];

}

function getTemplate(tempId) {
    var templates = {
        'ce':
            '<div id="ce-container" class="row container-fluid" style="padding-top: 10px">' +
                '<div id="ce" class="col-xs-12" style="height:100%; padding:0px;">' +
                    '<div id="cePanel" style="width:100%; margin-top: -15px;" class="ag-questa "></div>' +
                '</div>' +
            '</div>',
        'details':
            '<div id="details-container" class="col-xs-12" style="display:none">' +
                '<div class="row container-fluid">' +
                    '<div class="pull-right" style="padding-bottom: 20px;">' +
                        '<a onClick="closeDetails()"> <i class="fa fa-3x fa-window-close" aria-hidden="true" style="color:red;"></i> </a>' +
                    '</div>' +
                '</div>' +
                '<br />' +
                '<h3 id="termsText" style="border-bottom: 1px solid #dadada !important;"> Input Terms </h3>' +
                '<br />' +
                '<div id="termsGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
                '<br />' +
                '<br />' +
                '<h3 id="rowsText" style="border-bottom: 1px solid #dadada !important;"> Rows </h3>' +
                '<br />' +
                '<div id="rowsGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
            '</div>'
    };

    return templates[tempId];
}

function closeDetails() {
    $('#details-container').remove();
}

function NameCellRenderer() {}
NameCellRenderer.prototype.init = function(params) {
    var renderDetails  = this.renderDetails;

    var href = pageUrl + 't=' + urlParams.t + '&cp=' + urlParams.cp + '&' + PREFIX.EXPRESSIONS + '=' + params.node.id + ((urlParams.f && urlParams.s) ? '&f=' + urlParams.f + '&s=' + urlParams.s : '' );
    var cellValue = params.value;
    var lineNumber = '  <span class="line-number" title="Line Number">Line ' + params.data.line + ' :</span>';

    var cellTemplate = $(
        '<div style="display: inline;">' +
        ((typeof href === 'undefined') ? ('<span id="' + covType + '_a' + params.node.id + '">' + cellValue + '</span>') : ('<a id="' + covType + '_a' + params.node.id + '" href="' + href + '" name="' + params.node.id + '">' + cellValue + '</a>')) +
        '</div>'
    );

    var cellTemplateObj = $(cellTemplate);

    // handling details
    var details = cellTemplateObj[0].querySelector('a#' + covType + '_a' + params.node.id);
    if (details) {
        details.addEventListener('click', function (e) {
            startDateCeDetails = new Date();
            e.preventDefault();

            if (e.which == 1) {
                // Remove old instance of C/E terms, rows
                for (var gridOptions in gridOptionsDetails) {
                    if (gridOptionsDetails.hasOwnProperty(gridOptions)) {
                        if (typeof gridOptionsDetails[gridOptions] !== 'undefined') {
                            urlParams = clearUrlParamsByPrefix(urlParams, gridOptions == 'terms' ? PREFIX.INPUTS : PREFIX.ROWS);
                            gridOptionsDetails[gridOptions].api.destroy();
                            gridOptionsDetails[gridOptions] = undefined;
                        }
                    }
                }

                var headerTemplate = '<div class="pull-left panel-heading-title" style="font-size:22px"> ' + covType.slice(0, -1) + ' details';

                headerTemplate += ': <br/> &nbsp; &nbsp; <span style="font-size:20px; color: black; word-break: break-all;">' +
                 (GLOBAL_JSON.hasOwnProperty('srcAnnotate')  && GLOBAL_JSON.srcAnnotate  ?
                     (lineNumber + '<a href="sourceViewer.html?f=' + params.data.f + '&l=' + params.data.l + '" >' + cellValue + '</a>  ')   : lineNumber + cellValue )
                 + '</span> <br/> <br/>';
                headerTemplate += '</div>';
                $('.ag-row').removeClass('clicked-row');
                $(e.path[5]).addClass('clicked-row');
                $('#details-container').remove();
                $('#ce-container').append(getTemplate('details'));
                $('#details-container .row').prepend( headerTemplate);

                if ($('#ce').hasClass('col-xs-12')) {
                    $('#details-container').addClass('col-xs-12 non-animated fadeInDown');
                }

                $('#details-container').css({'display': ''});
                renderDetails(params);
                if (firstrendering) {
                    firstrendering = false;
                } else {
                    $('html, body').animate({
                        scrollTop: ($('#details-container').offset().top + 100)
                    }, 500);
                }

            }
        });
    }

    this.eGui = cellTemplateObj[0];
};

NameCellRenderer.prototype.getGui = function() {
    return this.eGui;
};

NameCellRenderer.prototype.renderDetails = function(params) {
    nodeParams = params;

    var newUrlParams = {};
    newUrlParams[PREFIX.EXPRESSIONS] = params.node.id;

    urlParams = updateUrlParams(newUrlParams, pageUrl);

    processCeData(ceItems[nodeParams.data.id]);
};
