/* global $, document, window, getPageTemplate, createDataGridInstance, GLOBAL_JSON, parseUrl, adjustPrecision, updateProgressBarLoader,loadJsonFile, updateUrlHash, createPanel, hitsRenderer, headerTemplate, urlParams, pageName, queryUrlParamsByPrefix, updateUrlParams, gridSelectNode, clearUrlParamsByPrefix, gridParams, isValueAboveThreshold, isValueBelowThreshold, isValueInRange, isValueUndefined, isValueExcluded */
/* exported processCovergroupsData, processCoverpointsData, closeDetails */

'use strict';

var startDateCvg;
var startDateCvgDetails;
var timeDiffCvg;
var timeDiffCvgDetails;

var cvgPageSize = 25;
var detailsPageSize = 10;
var dataObj = {};
var cDataObj = {};
var nodeParams;

var reportType;
var reportScope = '';
var isPA;
var isPACombined;
var isShowExcluded;
var isPAInstance;
var cvgColumnDefs;
var cvgSummaryColumnDefs;
var cvgCrossesColumnDefs;
var cvgPointsColumnDefs;

var consolidatedView;
var consolidatedViewType;
var totalJsonFilesCount = 1;
var jsonFilesCount = 1;
var isDataLoaded = false;
var isAllDataLoaded = false;
var firstrendering = true;

var gridOptions;
var gridOptionsDetails = {};

var cvgOpts = {};
var tree;
var isNoCvgBinEnabled = false;

var cvgUrlParams;
var coverpointsUrlParams;
var crossesUrlParams;
var contribution = {
    1: 'Does not contribute to coverage as weight is 0',
    2: 'Does not contribute to coverage as the item is empty',
    3: 'Does not contribute to coverage as the item is marked as ungradable',
};

var COVERGROUPS_IDs = {
    COVERGROUP_TYPE: 1,
    COVERGROUP_INSTANCE: 2,
    COVERPOINT: 4,
    CROSS: 8,
};

var COVERGROUPS_TYPEs = {
    1: 'cvgType',
    2: 'cvgInstance',
    4: 'coverpoint',
    8: 'cross'
};

var TYPE = {
    DU: 0,
    INSTANCE: 1,
    BOTH: 2
};

var PREFIX = {
    COVERGROUP: 'cg',
    COVERPOINT: 'cpp',
    CROSS: 'c',
    GOOD_BINS: 'bg',
    BAD_BINS: 'bb'
};
var cvgPageUrl = pageName.g;

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    $('[data-toggle="tooltip"]').tooltip();

    startDateCvg = new Date();

    noCvgBinsSwitchEnabled();
    // Adding another contribution reason Here as it depends on GLOBAL_JSON
    contribution['4'] ='Uncovered bins are not printed for this item as it has huge number of bins (exceeds ' + GLOBAL_JSON.maxNumberOfCrossBins +' bins)';

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';
    isPA = (GLOBAL_JSON.hasOwnProperty('pa') && GLOBAL_JSON.pa);
    isPACombined = (GLOBAL_JSON.hasOwnProperty('paCombined') && GLOBAL_JSON.paCombined );
    isShowExcluded = (GLOBAL_JSON.hasOwnProperty('showexcluded') && GLOBAL_JSON.showexcluded);
    // parse url
    urlParams = parseUrl();
    if ((consolidatedView = !urlParams.hasOwnProperty('s'))) {
        consolidatedViewType = (urlParams.type === 'inst') ? TYPE.INSTANCE : TYPE.DU;
        var fieldName = 'cvg_n_files';
        if (GLOBAL_JSON.hasOwnProperty(fieldName)) {
            totalJsonFilesCount = GLOBAL_JSON[fieldName];
        }
    }

    // update url hash
    updateUrlHash();

    cvgUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.COVERGROUP, {
        pageUrl: cvgPageUrl,
        pageSize: cvgPageSize
    });

    // initialize dataGrid data
    initializeData();

    window.addEventListener('message', receiveMessage, false);

    // load json files
    loadJsonFile('g' + (consolidatedView ? '1' : urlParams.f));
});

function noCvgBinsSwitchEnabled() {
    if (GLOBAL_JSON.hasOwnProperty('commandargs')) {
        GLOBAL_JSON.commandargs.forEach(function(cmd) {
            if (cmd === '-nocvgbin') {
                isNoCvgBinEnabled = true;
            }
        });
    }
}

function receiveMessage(event) {
    if (event.data.qTarget === 'cvg') {
        if (event.data.qAction === 'replaceState') {
            urlParams = updateUrlParams(event.data.urlParams, cvgPageUrl);
        } else if (event.data.qAction === 'updateBinsFrameHeight') {
            var height = event.data.height.substr(0, event.data.height.length - 2);
            height = parseInt(height) + 50;
            $('#cvgBins').height(height);
        }
    }
}

