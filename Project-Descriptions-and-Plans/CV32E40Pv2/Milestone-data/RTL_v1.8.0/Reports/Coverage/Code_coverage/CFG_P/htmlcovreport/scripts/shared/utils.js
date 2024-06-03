/* exported parseUrl, createDataGridInstance, createPanel, onGridPageSizeChange, gridExportToCsv, onDataGridMenuCheckboxChange, coverageMapper, adjustPrecision, gridExpandCollapseAll, updateProgressBarLoader, loadJsonFile, createCodeMirrorInstance, updateUrlHash, pageName, OVERALL, DULIST, updateMenuSelection, addHitsGutters, addMarkers, jumpToLine, getFileName, BODY_TEMPLATE, checkTpTrIcons, getFileSize, hitsRenderer, processTestsData, processTestHitData, queryUrlParamsByPrefix, getFileExt, headerTemplate, urlParams, escapeAngleBrackets, gridSortingCustomComparator, getPageTemplate, STATEMENTS_SRC, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueNa, isValueExcluded, isTogglesExtendedValueExcluded */
/* global $, window, document, parent, location, console, Event, agGrid, GLOBAL_JSON, updateUrlParamsFrame, updateUrlParams, GLOBAL_JSON, g_oCONST */

'use strict';

/* main routine */
$(document).ready(function () {
    processGlobaljson();
});

/*
 * Set of constants
 */
var urlParams = {};

var coverageMapper = {
    'a': 'Assertions',
    'b': 'Branches',
    'd': 'Directives',
    'f': 'FSM',
    'fc': 'Conditions',
    'fe': 'Expressions',
    'fs': 'FSM States',
    'ft': 'FSM Transitions',
    'g': 'Covergroups',
    'gb': 'Covergroup Bins',
    's': 'Statements',
    't': 'Toggles',
    'cvpc': 'Coverpoints/Crosses',
    'pc' : 'Power Aware Checks',
    'pg' : 'Power Aware Covergroups',
    'pb' : 'Power Aware Bins',
    'bl' : 'Block Coverage'
    // 'tc' : 'Total Coverage',
    // 'cp' : 'Total Coverage'
};

var pageName = {
    'a': 'assertionsDirectives.html?t=a&',
    'b': 'branches.html?',
    'd': 'assertionsDirectives.html?t=d&',
    'f': 'fsm.html?',
    'fs': 'fsm.html?t=state&',
    'ft': 'fsm.html?t=trans&',
    'fc': 'condExp.html?t=fc&',
    'fe': 'condExp.html?t=fe&',
    'g': 'cvg.html?',
    'gb': 'cvgBins.html?',
    's': 'statements.html?',
    't': 'toggles.html?',
    'pc': 'assertionsDirectives.html?pc=1&t=a&',
    'pg': 'cvg.html?pg=1&',
    'pb': 'cvgBins.html?pg=1&',
    'bl': 'blockCoverage.html?'
};

var testPlanPageName = {
    'assert': 'assertionsDirectives.html?t=a&',
    'branch': 'branches.html?',
    'cover': 'assertionsDirectives.html?t=d&',
    'fsm': 'fsm.html?',
    'fsm_states': 'fsm.html?t=state&',
    'fsm_trans': 'fsm.html?t=trans&',
    'cond': 'condExp.html?t=fc&',
    'expr': 'condExp.html?t=fe&',
    'statement': 'statements.html?',
    'toggle': 'toggles.html?',
    'covergroup': 'cvg.html?',
    'bblock_scope': 'blockCoverage.html?',
    'coverinstance': 'cvg.html?',
    'instance': 'summary.html?',
    'du_arch': 'summary.html?type=du&',
    'coverpoint': 'cvg.html?type=inst&',
    'cross': 'cvg.html?type=inst&',
    'du_module': 'summary.html?type=du&',
    'package': 'summary.html?'
};


var OVERALL = {
    DESIGN_UNITS_DATA: 'du',
    DESIGN_INSTANCES_DATA: 'ds',
    DESIGN_STRUCTURE_DATA: 'ds_list',

    BINS_INDEX: 0,
    HITS_INDEX: 1,
    COVERAGE_INDEX: 2,
    EXCLUDED_INDEX: 3
};

var DULIST = {
    DESIGN_UNITS_DATA: 'data',

    BINS_INDEX: 0,
    HITS_INDEX: 1,
    COVERAGE_INDEX: 2
};

var STATEMENTS_SRC = {
    THIT_FILE_NUM: 0,
    THIT_SCOPE: 1
};

/*
 * Global.json interface
 */
