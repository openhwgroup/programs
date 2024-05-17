/* global $, window, document, getPageTemplate, createPanel, createDataGridInstance, , GLOBAL_JSON, parseUrl, loadJsonFile, updateUrlHash, hitsRenderer, headerTemplate, urlParams, pageName, queryUrlParamsByPrefix, escapeAngleBrackets */
/* exported createPanel, processCovergroupsData, processCoverpointsData, closeDetails, processBinsData, processCoverpointsMapData */

'use strict';

var startDate;
var columnDefs = [];
var ignoreIllegalColumnDefs = [];
var gbinsData = {};
var cvpData = {};
var cvpLength;
var cvps;
var pageUrl;
var binsPageSize;
var badBinsUrlParams;
var goodBinsUrlParams;
var isOpenedInCvgPage;
var reportType;
var goodBinsHasTimestamp = false;
var badBinsHasTimestamp = false;
var crossBinsCompactView;
var cvpMap = {};
var cvpUniqeList = [];
var goodBinsHasRHS = false;
var badBinsHasRHS = false;

var COVERGROUPS_IDs = {
    COVERGROUP_TYPE: 1,
    COVERGROUP_INSTANCE: 2,
    COVERPOINT: 4,
    CROSS: 8,
};

var BIN_TYPE = {
    NORMAL_BIN: 0,
    IGNORE_BIN: 1,
    ILLEGAL_BIN: 2,
    BAD_BIN: 3,
    DEFAULT_BIN: 4
};

var BIN_TYPE_NAME = {
    0: 'NORMAL_BIN',
    1: 'IGNORE_BIN',
    2: 'ILLEGAL_BIN',
    3: 'BAD_BIN',
    4: 'DEFAULT_BIN'
};

var PREFIX = {
    GOOD_BINS: 'bg',
    BAD_BINS: 'bb'
};

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDate = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';
    crossBinsCompactView = (GLOBAL_JSON.hasOwnProperty('crossBinsCompactView') && GLOBAL_JSON.crossBinsCompactView);
    // parse url
    urlParams = parseUrl();

    isOpenedInCvgPage = urlParams.dt === 'cp' || urlParams.dt === 'cc';

    if (isOpenedInCvgPage) {
        $('#page-header-container').remove();
        binsPageSize = 10;
        pageUrl = pageName.g;
    } else {
        binsPageSize = 25;
        pageUrl = pageName.gb;

        // update url hash
        updateUrlHash();
    }

    // load json files
    loadJsonFile('gbins' + urlParams.f);
});

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod +  reportType + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Summary');

    headerTemplate(urlParams, instance);
}

function processBinsData(g_data) {
    cvpLength = 0;
    reportType = (urlParams.pg && urlParams.pg == 1) ? ' Power Aware Bins' : ' Covergroups';
    gbinsData = g_data[urlParams.s];
    cvps = (gbinsData.head[1] == COVERGROUPS_IDs.CROSS) ?  gbinsData.cvps : undefined;

    topPageDescription(urlParams.pr || gbinsData.pr);

    // START Load multiple cvp files in case of crossBin and keep the state of the previously loaded Files
    var parsed = {};
    if (cvps) {
        cvps.forEach(function(element) {

            if (!parsed[element[2]] && element[2] !== -1) {
                loadJsonFile('cvp' + element[2]);
            } else {
                cvpLength++;
            }
            parsed[element[2]] = true;
        });
    } else {
        loadJsonFile('cvp' + gbinsData.head[2]);
    }
    // END Loading Files

}

