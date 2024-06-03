/* global $, window, document, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, loadJsonFile, updateUrlHash, hitsRenderer, headerTemplate, urlParams, pageName, queryUrlParamsByPrefix, updateUrlParams, clearUrlParamsByPrefix, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa */
/* exported processScopesDbFile, processSummaryData, processAssertionsData, processDirectivesData, processStatementsData, processFsmData, loadJsonFile, closeDetails */

'use strict';

var fsmStartDate;
var fsmDetailsStartDate;
var fsmTimeDiff;
var fsmDetailsTimeDiff;

var isFSMStates;
var dataObj = {};
var fsmColumnDefs;
var detailsColumnDefs;
var fsmPageSize = 25;
var detailsPageSize = 25;

var gridOptionsDetails = {};
var nodeParams;
var fsmUrlParams;
var fsmDetailsUrlParams;
var firstrendering = true;

var FSM_FSMS = {
    NAME: 0,
    FILE:1,
    LINE:2,
    DATA: 3,
    STATE_COVERAGE: 4,
    TRANS_COVERAGE: 5
};

var FSM_DATA = {
    NAME: 0,
    TYPE: 1,
    FILE:2,
    LINE:3,
    HITS: 4,
    STATE_VALUE_OR_TRANSITION_ID: 5,
    EXCLUDE_COMMENT: 6
};

var FSM_TYPE = {
    STATE: 0,
    TRANS: 1
};

var PREFIX = {
    FSM: 'fsm',
    FSM_DETAILS: 'fsmd'
};
var fsmPageUrl = pageName.f;

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    fsmStartDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    fsmUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.FSM, {
        pageUrl: fsmPageUrl,
        pageSize: fsmPageSize
    });

    isFSMStates = urlParams.t === 'state';

    // load json files
    loadJsonFile('fsm' + urlParams.f);
});



function processFsmData(g_data) {
    dataObj = g_data[Number(urlParams.s)] || g_data[Number(urlParams.oneInst)];
    if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
        if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
            $.merge(dataObj.fsms, g_data[urlParams.s + '_sub'].fsms);
        }
    }

    topPageDescription(urlParams.pr || dataObj.pr);

    // initialize dataGrid data
    initializeData();

    $('#page-body').append(getTemplate('fsm'));
    var panelBodyId = createPanel('#fsmPanel', 'FSM ' + (isFSMStates ? 'States' : 'Transitions')  + ' Coverage', urlParams.cp);
    $('#' + panelBodyId).append('<div id="fsmGrid" style="width:100%;" class="ag-questa grid-container"></div>');

    createDataGridInstance('fsmGrid', fsmColumnDefs, getData(dataObj), {
        isTree: false,
        urlParams: fsmUrlParams,
        rowSelection: 'single',
        callback: function(firstNodeIndex) {
            var rowId = urlParams.hasOwnProperty(PREFIX.FSM) ? urlParams[PREFIX.FSM] : firstNodeIndex;
            $('a#fsm_a' + rowId + '[name="' + rowId + '"]')[0].click();
        }
    });

    if (urlParams.p) {
        fsmTimeDiff = new Date() - fsmStartDate;
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod + ' State-Machine ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getData(dataObj) {
    var rowData = [];

    dataObj.fsms.forEach(function(fsm) {
        if (fsm[FSM_FSMS.DATA].length > 0) {
            rowData.push({
                name: fsm[FSM_FSMS.NAME],
                f:fsm[FSM_FSMS.FILE],
                l: fsm[FSM_FSMS.LINE],
                data: fsm[FSM_FSMS.DATA],
                coverage: isFSMStates ? fsm[FSM_FSMS.STATE_COVERAGE] : fsm[FSM_FSMS.TRANS_COVERAGE]
            });
        }
    });

    return rowData;
}

