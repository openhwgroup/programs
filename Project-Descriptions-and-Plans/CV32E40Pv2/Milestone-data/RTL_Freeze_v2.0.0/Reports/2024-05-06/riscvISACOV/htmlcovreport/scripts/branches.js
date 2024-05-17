/* global $, document, console, window, getPageTemplate, createDataGridInstance, createPanel, parseUrl, updateUrlHash, GLOBAL_JSON, loadJsonFile, hitsRenderer, headerTemplate, queryUrlParamsByPrefix, updateUrlParams, urlParams, pageName, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa */
/* exported processBranchesData, closeDetails, processSrcNamesData */

'use strict';

var startDateBr;
var startDateBrDetails;
var timeDiffBr;
var timeDiffBrDetails;

var dataObj = {};
var branchesColumnDefs;
var branchDetailsColumnDefs;
var branchesPageSize = 25;
var branchDetailsPageSize = 25;
var brItems = [];
var sourceMapData;

var gridOptionsDetails = {};
var nodeParams;
var branchesUrlParams;
var firstrendering = true;


var BRANCH_ITEM = {
    SOURCE_LINE: 's',
    GEN_BLK: 'gi',
    CLASS_PARAM: 'cp',
    HITS: 'h',
    TOKEN_START: 't',
    TOKEN_CHARS: 'n',
    EXCLUDED: 'e',
    COV_PERCENTAGE: 'p',
    FILE_PATH: 'f',
    LINE_NUMBER: 'l',
    ITEM_NUMBER: 'i',
    BRANCH_STMT: 'bs',
    BRANCH: 'br',
    THIT: 'th',
    THIT_FILE_NUM: 0,
    THIT_SCOPE: 1
};

var PREFIX = {
    BRANCHES: 'br'
};
var branchesPageUrl = pageName.b;

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDateBr = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    branchesUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.BRANCHES, {
        pageUrl: branchesPageUrl,
        pageSize: branchesPageSize
    });

    // load json file
    loadJsonFile('srcn');

});

function processSrcNamesData(g_data) {
    sourceMapData = g_data;
    loadJsonFile('b' + urlParams.f);
}

function processBranchesData(g_data) {
    dataObj = g_data[urlParams.s] || g_data[urlParams.oneInst];
    if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
        if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
            $.merge(dataObj, g_data[urlParams.s + '_sub']);
        }
    }

    topPageDescription(urlParams.pr || dataObj.pr);

    // initialize dataGrid data
    initializeData();

    $('#page-body').append(getTemplate('br'));
    var panelBodyId = createPanel('#brPanel', 'Branches Coverage', urlParams.cp);
    $('#' + panelBodyId).append('<div id="brGrid" style="width:100%;" class="ag-questa grid-container"></div>');
    createDataGridInstance('brGrid', branchesColumnDefs, getData(dataObj), {
        isTree: false,
        urlParams: branchesUrlParams,
        rowSelection: 'single',
        callback: function(firstNodeIndex) {
            var rowId = urlParams.hasOwnProperty(PREFIX.BRANCHES) ? urlParams[PREFIX.BRANCHES] : firstNodeIndex;
            $('a#branches_a' + rowId + '[name="' + rowId + '"]')[0].click();
        }
    });

    if (urlParams.p) {
        timeDiffBr = new Date() - startDateBr;
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod  + ' Branches ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getData(data) {
    var rowData = [];
    var brId = 0;
    data[BRANCH_ITEM.BRANCH].forEach(function (item) {
        if (item[BRANCH_ITEM.BRANCH_STMT].length > 0) { //check for empty bs in case of exclusion and no -showexcluded
            brItems.push(item);
            var genblk = '';
            var classparam = '';
            item[BRANCH_ITEM.BRANCH_STMT].forEach(function(bs) {
                if (bs.hasOwnProperty(BRANCH_ITEM.GEN_BLK)) {
                    genblk = bs[BRANCH_ITEM.GEN_BLK];
                }else if (bs.hasOwnProperty(BRANCH_ITEM.CLASS_PARAM)) {
                 	classparam = bs[BRANCH_ITEM.CLASS_PARAM];
                }
            });

            if (item[BRANCH_ITEM.BRANCH].hasOwnProperty(BRANCH_ITEM.SOURCE_LINE)) {  // Source is found
                rowData.push({
                    name: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.SOURCE_LINE],
                    line: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.LINE_NUMBER] + '  ' + genblk+classparam,
                    covP: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.COV_PERCENTAGE],
                    tokenStart: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.TOKEN_START],
                    tokenChars: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.TOKEN_CHARS],
                    parent: 1,
                    id: brId++,
                    f: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.FILE_PATH],
                    l: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.LINE_NUMBER]
                });
            } else {
                rowData.push({
                    name: sourceMapData[item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.FILE_PATH]],
                    line: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.LINE_NUMBER] + '  ' + genblk+classparam,
                    covP: item[BRANCH_ITEM.BRANCH][BRANCH_ITEM.COV_PERCENTAGE],
                    parent: 1,
                    id: brId++
                });
            }
        }
    });

    return rowData;
}