var GLOBAL_JSON = {};
function processGlobaljson() {
    var precision;
    var defaultPrecision = 2;
    var isInstanceReport = false;

    GLOBAL_JSON = {
        prod: g_oCONST.hasOwnProperty('prod') ? g_oCONST.prod : undefined,                                                                      // Product "Modelsim - Questa"
        prodlink: g_oCONST.hasOwnProperty('prodlink') ? g_oCONST.prodlink : undefined,                                                          // Product Website
        version: g_oCONST.hasOwnProperty('version') ? g_oCONST.version : undefined,                                                             // Product Version
        time: g_oCONST.hasOwnProperty('time') ? g_oCONST.time : undefined,                                                                      // Date and Time the report generated
        nomissing: g_oCONST.hasOwnProperty('nomissing') ? g_oCONST.nomissing : undefined,                                                       // No Misses Switch
        lthres: g_oCONST.hasOwnProperty('lthres') ? g_oCONST.lthres : undefined,                                                                // Low Threshold
        hthres: g_oCONST.hasOwnProperty('hthres') ? g_oCONST.hthres : undefined,                                                                // high Threshold
        assert_n_files: g_oCONST.hasOwnProperty('assert_n_files') ? g_oCONST.assert_n_files : undefined,                                        // Number of Assertion files
        direct_n_files: g_oCONST.hasOwnProperty('direct_n_files') ? g_oCONST.direct_n_files : undefined,                                        // Number of Directive files
        cvg_n_files: g_oCONST.hasOwnProperty('cvg_n_files') ? g_oCONST.cvg_n_files : undefined,                                                 // Number of Cvg files
        tpExist: g_oCONST.hasOwnProperty('tpExist') ? g_oCONST.tpExist : undefined,                                                             // Testplan Exist
        trExist: g_oCONST.hasOwnProperty('trExist') ? g_oCONST.trExist : undefined,                                                             // Testrecord Exist
        instlinkSize: g_oCONST.hasOwnProperty('instlinkSize') ? g_oCONST.instlinkSize : undefined,                                              // Instlink file size
        dulinkSize: g_oCONST.hasOwnProperty('dulinkSize') ? g_oCONST.dulinkSize : undefined,                                                    // dulink file size
        command: g_oCONST.hasOwnProperty('command') ? g_oCONST.command : undefined,                                                             // Command
        commandargs: g_oCONST.hasOwnProperty('commandargs') ? g_oCONST.commandargs : undefined,                                                 // Command's arguments
        exclReason: g_oCONST.hasOwnProperty('exclReason') ? g_oCONST.exclReason : undefined,                                                    // Exclusion Reason
        paCombined: g_oCONST.hasOwnProperty('PACombined') ? (g_oCONST.PACombined === 1 ? true : false ) : undefined,                            // PA Combined  (Power aware and Coverage report )
        pa: (g_oCONST.hasOwnProperty('PA') && g_oCONST.hasOwnProperty('PACombined')) ? (g_oCONST.PA && !g_oCONST.PACombined) : undefined,       // PA Only and not combined
        crossBinsCompactView: g_oCONST.hasOwnProperty('CrossBinsCompactView') ? g_oCONST.CrossBinsCompactView : undefined,                     // CrossBinsCompactView
        formal_report_name: g_oCONST.hasOwnProperty('is_formal_report') ? (g_oCONST.is_formal_report? 'Formal ' : '') : undefined,
        byDu: g_oCONST.hasOwnProperty('commandargs') ?
            ((checkCommandArgs(g_oCONST.commandargs, '-du') || checkCommandArgs(g_oCONST.commandargs, '-bydu')) && !checkCommandArgs(g_oCONST.commandargs, '-dumptables')) : undefined,                          // by Du
        byInstance: g_oCONST.hasOwnProperty('commandargs') ?
            (checkCommandArgs(g_oCONST.commandargs, '-instance')  || checkCommandArgs(g_oCONST.commandargs, '-byinstance')) : undefined,              // by Instance
        srcAnnotate: g_oCONST.hasOwnProperty('commandargs') ? checkCommandArgs(g_oCONST.commandargs, '-annotate')  : undefined,                 // -annotate
        testPlanReport: g_oCONST.hasOwnProperty('TestPlanHtmlReport') ? g_oCONST.TestPlanHtmlReport : undefined,                                // Testplan section
        summaryReport: g_oCONST.hasOwnProperty('commandargs') ? checkCommandArgs(g_oCONST.commandargs, '-summary')  : undefined,                // Summary Report -summary
        showexcluded : g_oCONST.hasOwnProperty('showexcluded') ? g_oCONST.showexcluded : undefined,						                        // showexcluded
        maxNumberOfGutters: 5,															// Max number of Gutter items in source code editor
	maxNumberOfCrossBins : g_oCONST.hasOwnProperty('max_n_crossbins') ? g_oCONST.max_n_crossbins : undefined,				// Max number of Cross Bins to be viewed
    };
    if (GLOBAL_JSON.hasOwnProperty('exclReason')) {
        delete GLOBAL_JSON.exclReason.E;                 // removing 'E' from exclusion reason
    }


    // Check if the report is generated with -instance switch
    for (var i = 0; i < GLOBAL_JSON.commandargs.length; i++) {
        if (GLOBAL_JSON.commandargs[i] && GLOBAL_JSON.commandargs[i].indexOf('-instance') !== -1) {
            isInstanceReport = true;
            break;
        }
    }
    GLOBAL_JSON.isInstance_report = isInstanceReport;

    // getPrecision
    for (i = 0; i < GLOBAL_JSON.commandargs.length; i++) {
        if (GLOBAL_JSON.commandargs[i] && GLOBAL_JSON.commandargs[i] === '-precision') {
            precision = GLOBAL_JSON.commandargs[++i];
            break;
        }
    }

    GLOBAL_JSON.precision = (precision || defaultPrecision);

    // Parsing command's argument into 1 string
    GLOBAL_JSON.fullCommand = GLOBAL_JSON.command + ' report ' + GLOBAL_JSON.commandargs.join(' ');
}


