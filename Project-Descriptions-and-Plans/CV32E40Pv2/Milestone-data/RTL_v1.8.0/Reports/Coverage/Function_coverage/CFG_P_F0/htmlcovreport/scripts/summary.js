/* global $, document, getPageTemplate, window, pageName, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, coverageMapper, adjustPrecision, loadJsonFile, updateUrlHash, updateMenuSelection, headerTemplate, escapeAngleBrackets, urlParams, queryUrlParamsByPrefix, gridSortingCustomComparator, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa, isValueExcluded */
/* exported processScopesDbFile, processSummaryData, processSrcNamesData */
'use strict';

var startDate;
var dataObj;
var locRecTotalCount = 0;
var sourceMapData;
var isPA;
var isPAInstance;
var isShowExcluded;
var summaryUrlParams;
var localUrlParams;
var recursiveUrlParams;

var DATA_ARR;

var PREFIX = {
    SUMMARY: 'sm',
    LOCAL: 'loc',
    RECURSIVE: 're'
};
var pageSize = 10;
var pageUrl = 'summary.html?';
var instanceType;

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';
    isPA = GLOBAL_JSON.hasOwnProperty('pa') && GLOBAL_JSON.pa;
    isShowExcluded = (GLOBAL_JSON.hasOwnProperty('showexcluded') && GLOBAL_JSON.showexcluded);
    DATA_ARR = {
    	BINS_INDEX: 0,
    	HITS_INDEX: 1,
    	EXCLUDED_INDEX: (isShowExcluded)? 2 : undefined,
    	FILE_NUM_INDEX: (isShowExcluded)? 3 : 2,
    	FILE_SUB_NUM_INDEX: (isShowExcluded)? 4: 3
    };
    // parse url
    urlParams = parseUrl();
    if (urlParams.hasOwnProperty('type') && urlParams.type) {
        updateMenuSelection(urlParams.type, urlParams.s);
    }

    // update url hash
    updateUrlHash();

    // load json files
    loadJsonFile('srcn');
});

function processSrcNamesData(g_data) {
    sourceMapData = g_data;
    loadJsonFile((urlParams.f) ? ('z' + urlParams.f) : ('sdb' + urlParams.b));
}

function processScopesDbFile(g_db_data) {
    loadJsonFile('z' + g_db_data[urlParams.s]);
}

