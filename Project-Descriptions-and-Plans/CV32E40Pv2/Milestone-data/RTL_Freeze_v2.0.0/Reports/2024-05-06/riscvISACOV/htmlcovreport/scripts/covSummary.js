/* global $, document, window, parent, getPageTemplate, Chart, createPanel, createDataGridInstance, GLOBAL_JSON, coverageMapper,  adjustPrecision, updateUrlHash, OVERALL, loadJsonFile, headerTemplate, gridSortingCustomComparator, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa, isValueExcluded */
/* exported processOverallduData, processTestRecordsData */

'use strict';

var columnDefs;
var structureColumnDefs;
var chart;
var trData;
var overallData;
var strTree;
var trExist;
var instExist;
var structExist;
var duExist;
var testPlanExist;
var strucDivId;
var duDivId;
var instDivId;
var testPlanDiv;
var isPA;
var isShowExcluded;
var FILE_SIZE_LIMIT = 52428800; // 50 MB

var pageUrl = 'covSummary.html?';

$(window).resize(function () {
    updateChartHeight();
});

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    $('#page-body').append(getBodyTemplate());

    // update url hash
    updateUrlHash();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';
    isPA = (GLOBAL_JSON.hasOwnProperty('pa') && GLOBAL_JSON.pa);
    isShowExcluded = (GLOBAL_JSON.hasOwnProperty('showexcluded') && GLOBAL_JSON.showexcluded);
    topPageDescription();
    initializeData();

    loadJsonFile('overalldu');
});

function processOverallduData(g_data) {
    overallData = g_data;

    if (GLOBAL_JSON.hasOwnProperty('trExist') && GLOBAL_JSON.trExist) {
        loadJsonFile('tr');
    } else {
        constrcutCovSummaryData();
    }
}

function processTestRecordsData(g_data) {
    trData = g_data;
    constrcutCovSummaryData();
}

function constrcutCovSummaryData() {
    createSummary();

    if (GLOBAL_JSON.hasOwnProperty('trExist') && GLOBAL_JSON.trExist) {
        createTestChart();
    }

    if (GLOBAL_JSON.hasOwnProperty('tpExist') && GLOBAL_JSON.tpExist) {
        createTestPlanSummary();
    }

    addFooter();
}