/*
 * Value range check functions
 */
function isValueBelowThreshold(params) {
    return params.value >= 0 && params.value < GLOBAL_JSON.lthres;
}

function isValueInRange(params) {
    return params.value >= GLOBAL_JSON.lthres && params.value < GLOBAL_JSON.hthres;
}

function isValueAboveThreshold(params) {
    return params.value >= GLOBAL_JSON.hthres;
}

function isValueUndefined(params) {
    return typeof params.value === 'undefined';
}
// Not applicable values are sent fro the core as -1 so they'll be rendedred to Na
function isValueNa(params) {
    return params.value === -1;
}
// Excluded hits are shown as 'E', 'E-hit', ... so all of these values are string
function isValueExcluded(params) {
    return (typeof params.value === 'string' && params.value !== '-');   // some hits are string and == '-' not excluded
}
// Excluded hits of toggles are shown as 'E', 'E-hit', ... so all of these values are string and there're several values for hits: low to high hits, .....
function isTogglesExtendedValueExcluded(params) {
    return params.value == 'E' || params.value == 'E-hit' || params.data.coverage == 'E' || (typeof params.data.hits === 'string');
}

/*
 *  Constructing Page template
 */

function getPageTemplate() {
    var homeHref = (window.top != window.self) ? 'covSummary.html' : 'index.html#covSummary.html';

    var BODY_TEMPLATE =
        '<div id="page-header-container">' +
            '<div class="header">' +
                '<img class="text-center" src="" alt=""></img>' +
                '<h1 class="text-center" id="page-header-text"> </h1>' +
            '</div>' +
            '<h4 class="text-center"></h4>' +
            // Constructing Icons
            '<a id="covSummary" style="padding: 0px 10px 0px;" class="home-logo" title="Home Page" href=" ' + homeHref + '">' +
                '<i class="fa fa-home" aria-hidden="true" style="color: white;font-size: 22px;"></i>' +
            '</a>' +
            '<a id="duList" style="padding: 2px 0 0px 0px;margin-right:50px; ' + ( ((GLOBAL_JSON.byInstance && ! GLOBAL_JSON.byDu) || (GLOBAL_JSON.pa && !GLOBAL_JSON.paCombined) || GLOBAL_JSON.summaryReport) ? 'display: none' : '') + ' " title="Design Units" class="home-logo" href="dulist.html">' +
                '<i class="fa fa-th" aria-hidden="true" style="color: white;font-size: 20px;"></i>' +
            '</a>' +
            '<a id="testRecord" style="padding: 2px 0px 0px 0px;margin-right:' + ((GLOBAL_JSON.isInstance_report) ? 50 : 90) + 'px;' + ((GLOBAL_JSON.trExist) ? '' : 'display: none') + '" title="Tests" class="home-logo" href="testRecords.html">' +
                '<i class="fa fa-flask" aria-hidden="true" style="color: white;font-size: 20px;"></i>' +
            '</a>' +
            '<a id="testPlan" style="padding: 2px 0px 0px 0px;margin-right:' + ((!(GLOBAL_JSON.trExist) && (GLOBAL_JSON.isInstance_report)) ? 50 : (((GLOBAL_JSON.trExist) && (!GLOBAL_JSON.isInstance_report)) ? 130 : 90 )) + 'px;' + ((GLOBAL_JSON.tpExist) ? '' : 'display: none') + '" title="Testplan" class="home-logo" href="testPlan.html">' +
                '<i class="fa fa-list-alt" aria-hidden="true" style="color: white;font-size: 20px;"></i>' +
            '</a>' +
        '</div>' +
        '<div id="page-body" class="container-fluid">' +
        '</div>';

    return BODY_TEMPLATE;
}

/*
 * DataGrid Functions
 */