function processCovergroupsData(g_data) {
    var instanceName;
    var rowData = [];

    if (consolidatedView) {
        $.extend(dataObj, g_data);

        isDataLoaded = (jsonFilesCount == 1);
        isAllDataLoaded = ( totalJsonFilesCount == 1 || jsonFilesCount == totalJsonFilesCount);

        if (jsonFilesCount < totalJsonFilesCount) {
            loadJsonFile('g' + (++jsonFilesCount));
        }

        if (!(isDataLoaded && isAllDataLoaded)) {
            updateProgressBarLoader((jsonFilesCount / totalJsonFilesCount * 100), '#progress-bar-loading');
        }
    } else {
        dataObj[urlParams.s] = g_data[Number(urlParams.s)] || g_data[Number(urlParams.oneInst)];
        if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
            if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
                $.merge(dataObj[urlParams.s].cvgs, g_data[urlParams.s + '_sub'].cvgs);
            }
        }
        instanceName = (urlParams.hasOwnProperty('type') && urlParams.hasOwnProperty('pr') && urlParams.type === 'du') ? urlParams.pr :  dataObj[urlParams.s].pr;
        isDataLoaded = true;
    }

    if (isDataLoaded) {

        if (urlParams.hasOwnProperty('pg') && urlParams.pg == 1) {
            reportType = ' Power Aware';
            reportScope = ' Instance';
            var newUrlParams = {};
            newUrlParams['ty'] = 4;
            isPAInstance = true;
            urlParams = updateUrlParams(newUrlParams, cvgPageUrl);
        } else {
            reportType = ' Covergroups';
        }

        topPageDescription(instanceName);

        $('#page-body').append(getTemplate('cvg'));
        var panelBodyId = createPanel('#cvgPanel', reportType + reportScope + ' Coverage', urlParams.cp);
        $('#' + panelBodyId).append('<div id="cvgGrid" style="width:100%;" class="ag-questa grid-container"></div>');
        rowData = getData(dataObj);
        initializeData('cvg', cvgOpts);
        gridOptions = createDataGridInstance('cvgGrid', cvgColumnDefs, rowData, {
            isTree: tree,
            urlParams: cvgUrlParams,
            rowSelection: 'single',
            callback: function(firstNodeIndex) {
                var rowId;
                if (urlParams.hasOwnProperty(PREFIX.COVERGROUP + '_filter')) {
                    var selectItem = urlParams[PREFIX.COVERGROUP + '_filter'].split(',').pop();
                    var lastRowIndex = gridOptions.api.getDisplayedRowCount() - 1;
                    var rowIndex = 0;
                    while (rowIndex <= lastRowIndex) {
                        var node = gridOptions.api.getDisplayedRowAtIndex(rowIndex);
                        if(node.data.name === selectItem) {
                            rowId = node.id;
                            break;
                        }
                        rowIndex ++;
                    }
                }
                if(rowId === undefined ) {
                    rowId = urlParams.hasOwnProperty(PREFIX.COVERGROUP) ? (urlParams.hasOwnProperty(PREFIX.COVERGROUP + '_c') ? urlParams[PREFIX.COVERGROUP + '_c'] : urlParams[PREFIX.COVERGROUP]) : firstNodeIndex;
                }
                $('a[name="' + rowId + '"]')[0].click();
                gridSelectNode(gridOptions, rowId);
            }
        }, false);


        if (consolidatedView && !isAllDataLoaded) {
            $('.progress-bar-loader').css('display', 'initial');
            updateProgressBarLoader((jsonFilesCount / totalJsonFilesCount * 100), '#progress-bar-loading');
        }
    }

    if (consolidatedView && isAllDataLoaded && (totalJsonFilesCount != 1)) {
        gridOptions.api.setRowData(getData(dataObj));
        $('.progress-bar-loader').css('display', 'none');
    }

    if (urlParams.p) {
        timeDiffCvg = new Date() - startDateCvg;
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod +  reportType + reportScope + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getData(dataObj) {
    var data = [];
    var children = [];
    for (var key in dataObj) {
        //chech the Key && Extra condition for the viewcov mode to remove the istance data in case of navigation by DU
        if (dataObj.hasOwnProperty(key) && !( dataObj[key].ty == 2 && GLOBAL_JSON.command === 'coverage' && urlParams.type === 'du')) {
            var element = dataObj[key];
            if (!consolidatedView || (consolidatedView && (element.ty == consolidatedViewType || element.ty == TYPE.BOTH || element.ty == 4))) {
                if (element.hasOwnProperty('cvgs')) {
                    var cvgTypes = element.cvgs.filter(function (e) {
                        return ( (!(urlParams.pg && urlParams.pg ==1 ) && e.h[1] === COVERGROUPS_IDs.COVERGROUP_TYPE) || // Covergroup
                                ( (urlParams.pg && urlParams.pg ==1 ) && e.h[1] === COVERGROUPS_IDs.COVERGROUP_INSTANCE  &&  element.hasOwnProperty('ty') && element.ty == 4)
                        );
                    }); // Covergroup Instance in case of PA Report
                    cvgTypes.forEach(function(type) {

                        var extraData = {
                            type: element.ty,
                            consolidatedViewType: consolidatedViewType,
                            pr: element.pr,
                            dun: element.dun,
                            covType: 'cvg',
                            parentName: type.h[0]
                        };

                        extraData.dataType = COVERGROUPS_IDs.COVERGROUP_TYPE;
                        data.push(constructDataObj(type, extraData));
                        children = [];

                        var cvgInstances = element.cvgs.filter(function (e) { return e.h[4] === type.h[3]; });
                        cvgInstances.forEach(function(instance) {
                            extraData.dataType = COVERGROUPS_IDs.COVERGROUP_INSTANCE;
                            children.push(constructDataObj(instance, extraData));
                        });

                        if (children.length > 0) {
                            data[data.length - 1].group = true;
                            data[data.length - 1].children = children;
                            tree = true;
                        }
                    });
                }
            }
        }
    }

    return data;
}


function constructDataObj(cvg, extraData) {

    var obj = {
        name: cvg.h[1] === 1  && urlParams.hasOwnProperty('type') && urlParams.type === 'du' ? ( getCovergroupDUName(cvg.h[0], cvg.h[1], extraData)) :  (extraData && extraData.parentName != cvg.h[0] ? (extraData.parentName + '/' + cvg.h[0]) : cvg.h[0]),
        h: cvg.h,
        type: cvg.h[1],
        cf: cvg.h[2],
        pr: parent,
        detailsId: cvg.h[3],
        bins: cvg.cov[0],
        hits: cvg.cov[1],
        misses: cvg.cov[0] - cvg.cov[1],
        hitPercentage: (cvg.cov[0] == 0) ? 100 : adjustPrecision(cvg.cov[1] / cvg.cov[0] * 100),
        exclude: isShowExcluded? cvg.cov[3] : -1,
        coverage: cvg.cov[2],
        goal: cvg.opts.goal,
        goalp: (cvg.cov[2] > cvg.opts.goal) ? '100' : adjustPrecision((cvg.cov[2] / cvg.opts.goal) * 100),
        opts: cvg.opts,
        c: isShowExcluded? cvg.cov[4] : cvg.cov[3],  //Exclusion Comment if exist
        sc: cvg.sc // Source if exists
    };

    if (extraData && extraData.parentName != cvg.h[0]) {
        obj['childName'] = cvg.h[0];
    }

    if (extraData && cvg.h.length == 6) {
        obj.contribution = true;
    } else if (!extraData && cvg.h.length == 5) {
        obj.contribution = true;
    }
    //delete cvg.opts.goal;

    for (var opt in cvg.opts) {
        if (opt !== 'goal') {
            if (cvg.opts.hasOwnProperty(opt)) {
                obj[opt.replace(/_/g, '')] = cvg.opts[opt];
                cvgOpts[opt] = cvg.opts[opt];
            }
        }
    }

    if (cvg.hasOwnProperty('cvps')) {
        obj.cvps = cvg.cvps;
    }

    return obj;
}

function getCovergroupDUName(Name, type, extraData) {

    var pr = extraData.pr.replace('::', '/');
    var duName = extraData.dun ? Name.replace(pr, extraData.dun) : Name;

    if (duName.indexOf('::') === -1 && type === 1 ) {   // replace the first / to :: in case of covergroup type
        duName = duName.replace('/', '::');
    }
    return duName;

}

function constructSummaryData(cvgData, hasCoverpoints, hasCrosses) {
    var data = [];

    // check if no coverpoints exits
    if (hasCoverpoints) {
        data.push({
            name: (urlParams.pg && urlParams.pg == 1) ? 'Power Aware States' : 'Coverpoints',
            bins: cvgData[0],
            hits: cvgData[1],
            exclude: isShowExcluded? cvgData[4] : -1,
            hitPercentage: adjustPrecision(cvgData[1] / cvgData[0] * 100)
        });
    }

    // check if no crosses exits
    if (hasCrosses) {
        data.push({
            name: 'Crosses',
            bins: cvgData[2],
            hits: cvgData[3],
            exclude: isShowExcluded? cvgData[5] : -1,
            hitPercentage: adjustPrecision(cvgData[3] / cvgData[2] * 100)
        });
    }

    return data;
}

function closeDetails() {
    // $('#cvg').removeClass('col-xs-5 not-animated fadeInRightBig');
    // $('#cvg').addClass('col-xs-12 not-animated fadeInLeft');
    $('#details-container').remove();
}

function NameCellRenderer() {}
NameCellRenderer.prototype.init = function(params) {
    var cvgId;
    if (params.node.hasOwnProperty('parent')) {
        cvgId = PREFIX.COVERGROUP + '=' + params.node.parent.id + '&' + PREFIX.COVERGROUP + '_c=' + params.node.id;
    } else {
        cvgId = PREFIX.COVERGROUP + '=' + params.node.id;

    }

    var renderDetails  = this.renderDetails;
    var urlQueryParams = (typeof params.data.cf !== 'undefined' && !isNoCvgBinEnabled) ? ('?f=' +  params.data.cf + '&s=' + params.data.detailsId + '&cp=' + params.data.coverage + (urlParams.ty ? ('&ty=' + urlParams.ty) : '' ) + (urlParams.type ? ('&type=' + urlParams.type) : '' )) : undefined;
    var href = (params.data.type == COVERGROUPS_IDs.COVERPOINT || params.data.type == COVERGROUPS_IDs.CROSS) ? ((typeof urlQueryParams !== 'undefined') ? ('cvgBins.html' + urlQueryParams) : undefined) : (cvgPageUrl + cvgId + ((urlParams.f && urlParams.s ) ? ('&f=' + urlParams.f + '&s=' + urlParams.s) : '') + '&cp=' + urlParams.cp + (urlParams.ty ? ('&ty=' + urlParams.ty) : '') + (urlParams.type ? ('&type=' + urlParams.type) : '' ) );
    var cellValue = params.data.childName ? params.data.childName : params.value;
    var hrefBins = href;

    var cellHTMLTemplate =
        '<div style="display: inline;">' +
        ((typeof href === 'undefined') ? ('<span id="' + COVERGROUPS_TYPEs[params.data.type] + '_a' + params.node.id + '">' + cellValue + '</span>') : ('<a id="' + COVERGROUPS_TYPEs[params.data.type] + '_a' + params.node.id + '" href="' + href + '" name="' + params.node.id + '">' + cellValue + '</a>'));


    if ((params.data.type == COVERGROUPS_IDs.COVERPOINT || params.data.type == COVERGROUPS_IDs.CROSS) && params.data.h.length == 5) {
        cellHTMLTemplate +=
        ' <a href="#" data-toggle="tooltip" class="contrib" title="' + contribution[params.data.h[4]] + '">' +
            '<i class="fa fa-info-circle"></i>' +
        '</span>';
    } else if ((params.data.type == COVERGROUPS_IDs.COVERGROUP_TYPE || params.data.type == COVERGROUPS_IDs.COVERGROUP_INSTANCE) && params.data.h.length == 6) {
        cellHTMLTemplate +=
        ' <a href="#" data-toggle="tooltip" class="contrib" title="' + contribution[params.data.h[5]] + '">' +
        '<i class="fa fa-info-circle"></i>' +
        '</span>';
    }

    cellHTMLTemplate += '</div>';

    var cellTemplate = $(cellHTMLTemplate);

    var cellTemplateObj = $(cellTemplate);
    // $('[data-toggle="tooltip"]').tooltip();

    // handling details
    var details = cellTemplateObj[0].querySelector('a#' + COVERGROUPS_TYPEs[params.data.type] + '_a' + params.node.id);
    if (details) {
        details.addEventListener('click', function (e) {
            e.preventDefault();
            startDateCvgDetails = new Date();

            if (params.data.type === COVERGROUPS_IDs.COVERPOINT || params.data.type === COVERGROUPS_IDs.CROSS) {
                switch (e.which) {
                    case 1:
                        var newUrlParams = {};
                        newUrlParams[params.data.type === COVERGROUPS_IDs.CROSS ? PREFIX.CROSS : PREFIX.COVERPOINT] = params.node.id;

                        delete urlParams[params.data.type === COVERGROUPS_IDs.COVERPOINT ? PREFIX.CROSS : PREFIX.COVERPOINT];

                        var currentGridOptions = gridOptionsDetails[params.data.type === COVERGROUPS_IDs.COVERPOINT ? 'crosses' : 'coverPoints'];
                        if (typeof currentGridOptions !== 'undefined') {
                            currentGridOptions.api.deselectAll();
                        }

                        urlParams = updateUrlParams(newUrlParams, cvgPageUrl);

                        if (typeof href !== 'undefined') {

                            var binUrlParams = getBinsUrlParams();
                            href = hrefBins + '&dt=' + (params.data.type === COVERGROUPS_IDs.COVERPOINT ? 'cp' : 'cc') + (urlParams.pg ? ('&pg=' + urlParams.pg) : '');
                            if (params.data.sc) { // Adding source file data
                                href += '&sf=' + params.data.sc[0] + '&l=' +  params.data.sc[1];
                            }
                            $('#frameCont').remove();
                            $('.tabs').after('<div id="frameCont">  <h3 id="cvgBinsText" style="border-bottom: 1px solid #dadada !important;"> Bins </h3> <iframe id="cvgBins" width="100%"  style="margin-top: -15px;" src="' + href + (binUrlParams ? ('&' + binUrlParams) : '') + '" frameborder="0" allowfullscreen=""></iframe></div>');
                            $('html, body').animate({
                                scrollTop: ($('#frameCont').offset().top + 100)
                            }, 500);
                        }
                        break;
                    case 2:
                        if (typeof href !== 'undefined') {
                            if (!window.open(href, '_blank')) {
                                alert('Please allow popups to open page in a new tab');
                            }
                        }
                        break;
                }
            } else {
                gridSelectNode(params.node.gridOptionsWrapper.gridOptions, params.node.id);
                if (e.which == 1) {
                    // Remove old instances of summary, crosses and coverpoints tables
                    for (var gridOptions in gridOptionsDetails) {
                        if (gridOptionsDetails.hasOwnProperty(gridOptions)) {
                            if (typeof gridOptionsDetails[gridOptions] !== 'undefined') {
                                getCvgCommonUrlParams(urlParams, gridOptions == 'crosses' ? PREFIX.CROSS : PREFIX.COVERPOINT);
                                gridOptionsDetails[gridOptions].api.destroy();
                                gridOptionsDetails[gridOptions] = undefined;
                            }
                        }
                    }
                    if (isPAInstance && dataObj[urlParams.s]) {
                        var infoPageTemplate =
                            '<div class="card">' +
                            '<table>' +
                            '<tr id="paInstance-type">' +
                            '<th> Power Aware Type </th>' +
                            '<td>' + dataObj[urlParams.s]['cvgs'][0]['opts']['html_report_painfo_type'] + '</td>' +
                            '</tr>' +
                            '<tr id="paInstance-path">' +
                            '<th> Power Aware Path </th>' +
                            '<td>' + dataObj[urlParams.s]['cvgs'][0]['opts']['html_report_painfo_path'] +  '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>';
                    }


                    var headerTemplate = '<div class="pull-left panel-heading-title" style="font-size:18px"> <span class="table-cell-th" style="font-weight:bold;">' + reportType ;
                    if (e.currentTarget.id.indexOf('cvgType') !== -1) {
                        headerTemplate += ' type';
                    } else if (e.currentTarget.id.indexOf('cvgInstance') !== -1) {
                        headerTemplate += ' instance';
                    }
                    headerTemplate += '</span> &nbsp; <span class="table-cell-td" style="word-break: break-all;">';
                    if (params.data.sc) {   // Source file  Exists
                        headerTemplate += '<a href="sourceViewer.html?f='+ params.data.sc[0] + '&l='+ params.data.sc[1]+ '">' +  (e.currentTarget.innerText || e.currentTarget.innerHTML) + '</a>'
                    } else {
                        headerTemplate += (e.currentTarget.innerText || e.currentTarget.innerHTML)
                    }
                    headerTemplate +='</span> <br/> <br/>';
                    headerTemplate += '</div>';
                    $('.ag-row').removeClass('clicked-row');
                    $(e.path[5]).addClass('clicked-row');
                    $('#details-container').remove();
                    $('#cvg-container').append(getTemplate('details'));
                    $('#details-container .row').prepend( headerTemplate);
                    if (infoPageTemplate) {
                        $('#details-container .row').prepend( infoPageTemplate);
                    }

                    if ($('#cvg').hasClass('col-xs-12')) {
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

    if ( typeof params.node.parent !== 'undefined') {
        newUrlParams[PREFIX.COVERGROUP] = params.node.parent.id;
        newUrlParams[PREFIX.COVERGROUP + '_c'] = params.node.id;
    } else {
        newUrlParams[PREFIX.COVERGROUP] = params.node.id;
        if (urlParams.hasOwnProperty(PREFIX.COVERGROUP + '_c')) {
            delete urlParams[PREFIX.COVERGROUP + '_c'];
        }
    }
    urlParams = updateUrlParams(newUrlParams, cvgPageUrl);

    if (cDataObj[nodeParams.data.cf] == undefined) {
        loadJsonFile('c' + nodeParams.data.cf);
    } else {
        processCoverpointsData(cDataObj[nodeParams.data.cf]);
    }
};

function processCoverpointsData (g_data) {
    var data;
    var stack = [];
    var coverPointsData = [];
    var crossesData = [];

    cDataObj[nodeParams.data.cf] = g_data;
    data = cDataObj[nodeParams.data.cf];

    if (nodeParams.data.type === COVERGROUPS_IDs.COVERGROUP_TYPE || nodeParams.data.type === COVERGROUPS_IDs.COVERGROUP_INSTANCE) {
        var node = nodeParams.node;
        stack.push(node.data.detailsId);

        while (node.parent) {
            node = node.parent;
            stack.push(node.data.detailsId);
        }

        while (stack.length) {
            data = data[stack.pop()];
        }
    }

    // coverPoints
    cvgOpts = {};
    data.cvpc.forEach(function(element) {
        if (element.h[1] == COVERGROUPS_IDs.COVERPOINT) {
            coverPointsData.push(constructDataObj(element));
        }
    });
    var coverpointCvgOpts = cvgOpts;

    // crosses
    cvgOpts = {};
    data.cvpc.forEach(function(element) {
        if (element.h[1] == COVERGROUPS_IDs.CROSS) {
            crossesData.push(constructDataObj(element));
        }
    });
    var crossCvgOpts = cvgOpts;
    $('#summaryGrid').empty(); // remove any renderd summary grid
    $('#summaryGrid-toolbar').remove();// remove any renderd summary grid toolbar
    var summaryData = constructSummaryData(data.cvgdata, coverPointsData.length, crossesData.length);

    gridOptionsDetails.summary = createDataGridInstance('summaryGrid', cvgSummaryColumnDefs, summaryData, {
        isTree: false
    });

    $('.tabs-container').remove(); // remove any renderd tabs
    $('#details-container').append(getTemplate('container'));
    $('.nav-tabs li:first').addClass('active');
    $('#summary').addClass('active');
    $('#summary').append('</br>');

    var fTab;
    if (coverPointsData.length != 0) {
        initializeData('cvp', coverpointCvgOpts);
        $('.nav-tabs').append(getTemplate('tab', 'coverPoints', (urlParams.pg && urlParams.pg == 1) ? 'power aware states' : 'coverpoints'));
        $('.tabs').append(getTemplate('tabCont', 'coverPoints'));
        $('#coverPoints').append(getTemplate('grid', 'coverPoints'));
        $('#coverPoints').append('</br>');

        coverpointsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.COVERPOINT, {
            pageUrl: cvgPageUrl,
            pageSize: detailsPageSize
        });

        gridOptionsDetails.coverPoints = createDataGridInstance('coverPointsGrid', cvgPointsColumnDefs, coverPointsData, {
            isTree: false,
            urlParams: coverpointsUrlParams,
            rowSelection: 'single',
            callback: function() {
                if (urlParams.hasOwnProperty(PREFIX.COVERPOINT)) {
                    $('a#coverpoint_a' + urlParams[PREFIX.COVERPOINT] + '[name="' + urlParams[PREFIX.COVERPOINT] + '"]')[0].click();
                }
            }
        }, false , true);
        fTab = 'coverPoints';
    }

    if (crossesData.length != 0) {
        initializeData('cross', crossCvgOpts);
        $('.nav-tabs').append(getTemplate('tab', 'crosses', 'crosses'));
        $('.tabs').append(getTemplate('tabCont', 'crosses'));
        $('#crosses').append(getTemplate('grid', 'crosses'));
        $('#crosses').append('</br>');

        crossesUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.CROSS, {
            pageUrl: cvgPageUrl,
            pageSize: detailsPageSize
        });

        gridOptionsDetails.crosses = createDataGridInstance('crossesGrid', cvgCrossesColumnDefs, crossesData, {
            isTree: false,
            urlParams: crossesUrlParams,
            rowSelection: 'single',
            callback: function() {
                if (urlParams.hasOwnProperty(PREFIX.CROSS)) {
                    $('a#cross_a' + urlParams[PREFIX.CROSS] + '[name="' + urlParams[PREFIX.CROSS] + '"]')[0].click();
                }
            }
        }, false , true);

        if (urlParams.hasOwnProperty(PREFIX.CROSS)) {
            fTab = 'crosses';
        }
    }

    $('.nav-tabs li:nth(0)').addClass('active');
    if (fTab === 'coverPoints') {
        $('#' + fTab).addClass('active');
    } else {
        $('#crosses').addClass('active');
        if (coverPointsData.length != 0) {
            $('.nav-tabs li:nth(0)').removeClass('active');
            $('.nav-tabs li:nth(1)').addClass('active');
        }
    }

    if (urlParams.p) {
        timeDiffCvgDetails = new Date() - startDateCvgDetails;
        console.save(urlParams.p + ' ,Total Loading time ' + ((timeDiffCvg || 0) + timeDiffCvgDetails), 'z_console.txt');
    }
}

function getBinsUrlParams() {
    var params = '';

    var goodBinsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.GOOD_BINS, {
        options: {
            skipParsingSorting: true,
            skipParsingFiltering: true,
        }
    });

    var badBinsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.BAD_BINS, {
        options: {
            skipParsingSorting: true,
            skipParsingFiltering: true,
        }
    });

    gridParams.forEach(function(param) {
        if (goodBinsUrlParams && goodBinsUrlParams.hasOwnProperty(param) && goodBinsUrlParams[param] !== 'undefined' && goodBinsUrlParams[param] !== '') {
            params += PREFIX.GOOD_BINS + '_' + param + '=' + goodBinsUrlParams[param] + '&';
        }

        if (badBinsUrlParams && badBinsUrlParams.hasOwnProperty(param) && badBinsUrlParams[param] !== 'undefined' && badBinsUrlParams[param] !== '') {
            params += PREFIX.BAD_BINS + '_' + param + '=' + badBinsUrlParams[param] + '&';
        }
    });

    params = params.substr(0, params.length - 1);

    return params;
}

function getTemplate(tempId, tabId, title) {
    var templates = {
        'cvg':
            '<div id="cvg-container" class="row container-fluid" style="padding-top: 10px">' +
                '<div id="cvg" class="col-xs-12" style="height:100%; margin-top:-15px; padding:0px;">' +
                    '<div id="cvgPanel" style="width:100%;"></div>' +
                '</div>' +
            '</div>',
        'details':
            '<div id="details-container" class="col-xs-12" style="display:none; height:calc(100% - 10px);">' +
                '<div class="row container-fluid">' +
                    '<div class="pull-right" style="padding-bottom: 20px;">' +
                        '<a onClick="closeDetails()" id="close-details-pane"> <i class="fa fa-3x fa-window-close" aria-hidden="true" style="color:red;"></i> </a>' +
                    '</div>' +
                '</div>' +
                // '<h3 style="border-bottom: 1px solid #dadada !important;"> Summary </h3>' +
                // '</br>' +
                '<div id="summaryGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
                '<br /> '
        ,

        'container':
            '<div class="tabs-container" style="margin-bottom: 0px !important;">' +
        // '<h3 style="border-bottom: 1px solid #dadada !important;"> Coverpoints and Crosses </h3>' +
                // '</br>' +
                '<ul class="nav nav-tabs">' +
                 '</ul>' +
                '<div class="tabs">' +
                '</br>' +
                '</div>' +
            '</div>',

        'tab':
            '<li data-toggle="tooltip" data-placement="top" title=' + tabId + '><a data-toggle="tab" href="#' + tabId + '" style="padding: 0;"><span style="position: relative;">  </span> <span style="font-size: 15px; padding-top: 5px; padding-bottom: 5px;">' + title + '</span></a></li>',

        'tabCont':
             '<div id="' + tabId + '" class="tab-pane fade in" style="padding: 0 5px 0;"> </div>',

        'grid':
            '<div id="' + tabId + 'Grid" style="width:100%;" class="ag-questa grid-container"></div>',
    };

    return templates[tempId];
}

function initializeData(type, cvgOpts) {
    var commonColumnDefs = [
        {
            headerName: '',
            headerTooltip: '',
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
                innerRenderer: NameCellRenderer,
                suppressCount: true
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            }
        },
        {
            headerName: 'Bins',
            headerTooltip: 'Total Bins',
            field: 'bins',
            tooltipField: 'bins',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 180,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            }
        },
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 180,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf', scope: 'thits'});
            }
        },
    ];

    if (!(GLOBAL_JSON.hasOwnProperty('nomissing') && GLOBAL_JSON.nomissing)) {
        commonColumnDefs.push(
            {
                headerName: 'Misses',
                headerTooltip: 'Misses',
                field: 'misses',
                tooltipField: 'misses',
                filter: 'number',
                minWidth: 120, width: 120, maxWidth: 180,
                cellClassRules: {
                    'exclusion': function (params) {
                        return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                    },
                    'fg-disabled': function (params) {
                        return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                    }
                }
            });
    }

    if (isShowExcluded) {
        commonColumnDefs.push(
            {
                headerName: 'Excluded',
                headerTooltip: 'Excluded',
                field: 'exclude',
                tooltipField: 'exclude',
                filter: 'number',
                minWidth: 120, width: 120, maxWidth: 180,
                cellClassRules: {
                    'exclusion': function (params) {
                        return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                    },
                    'fg-disabled': function (params) {
                        return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                    }
                }
            });
    }

    commonColumnDefs.push(
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'coverage',
            tooltipField: 'coverage',
            filter: 'number',
            pinned: 'right',
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
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            }
        },
        {
            headerName: 'Goal',
            headerTooltip: 'Goal',
            field: 'goal',
            tooltipField: 'goal',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                return (typeof params.value !== 'undefined') ? params.value  : '-';
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            }
        },
        {
            headerName: 'Goal %',
            headerTooltip: 'Goal %',
            field: 'goalp',
            tooltipField: 'goalp',
            filter: 'number',
            hide: true,
            minWidth: 120, width: 120, maxWidth: 120,
            cellRenderer: function (params) {
                return (typeof params.value !== 'undefined') ? (((typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string')) ? 'Excluded' : (params.value + '%')) : '-';
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
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
                'fg-disabled': function (params) {
                    return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                }
            }
        }
    );

    cvgColumnDefs = $.extend(true, [], commonColumnDefs);
    cvgColumnDefs[0].headerName = (urlParams.pg && urlParams.pg == 1) ? 'Power Aware Covergroups' : 'Covergroups';
    cvgColumnDefs[0].headerTooltip = (urlParams.pg && urlParams.pg == 1) ? 'Power Aware Covergroups' : 'Covergroups';

    cvgCrossesColumnDefs =  $.extend(true, [], commonColumnDefs);
    cvgCrossesColumnDefs[0].headerName = 'Crosses';
    cvgCrossesColumnDefs[0].headerTooltip = 'Crosses';

    cvgPointsColumnDefs =  $.extend(true, [], commonColumnDefs);
    cvgPointsColumnDefs[0].headerName = (urlParams.pg && urlParams.pg == 1) ? 'Power Aware States' : 'Coverpoints';
    cvgPointsColumnDefs[0].headerTooltip = (urlParams.pg && urlParams.pg == 1) ? 'Power Aware States' : 'Coverpoints';

    cvgSummaryColumnDefs = [
        {
            headerName: 'Summary',
            headerTooltip: 'Name',
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            minWidth: 200, width: 200,
            suppressFilter: true,
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
            }
        },
        {
            headerName: 'Bins',
            headerTooltip: 'Total Bins',
            field: 'bins',
            tooltipField: 'bins',
            minWidth: 120, width: 120, maxWidth: 120,
            suppressFilter: true,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
            }
        },
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            minWidth: 120, width: 120, maxWidth: 120,
            suppressFilter: true,
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                },
            },
        }
    ];

   if (isShowExcluded) {
        cvgSummaryColumnDefs.push(
            {
                headerName: 'Excluded',
                headerTooltip: 'Excluded',
                field: 'exclude',
            	tooltipField: 'exclude',
            	minWidth: 120, width: 120, maxWidth: 120,
            	suppressFilter: true,
            	cellClassRules: {
                	'exclusion': function (params) {
                    	return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
               	 },
            },
         });
    }

    if (type === 'cvg') {
        for (var opt in cvgOpts) {
            if (cvgOpts.hasOwnProperty(opt)) {
                cvgColumnDefs.push({
                    headerName: opt,
                    headerTooltip: opt,
                    field: opt.replace(/_/g, ''),
                    tooltipField: opt.replace(/_/g, ''),
                    minWidth: 100, width: 100, maxWidth: 100,
                    filter: 'number',
                    hide: true,
                    cellRenderer: function (params) {
                        return (typeof params.value !== 'undefined') ? params.value : '-';
                    },
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                        },
                        'fg-disabled': function (params) {
                            return params.data.opts.weight == 0 || params.data.hasOwnProperty('contribution');
                        }
                    },
                });
            }
        }
    } else if (type === 'cvp') {
        for (var optCvp in cvgOpts) {
            if (cvgOpts.hasOwnProperty(optCvp)) {
                cvgPointsColumnDefs.push({
                    headerName: optCvp,
                    headerTooltip: optCvp,
                    field: optCvp.replace(/_/g, ''),
                    tooltipField: optCvp.replace(/_/g, ''),
                    minWidth: 100, width: 100, maxWidth: 100,
                    filter: 'number',
                    hide: true,
                    cellRenderer: function (params) {
                        return (typeof params.value !== 'undefined') ? params.value : '-';
                    },
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                        },
                        'fg-disabled': function (params) {
                            return params.data.opts.weight == 0 || params.data.hasOwnProperty('contribution');
                        }
                    },
                });
            }
        }
    } else if (type === 'cross') {
        for (var optCross in cvgOpts) {
            if (cvgOpts.hasOwnProperty(optCross)) {
                cvgCrossesColumnDefs.push({
                    headerName: optCross,
                    headerTooltip: optCross,
                    field: optCross.replace(/_/g, ''),
                    tooltipField: optCross.replace(/_/g, ''),
                    minWidth: 100, width: 100, maxWidth: 100,
                    filter: 'number',
                    hide: true,
                    cellRenderer: function (params) {
                        return (typeof params.value !== 'undefined') ? params.value : '-';
                    },
                    cellClassRules: {
                        'exclusion': function (params) {
                            return (typeof params.data.hits === 'string') || (typeof params.data.coverage === 'string');
                        },
                        'fg-disabled': function (params) {
                            return (params.data.opts.weight == 0 || (params.data.hasOwnProperty('contribution') && (params.data.h.length == 5 && params.data.h[4] !== 4  )));
                        }
                    },
                });
            }
        }
    }
}
