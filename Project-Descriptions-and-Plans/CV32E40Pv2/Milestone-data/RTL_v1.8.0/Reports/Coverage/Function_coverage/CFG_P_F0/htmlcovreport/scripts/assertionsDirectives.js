/* global $, document, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, updateProgressBarLoader, loadJsonFile, updateUrlHash, hitsRenderer, headerTemplate, urlParams, pageName, queryUrlParamsByPrefix, isValueExcluded */
/* exported processScopesDbFile, processSummaryData, processAssertionsData, processDirectivesData, processStatementsData, updateUrlParams */

'use strict';

var startDate;
var dataObj = {};
var covType;
var isPA;
var columnDefs;
var pageSize = 25;
var gridOptions;
var isAssertDebugEnabled = false;

var consolidatedView;
var consolidatedViewType;
var totalJsonFilesCount = 1;
var jsonFilesCount = 1;
var isDataLoaded = false;
var isAllDataLoaded = false;
var pageUrl;
var CovTypeUrlParams;

var ASSERTIONS_ASSERTS = {
    FAILURE_COUNT: 0,
    PASS_COUNT: 1,
    VACUOUS_COUNT: 2,
    DISABLED_COUNT: 3,
    ATTEMPT_COUNT: 4,
    ACTIVE_COUNT: 5,
    PEAK_ACTIVE_COUNT: 6,
    ASSERT_DEBUG: 'ad'
};

var TYPE = {
    DU: 0,
    INSTANCE: 1,
    BOTH: 2
};

var PREFIX = {
    ASSERTIONS: 'a',
    DIRECTIVES: 'd'
};

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();
    isPA = (urlParams.hasOwnProperty('pc') && urlParams.pc);
    covType = (urlParams.t == PREFIX.ASSERTIONS) ? isPA ?  'Power Aware Checks' : 'Assertions' : 'Directives';
    pageUrl = pageName[urlParams.t];

    // update url hash
    updateUrlHash();

    if ((consolidatedView = !urlParams.hasOwnProperty('s'))) {
        consolidatedViewType = (urlParams.type === 'inst') ? TYPE.INSTANCE : TYPE.DU;
        var fieldName = (urlParams.t == PREFIX.ASSERTIONS) ? 'assert_n_files' : (urlParams.t == PREFIX.DIRECTIVES) ? 'direct_n_files' : undefined;
        if (fieldName && GLOBAL_JSON.hasOwnProperty(fieldName)) {
            totalJsonFilesCount = GLOBAL_JSON[fieldName];
        }
    }

    CovTypeUrlParams = queryUrlParamsByPrefix(urlParams, urlParams.t, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    // load json files
    loadJsonFile(urlParams.t + (consolidatedView ? '1' : urlParams.f));
});

function processAssertionsData(g_data) { processAssertionsDirectives(g_data); }
function processDirectivesData(g_data) { processAssertionsDirectives(g_data); }