function processBrData(item) {
    gridOptionsDetails.brs = createDataGridInstance('brsGrid', branchDetailsColumnDefs, getRowData(item), {
        pageSize: branchDetailsPageSize,
        isTree: false
    });

    if (urlParams.p) {
        timeDiffBrDetails = new Date() - startDateBrDetails;
        console.save(urlParams.p + ' ,Total Loading time ' + ((timeDiffBr || 0) + timeDiffBrDetails), 'z_console.txt');
    }
}

function getRowData(data) {
    var rowData = [];

    data.forEach(function (bs) {
        if (bs.hasOwnProperty(BRANCH_ITEM.SOURCE_LINE)) {  //Source is found
            rowData.push({
                name: bs[BRANCH_ITEM.SOURCE_LINE],
                line: bs[BRANCH_ITEM.LINE_NUMBER],
                hits: bs[BRANCH_ITEM.HITS],
                covP: (bs[BRANCH_ITEM.HITS] > 0) ? 'Yes' : 'No',
                tokenStart: bs[BRANCH_ITEM.TOKEN_START],
                tokenChars: bs[BRANCH_ITEM.TOKEN_CHARS],
                thitf: (bs.hasOwnProperty(BRANCH_ITEM.THIT)) ? bs[BRANCH_ITEM.THIT][BRANCH_ITEM.THIT_FILE_NUM] : undefined,
                thits: (bs.hasOwnProperty(BRANCH_ITEM.THIT)) ? bs[BRANCH_ITEM.THIT][BRANCH_ITEM.THIT_SCOPE] : undefined,
                c: bs.c
            });
        } else {
            rowData.push({
                name: sourceMapData[bs[BRANCH_ITEM.FILE_PATH]],
                line: bs[BRANCH_ITEM.LINE_NUMBER] + ' [Item: ' + bs[BRANCH_ITEM.ITEM_NUMBER] + ']',
                hits: bs[BRANCH_ITEM.HITS],
                covP: (bs[BRANCH_ITEM.HITS] > 0) ? 'Yes' : 'No',
                thitf: (bs.hasOwnProperty(BRANCH_ITEM.THIT)) ? bs[BRANCH_ITEM.THIT][BRANCH_ITEM.THIT_FILE_NUM] : undefined,
                thits: (bs.hasOwnProperty(BRANCH_ITEM.THIT)) ? bs[BRANCH_ITEM.THIT][BRANCH_ITEM.THIT_SCOPE] : undefined,
                c: bs.c
            });
        }
    });

    return rowData;
}