var gridOptionsList = {};
function createDataGridInstance(id, columnDefs, rowData, config, height , forceFloatingFilters) {
    if (height === undefined) {
        height = false;
    }
    if (forceFloatingFilters  === undefined) {
        forceFloatingFilters = false;
    }
    var options = {};
    // Initialization of static variables used in gridGetNumOfEntries function as it's called recursively
    gridGetNumOfEntries.totalCount = 0;
    gridGetNumOfEntries.topCount = 0;
    gridGetNumOfEntries.top = 1;
    var nEntries = gridGetNumOfEntries(rowData);
    var defaultPageSize = 10;
    if (config) {
        options = config;
        if (!options.hasOwnProperty('pageSize')) {
            options.pageSize = defaultPageSize;
        }
        if (options.urlParams && options.urlParams.hasOwnProperty('pageSize')) {
            options.pageSize = options.urlParams.pageSize == 'All' ? nEntries.totalCount : options.urlParams.pageSize;
        }
    } else {
        options.pageSize = defaultPageSize;
    }

    options.pageSize = Number(options.pageSize);

    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        rowSelection: (config && config.rowSelection) ? config.rowSelection : 'multiple',
        rowDeselection: true,
        paginationPageSize: options.pageSize,
        enableColResize: true,
        enableSorting: (options && options.hasOwnProperty('sortingEnabled')) ? options.sortingEnabled : true,
        enableFilter: false,
        floatingFilter: (options && options.hasOwnProperty('floatingFilterEnabled')) ? options.floatingFilterEnabled : true,
        animateRows: true,
        groupSelectsChildren: false,
        groupSelectsFiltered: true,
        domLayout: height ? 'normal' : 'autoHeight',
        suppressVerticalScroll: false,
        rowHeight: 25,
        autoGroupColumnDef: {
            pinned: 'left',
        },
        getNodeChildDetails: function (rowItem) {
            var expand = (options && options.hasOwnProperty('treeExpanded')) ? true : (rowItem.expand) ? true : (nEntries.topCount <= 10 && nEntries.totalCount <= 12);
            return (rowItem.group) ? {
                group: true,
                expanded: expand,
                children: rowItem.children
            } : null;
        },
        defaultColDef: {
            cellStyle: {
                'text-align': 'right',
                'padding-right': '4px'
            },
            headerClass: 'ag-numeric-header',
            enableCellChangeFlash: true
        },
        onGridReady: function () {
            gridEvents(gridOptions);

            if (config && config.urlParams ) {
                if (config.urlParams.hasOwnProperty('filter')) {
                    gridOptions.api.setFilterModel(config.urlParams.filter);
                }

                if (config.urlParams.hasOwnProperty('page')) {
                    gridOptions.api.paginationGoToPage(config.urlParams.page);
                }

                if (config.urlParams.hasOwnProperty('sort')) {
                    gridOptions.api.setSortModel(config.urlParams.sort);
                }

                if (config.urlParams.hasOwnProperty('prefix')) {
                    gridSelectNode(gridOptions, config.urlParams[config.urlParams.prefix]);
                }

                if (config.urlParams.hasOwnProperty('prefix')) {
                    if (config.urlParams.hasOwnProperty(config.urlParams.prefix + '_c')) {
                        var node = gridOptions.api.getRowNode(config.urlParams[config.urlParams.prefix]);
                        if (node) {
                            node.setExpanded(true);
                        }
                    }

                    var selectedNodeId = config.urlParams.hasOwnProperty(config.urlParams.prefix + '_c') ? config.urlParams[config.urlParams.prefix + '_c'] : config.urlParams[config.urlParams.prefix];
                    gridSelectNode(gridOptions, selectedNodeId);
                }

                if (config.hasOwnProperty('callback')) {
                    var firstNodeIndex = 0;
                    var firstDisplayedNode = gridOptions.api.getDisplayedRowAtIndex(0);

                    if (typeof firstDisplayedNode !== 'undefined') {
                        firstNodeIndex = (firstDisplayedNode.hasOwnProperty('parent')) ? firstDisplayedNode.parent.id : firstDisplayedNode.id;
                    }

                    config.callback(firstNodeIndex);
                }
            }
        },
        onPaginationChanged: function () {
            if (config && config.urlParams && config.urlParams.prefix) {
                var currentPage = gridOptions.api.paginationGetCurrentPage();
                var currentPageSize = $('select#' + id + '_pagination').val();
                var newUrlParams = {};

                newUrlParams[config.urlParams.prefix + '_page'] = currentPage + 1;
                newUrlParams[config.urlParams.prefix + '_pageSize'] = currentPageSize;

                if (config.urlParams.openedInFrame) {
                    updateUrlParamsFrame(newUrlParams);
                } else {
                    updateUrlParams(newUrlParams, config.urlParams.pageUrl);
                }
            }
        },
        onSortChanged: function () {
            if (config && config.urlParams && config.urlParams.prefix) {
                var currentSortModel = gridOptions.api.getSortModel();
                var newUrlParams = {};
                var sortParams = [];

                currentSortModel.forEach(function(element) {
                    sortParams.push(element.colId + ',' + element.sort);
                });

                newUrlParams[config.urlParams.prefix + '_sort'] = sortParams.join(';');
                if (config.urlParams.openedInFrame) {
                    updateUrlParamsFrame(newUrlParams);
                } else {
                    updateUrlParams(newUrlParams, config.urlParams.pageUrl);
                }
            }
        },
        onFilterChanged: function () {
            if (config && config.urlParams && config.urlParams.prefix) {
                var currentFilterModel = gridOptions.api.getFilterModel();
                var newUrlParams = {};
                var filterParams = [];

                Object.keys(currentFilterModel).forEach(function(key) {
                    filterParams.push(key + ',' + currentFilterModel[key].type + ',' + currentFilterModel[key].filter);
                });

                newUrlParams[config.urlParams.prefix + '_filter'] = filterParams.join(';');
                if (config.urlParams.openedInFrame) {
                    updateUrlParamsFrame(newUrlParams);
                } else {
                    updateUrlParams(newUrlParams, config.urlParams.pageUrl);
                }
            }
        },
        onViewportChanged: function () {
            // gridEvents(gridOptions);
        },
        onGridSizeChanged: function () {
            gridEvents(gridOptions);
        },
        onColumnVisible: function (e) {
            var currentGridId;
            gridOptions.api.sizeColumnsToFit();
            for (var key in gridOptionsList) {
                if (gridOptionsList.hasOwnProperty(key)) {
                    if (gridOptionsList[key] == gridOptions) {
                        currentGridId = key;
                    }
                }
            }

            $('#' + currentGridId + '_' + e.column.colId).prop('checked', e.visible);
        },
        onBodyScroll: function () {
            // gridEvents(gridOptions);
        }
    };

    if (options && options.hasOwnProperty('paginationEnabled')) {
        gridOptions.pagination = options.paginationEnabled;
    } else if (nEntries.topCount <= 10 && nEntries.totalCount <= 12) {
        gridOptions.pagination = false;
        if (!forceFloatingFilters && (nEntries.totalCount == 0 || nEntries.totalCount == 1 )) {
            gridOptions.floatingFilter = false;
        }
    } else {
        gridOptions.pagination = true;
    }

    gridOptions.domLayout = height ? 'normal' : 'autoHeight';

    var eGridDiv = document.querySelector('#' + id);
    if (height) {
        eGridDiv.style.height = height;
    }
    new agGrid.Grid(eGridDiv, gridOptions);
    gridOptionsList[id] = gridOptions;
    if (!(options && options.hideToolbar)) {
        $('#' + id).before(gridToolbarTemplate(id, columnDefs, nEntries.totalCount, options));
    }

    return gridOptions;
}