function processAssertionsDirectives(g_data) {
    var instanceName;

    if (consolidatedView) {
        $.extend(dataObj, g_data);

        isDataLoaded = (jsonFilesCount == 1);
        isAllDataLoaded = ( totalJsonFilesCount == 1 || jsonFilesCount == totalJsonFilesCount);

        // ++jsonFilesCount;
        if (jsonFilesCount < totalJsonFilesCount) {
            loadJsonFile(urlParams.t + (++jsonFilesCount));
        }

        if (!(isDataLoaded && isAllDataLoaded)) {
            updateProgressBarLoader((jsonFilesCount / totalJsonFilesCount * 100), '#progress-bar-loading');
        }
    } else {
        dataObj[urlParams.s] = g_data[Number(urlParams.s)] || g_data[Number(urlParams.oneInst)];
        if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
            if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
                  var keyTomerge =  urlParams.t == PREFIX.ASSERTIONS ? ((urlParams.hasOwnProperty('pc') && urlParams.pc ) ? 'pc' : 'asserts') : 'direct';
                  var objectToMerge ;
                  objectToMerge =  g_data[urlParams.s + '_sub'][keyTomerge] ?  g_data[urlParams.s + '_sub'][keyTomerge] : [];     // Add empty array in case of Fsub doesn't have asserts or directs or pc
                  dataObj[urlParams.s][keyTomerge] =  dataObj[urlParams.s][keyTomerge] ?  dataObj[urlParams.s][keyTomerge] : [];  // Add empty array in case of DataObject doesn't have asserts or directs or pc
                  $.merge(dataObj[urlParams.s][keyTomerge], objectToMerge);
            }
        }
        instanceName = (urlParams.hasOwnProperty('type') && urlParams.hasOwnProperty('pr') && urlParams.type === 'du') ? urlParams.pr :  dataObj[urlParams.s].pr;
        isDataLoaded = true;
    }

    if (isDataLoaded) {
        topPageDescription(instanceName);
        var gridData = getRowData(dataObj);

        // initialize dataGrid data
        initializeData();

        var panelBodyId = createPanel('#page-body', covType + ' Coverage', urlParams.cp);
        $('#' + panelBodyId).append('<div id="' + panelBodyId + 'Grid" style="width:100%;" class="ag-questa grid-container"></div>');

        gridOptions = createDataGridInstance(panelBodyId + 'Grid', columnDefs, gridData, {
            pageSize: pageSize,
            isTree: false,
            urlParams: CovTypeUrlParams
        });

        if (consolidatedView && !isAllDataLoaded) {
            $('.progress-bar-loader').css('display', 'initial');
            updateProgressBarLoader((jsonFilesCount / totalJsonFilesCount * 100), '#progress-bar-loading');
        }
    }

    if (consolidatedView && isAllDataLoaded) {
        gridOptions.api.setRowData(getRowData(dataObj));
        $('.progress-bar-loader').css('display', 'none');
    }

    if (urlParams.hasOwnProperty('p')) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod  + ' ' + covType + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getRowData(data) {
    var rowData = [];

    switch (urlParams.t) {
        case PREFIX.ASSERTIONS:
            Object.keys(data).forEach(function(id) {
                //check the Key && Extra condition for the viewcov mode to remove the istance data in case of navigation by DU
                if (data.hasOwnProperty(id) && !( dataObj[id].ty == 2 && GLOBAL_JSON.command === 'coverage' && urlParams.type === 'du')) {
                    if (data[id].hasOwnProperty(ASSERTIONS_ASSERTS.ASSERT_DEBUG) && data[id].ad) {
                        isAssertDebugEnabled = true;
                    }

                    if (!consolidatedView || (consolidatedView && (data[id].ty == consolidatedViewType || data[id].ty == TYPE.BOTH))) {
                        var dataArray = urlParams.hasOwnProperty('pc') && urlParams.pc ? (data[id].pc || []) : (data[id].asserts || []);
                        dataArray.forEach(function(assert) {
                            var currentRowData = {
                                name: (consolidatedView) ? (((data[id].ty == TYPE.BOTH) ? ((consolidatedViewType == TYPE.INSTANCE) ? data[id].pr : data[id].dun) : (data[id].pr)) + ( consolidatedViewType == TYPE.INSTANCE ? '/' : '::') + assert.n[0]) : assert.n[0],
                                f: assert.n.length == 3 ? assert.n[1]: undefined,
                                l: assert.n.length == 3 ? assert.n[2]: undefined,
                                fc: assert.h[ASSERTIONS_ASSERTS.FAILURE_COUNT],
                                pc: assert.h[ASSERTIONS_ASSERTS.PASS_COUNT],
                                exc: (assert.hasOwnProperty('ec')) ? assert.ec : undefined,
                            };

                            if (assert.hasOwnProperty('pth')) {
                                currentRowData.phitf = assert.pth[0];
                                currentRowData.phits = assert.pth[1];
                            }

                            if (assert.hasOwnProperty('fth')) {
                                currentRowData.fhitf = assert.fth[0];
                                currentRowData.fhits = assert.fth[1];
                            }

                            if (data[id].hasOwnProperty('ad') && data[id].ad) {
                                currentRowData.vc   = assert.h[ASSERTIONS_ASSERTS.VACUOUS_COUNT];
                                currentRowData.dc   = assert.h[ASSERTIONS_ASSERTS.DISABLED_COUNT];
                                currentRowData.ac   = assert.h[ASSERTIONS_ASSERTS.ATTEMPT_COUNT];
                                currentRowData.avc  = assert.h[ASSERTIONS_ASSERTS.ACTIVE_COUNT];
                                currentRowData.pavc = assert.h[ASSERTIONS_ASSERTS.PEAK_ACTIVE_COUNT];
                            }

                            currentRowData.status = (assert.h[ASSERTIONS_ASSERTS.FAILURE_COUNT] == 0) ? ((assert.h[ASSERTIONS_ASSERTS.PASS_COUNT] == 0) ? 'Zero' : 'Covered') : 'Failed';

                            rowData.push(currentRowData);
                        });
                    }
                }
            });
            break;
        case PREFIX.DIRECTIVES:
            Object.keys(data).forEach(function(id) {
                //check the Key && Extra condition for the viewcov mode to remove the istance data in case of navigation by DU
                if (data.hasOwnProperty(id) && !( dataObj[id].ty == 2 && GLOBAL_JSON.command === 'coverage' && urlParams.type === 'du')) {
                    if (!consolidatedView || (consolidatedView && (data[id].ty == consolidatedViewType || data[id].ty == TYPE.BOTH))) {
                        data[id].direct.forEach(function(direct) {
                            rowData.push({
                                name: (consolidatedView) ? (((data[id].ty == TYPE.BOTH) ? ((consolidatedViewType == TYPE.INSTANCE) ? data[id].pr : data[id].dun) : (data[id].pr)) + ( consolidatedViewType == TYPE.INSTANCE ? '/' : '::') + direct.n[0]) : direct.n[0],
                                f: direct.n.length == 3 ? direct.n[1]: undefined,
                                l: direct.n.length == 3 ? direct.n[2]: undefined,
                                hits: direct.h,
                                thitf: (direct.hasOwnProperty('pth')) ? direct.pth[0] : undefined,
                                thits: (direct.hasOwnProperty('pth')) ? direct.pth[1] : undefined,
                                c: (direct.hasOwnProperty('ec')) ? direct.ec : undefined,
                                exc: (direct.hasOwnProperty('c')) ? direct.c : undefined,
                            });
                        });
                    }
                }
            });
            break;
    }

    return rowData;
}