function processCoverpointsMapData(g_data) {
    cvpLength++;
    cvpData = $.extend(cvpData, g_data );

    if (cvps === undefined || cvpLength === cvps.length ) {
        $('#page-body').append(getTemplate('desc'));
        $('table#desc-table').append(
            '<tr>' +
        ((isOpenedInCvgPage) ? '<th>' + ((gbinsData.head[1] == COVERGROUPS_IDs.CROSS) ? 'Selected Cross' : ((urlParams.pg && urlParams.pg == 1)  ? 'Selected Power Aware States' : 'Selected Coverpoint')) + '</th>' : '<th>' + ((gbinsData.head[1] == COVERGROUPS_IDs.CROSS) ? 'Cross' : (urlParams.pg && urlParams.pg == 1)  ? 'Power Aware State' : 'Coverpoint') + '</th>') +
            ((urlParams.hasOwnProperty('sf') && urlParams.hasOwnProperty('l')) ?
            '<td> <a onClick="redirectToSourceCode()"> ' + gbinsData.head[0] + '</a></td>':   // If source Exists
                 '<td>' + gbinsData.head[0]  + '</td>') + // Else
        '</tr>'
        );

        if (gbinsData.head[1] == COVERGROUPS_IDs.CROSS) {
            var cvpsCross = [];
            gbinsData.cvps.forEach(function(cvp) {
                cvpsCross.push(cvp[0]);
            });
            $('table#desc-table').append(
                '<tr>' +
            '<th> Crossed Coverpoints </th>' +
            '<td>' + cvpsCross.join(' , ')  + '</td>' +
            '</tr>'
            );
        }
        $('#page-body').append(getTemplate('container'));

        if (isOpenedInCvgPage) {
            document.body.style.background = 'transparent';
            $('#page-body').addClass('cvg-iframe');
            $('.card-desc').addClass('card-descI');
            $('#desc-table tr:lt(2)').remove();
        }


        // In case of covercross
        if (gbinsData.head[1] == COVERGROUPS_IDs.CROSS) {
            // This function will map cross cvps to Unique cvps in case of repeated CVP
            MapCvps(cvps);
        }

        var normalBinData = getData(BIN_TYPE.NORMAL_BIN);
        var ignoreIllegalBinData = getData(BIN_TYPE.IGNORE_BIN);
        initializeData(gbinsData.head[1], cvps);

        var fTab;
        if (normalBinData.length > 0) {
            $('.nav-tabs').append(getTemplate('tab', 'bin',  (urlParams.pg && urlParams.pg == 1) ? 'Power Aware Bins' : 'Auto, Default and User Defined Bins'));
            $('.tabs').append(getTemplate('tabCont', 'bin'));
            $('#bin').append(getTemplate('grid', 'bin'));
            $('#bin').append('</br>');

            goodBinsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.GOOD_BINS, {
                pageUrl: pageUrl,
                pageSize: binsPageSize
            });
            if (isOpenedInCvgPage) {
                goodBinsUrlParams.openedInFrame = true;
            }

            createDataGridInstance('binGrid', columnDefs, normalBinData, {
                isTree: false,
                urlParams: goodBinsUrlParams,
                callback: function() {
                    if (isOpenedInCvgPage) {
                        adjustIframeHeight();
                    }
                }
            }, false);
            fTab = 'bin';
        }

        if (ignoreIllegalBinData.length > 0) {
            $('.nav-tabs').append(getTemplate('tab', 'ignore-illegalBin', 'Ignore and Illegal Bins'));
            $('.tabs').append(getTemplate('tabCont', 'ignore-illegalBin'));
            $('#ignore-illegalBin').append(getTemplate('grid', 'ignore-illegalBin'));
            $('#ignore-illegalBin').append('</br>');

            badBinsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.BAD_BINS, {
                pageUrl: pageUrl,
                pageSize: binsPageSize
            });
            if (isOpenedInCvgPage) {
                badBinsUrlParams.openedInFrame = true;
            }

            createDataGridInstance('ignore-illegalBinGrid', ignoreIllegalColumnDefs, ignoreIllegalBinData, {
                isTree: false,
                urlParams: badBinsUrlParams,
                callback: function() {
                    if (isOpenedInCvgPage) {
                        adjustIframeHeight();
                    }
                }
            }, false );

        }
        $('.nav-tabs li:first').addClass('active');
        if (fTab === 'bin') {
            $('#' + fTab).addClass('active');
        } else {
            $('#ignore-illegalBin').addClass('active');
        }

        $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
            adjustIframeHeight();
        });

        if (urlParams.p) {
            var timeDiff = new Date() - startDate;
            console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
        }
    }
}
function redirectToSourceCode() {
    window.top.location.href = "/#sourceViewer.html?f="+ urlParams.sf + "&l="+ urlParams.l
}
function getData(binType) {
    var data = [];
    var j = (gbinsData.head[1] == COVERGROUPS_IDs.CROSS && crossBinsCompactView) ? 0 : 1;   // To parse the JSON Hits data in case of cross Bin count column present
    gbinsData.bins.forEach(function(element) {
        if (gbinsData.head[1] == COVERGROUPS_IDs.CROSS) {
            var cvpList = {}, i = 0;
            if (binType == BIN_TYPE.NORMAL_BIN) {
                if (isNormalBin(element.bin[0])) {
                    cvps.forEach(function(cvp, index) {
                        if ((cvp[1] == -1 && cvp[2] == -1) || (typeof element.bin[4 - j] === 'string')) {

                            if ((typeof element.bin[4 - j] === 'string')) {
                                cvpList[cvpUniqeList[index]] = element.bin[4 - j];
                                cvpList.colSpan = cvps.length;
                            } else {
                                cvpList[cvpUniqeList[index]] = element.bin[4 - j][1].replace('<', '&lt;').replace('>', '&gt;');
                            }

                        } else {
                            cvpList[cvpUniqeList[index]] = (typeof element.bin[4 - j][i] === 'string') ? element.bin[4 - j][i] : cvpData[cvp[1]][element.bin[4 - j][i]];
                        }

                        i++;
                    });
                }
            } else {
                if (!isNormalBin(element.bin[0])) {
                    cvpList.name = element.bin[4 - j];
                    cvpList.binType = BIN_TYPE_NAME[element.bin[0]];
                }
            }



            if (!$.isEmptyObject(cvpList)) {
                cvpList.bin = element.bin[0];
                // Exclusion Comment
                if (element.hasOwnProperty('exC')) {
                    cvpList.exc = element.exC;
                }
                data.push(cvpList);
            }
        } else {
            if (isNormalBin(element.bin[0])) {
                if (binType == BIN_TYPE.NORMAL_BIN) {
                    data.push({
                        'name': (typeof element.bin[3] === 'string') ? element.bin[3] : cvpData[urlParams.s][element.bin[3]],
                        'bin': element.bin[0],
                        'binCount': element.bin[2],
                        'exc': element.hasOwnProperty('exC') ?  element.exC : undefined // Exclusion Comment
                    });
                }
            } else {
                if (binType != BIN_TYPE.NORMAL_BIN) {
                    data.push({
                        'name': element.bin[3],
                        'binType': BIN_TYPE_NAME[element.bin[0]],
                        'bin': element.bin[0],
                        'exc': element.hasOwnProperty('exC') ?  element.exC : undefined // Exclusion Comment
                    });
                }
            }
        }

        if (data.length && (
            (binType == BIN_TYPE.NORMAL_BIN && (element.bin[0] == BIN_TYPE.NORMAL_BIN || element.bin[0] == BIN_TYPE.DEFAULT_BIN) ) ||
                (binType == BIN_TYPE.IGNORE_BIN && (element.bin[0] == BIN_TYPE.IGNORE_BIN || element.bin[0] == BIN_TYPE.ILLEGAL_BIN))
        ) ) {

            data[data.length - 1].binCount = element.bin[1];
            data[data.length - 1].atLeast = (binType == BIN_TYPE.NORMAL_BIN && element.bin[0] !== BIN_TYPE.DEFAULT_BIN) ? element.bin[2 - j] : '-';
            data[data.length - 1].hits = element.bin[3 - j];

            if (element.hasOwnProperty('ts')) {
                data[data.length - 1].tsTime = element.ts[0];
                data[data.length - 1].tsTest = element.ts[1];

                if (binType == BIN_TYPE.NORMAL_BIN) {
                    goodBinsHasTimestamp = true;
                } else {
                    badBinsHasTimestamp = true;
                }
            }

            if (element.hasOwnProperty('rhs')) {
                data[data.length - 1].rhs =  escapeAngleBrackets(element.rhs);

                if (binType == BIN_TYPE.NORMAL_BIN) {
                    goodBinsHasRHS = true;
                } else {
                    badBinsHasRHS = true;
                }
            }

            if (typeof element.bin[5 - j] === 'object') {
                data[data.length - 1].thitf = element.bin[5 - j][0];
                data[data.length - 1].thits = element.bin[5 - j][1];
            } else if (typeof element.bin[5] === 'string') {
                data[data.length - 1].c = element.bin[5 - j];
            }

            if (typeof element.bin[6 - j] !== 'undefined') {
                data[data.length - 1].c = element.bin[6 - j];
            }
        }
    });

    return data;
}