function gridEvents(gridOptions) {
    gridOptions.api.sizeColumnsToFit();
    $('input.ag-floating-filter-input').attr('placeholder', 'Search...');
    $('input.ag-floating-filter-input').attr('type', 'search');
    $('input.ag-floating-filter-input').addClass('close-icon');
}

function gridSelectNode(gridOptions, id) {
    var node = gridOptions.api.getRowNode(id);
    if (node) {
        node.setSelected(true, true);
    }
}

function gridGetNumOfEntries(rowData) {
    gridGetNumOfEntries.totalCount = gridGetNumOfEntries.totalCount + rowData.length;
    if (gridGetNumOfEntries.top) {
        gridGetNumOfEntries.topCount = rowData.length;
    }

    rowData.forEach(function (entry) {
        if (entry.hasOwnProperty('children')) {
            gridGetNumOfEntries.top = 0;
            gridGetNumOfEntries(entry.children);

        }
    });

    var numOfEntries = {
        topCount: gridGetNumOfEntries.topCount,
        totalCount: gridGetNumOfEntries.totalCount,
    };
    return numOfEntries;
}

function gridToolbarTemplate(id, columnDefs, nEntries, options) {
    var gridId = id;
    var columnsList = [];
    var isTree;

    if (options && options.hasOwnProperty('isTree')) {
        isTree = options.isTree;
    } else {
        isTree = gridOptionsList[gridId].columnDefs[0].cellRenderer === 'group';
        if (gridOptionsList[gridId].columnDefs.length > 1 && !isTree) {
            isTree = gridOptionsList[gridId].columnDefs[1].cellRenderer === 'group';
        }
    }

    for (var i = 0; i < columnDefs.length; i++) {
        var checked = !(columnDefs[i].hasOwnProperty('hide') && columnDefs[i].hide);  //hide column if found hide in columnDefs

        columnsList +=
            '<li>' +
            // suppressHideColumn to prevent hiding the column
                '<input type="checkbox" ' + ((columnDefs[i].suppressHideColumn === true) ? 'disabled="disabled"' : '') + 'class="menu-checkbox" id="' + id + '_' + columnDefs[i].field + '" onclick="onDataGridMenuCheckboxChange(\'' + id + '\', this);" ' + (checked ? 'checked' : '') + '>' +
                    '<span class="menu-text">' +
                        columnDefs[i].headerName +
                    '</span>' +
                '</input>' +
            '</li>';
    }

    // other stuff
    var controlPanelTemplate =
        '<div id="' + gridId + '-toolbar" class="row container-fluid toolbar-container">' +
            '<div class="grid-container">';
    if (gridOptionsList[gridId].pagination) {
        controlPanelTemplate +=
                '<p class="pull-left ag-pagination ' + (gridOptionsList[gridId].pagination ? '' : 'page-list-disabled') + '" style="margin-bottom: 0px; margin-top: 7px;">' +
                    '<span style="font-size: 15px; color: black;" class="' + (gridOptionsList[gridId].pagination ? '' : 'page-list-disabled') + '">Page Size: </span>' +
                    '<select id="' + id + '_pagination" onchange="onGridPageSizeChange(this.id, this.value,' + nEntries + ')" ' + (gridOptionsList[gridId].pagination ? '' : 'disabled class="page-list-disabled"') + '>' +
                        '<option value="10" ' + ((options.pageSize === 10) ? 'selected' : '') + '>10</option>' +
                        '<option value="25" ' + ((options.pageSize === 25) ? 'selected' : '') + '>25</option>' +
                        '<option value="50" ' + ((options.pageSize === 50) ? 'selected' : '') + '>50</option>' +
                        '<option value="100" ' + ((options.pageSize === 100) ? 'selected' : '') + '>100</option>' +
                        '<option value="All" ' + ((options.pageSize === nEntries) ? 'selected' : '') + '>All</option>' +
                    '</select>' +
                '</p>';
    }

    controlPanelTemplate +=
                '<div class="btn-group pull-right grid-group-btn">' +
                    '<button type="button" title="Menu" class="btn btn-questa btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        '<i class="fa fa-bars" aria-hidden="true"></i> </span>' +
                    '</button>' +
                    '<ul class="dropdown-menu ag-dropdown-menu">' +
                        '<h5 class="menu-header"> Export Data as CSV: </h5>' +
                        '<li>' +
                            '<button id="' + id + '_export" type="button" class="btn btn-questa btn-block menu-button" onclick="gridExportToCsv(this.id, true, true)">' +
                            '<span> Export all data in all columns</span>' +
                            '</button>' +
                        '</li>' +
                        '<li>' +
                            '<button id="' + id + '_export" type="button" class="btn btn-questa btn-block menu-button" onclick="gridExportToCsv(this.id, true, false)">' +
                            '<span> Export all data in shown columns only</span>' +
                            '</button>' +
                        '</li>' +
                        '<li>' +
                            '<button id="' + id + '_export" type="button" class="btn btn-questa btn-block menu-button" onclick="gridExportToCsv(this.id, false, true)">' +
                            '<span> Export selected data in all columns</span>' +
                            '</button>' +
                        '</li>' +
                        '<li>' +
                            '<button id="' + id + '_export" type="button" class="btn btn-questa btn-block menu-button" onclick="gridExportToCsv(this.id, false, false)">' +
                            '<span> Export selected data in shown columns only</span>' +
                            '</button>' +
                        '</li>' +
                        '<li role="separator" class="divider"></li>' +
                        '<h5 class="menu-header"> Columns: </h5>' +
                        columnsList +
                    '</ul>' +
                '</div>' +
            '</div>';

    if (isTree) {
        controlPanelTemplate +=
            '<div class="btn-group pull-right grid-group-btn" style="margin-right: 50px;">' +
                '<button type="button" title="Collapse All" class="btn btn-questa btn-default dropdown-toggle ' + (isTree ? '' : 'tree-control-disabled') + '" ' + (isTree ? '' : 'disabled') + ' id="' + id + '_collapseAll" onclick="gridExpandCollapseAll(this.id)">' +
                    '<img src="icons/collapse-all.png" alt="Collapse All" height="14" width="14">' +
                '</button>' +
            '</div>' +
            '<div class="btn-group pull-right grid-group-btn" style="margin-right: 8px;">' +
                '<button type="button" title="Expand All" class="btn btn-questa btn-default dropdown-toggle ' + (isTree ? '' : 'tree-control-disabled') + '" ' + (isTree ? '' : 'disabled') + ' id="' + id + '_expandAll" onclick="gridExpandCollapseAll(this.id)">' +
                    '<img src="icons/expand-all.png" alt="Expand All" height="14" width="14">' +
                '</button>' +
            '</div>';

    }

    controlPanelTemplate +=
            '<div class="btn-group pull-right grid-group-btn btn-questa progress-bar-loader" style="margin-right: 20px;padding-top:5px; display: none">' +
                '<div id="progress-bar-loading">' +
                    '<span> 100% </span>' +
                    '<div> </div>' +
                '</div>' +
            '</div>' +
            '<div class="btn-group pull-right grid-group-btn btn-questa progress-bar-loader" style="margin-right: 5px;padding-top:7px;font-size:small; display: none">' +
                '<i class="fa fa-spinner fa-pulse fa-fw"></i>' +
                '<span id="loading-data">' +
                    ' Loading data...' +
                '</span>' +
            '</div>' +
        '</div>';

    return controlPanelTemplate;
}