function initializeData() {
    switch (urlParams.t) {
        case PREFIX.ASSERTIONS:
            columnDefs = [
                {
                    headerName: covType,
                    headerTooltip: covType,
                    headerClass: 'justify-left',
                    field: 'name',
                    tooltipField: 'name',
                    sort: 'asc',
                    minWidth: 300,
                    suppressHideColumn: true,
                    suppressMovable: true,
                    cellStyle: {
                        'text-align': 'left',
                        'left': '4px'
                    },
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                        },
                    },
                    cellRenderer: function(params) {
                        if (params.data && params.data.l && params.data.f) { // Source Exists
                            return '<a href="sourceViewer.html?f='+ params.data.f + '&l='+ params.data.l+ '">' +  params.value+ '</a>'
                        } else return params.value;
                    }
                },
                {
                    headerName: 'Failure Count',
                    headerTooltip: 'Failure Count',
                    field: 'fc',
                    tooltipField: 'fc',
                    filter: 'number',
                    minWidth: 120, width: 120, maxWidth: 120,
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                        },
                    },
                    cellRenderer: function(params) {
                        return hitsRenderer(params, {fileNum: 'fhitf', scope: 'fhits'});
                    }
                },
                {
                    headerName: 'Pass Count',
                    headerTooltip: 'Pass Count',
                    field: 'pc',
                    tooltipField: 'pc',
                    filter: 'number',
                    minWidth: 120, width: 120, maxWidth: 120,
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (isValueExcluded(params) && params.data.pc !== '-');
                        },
                    },
                    cellRenderer: function(params) {
                        return hitsRenderer(params, {fileNum: 'phitf', scope: 'phits'});
                    }
                }
            ];

            if (isAssertDebugEnabled) {
                columnDefs.push(
                    {
                        headerName: 'Attempt Count',
                        headerTooltip: 'Attempt Count',
                        field: 'ac',
                        tooltipField: 'ac',
                        filter: 'number',
                        colId: 'ac',
                        minWidth: 120, width: 120, maxWidth: 120,
                        cellRenderer: function(params) {
                            return (typeof params.value !== 'undefined') ? params.value : '-';
                        },
                        cellClassRules: {
                            'exclusion': function (params) {
                                return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                            },
                        }
                    },
                    {
                        headerName: 'Vacuous Count',
                        headerTooltip: 'Vacuous Count',
                        field: 'vc',
                        tooltipField: 'vc',
                        filter: 'number',
                        colId: 'vc',
                        minWidth: 120, width: 120, maxWidth: 120,
                        cellRenderer: function(params) {
                            return (typeof params.value !== 'undefined') ? params.value : '-';
                        },
                        cellClassRules: {
                            'exclusion': function (params) {
                                return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                            },
                        }
                    },
                    {
                        headerName: 'Disabled Count',
                        headerTooltip: 'Disabled Count',
                        field: 'dc',
                        tooltipField: 'dc',
                        filter: 'number',
                        colId: 'dc',
                        minWidth: 120, width: 120, maxWidth: 120,
                        cellRenderer: function(params) {
                            return (typeof params.value !== 'undefined') ? params.value : '-';
                        },
                        cellClassRules: {
                            'exclusion': function (params) {
                                return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                            },
                        }
                    },
                    {
                        headerName: 'Active Count',
                        headerTooltip: 'Active Count',
                        field: 'avc',
                        tooltipField: 'avc',
                        filter: 'number',
                        colId: 'avc',
                        minWidth: 120, width: 120, maxWidth: 120,
                        cellRenderer: function(params) {
                            return (typeof params.value !== 'undefined') ? params.value : '-';
                        },
                        cellClassRules: {
                            'exclusion': function (params) {
                                return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                            },
                        }
                    },
                    {
                        headerName: 'Peak Active Count',
                        headerTooltip: 'Peak Active Count',
                        field: 'pavc',
                        tooltipField: 'pavc',
                        filter: 'number',
                        colId: 'pavc',
                        minWidth: 120, width: 120, maxWidth: 120,
                        cellRenderer: function(params) {
                            return (typeof params.value !== 'undefined') ? params.value : '-';
                        },
                        cellClassRules: {
                            'exclusion': function (params) {
                                return (typeof params.data.pc === 'string' && params.data.pc !== '-');
                            },
                        }
                    }
                );
            }

            // columnDefs.push(
            //     {
            //         headerName: 'Status',
            //         headerTooltip: 'Status',
            //         field: 'status',
            //         filter: 'text',
            //         colId: 'status',
            //         minWidth: 120, width: 120, maxWidth: 120
            //     }
            // );
            break;
        case PREFIX.DIRECTIVES:
            columnDefs = [
                {
                    headerName: covType,
                    headerTooltip: covType,
                    headerClass: 'justify-left',
                    field: 'name',
                    tooltipField: 'name',
                    sort: 'asc',
                    minWidth: 300,
                    suppressHideColumn: true,
                    suppressMovable: true,
                    cellStyle: {
                        'text-align': 'left',
                        'left': '4px'
                    },
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.hits === 'string');
                        },
                    },
                    cellRenderer: function(params) {
                        if (params.data && params.data.l && params.data.f) { // Source Exists
                            return '<a href="sourceViewer.html?f='+ params.data.f + '&l='+ params.data.l+ '">' +  params.value+ '</a>'
                        } else return params.value;
                    }
                },
                {
                    headerName: 'Hits',
                    headerTooltip: 'Hits',
                    field: 'hits',
                    tooltipField: 'hits',
                    filter: 'number',
                    minWidth: 120, width: 120, maxWidth: 120,
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
                }
            ];
            break;
    }
}
