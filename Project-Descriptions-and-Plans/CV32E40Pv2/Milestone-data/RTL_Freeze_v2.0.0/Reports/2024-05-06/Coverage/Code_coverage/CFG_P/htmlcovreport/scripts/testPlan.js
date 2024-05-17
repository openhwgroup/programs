/* global $, document, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, loadJsonFile, updateUrlHash, headerTemplate, urlParams, queryUrlParamsByPrefix, gridSortingCustomComparator, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined */
/* exported processTpLinks */

'use strict';

var startDate;
var pageSize = 25;
var tpUrlParams;


var pageUrl = 'testPlan.html?';

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    if (GLOBAL_JSON.testPlanReport) { // If testplan report remove menus Icons  && Add Footer
        $('#page-header-container a').remove();
        addFooter();
    }

    startDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    // load json file
    loadJsonFile('tp');
});

function topPageDescription() {
    $('#page-header-text').text(GLOBAL_JSON.prod + ' Testplan Summary');

    headerTemplate(urlParams);
}

function processTpLinks(g_data) {
    topPageDescription();

    initializeTestPlanData(g_data.head, 'full-view');

    var panelBodyId = createPanel('#page-body', '<i class="fa fa-list-alt" aria-hidden="true" style="color: #2361a0;margin-right: 10px;"></i> Testplan Tracking');
    $('#' + panelBodyId).append('<div id="testplan" style="width:100%;" class="ag-questa grid-container"></div>');

    tpUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.TEST_PLAN, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    createDataGridInstance('testplan', testplanColumnDefs, getTestPlanRowData(g_data, 'full-view'), {
        paginationEnabled: false,
        urlParams: tpUrlParams,
    });

    if (urlParams.p) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