function onGridPageSizeChange(id, value, nEntries) {
    var gridId = id.split('_')[0];

    gridOptionsList[gridId].api.paginationSetPageSize(value === 'All' ? nEntries : Number(value));
    gridOptionsList[gridId].api.doLayout();
}

function onDataGridMenuCheckboxChange(id, cb) {
    var gridId = id;
    var dataGridColId = cb.id.split(/_(.+)/)[1];
    gridOptionsList[gridId].columnApi.setColumnVisible(dataGridColId, cb.checked);
    gridOptionsList[gridId].api.sizeColumnsToFit();
    gridEvents(gridOptionsList[gridId]);
}

function gridExportToCsv(id, allData, allColumns) {

    var gridId = id.split('_')[0];
    var params = {
        allColumns: allColumns,
        onlySelected: !allData,
        fileName: 'export.csv',
        processCellCallback: ExportFormattingFunction
    };

    gridOptionsList[gridId].api.exportDataAsCsv(params);
    event.stopPropagation();
}
//Export to Csv formatting function
function ExportFormattingFunction (params) {
    if ((params.column.getColId() === 'hit' || params.column.getColId() === 'miss' || params.column.getColId() === 'cp' || params.column.getColId() === 'exclude') && (isValueNa(params))) {
        return 'na';
    } else if (params.column.getColId() === 'item' && params.value) {
        return params.node.data.genblk + params.value;
    } else {
        return params.value;
    }
}
//Grid Expand and Collapse
function gridExpandCollapseAll(id) {
    var gridId = id.split('_')[0];

    if (id.split('_')[1] === 'collapseAll') {
        gridOptionsList[gridId].api.collapseAll();
    } else {
        gridOptionsList[gridId].api.expandAll();
    }
}