function topPageDescription() {
    $('#page-header-text').text(GLOBAL_JSON.prod + (isPA ? ' Power Aware' : '') + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report Summary');

    headerTemplate();
}

function getBodyTemplate() {
    return '<div class="row">' +
        '<div id="structure-summary" class="col-xs-12 col-md-6">' +
        '</div>' +
        '<div id="tests-summary" class="col-xs-12 col-md-6">' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="instance-summary" class="col-xs-12 col-md-6">' +
        '</div>' +
        '<div id="du-summary" class="col-xs-12 col-md-6">' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="testplan-summary" class="col-xs-12 col-md-6">' +
        '</div>' +
    '</div>';
}

function createSummary() {
    checkGrids();
    if (overallData.hasOwnProperty(OVERALL.DESIGN_INSTANCES_DATA) && structExist) {
        var panelBodyId = createPanel('#' + strucDivId, (isPA ? 'Power Aware Coverage' : 'Design Coverage By Instance'), overallData[OVERALL.DESIGN_INSTANCES_DATA].tc);
        $('#' + panelBodyId).append('<div id="structure-summary-Grid" style="width:100%; min-height:200px;" class="ag-questa grid-container"></div>');
        createDataGridInstance('structure-summary-Grid', structureColumnDefs, getStructureData(overallData[OVERALL.DESIGN_STRUCTURE_DATA]), {
            isTree: strTree
        });
    }
    if (overallData.hasOwnProperty(OVERALL.DESIGN_UNITS_DATA)) {
        panelBodyId = createPanel('#' + duDivId, '<i class="fa fa-th" aria-hidden="true"  style="color: #2361a0;margin-right: 10px;"></i>Design Units Coverage Summary', overallData[OVERALL.DESIGN_UNITS_DATA].tc);
        $('#' + panelBodyId).append('<div id="du-summary-Grid" style="width:100%;" class="ag-questa grid-container"></div>');
        createDataGridInstance('du-summary-Grid', columnDefs, getSummaryTypeData(overallData[OVERALL.DESIGN_UNITS_DATA], 'du'), {
            isTree: false
        });
    }
    if (overallData.hasOwnProperty(OVERALL.DESIGN_INSTANCES_DATA)) {
        panelBodyId = createPanel('#' + instDivId, '<i class="fa fa-sitemap" aria-hidden="true" style="color: #2361a0;margin-right: 10px;"></i>Instance Coverage Summary', overallData[OVERALL.DESIGN_INSTANCES_DATA].tc);
        $('#' + panelBodyId).append('<div id="instance-summary-Grid" style="width:100%;" class="ag-questa grid-container"></div>');
        createDataGridInstance('instance-summary-Grid', columnDefs, getSummaryTypeData(overallData[OVERALL.DESIGN_INSTANCES_DATA], 'inst'), {
            isTree: false
        });
    }





}

function createTestPlanSummary() {
    loadJsonFile('tp');
}

function processTpLinks(g_data) {

    initializeTestPlanData(g_data.head, 'summary');

    var tpUrlParams = queryUrlParamsByPrefix(urlParams, 'tp', {
        pageUrl: pageUrl,
        pageSize: 25
    });

    var panelBodyId = createPanel('#' + testPlanDiv, '<i class="fa fa-th" aria-hidden="true"  style="color: #2361a0;margin-right: 10px;"></i>Testplan Summary');
    $('#' + panelBodyId).append('<div id="testplan-summary-grid" style="width:100%;" class="ag-questa grid-container"></div>');
    createDataGridInstance('testplan-summary-grid', testplanColumnDefs, getTestPlanRowData(g_data, 'summary'), {
        paginationEnabled: false,
        urlParams: tpUrlParams,
    });
}



function checkGrids() {
    if (GLOBAL_JSON.hasOwnProperty('trExist') && GLOBAL_JSON.trExist) {
        trExist = true;
    }
    if (overallData.hasOwnProperty(OVERALL.DESIGN_INSTANCES_DATA) || GLOBAL_JSON.summaryReport) { // CHECK if summary report Also -summary
        instExist = true;
    }
    if (overallData.hasOwnProperty(OVERALL.DESIGN_UNITS_DATA)) {
        duExist = true;
    }
    if (overallData.hasOwnProperty(OVERALL.DESIGN_INSTANCES_DATA) && (GLOBAL_JSON.hasOwnProperty('instlinkSize') && GLOBAL_JSON.instlinkSize > FILE_SIZE_LIMIT)) {
        structExist = true;
    }

    if (GLOBAL_JSON.hasOwnProperty('testPlanReport') && GLOBAL_JSON.testPlanReport) {
        testPlanExist = true;
    }


    // Locating the DIVs according to the existing tables
    if (structExist) { // If File Size > 50 Instance structure table exists
        strucDivId = 'structure-summary';
        if (trExist) { // If test chart exists
            instDivId = 'instance-summary';
            duDivId = 'du-summary';
        } else { // If test chart doen't exists
            duDivId = 'du-summary';
            testPlanDiv = 'testplan-summary';
            instDivId = duExist || testPlanExist ? 'instance-summary' : 'tests-summary'; // check if the instance summary will be moved to the top row or stay in the bottom row alongside the du-summary
        }
    } else { // If there is no instance structure table we will check if only one of the DU/instance summary table exists will be moved to the top row


        testPlanDiv = 'structure-summary';
        duDivId = instExist ||  testPlanExist ? 'du-summary' : 'structure-summary';
        instDivId = duExist || testPlanExist ? 'instance-summary' : 'structure-summary';
    }

}

function getSummaryTypeData(data, type) {
    var gridData = [];

    Object.keys(data).sort().forEach(function (covType) {
        if (data.hasOwnProperty(covType)) {
            if (!(covType === 'f' || covType === 'tc' || covType === 'gb' || covType === 'cvpc' || covType === 'pb')) {
                var rowData = {
                    name: coverageMapper[covType],
                    type: covType,
                    bins: data[covType][OVERALL.BINS_INDEX],
                    hit: data[covType][OVERALL.HITS_INDEX],
                    miss: data[covType][OVERALL.BINS_INDEX] - data[covType][OVERALL.HITS_INDEX],
                    cp: data[covType][OVERALL.COVERAGE_INDEX],
                    exclude: (isShowExcluded)? data[covType][OVERALL.EXCLUDED_INDEX] : -1
                };

                var cvgChildData;
                if (covType === 'g') {
                    rowData.hit = -1;
                    rowData.miss = -1;
                    //rowData.exclude = -1;
                    var cvgChildCovType = 'cvpc';
                    if (data.hasOwnProperty(cvgChildCovType)) {
                        rowData.group = true;
                        cvgChildData = {
                            name: coverageMapper[cvgChildCovType],
                            type: cvgChildCovType,
                            bins: data[cvgChildCovType][OVERALL.BINS_INDEX],
                            hit: -1,
                            miss: -1,
                            cp: data[cvgChildCovType][OVERALL.COVERAGE_INDEX],
                            exclude: (isShowExcluded)? data[cvgChildCovType][OVERALL.EXCLUDED_INDEX] : -1
                        };

                        var crossChildCovType = 'gb';
                        if (data.hasOwnProperty(crossChildCovType)) {
                            cvgChildData.group = true;
                            cvgChildData.children = [
                                {
                                    name: coverageMapper[crossChildCovType],
                                    type: crossChildCovType,
                                    bins: data[crossChildCovType][OVERALL.BINS_INDEX],
                                    hit: data[crossChildCovType][OVERALL.HITS_INDEX],
                                    miss: data[crossChildCovType][OVERALL.BINS_INDEX] - data[crossChildCovType][OVERALL.HITS_INDEX],
                                    cp: ((data[crossChildCovType][OVERALL.COVERAGE_INDEX] == -1) ?
                                        adjustPrecision(data[crossChildCovType][OVERALL.HITS_INDEX] / data[crossChildCovType][OVERALL.BINS_INDEX] * 100) :
                                        data[crossChildCovType][OVERALL.COVERAGE_INDEX]),
                                    exclude: (isShowExcluded)? data[crossChildCovType][OVERALL.EXCLUDED_INDEX] : -1
                                }
                            ];
                        }
                    }
                    rowData.children = [cvgChildData];
                }

                var paCvgChildData;
                if (covType === 'pg') {
                    rowData.hit = -1;
                    rowData.miss = -1;
                   // rowData.exclude = -1;
                    var paCvgChildCovType = 'pb';
                    if (data.hasOwnProperty(paCvgChildCovType)) {
                        rowData.group = true;
                        paCvgChildData = {
                            name: coverageMapper[paCvgChildCovType],
                            type: paCvgChildCovType,
                            bins: data[paCvgChildCovType][OVERALL.BINS_INDEX],
                            hit: data[paCvgChildCovType][OVERALL.HITS_INDEX],
                            miss: data[paCvgChildCovType][OVERALL.BINS_INDEX] - data[paCvgChildCovType][OVERALL.HITS_INDEX],
                            cp: ((data[paCvgChildCovType][OVERALL.COVERAGE_INDEX] == -1) ?
                                adjustPrecision(data[paCvgChildCovType][OVERALL.HITS_INDEX] / data[paCvgChildCovType][OVERALL.BINS_INDEX] * 100) :
                                data[paCvgChildCovType][OVERALL.COVERAGE_INDEX]),
                            exclude: (isShowExcluded)? data[paCvgChildCovType][OVERALL.EXCLUDED_INDEX] : -1
                        };
                    }
                    rowData.children = [paCvgChildData];
                }

                if (covType === 'a' || covType === 'd' || covType === 'g' || covType === 'pc' || covType === 'pg') {
                    rowData.type = type;
                }

                gridData.push(rowData);
            }
        }
    });

    return gridData;
}

function getStructureData(data) {
    var dataObj = [];
    var parentChildren = {};

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var currentParentId = data[key][0];

            if (currentParentId == -1) {
                dataObj.push(getRowData(data, key));
            } else {
                if (!parentChildren.hasOwnProperty(currentParentId)) {
                    parentChildren[currentParentId] = [];
                }
                parentChildren[currentParentId].push(getRowData(data, key));
            }
        }


    }
    dataObj.forEach(function (row) {
        if (parentChildren.hasOwnProperty(row.s)) {
            row.group = true;
            row.children = getChildrenFullpath(parentChildren[row.s], row.name);
            strTree = true;
        }
    });
    return dataObj;
}