function adjustIframeHeight() {
    window.parent.postMessage({
        height: document.getElementById('page-body').scrollHeight + 20 + 'px',
        qTarget: 'cvg',
        qAction: 'updateBinsFrameHeight'
    }, '*');
}

function isNormalBin(bin) {
    return (bin == BIN_TYPE.NORMAL_BIN || bin == BIN_TYPE.DEFAULT_BIN);
}

function getTemplate(tempId, tabId, title) {
    var templates = {
        'desc':
            '<div class="card card-desc">' +
                '<table id="desc-table">' +
                    '<tr>' +
                        '<th>' + (urlParams.hasOwnProperty('type') && urlParams.type === 'du' ? 'Design Unit' : 'Instance') + '</th>' +
                        '<td>' +
                            gbinsData.pr +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<th> Covergroup </th>' +
                        '<td>' + gbinsData.cvg[0]  + '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>',

        'container':
            '<div class="tabs-containeri" style="margin-bottom: 0px !important;">' +
            ((isOpenedInCvgPage) ? '<ul class="nav nav-tabs nav-tabs2">' : '<ul class="nav nav-tabs">') +
                 '</ul>' +
                '<div class="tabs">' +
                '</br>' +
                '</div>' +
            '</div>',

        'tab':
            '<li data-toggle="tooltip" data-placement="top" title=' + tabId + '><a data-toggle="tab" href="#' + tabId + '" style="padding: 0;"><span style="position: relative;">  </span> <span style="font-size: 15px; padding-top: 1px; padding-bottom: 1px;">' + title + '</span></a></li>',

        'tabCont':
             '<div id="' + tabId + '" class="tab-pane fade in" style="padding: 0 5px 0;"> </div>',

        'grid':
            '<div id="' + tabId + 'Grid" style="width:100%;" class="ag-questa grid-container"></div>',
    };

    return templates[tempId];
}