function initializeData() {
    fsmColumnDefs = [
        {
            headerName: 'FSM',
            headerTooltip: 'FSM',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 200, width: 200,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: NameCellRenderer
        },
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'coverage',
            tooltipField: 'coverage',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                if (typeof params.data.coverage === 'string') {
                    return 'Excluded';
                } else {
                    return (isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : params.value + '%';
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
                    return (typeof params.data.coverage === 'string');
                },
            }
        }
    ];

    detailsColumnDefs = [
        {
            headerName: isFSMStates ? 'States' : 'States / Transitions',
            headerTooltip: isFSMStates ? 'States' : 'States / Transitions',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 200, width: 200,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellRenderer: 'group',
            cellRendererParams: {
                innerRenderer: function (params) {
                    if (params.data.type == FSM_TYPE.STATE) {
                        return '<span style="color: #008a06;"> State: </span>' + params.value;
                    } else {
                        return '<span style="color: #3700ff"> Trans: </span>' + params.value;
                    }
                },
                suppressCount: true
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
        }
    ];

    if (isFSMStates) {
        detailsColumnDefs.push({
            headerName: 'Value',
            headerTooltip: 'Value',
            field: 'value',
            tooltipField: 'Value',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
        });
    } else {
        detailsColumnDefs.push({
            headerName: 'Id',
            headerTooltip: 'Id',
            field: 'value',
            tooltipField: 'Id',
            filter: 'number',
            hide: true,
            minWidth: 120, width: 120, maxWidth: 120,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
        });
    }

    detailsColumnDefs.push({
        headerName: 'Hits',
        headerTooltip: 'Hits',
        field: 'hits',
        tooltipField: 'hits',
        filter: 'number',
        minWidth: 120, width: 120, maxWidth: 180,
        cellClassRules: {
            'danger': function (params) {
                return params.value === 0;
            },
            'exclusion': function (params) {
                return (typeof params.data.hits === 'string');
            },
        },
        cellRenderer: function(params) {
            return hitsRenderer(params, {fileNum: 'thitf', scope: 'thits'});
        }
    });

}