function getRowData(data, key, parentName) {
    return {
        name: parentName ? parentName + '/' + data[key][1] : data[key][1],
        cp: data[key][2],
        f: data[key][3],
        s: key
    };
}

function getChildrenFullpath(children, append) {
    children.forEach(function (child) {
        child.name = append + '/' + child.name;

    });
    return children;

}

function createTestChart() {
    if (typeof trData !== 'undefined') {
        var testListData = getTestlistData(trData);
        var panelBodyId = createPanel('#tests-summary', '<i class="fa fa-flask" aria-hidden="true" style="color: #2361a0;margin-right: 10px;"></i>Test Summary' + ' (' + testListData.reduce(getSum) + ' tests)');
        $('#' + panelBodyId).append('<div class="container-fluid"><canvas id="tests-summary-chart" style="height:250px;width:100%"> </canvas> </div>');

        chart = new Chart('tests-summary-chart', {
            type: 'pie',
            responsive: true,
            data: {
                datasets: [{
                    data: testListData,
                    backgroundColor: [
                        '#009688',
                        '#ffcd56',
                        '#f73333',
                        '#AB2828'
                    ]
                }],
                labels: [
                    'Ok' + ' (' + testListData[0] + ')',
                    'Warning' + ' (' + testListData[1] + ')',
                    'Error' + ' (' + testListData[2] + ')',
                    'Fatal' + ' (' + testListData[3] + ')',
                    'Missing' + ' (' + testListData[4] + ')'
                ]
            },
            options: {
                animation: {
                    animateScale: true,
                    easing: 'easeOutBounce'
                },
                legend: {
                    position: 'bottom',
                }
            }
        });

        updateChartHeight();
    }
}