function initializeData(binType, cvps) {
    if (binType == COVERGROUPS_IDs.CROSS) {
        for (var i = 0; i < cvps.length ; i++) {

            var colDef = {
                headerName: cvps[i][0],
                headerClass: 'justify-left',
                headerTooltip: cvps[i][0],
                field: cvpUniqeList[i],
                tooltipField: cvps[i][0],
                minWidth: 100,
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
                    'justify-center': function(params) {
                        return params.data.hasOwnProperty('colSpan');
                    }
                }
            };

            if (i == 0) {
                colDef.colSpan = function(params) {
                    if (params.data.hasOwnProperty('colSpan')) {
                        return params.data.colSpan;
                    } else {
                        return 1;
                    }
                };
            }

            columnDefs.push(colDef);
        }
        if (crossBinsCompactView) {
            columnDefs.push( {
                headerName: 'Bins',
                headerTooltip: 'Bins',
                field: 'binCount',
                minWidth: 120, width: 120, maxWidth: 120,
                filter: 'number',
                cellRenderer: function(params) {
                    return params.data.binCount > 0 ? params.data.binCount : '--';
                }
            });
        }

    } else {
        columnDefs = [
            {
                headerName: 'Bin Name',
                headerClass: 'justify-left',
                headerTooltip: 'Name',
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
                    'ignore-illegal-bin': function (params) {
                        return !isNormalBin(params.data.bin);
                    },
                    'exclusion': function (params) {
                        return (typeof params.data.hits === 'string');
                    },
                }
            }
        ];
    }

    columnDefs.push({
        headerName: 'At Least',
        headerTooltip: 'atLeast',
        field: 'atLeast',
        tooltipField: 'atLeast',
        minWidth: 120, width: 120, maxWidth: 120,
        filter: 'number',
        cellClassRules: {
            'ignore-illegal-bin': function (params) {
                return !isNormalBin(params.data.bin);
            },
            'exclusion': function (params) {
                return (typeof params.data.hits === 'string');
            },
        }
    });

    var commonColumnDefs = [
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellClassRules: {
                'ignore-illegal-bin': function (params) {
                    return !isNormalBin(params.data.bin);
                },
                'danger': function (params) {
                    return params.value == 0 && isNormalBin(params.data.bin);
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

    var timestampColumnDefs = [
        {
            headerName: 'Covered Sim Time',
            headerTooltip: 'tsTime',
            field: 'tsTime',
            tooltipField: 'tsTime',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellClassRules: {
                'ignore-illegal-bin': function (params) {
                    return !isNormalBin(params.data.bin);
                },
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return (typeof params.value !== 'undefined') ? params.value : '-';
            }
        },
        {
            headerName: 'Covered In Test',
            headerTooltip: 'tsTest',
            field: 'tsTest',
            tooltipField: 'tsTest',
            minWidth: 120, width: 120, maxWidth: 120,
            cellClassRules: {
                'ignore-illegal-bin': function (params) {
                    return !isNormalBin(params.data.bin);
                },
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return (typeof params.value !== 'undefined') ? params.value : '-';
            }
        }
    ];

    var rhsColumnDefs = [
        {
            headerName: 'RHS',
            headerTooltip: 'rhs',
            field: 'rhs',
            tooltipField: 'rhs',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellClassRules: {
                'ignore-illegal-bin': function (params) {
                    return !isNormalBin(params.data.bin);
                },
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return (typeof params.value !== 'undefined') ? params.value : '-';
            }
        }
    ];


    columnDefs.push.apply(columnDefs, commonColumnDefs);
    if (goodBinsHasRHS) {
        columnDefs.push.apply(columnDefs, rhsColumnDefs);
    }
    if (goodBinsHasTimestamp) {
        columnDefs.push.apply(columnDefs, timestampColumnDefs);
    }

    ignoreIllegalColumnDefs = [
        {
            headerName: 'Bin Name',
            headerClass: 'justify-left',
            headerTooltip: 'Name',
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
                'ignore-illegal-bin': function (params) {
                    return !isNormalBin(params.data.bin);
                }
            }
        }
    ];

    ignoreIllegalColumnDefs.push.apply(ignoreIllegalColumnDefs, commonColumnDefs);

    ignoreIllegalColumnDefs.push({
        headerName: 'Bin Type',
        headerTooltip: 'Bin Type',
        field: 'binType',
        tooltipField: 'binType',
        minWidth: 120, width: 120, maxWidth: 120,
        filter: 'text',
        cellClassRules: {
            'ignore-illegal-bin': function (params) {
                return !isNormalBin(params.data.bin);
            }
        }
    });

    if (badBinsHasRHS) {
        ignoreIllegalColumnDefs.push.apply(ignoreIllegalColumnDefs, rhsColumnDefs);
    }
    if (badBinsHasTimestamp) {
        ignoreIllegalColumnDefs.push.apply(ignoreIllegalColumnDefs, timestampColumnDefs);
    }
}


function MapCvps(cvps) {
    for (var  i = 0; i < cvps.length; i++) {
        cvpsMapper(cvps[i][0].replace(/_/g, '').toLowerCase());
    }
}

function cvpsMapper(name ) {
    if (cvpMap[name]) {
        var count =  cvpMap[name][count] + 1;
        var newName = name + '_' + count;
        cvpUniqeList.push(newName);
    } else {
        cvpUniqeList.push(name);
        cvpMap[name] = {};
        cvpMap[name][count] = 0;
    }

}


