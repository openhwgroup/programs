/* global $, document, parent, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, coverageMapper, OVERALL, DULIST, adjustPrecision, updateUrlHash, loadJsonFile, headerTemplate, escapeAngleBrackets, queryUrlParamsByPrefix, urlParams, gridSortingCustomComparator, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueExcluded*/
/* exported processDuData, processOverallduData */

'use strict';

var startDate;
var overallData;
var duList;
var dulistUrlParams;

var pageSize = 25;
var pageUrl = 'dulist.html?';
var PREFIX = {
    DULIST: 'du',
};

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    dulistUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.DULIST, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    topPageDescription();

    loadJsonFile('du');
});

function topPageDescription() {
    $('#page-header-text').text(GLOBAL_JSON.prod + ' Design Units ' + GLOBAL_JSON.formal_report_name + 'Coverage');

    headerTemplate(urlParams);
}

function processDuData(g_data) {
    duList = g_data;
    loadJsonFile('overalldu');
}

function processOverallduData(g_data) {
    overallData = g_data;
    constructDuData();
}

function constructDuData() {
    var totalCoverage = (overallData.hasOwnProperty(OVERALL.DESIGN_UNITS_DATA)) ?
        overallData[OVERALL.DESIGN_UNITS_DATA].tc :
        (duList.hasOwnProperty(DULIST.DESIGN_UNITS_DATA) ? duList[DULIST.DESIGN_UNITS_DATA][0].tc : undefined);

    var panelBodyId = createPanel('#page-body', 'Total Coverage', totalCoverage);

    if (overallData.hasOwnProperty(OVERALL.DESIGN_UNITS_DATA)) {
        covDUOverallSummary(panelBodyId, overallData);
    }

    if (duList) {
        duList.columns = Object.keys(overallData.hasOwnProperty(OVERALL.DESIGN_UNITS_DATA) ? overallData[OVERALL.DESIGN_UNITS_DATA] : duList[DULIST.DESIGN_UNITS_DATA][0]).sort();
    }

    if (duList.hasOwnProperty(DULIST.DESIGN_UNITS_DATA)) {
        covDUSummary(panelBodyId, duList);
    }

    if (urlParams.hasOwnProperty('p')) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

function covDUOverallSummary(id, dataObj) {
    var columnDefs;
    var rowData = dataObj[OVERALL.DESIGN_UNITS_DATA];

    columnDefs = [];

    Object.keys(rowData).sort().forEach(function (covType) {
        if (coverageMapper.hasOwnProperty(covType)) {
            if (covType != 'gb' && covType != 'cvpc') {
                columnDefs.push({
                    headerName: coverageMapper[covType],
                    headerTooltip: coverageMapper[covType],
                    field: covType,
                    tooltipField: covType,
                    minWidth: 120, width: 120, maxWidth: 120,
                    filter: 'number',
                    cellRenderer: function (params) {
                        return (typeof params.value[OVERALL.COVERAGE_INDEX] !== 'undefined') ? ((isValueExcluded(params)) ? 'Excluded' : (adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) + '%')) : '-';
                    },
                    cellClassRules: {
                        'undefined': function (params) {
                            return typeof adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) === 'undefined';
                        },
                        'danger': function (params) {
                            return adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) < GLOBAL_JSON.lthres;
                        },
                        'warning': function (params) {
                            return adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) >= GLOBAL_JSON.lthres && adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) < GLOBAL_JSON.hthres;
                        },
                        'success': function (params) {
                            return adjustPrecision(params.value[OVERALL.COVERAGE_INDEX]) >= GLOBAL_JSON.hthres;
                        },
                        'exclusion': function (params) {
                            return isValueExcluded(params);  //In case of Exclusions
                        },
                    }
                });
            }
        }
    });

    $('#' + id).append('<h3> Overall Design Unit Coverage Summary: </h3>');
    $('#' + id).append('<div id="' + id + 'Grid1" style="width:100%;" class="ag-questa grid-container"></div>');
    createDataGridInstance(id + 'Grid1', columnDefs, [rowData]);
}

function covDUSummary(id, dataObj) {
    var columnDefs;
    var rowData = dataObj[DULIST.DESIGN_UNITS_DATA];

    columnDefs = [
        {
            headerName: 'Design Unit',
            headerTooltip: 'Design Unit',
            headerClass: 'justify-left',
            field: 'n',
            tooltipField: 'n',
            sort: 'asc',
            minWidth: 200, width: 200,
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellRenderer: function (params) {
                return '<a href="summary.html?f=' + params.data.zf + '&s=' + params.data.id + '">' + escapeAngleBrackets(params.value) + '<a>';
            }
        }
    ];

    dataObj.columns.forEach(function (covType) {
        if (coverageMapper.hasOwnProperty(covType)) {
            if (covType != 'gb' && covType != 'cvpc') {
                columnDefs.push({
                    headerName: coverageMapper[covType],
                    headerTooltip: coverageMapper[covType],
                    field: covType,
                    tooltipField: covType,
                    filter: 'number',
                    comparator: gridSortingCustomComparator,
                    minWidth: 120, width: 120, maxWidth: 120,
                    cellRenderer: function (params) {
                        return (typeof params.value !== 'undefined') ? ((isValueExcluded(params)) ? 'Excluded' : (params.value + '%')) : '-';
                    },
                    cellClassRules: {
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
                        'justify-center': function (params) {
                            return isValueUndefined(params);
                        },
                    }
                });
            }
        }
    });

    columnDefs.push({
        headerName: 'Total',
        headerTooltip: 'Total',
        field: 'tc',
        tooltipField: 'tc',
        filter: 'number',
        minWidth: 120, width: 120, maxWidth: 120,
        cellRenderer: function (params) {
            return (typeof params.value !== 'undefined') ? ((isValueExcluded(params)) ? 'Excluded' : (params.value + '%')) : '-';
        },
        cellClassRules: {
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
    });

    $('#' + id).append('<br />');
    $('#' + id).append('<h3> Coverage Summary by Design Unit: </h3>');
    $('#' + id).append('<div id="' + id + 'Grid2" style="width:100%;" class="ag-questa grid-container"></div>');
    createDataGridInstance(id + 'Grid2', columnDefs, rowData, {
        urlParams: dulistUrlParams
    });
}