function initializeData() {
    branchesColumnDefs = [
        {
            headerName: 'Source',
            headerTooltip: 'Source',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 300,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            },
            expanded: true,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.covP === 'string');
                },
            },
            cellRenderer: NameCellRenderer,
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
                if (params.value === 'Yes') {
                    return '&#10004';
                } else if (params.value === 'No') {
                    return '&#10008';
                } else if (typeof params.data.covP === 'string') {
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
                    return ((isValueBelowThreshold(params)) || params.value === 'No');
                },
                'warning': function (params) {
                    return isValueInRange(params);
                },
                'success': function (params) {
                    return (isValueAboveThreshold(params) || params.value === 'Yes');
                },
                'exclusion': function (params) {
                    return (typeof params.data.covP === 'string');
                },
            }
        },
    ];
    branchDetailsColumnDefs = [
        {
            headerName: 'Source',
            headerTooltip: 'Source',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 300,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            },
            expanded: true,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: 'group',
            cellRendererParams: {
                suppressCount: true,
                innerRenderer: function (params) {
                    if (typeof params.data.tokenStart !== 'undefined' && !params.data.parent) {
                        return params.data.name.substring(0, (params.data.tokenStart)) + '<span style="color: #5f7cff; background: #faef00; font-weight: bold; font-size: 15px;">' + params.data.name.substring((params.data.tokenStart), (params.data.tokenStart + params.data.tokenChars)) + '</span>' + params.data.name.substring((params.data.tokenStart + params.data.tokenChars), (params.data.name.length));
                    } else if (params.data.parent) {
                        return '<span style="font-weight: bold;">' + params.data.name +  '</span>';
                    } else {
                        return params.data.name;
                    }
                }
            }
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
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellClassRules: {
                'danger': function (params) {
                    return params.value == 0;
                },
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf', scope: 'thits'});
            }
        },
    ];
}


function getTemplate(tempId) {
    var templates = {
        'br':
            '<div id="br-container" class="row container-fluid" style="padding-top: 10px">' +
                '<div id="br" class="col-xs-12" style="height:100%; padding:0px;">' +
                    '<div id="brPanel" style="width:100%; margin-top: -15px" class="ag-questa"></div>' +
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
                '<div id="brsGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
                '<br />' +
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

    var href = branchesPageUrl + 'cp=' + urlParams.cp + '&' + PREFIX.BRANCHES + '=' + params.node.id + ((urlParams.f && urlParams.s) ? '&f=' + urlParams.f + '&s=' + urlParams.s : '' );
    var cellValue = params.value;
    var lineNumber = '  <span class="line-number" title="Line Number">Line ' + params.data.line + ' :</span>';

    var cellTemplate = $(
        '<div style="display: inline;">' +
        ((typeof href === 'undefined') ? ('<span id="branches_a' + params.node.id + '">' + cellValue + '</span>') : ('<a id="branches_a' + params.node.id + '" href="' + href + '" name="' + params.node.id + '">' + cellValue + '</a>')) +
        '</div>'
    );

    var cellTemplateObj = $(cellTemplate);

    // handling details
    var details = cellTemplateObj[0].querySelector('a#branches_a' + params.node.id);
    if (details) {
        details.addEventListener('click', function (e) {
            startDateBrDetails = new Date();
            e.preventDefault();

            if (e.which == 1) {
                // Remove old instance of C/E terms, rows
                for (var gridOptions in gridOptionsDetails) {
                    if (gridOptionsDetails.hasOwnProperty(gridOptions)) {
                        if (typeof gridOptionsDetails[gridOptions] !== 'undefined') {
                            gridOptionsDetails[gridOptions].api.destroy();
                            gridOptionsDetails[gridOptions] = undefined;
                        }
                    }
                }

                var headerTemplate = '<div class="pull-left panel-heading-title" style="font-size:22px"> Branch details';

                headerTemplate += ': <br/> &nbsp; &nbsp; <span style="font-size:20px; color: black; word-break: break-all;">' +
                 (GLOBAL_JSON.hasOwnProperty('srcAnnotate')  && GLOBAL_JSON.srcAnnotate  ?
                     (lineNumber + '<a href="sourceViewer.html?f=' + params.data.f + '&l=' + params.data.l + '" >' + cellValue + '</a>')   : lineNumber + cellValue )
                 + '</span> <br/> <br/>';
                headerTemplate += '</div>';
                $('.ag-row').removeClass('clicked-row');
                $(e.path[5]).addClass('clicked-row');
                $('#details-container').remove();
                $('#br-container').append(getTemplate('details'));
                $('#details-container .row').prepend( headerTemplate);

                if ($('#br').hasClass('col-xs-12')) {
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
    newUrlParams[PREFIX.BRANCHES] = params.node.id;

    urlParams = updateUrlParams(newUrlParams, branchesPageUrl);

    processBrData(brItems[nodeParams.data.id][BRANCH_ITEM.BRANCH_STMT]);
};