/*
 * panel
 */
var panelCounter = 0;

function createPanel(cssSelector, title, ratio) {
    panelCounter++;
    var progressBarClass;
    ratio = Number(ratio);
    if (!(typeof ratio === 'number' && (ratio >= 0 && ratio <= 100))) {
        ratio = undefined;
    }

    if (typeof ratio !== 'undefined') {
        progressBarClass = (ratio <= GLOBAL_JSON.lthres) ? 'danger' : (ratio > GLOBAL_JSON.lthres && ratio <= GLOBAL_JSON.hthres) ? 'warning' : 'success';
    } else {
        progressBarClass = 'undefined';
    }

    var panelId = 'panel' + panelCounter;
    var panelTemplate =
        '<div class="panel panel-default panel-default-undefined">' +
            '<div class="panel-heading panel-heading-' + progressBarClass + '" id="' + panelId + '_panelHead" role="tab">';


    if (typeof ratio !== 'undefined') {
        panelTemplate +=
                '<a role="button" data-toggle="collapse" href="#' + panelId + '_panelBody" aria-expanded="true" aria-controls="' + panelId + '_panelBody" style="text-decoration:none">' +
                    '<div class="progress progress-' + progressBarClass + '">' +
                        '<div class="progress-bar progress-bar-' + progressBarClass + '" role="panel" aria-valuemin="0" aria-valuenow="' + ratio + '" aria-valuemax="100" style="min-width: 1em; position: relative;width: ' + ratio + '%">' +
                            '<h5 style="float: left; margin-right: 1em; margin-left: 1em; font-weight: bold; color: black; margin-top: 1em;">' + title + ' ( <span class="ratio-' + progressBarClass + '">' + ratio + '% </span> ) </h5>' +
                        '</div>' +
                    '</div>' +
                '</a>';
    } else {
        panelTemplate +=
                '<a role="button" data-toggle="collapse" href="#' + panelId + '_panelBody" aria-expanded="true" aria-controls="' + panelId + '_panelBody" style="text-decoration:none">' +
                    '<h5 style="float: left; margin-right: 1em; margin-left: 1em; font-weight: bold; color: black; width:100%; margin-top: 1em;">' + title + '</h5>' +
                '</a>';
    }

    panelTemplate +=
            '</div>' +
            '<div id="' + panelId + '_panelBody" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="' + panelId + '_panelHead" aria-expanded="false">' +
                '<div class="panel-body">' +
                    '<div id="' + panelId + '"> </div>' +
                '</div>' +
            '</div>' +
        '</div>';

    $(cssSelector).append(panelTemplate);

    return panelId;
}