function getTemplate(tempId) {
    var templates = {
        'fsm':
            '<div id="fsm-container" class="row container-fluid" style="padding-top: 10px">' +
                '<div id="fsm" class="col-xs-12" style="height:100%; margin-top: -15px ;  padding:0px;">' +
                    '<div id="fsmPanel" style="width:100%;"></div>' +
                '</div>' +
            '</div>',
        'details':
            '<div id="details-container" class="col-xs-12" style="display:none">' +
                '<div class="row container-fluid">' +
                    '<div class="pull-right" style="padding-bottom: 20px;">' +
                        '<a onClick="closeDetails()"> <i class="fa fa-3x fa-window-close" aria-hidden="true" style="color:red;"></i> </a>' +
                    '</div>' +
                '</div>' +
                '<div id="detailsGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
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

    var href = fsmPageUrl + 't=' + urlParams.t + '&cp=' + urlParams.cp + '&' + PREFIX.FSM + '=' + params.node.id + ((urlParams.f && urlParams.s) ? '&f=' + urlParams.f + '&s=' + urlParams.s : '' );
    var cellValue = params.value;

    var cellTemplate = $(
        '<div style="display: inline;">' +
        ((typeof href === 'undefined') ? ('<span id="fsm_a' + params.node.id + '">' + cellValue + '</span>') : ('<a id="fsm_a' + params.node.id + '" href="' + href + '" name="' + params.node.id + '">' + cellValue + '</a>')) +
        '</div>'
    );

    var cellTemplateObj = $(cellTemplate);

    // handling details
    var details = cellTemplateObj[0].querySelector('a#fsm_a' + params.node.id);
    if (details) {
        details.addEventListener('click', function (e) {
            e.preventDefault();
            fsmDetailsStartDate = new Date();

            if (e.which == 1) {
                // Remove old instance of C/E terms, rows
                for (var gridOptions in gridOptionsDetails) {
                    if (gridOptionsDetails.hasOwnProperty(gridOptions)) {
                        if (typeof gridOptionsDetails[gridOptions] !== 'undefined') {
                            urlParams = clearUrlParamsByPrefix(urlParams, PREFIX.FSM_DETAILS);
                            gridOptionsDetails[gridOptions].api.destroy();
                            gridOptionsDetails[gridOptions] = undefined;
                        }
                    }
                }
                var cellValue = params.value;
                var lineNumber = '  <span class="line-number" title="Line Number">Line ' + params.data.l + ' :</span>';
                var headerTemplate = '<div class="pull-left panel-heading-title" style="font-size:22px"> FSM details';

                headerTemplate += ': <br/> &nbsp; &nbsp; <span style="font-size:20px; color: black; word-break: break-all;">' +
                 (GLOBAL_JSON.hasOwnProperty('srcAnnotate')  && GLOBAL_JSON.srcAnnotate  ?
                     (lineNumber + '<a href="sourceViewer.html?f=' + params.data.f + '&l=' + params.data.l + '" >' + cellValue + '</a>')   : lineNumber + cellValue )
                 + '</span> <br/> <br/>';
                headerTemplate += '</div>';
                $('.ag-row').removeClass('clicked-row');
                $(e.path[5]).addClass('clicked-row');
                $('#details-container').remove();
                $('#fsm-container').append(getTemplate('details'));
                $('#details-container .row').prepend( headerTemplate);

                if ($('#fsm').hasClass('col-xs-12')) {
                    $('#details-container').addClass('col-xs-12 not-animated fadeInDown');
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
    newUrlParams[PREFIX.FSM] = params.node.id;

    urlParams = updateUrlParams(newUrlParams, fsmPageUrl);

    processFSMDetails(nodeParams.data.data);
};

function processFSMDetails(data) {
    var tree = isFSMStates ? false : true;

    fsmDetailsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.FSM_DETAILS, {
        pageUrl: fsmPageUrl,
        pageSize: detailsPageSize
    });

    gridOptionsDetails.details = createDataGridInstance('detailsGrid', detailsColumnDefs, getDetailsData(data), {
        treeExpanded: true,
        isTree: tree,
        urlParams: fsmDetailsUrlParams
    });

    if (urlParams.p) {
        fsmDetailsTimeDiff = new Date() - fsmDetailsStartDate;
        console.save(urlParams.p + ' ,Total Loading time ' + ((fsmTimeDiff || 0) + fsmDetailsTimeDiff), 'z_console.txt');
    }
}

function getDetailsData(data) {
    var rowData = [];

    data.forEach(function(element) {
        if (element[FSM_DATA.TYPE] == FSM_TYPE.STATE) {
            var row = {
                name: element[FSM_DATA.NAME],
                type: FSM_TYPE.STATE,
                hits: isFSMStates ? element[FSM_DATA.HITS] : null,
                value: isFSMStates ? element[FSM_DATA.STATE_VALUE_OR_TRANSITION_ID] : '',
                // c: element[FSM_DATA.EXCLUDE_COMMENT] //Exclusion comment
            };

            if (isFSMStates) {
                if (typeof element[FSM_DATA.EXCLUDE_COMMENT] === 'object') {
                    row.thitf = element[FSM_DATA.EXCLUDE_COMMENT][0];
                    row.thits = element[FSM_DATA.EXCLUDE_COMMENT][1];
                } else if (typeof element[FSM_DATA.EXCLUDE_COMMENT] === 'string') {
                    row.c = element[FSM_DATA.EXCLUDE_COMMENT];
                }

                if (typeof element[7] !== 'undefined') {
                    row.c = element[7];
                }
            }

            if (!isFSMStates) {
                row.group = true;
                row.children = [];
            }

            rowData.push(row);
        } else {
            if (!isFSMStates) {
                var re = /(\S*) -> (\S*)/;
                var stateName = re.exec(element[FSM_DATA.NAME])[1];
                var stateObj = rowData.find(function(state) {
                    if (state.name == stateName) {
                        return state;
                    }
                });

                var childRow = {
                    name: element[FSM_DATA.NAME],
                    type: FSM_TYPE.TRANS,
                    hits: element[FSM_DATA.HITS],
                    value: element[FSM_DATA.STATE_VALUE_OR_TRANSITION_ID],
                    // c: element[FSM_DATA.EXCLUDE_COMMENT] //Exclusion comment
                };
                if (typeof element[FSM_DATA.EXCLUDE_COMMENT] === 'object') {
                    childRow.thitf = element[FSM_DATA.EXCLUDE_COMMENT][0];
                    childRow.thits = element[FSM_DATA.EXCLUDE_COMMENT][1];
                } else if (typeof element[FSM_DATA.EXCLUDE_COMMENT] === 'string') {
                    childRow.c = element[FSM_DATA.EXCLUDE_COMMENT];
                }

                if (typeof element[7] !== 'undefined') {
                    childRow.c = element[7];
                }

                stateObj.children.push(childRow);
            }
        }
    });

    return rowData;
}