function updateChartHeight() {
    $('#tests-summary div .panel-body').height($('#structure-summary div .panel-body').height());
    // $('canvas#tests-summary-chart').height($('#structure-summary div .panel-body').height() - 30);
    $('canvas#tests-summary-chart').width('100%');
    // chart.reset();
    if (chart) {
        chart.update({
            duration: 800,
            easing: 'easeOutBounce'
        });
    }
}

function getTestlistData(data) {
    var testData = [0, 0, 0, 0, 0];

    Object.keys(data).forEach(function (test) {
        data[test].forEach(function (item) {
            if (item[5] === 0) {
                testData[0]++;  //passed
            } else if (item[5] === 1) {
                testData[1]++;  //warning
 	    } else if (item[5] === 4) {
		testData[4]++;  //missing
            } else if (item[5] === 2 || item[5] === 5) {
                testData[2]++;  //error
            } else if (item[5] === 3) {
                testData[3]++;  //fatal
            }
        });
    });
    return testData;
}

function getSum(total, num) {
    return total + num;
}

function initializeData() {
    columnDefs = [
        {
            headerName: 'Coverage Type',
            headerTooltip: 'Coverage Type',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            sort: 'asc',
            minWidth: 150, width: 150,
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellRenderer: 'group',
            cellRendererParams: {
                innerRenderer: function (params) {
                    if (params.value == 'Covergroups' && GLOBAL_JSON.hasOwnProperty('cvg_n_files') && GLOBAL_JSON.cvg_n_files > 0) {
                        return '<a href="cvg.html?cp=' + params.data.cp + '&type=' + params.data.type + '">' + params.value + '</a>';
                    } else if (params.value == 'Assertions' && GLOBAL_JSON.hasOwnProperty('assert_n_files') && GLOBAL_JSON.assert_n_files > 0) {
                        return '<a href="assertionsDirectives.html?t=a&cp=' + params.data.cp + '&type=' + params.data.type + '">' + params.value + '</a>';
                    } else if (params.value == 'Directives' && GLOBAL_JSON.hasOwnProperty('direct_n_files') && GLOBAL_JSON.direct_n_files > 0) {
                        return '<a href="assertionsDirectives.html?t=d&cp=' + params.data.cp + '&type=' + params.data.type + '">' + params.value + '</a>';
                    } else if (params.value == 'Power Aware Checks' && GLOBAL_JSON.hasOwnProperty('assert_n_files') && GLOBAL_JSON.assert_n_files > 0) {
                        return '<a href="assertionsDirectives.html?pc=1&t=a&cp=' + params.data.cp + '&type=' + params.data.type + '">' + params.value + '</a>';
                    } else if (params.value == 'Power Aware Covergroups' && GLOBAL_JSON.hasOwnProperty('cvg_n_files') && GLOBAL_JSON.cvg_n_files > 0) {
                        return '<a href="cvg.html?pg=1&cp=' + params.data.cp + '&type=' + params.data.type + '">' + params.value + '</a>';
                    } else {
                        return params.value;
                    }
                },
                suppressCount: true
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return typeof params.data.cp === 'string' || isValueNa(params);
                },
            }
        },
        {
            headerName: 'Bins',
            headerTooltip: 'bins',
            field: 'bins',
            tooltipField: 'bins',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                if ((typeof params.data.cp === 'string')) { //In case of Exclusions
                    return '-';
                } else {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                }
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return typeof params.data.cp === 'string' || isValueNa(params);
                },
            }
        },
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hit',
            filter: 'number',
            comparator: gridSortingCustomComparator,
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                if ((typeof params.data.cp === 'string')) { //In case of Exclusions
                    return '-';
                } else {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                }
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return typeof params.data.cp === 'string' || isValueNa(params);
                },
            }
        },
    ];

    if (!(GLOBAL_JSON.hasOwnProperty('nomissing') && GLOBAL_JSON.nomissing)) {
        columnDefs.push(
            {
                headerName: 'Misses',
                headerTooltip: 'Misses',
                field: 'miss',
                filter: 'number',
                comparator: gridSortingCustomComparator,
                minWidth: 120, width: 120, maxWidth: 120,
                cellRenderer: function (params) {
                    if ((typeof params.data.cp === 'string')) { //In case of Exclusions
                        return '-';
                    } else {
                        return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                    }
                },
                cellClassRules: {
                    'fg-disabled': function (params) {
                        return typeof params.data.cp === 'string' || isValueNa(params);
                    },
                }
            });
    }

    if (isShowExcluded) {
        columnDefs.push(
            {
                headerName: 'Excluded',
                headerTooltip: 'Excluded',
                field: 'exclude',
                filter: 'number',
                comparator: gridSortingCustomComparator,
                minWidth: 120, width: 120, maxWidth: 120,
                cellRenderer: function (params) {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                },
                cellClassRules: {
                    'fg-disabled': function (params) {
                        return typeof params.data.cp === 'string' || isValueNa(params);
                    },
                }
            });
    }

    columnDefs.push(
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'cp',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                if ((typeof params.data.cp === 'string')) { //In case of Exclusions
                    return 'Excluded';
                } else {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : params.value + '%') + '">' + ((isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : params.value + '%') + '</span>';
                }
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return typeof params.data.cp === 'string' || isValueNa(params);
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
                }
            }
        }
    );

    structureColumnDefs = [
        {
            headerName: 'Instance',
            headerTooltip: 'Instance',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 150, width: 150,
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellRenderer: 'group',
            cellRendererParams: {
                innerRenderer: function (params) {
                    return '<a href="summary.html?type=inst&f=' + params.data.f + '&s=' + params.data.s + '">' + params.value.split('/').pop() + '</a>';
                },
                suppressCount: true
            }
        },
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'cp',
            tooltipField: 'cp',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                return (isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : ((isValueExcluded(params)) ? 'Excluded' : (params.value + '%'));

            },
            cellClassRules: {
                'fg-disabled': function (params) {
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
                    return isValueExcluded(params);  //In case of Exclusions
                },
            }
        }
    ];
}