/*
 * Miscellaneous Functions
 */

//Adjusting Precision
function adjustPrecision(no) {
    var value = (Math.floor(no * Math.pow(10, GLOBAL_JSON.precision)) / (Math.pow(10, GLOBAL_JSON.precision)));
    return Number(parseFloat(value).toFixed(Number(GLOBAL_JSON.precision)));
}

//Appending Header Template
function headerTemplate(urlParams, instance) {
    $('.header img').css({
        'height': (GLOBAL_JSON.prod == 'ModelSim' ? 25 : 33),
        'margin-top': (GLOBAL_JSON.prod == 'ModelSim' ? -18 : -8),
        'margin-right': (GLOBAL_JSON.prod == 'ModelSim' ? 1 : -7)
    });

    if (instance) {
        // $('#page-header-container h4').html('<span style="color:#b0b3bc;"> ' + (urlParams.hasOwnProperty('type') && urlParams.type === 'du' ? 'Design Unit' : 'Instance') + ': </span>' + instance);
        $('#page-header-container h4').html('<span style="color:#b0b3bc;"> ' + (urlParams.hasOwnProperty('pr') || (urlParams.hasOwnProperty('type') && urlParams.type === 'du') ? 'Design Unit' : 'Instance') + ': </span>' + instance);

    }
}

// load json file
function loadJsonFile(fileName) {
    loadScript('files/' + fileName + '.js');
}

function loadScript(fileName) {
    var headId = document.getElementsByTagName('head')[0];
    var javaScriptElement = document.createElement('script');
    javaScriptElement.type = 'text/javascript';
    javaScriptElement.src =  fileName;
    javaScriptElement.async = false;
    headId.appendChild(javaScriptElement);
}

//Get source file Name
function getFileName(filename) {
    return (filename) ? filename.split('/').pop() : '';
}
//Get source file extension
function getFileExt(filename) {
    return (filename) ?  ('.' + filename.split('.').pop()) : '';
}

(function (console) {
    console.save = function (data, filename) {
        if (!data) {
            console.error('console.save: No data');
            return;
        }

        if (!filename) filename = 'console.json';

        if (typeof data === 'object') {
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], { type: 'text/json' });
        var e = document.createEvent('MouseEvents');
        var a = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
})(console);


if (!('path' in Event.prototype)) {
    Object.defineProperty(Event.prototype, 'path', {
        get: function() {
            var path = [];
            var currentElem = this.target;
            while (currentElem) {
                path.push(currentElem);
                currentElem = currentElem.parentElement;
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
                path.push(document);
            if (path.indexOf(window) === -1)
                path.push(window);
            return path;
        }
    });
}

// update progress-bar loader value. used in assertion,direcives and covergroups consolidated views
function updateProgressBarLoader(percent, progressBarId) {
    $(progressBarId + ' div').animate({ width: percent + '%' }, 500);
    $(progressBarId + ' span').html(percent.toFixed(2) + ' %');
    $(progressBarId + ' span').css('color', (Number(percent) < 60 ? 'black' : 'white'));
}

//Escaping Angle Brackets
function escapeAngleBrackets(string) {
    string = string.replace(/</g, '&lt;');
    string = string.replace(/>/g, '&gt;');

    return string;
}

//Custom comparator for sorting to exclude '-' from sorting
function gridSortingCustomComparator (valueA, valueB, nodeA, nodeB, isInverted) {
    if ((valueA === null && valueB === null) || (valueA === undefined && valueB === undefined)) {
        return 0;
    }
    var returnValA = (!isInverted) ? 1 : -1;
    var returnValB = (!isInverted) ? -1 : 1;

    if (valueA === null || valueA === undefined || valueA === -1) {
        return returnValA;
    }
    if (valueB === null || valueB === undefined || valueB === -1) {
        return returnValB;
    }

    return valueA === valueB ? 0 : (valueA > valueB) ? 1 : -1 ;
}

// Command Arguments Search
function checkCommandArgs(commandArgs, searchArg) {

    var result = false;
    commandArgs.forEach(function(element) {
        if (element.indexOf(searchArg) === 0) {
            result = true;
        }
    });

    return result;
}

function addFooter () {
    $('#page-body').append(
        '<div class=" row summary-footer">' +
            '<span style="padding-top: 7px;"> Report generated by ' +
                '<a href="' + GLOBAL_JSON.prodlink + '">'  + GLOBAL_JSON.prod + '</a>' +
                ' (ver: ' + GLOBAL_JSON.version + ') on (' + GLOBAL_JSON.time + ') with command line: </br> <span class="summary-cmd">' + GLOBAL_JSON.fullCommand + '</span>' +
            '</span>' +
        '</div>'
    );
}