function processSummaryData(g_data) {
    dataObj = g_data[urlParams.s];

    isPAInstance = (dataObj.hasOwnProperty('pa') && dataObj.pa);
    instanceType = isPAInstance? 'UPF Object' : 'Instance';

    if (dataObj.loc) locRecTotalCount++;
    if (dataObj.rec) locRecTotalCount++;

    if (dataObj) {
        topPageDescription(escapeAngleBrackets(dataObj.n), dataObj.st);
        var sourceFile = {
            name: sourceMapData[dataObj.sn],
            fileNum: dataObj.sn,
            lineNum: dataObj.ln
        };

        if (dataObj.hasOwnProperty('one_inst')) {
            urlParams.oneInst = dataObj.one_inst;
        }

        pageInfo(dataObj.bc, (dataObj.st == 'du') ? dataObj.n : dataObj.du, dataObj.l, sourceFile, dataObj.st);

        if (dataObj.children) {
            covSummaryByInstance('#page-body', dataObj, dataObj.st);
        }

        if (dataObj.loc || dataObj.rec) {
            covSummaryTables('#page-body', dataObj, dataObj.st);
        }
    }

    if (urlParams.p) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

function topPageDescription(instance, type) {
    if (type == 'du') {
        $('#page-header-text').text(GLOBAL_JSON.prod + ' Design Unit ' +  GLOBAL_JSON.formal_report_name + 'Coverage');
        $('#page-header-container h4').html('<span style="color:#b0b3bc;"> Design Unit: </span>' + instance);
    } else {
        $('#page-header-text').text(GLOBAL_JSON.prod + (isPA ? ' Power Aware Instance' : ' Instance' ) + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage');

            $('#page-header-container h4').html('<span style="color:#b0b3bc;">'+  instanceType + ': </span>' + instance);

    }

    headerTemplate(urlParams);
}

function pageInfo(instance, du, language, sourceFile, type) {
    var infoPageTemplate =
        '<div class="card card-desc">' +
            '<table>';

    if (type == 'du') {
        infoPageTemplate +=
                '<tr id="summary-du">' +
                    '<th> Design Unit </th>' +
                    '<td>' +
                        '<a class="' + (isPA ? 'disabled-link' : '' ) + '"' + 'href="summary.html?' + (urlParams.hasOwnProperty('f') ? ('f=' + urlParams.f) : ('b=' + urlParams.b)) + '&s=' + urlParams.s + '&type=du" onclick="updateMenuSelection(\'du\',' + urlParams.s + ')">' + escapeAngleBrackets(du) +  '</a>' +
                    '</td>' +
                '</tr>';
    } else {
        infoPageTemplate +=
            '<tr id="summary-inst">' +
            '<th> '+ instanceType + ' Path </th>' +
            '<td>';

        instance.forEach(function (scope) {
            infoPageTemplate += (scope.z) ? '/<a href="summary.html?f=' + scope.z + '&s=' + scope.s + '&type=inst" onclick="updateMenuSelection(\'inst\',' + scope.s + ')">' + escapeAngleBrackets(scope.n) + '</a>' :
                '/<a href="summary.html?b=' + scope.b + '&s=' + scope.s + '&type=inst" onclick="updateMenuSelection(\'inst\',' + scope.s + ')">' + scope.n + '</a>';
        });

        if (!(isPAInstance || isPA)) { // In case of NON PA instance OR PA report
            infoPageTemplate +=
                '</td>' +
                '</tr>' +
                '<tr id="summary-du">' +
                '<th> Design Unit </th>';

            infoPageTemplate += (du.hasOwnProperty('b') && du.b != 0) ?
                ('<td> <a class="' + (isPA ? 'disabled-link' : '') + '"' + 'href="summary.html?b=' + du.b + '&s=' + du.s + '&type=du" onclick="updateMenuSelection(\'du\',' + du.s + ')">' + escapeAngleBrackets(du.n) + '</a> </td>') :
                ('<td>' + escapeAngleBrackets(du.n) + ' (No Coverage) </td>');

            infoPageTemplate +=
                '</tr>';
        }
    }
    if (!(isPAInstance || isPA)) {   // In case of NON PA instance OR PA report
        infoPageTemplate +=
            '<tr id="summary-language">' +
            '<th> Language </th>' +
            '<td>' + language + '</td>' +
            '</tr>';
    }

    infoPageTemplate += '<tr id="summary-src">' +
            '<th> Source File </th>' +
            '<td>' + ((sourceFile.lineNum) ? ('<a href="sourceViewer.html?f=' + sourceFile.fileNum + '&l=' + sourceFile.lineNum + '" >' + sourceFile.name + '</a>') : (sourceFile.name)) + '</td>' +
            '</tr>' +
            '</table>' +
            '</div>';

    $('#page-body').append(infoPageTemplate);
    $('#page-body').append('<br/>');
}

function covSummaryByInstance(id, dataObj, type) {
    var panelBodyId;
    var columnDefs;
    var rowData;

    columnDefs = [
        {
            headerName: 'Instance',
            headerTooltip: 'Instance',
            headerClass: 'justify-left',
            field: 'n',
            tooltipField: 'n',
            sort: 'asc',
            minWidth: 200, width: 200,
            cellStyle: {
                'text-align': 'left'
            },
            cellRenderer: 'group',
            cellRendererParams: {
                innerRenderer: function (params) {
                    if (params.data.zf && params.data.id) {
                        return '<a href="summary.html?f=' + params.data.zf + '&s=' + params.data.id + '&type=inst" onclick=updateMenuSelection(\'inst\',' + params.data.id + ')>' + params.value + '</a>';
                    } else {
                        return params.value;
                    }
                },
                suppressCount: true
            }
        }
    ];

    ['a', 'b', 'fc', 'g', 'd', 'fe', 'fs', 'ft', 's', 't','pc', 'pg'].forEach(function (covType) {
        if (dataObj.rec.data.hasOwnProperty(covType)) {
            if (!(covType === 'f' || covType === 'gb' || covType === 'cvpc')) {
                if (coverageMapper.hasOwnProperty(covType)) {
                    columnDefs.push({
                        headerName: coverageMapper[covType],
                        headerTooltip: coverageMapper[covType],
                        field: covType,
                        tooltipField: covType,
                        minWidth: 120, width: covType === 'pc' || covType == 'pg' ? 180 : 120, maxWidth: covType === 'pc' || covType == 'pg' ? 180 : 120,
                        comparator: gridSortingCustomComparator,
                        filter: 'number',
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
                }
            }
        }
    });

    columnDefs.push(
        {
            headerName: 'Total',
            headerTooltip: 'Total',
            field: 'tc',
            tooltipField: 'tc',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
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

    rowData = [{
        n: 'Total',
        tc: dataObj.rec.cp,
        rec: dataObj.rec,
        group: true,
        children: dataObj.children,
    }];

    if (dataObj.hasOwnProperty('loc')) {
        rowData[0].children = [{
            n: dataObj.bc[dataObj.bc.length - 1].n,
            zf: dataObj.bc[dataObj.bc.length - 1].z,
            id: dataObj.bc[dataObj.bc.length - 1].s,
            tc: dataObj.loc.cp,
            group: true,
            children: dataObj.children
        }];

        for (var covType in dataObj.loc.data) {
            if (dataObj.loc.data.hasOwnProperty(covType)) {
                rowData[0].children[0][covType] = (covType == 'g' || covType == 'pg') ? (dataObj.loc.data[covType][1]) : (typeof dataObj.loc.data[covType][0] === 'string') ? (dataObj.loc.data[covType][0]) : adjustPrecision((dataObj.loc.data[covType][1] / dataObj.loc.data[covType][0] * 100));
            }
        }
    } else {
        rowData[0].children = dataObj.children;
    }

    for (covType in dataObj.rec.data) {
        if (dataObj.rec.data.hasOwnProperty(covType)) {
            rowData[0][covType] = (covType == 'g' || covType == 'pg') ? (dataObj.rec.data[covType][1]) : (typeof dataObj.rec.data[covType][0] === 'string') ? (dataObj.rec.data[covType][0]) : adjustPrecision((dataObj.rec.data[covType][1] / dataObj.rec.data[covType][0] * 100));
        }
    }

    panelBodyId = createPanel(id, (type == 'du') ? 'Design Unit Hierarchical Summary' : 'Coverage Summary By Instance', dataObj.rec.cp);
    $('#' + panelBodyId).append('<div id="' + panelBodyId + 'Grid" style="width:100%;" class="ag-questa grid-container"></div>');

    summaryUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.SUMMARY, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    createDataGridInstance(panelBodyId + 'Grid', columnDefs, rowData, {
        treeExpanded: true,
        isTree: false,
        urlParams: summaryUrlParams
    });

    $('#page-body').append('<br />');
}

function getRowData(data, type) {
    var gridData = [];
    Object.keys(data).sort().forEach(function (covType) {
        if (data.hasOwnProperty(covType)) {
            if (!(covType === 'gb' || covType === 'cvpc' || covType === 'f' || covType === 'pb')) {
                    var rowData = {
                        name: coverageMapper[covType],
                        type: covType,
                        bins: data[covType][DATA_ARR.BINS_INDEX],
                        hit: data[covType][DATA_ARR.HITS_INDEX],
                        miss: data[covType][DATA_ARR.BINS_INDEX] - data[covType][DATA_ARR.HITS_INDEX],
                        cp: (covType === 'g' || covType === 'pg') ? data[covType][DATA_ARR.HITS_INDEX] : adjustPrecision(data[covType][DATA_ARR.HITS_INDEX] / data[covType][DATA_ARR.BINS_INDEX] * 100),
                        exclude: isShowExcluded?  data[covType][DATA_ARR.EXCLUDED_INDEX] : -1
                    };

                    if (data[covType].length > 3 || (data[covType].length > 2 && !isShowExcluded)) {
                        rowData.f = data[covType][DATA_ARR.FILE_NUM_INDEX];
                        if (typeof data[covType][DATA_ARR.FILE_SUB_NUM_INDEX] !== 'undefined') {
                            rowData.fsub = data[covType][DATA_ARR.FILE_SUB_NUM_INDEX];
                        }
                    } else if (data[covType].length > 1 && typeof data[covType][0] === 'string' && (typeof data[covType][1] !== 'string') ) {
                        rowData.f = data[covType][data[covType].length - 1];
                    }

                    rowData.s = urlParams.s;
                    if (urlParams.hasOwnProperty('oneInst')) {
                        rowData.oneInst = urlParams.oneInst;
                    }

                    if (urlParams.hasOwnProperty('oneInst') || (urlParams.hasOwnProperty('type') && urlParams.type === 'du')) {
                        rowData.pr = dataObj.n;
                    }

                    var cvgChildData;
                    if (covType == 'g') {
                        rowData.hit  = -1;
                        rowData.miss = -1;
                        rowData.group = true;
                       // rowData.exclude = -1;
                        var cvgChildCovType = 'cvpc';
                        if (data.hasOwnProperty(cvgChildCovType)) {
                            rowData.group = true;
                            cvgChildData = {
                                name: coverageMapper[cvgChildCovType],
                                type: cvgChildCovType,
                                bins: data[cvgChildCovType][DATA_ARR.BINS_INDEX],
                                hit: -1,
                                miss: -1,
                                cp: -1,
                                exclude: data[cvgChildCovType][DATA_ARR.EXCLUDED_INDEX -1]
                            };

                            var crossChildCovType = 'gb';
                            if (data.hasOwnProperty(crossChildCovType)) {
                                cvgChildData.group = true;
                                cvgChildData.children = [
                                    {
                                        name: coverageMapper[crossChildCovType],
                                        type: crossChildCovType,
                                        bins: data[crossChildCovType][DATA_ARR.BINS_INDEX],
                                        hit: data[crossChildCovType][DATA_ARR.HITS_INDEX],
                                        miss: data[crossChildCovType][DATA_ARR.BINS_INDEX] - data[crossChildCovType][DATA_ARR.HITS_INDEX],
                                        cp: adjustPrecision(data[crossChildCovType][DATA_ARR.HITS_INDEX] / data[crossChildCovType][DATA_ARR.BINS_INDEX] * 100),
                                        exclude: isShowExcluded?  data[crossChildCovType][DATA_ARR.EXCLUDED_INDEX] : -1
                                    }
                                ];
                            }
                        }
                        rowData.children = [cvgChildData];
                    }

                    var paCvgChildData;
                    if (covType == 'pg') {
                        rowData.hit  = -1;
                        rowData.miss = -1;
                        rowData.group = true;
                      //  rowData.exclude = -1;
                        var paCvgChildCovType = 'pb';
                        if (data.hasOwnProperty(paCvgChildCovType)) {
                            rowData.group = true;
                            paCvgChildData = {
                                name: coverageMapper[paCvgChildCovType],
                                type: paCvgChildCovType,
                                bins: data[paCvgChildCovType][DATA_ARR.BINS_INDEX],
                                hit: data[paCvgChildCovType][DATA_ARR.HITS_INDEX],
                                miss: data[paCvgChildCovType][DATA_ARR.BINS_INDEX] - data[paCvgChildCovType][DATA_ARR.HITS_INDEX],
                                cp: adjustPrecision(data[paCvgChildCovType][DATA_ARR.HITS_INDEX] / data[paCvgChildCovType][DATA_ARR.BINS_INDEX] * 100),
                                exclude: isShowExcluded?  data[paCvgChildCovType][DATA_ARR.EXCLUDED_INDEX] : -1
                            };
                        }
                        rowData.children = [paCvgChildData];
                    }

                    gridData.push(rowData);
                }
            }
    });

    return gridData;
}

function covSummaryTables(id, dataObj, type) {
    var panelBodyId;
    var columnDefs = [];
    columnDefs.push(
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
                        if (params.data.f && (params.data.type != 'gb' && params.data.type != 'cvpc' && params.data.type != 'pb')) {
                            return '<a href="' + pageName[params.data.type] + 'f=' + params.data.f + (params.data.hasOwnProperty('fsub') ? ('&fsub=' + params.data.fsub) : '') + (params.data.hasOwnProperty('pr') ? ('&pr=' + params.data.pr) : '') + (urlParams.hasOwnProperty('type') ? '&type=' + urlParams.type : '') + '&s=' + params.data.s + '&cp=' + params.data.cp + (params.data.hasOwnProperty('oneInst') ? ('&oneInst=' + params.data.oneInst) : '') + '">' + params.value + '</a>';
                        } else {
                            return params.value;
                        }
                    },
                    suppressCount: true
                },
                cellClassRules: {
                    'exclusion': function (params) {
                        return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');  //In case of Exclusions
                    },
                },
            }
        );

    columnDefs.push(
        {
            headerName: 'Bins',
            headerTooltip: 'bins',
            field: 'bins',
            tooltipField: 'bins',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellRenderer: function (params) {
                if ((typeof params.data.bins === 'string') || (typeof params.data.hit === 'string')) { //In case of Exclusions
                    return '-';
                } else {
                    return  params.value;
                }
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');
                },
            },
        },
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hit',
            comparator: gridSortingCustomComparator,
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellRenderer: function (params) {
                if ((typeof params.data.bins === 'string') || (typeof params.data.hit === 'string')) { //In case of Exclusions
                    return '-';
                } else {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                }
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return isValueNa(params);
                },
                'exclusion': function (params) {
                    return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');
                },
            }
        }
    );

    if (!(GLOBAL_JSON.hasOwnProperty('nomissing') && GLOBAL_JSON.nomissing)) {
        columnDefs.push(
            {
                headerName: 'Misses',
                headerTooltip: 'Misses',
                field: 'miss',
                comparator: gridSortingCustomComparator,
                minWidth: 120, width: 120, maxWidth: 120,
                filter: 'number',
                cellRenderer: function (params) {
                    if ((typeof params.data.bins === 'string') || (typeof params.data.hit === 'string')) { //In case of Exclusions
                        return '-';
                    } else {
                        return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                    }
                },
                cellClassRules: {
                    'fg-disabled': function (params) {
                        return isValueNa(params);
                    },
                    'exclusion': function (params) {
                        return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');
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
                comparator: gridSortingCustomComparator,
                minWidth: 120, width: 120, maxWidth: 120,
                filter: 'number',
                cellRenderer: function (params) {
                   return '<span title="' + ((isValueNa(params)) ? 'na' : params.value) + '">' + ((isValueNa(params)) ? 'na' : params.value) + '</span>';
                },
                cellClassRules: {
                    'fg-disabled': function (params) {
                        return isValueNa(params);
                    },
                    'exclusion': function (params) {
                        return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');
                    },
                }
            });
    }
    columnDefs.push(
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'cp',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellRenderer: function (params) {
                if ((typeof params.data.bins === 'string') || (typeof params.data.hit === 'string')) { //In case of Exclusions
                    return 'Excluded';
                } else {
                    return '<span title="' + ((isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : params.value + '%') + '">' + ((isValueNa(params)) ? 'na' : (isValueUndefined(params)) ? '-' : params.value + '%') + '</span>';
                }
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
                    return (typeof params.data.bins === 'string') || (typeof params.data.hit === 'string');
                },
            }
        }
    );

    var locRecId = 'loc-rec';

    $(id).append( (locRecTotalCount == 1) ? '<div id="' + locRecId + '1"></div>' :
        '<div class="row">' +
            '<div class="col-xs-12 col-md-6">' +
                '<div id="' + locRecId + '1"></div>' +
            '</div>' +
            '<div class="col-xs-12 col-md-6">' +
                '<div id="' + locRecId + '2"></div>' +
            '</div>' +
        '</div>'
    );

    var locRecCount = 1;
    if (dataObj.loc) {
        panelBodyId = createPanel('#' + locRecId + locRecCount, (type == 'du') ? 'Design Unit Coverage Details' : 'Local Instance Coverage Details', dataObj.loc.cp);
        $('#' + panelBodyId).append('<div id="' + panelBodyId + 'Grid-details" style="width:100%;" class="ag-questa grid-container"></div>');

        localUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.LOCAL, {
            pageUrl: pageUrl
        });

        createDataGridInstance(panelBodyId + 'Grid-details', columnDefs, getRowData(dataObj.loc.data, type ), {
            isTree: false,
            urlParams: localUrlParams
        });
        $('#page-body').append('<br />');
        locRecCount++;
    }

    if (dataObj.rec) {
        panelBodyId = createPanel('#' + locRecId + locRecCount, 'Recursive Hierarchical Coverage Details', dataObj.rec.cp);
        $('#' + panelBodyId).append('<div id="' + panelBodyId + 'Grid-details" style="width:100%;" class="ag-questa grid-container"></div>');

        recursiveUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.RECURSIVE, {
            pageUrl: pageUrl
        });

        createDataGridInstance(panelBodyId + 'Grid-details', columnDefs, getRowData(dataObj.rec.data), {
            isTree: false,
            urlParams: recursiveUrlParams
        });
        $('#page-body').append('<br />');
    }
}
