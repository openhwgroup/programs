/* global $, document, getPageTemplate ,createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, updateUrlHash, loadJsonFile, headerTemplate, urlParams, queryUrlParamsByPrefix, isValueUndefined */
/* exported processTestRecordsData, closeDetails */
'use strict';

var startDateTr;
var startDateTrDetails;
var timeDiffTr;
var timeDiffTrDetails;

var testlistColumnDefs;
var trDetailsColumnDefs;

var pageSize = 25;

var gridOptionsDetails = {};
var nodeParams;

var trDataObj;
var dataObj;

var trUrlParams;

var TEST_RECORD_ITEM = {
    TESTNAME: 0,
    USER: 1,
    CPUTIME: 2,
    SIMTIME: 3,
    TIMESCALE: 4,
    STATUS: 5,
    TESTDETAILS: 6,
	FILENUMBER : 7,
    USERATTR: 13
};

var TEST_RECORD_STATUS = {
    OK: 0,
    WARNING: 1,
    ERROR: 2,
    FATAL: 3,
    MISSING: 4
};

var TEST_ATTR = {
    0: 'File Name',
    1: 'Date',
    2: 'Seed',
    3: 'VSIM Args',
    4: 'Test Args',
    5: 'Comment',
    6: 'Compulsory',
    7: 'Host Name',
    8: 'Host O/S',
    9: 'Log File',
    10: 'Memory Usage',
    11: 'Tool Version',
    12: 'WLF File'
};

var MONTH = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};

var DATE = {
    'YEAR_START': 0,
    'YEAR_END': 4,
    'MONTH_END': 6,
    'DAYS_END': 8,
    'HOURS_END': 10,
    'MINS_END': 12,
    'SECS_END': 14
};

var PREFIX = {
    TEST_RECORDS: 'tr'
};

var pageUrl = 'testRecords.html?';

/* main routine */
$(document).ready(function () {
    $('body').append(getPageTemplate());

    startDateTr = new Date();

    // update document title
    document.title = GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report';

    // parse url
    urlParams = parseUrl();

    // update url hash
    updateUrlHash();

    loadJsonFile('tr');
});

function topPageDescription() {
    $('#page-header-text').text(GLOBAL_JSON.prod + ' Test Records Summary');

    headerTemplate(urlParams);
}

function processTestRecordsData (g_data) {
    dataObj = g_data;

    topPageDescription();

    initializeData();

    $('#page-body').append(getTemplate('tr'));
    var panelBodyId = createPanel('#trPanel', '<i class="fa fa-flask" aria-hidden="true" style="color: #2361a0;margin-right: 10px;"></i> Test included in report');
    $('#' + panelBodyId).append('<div id="trGrid" style="width:100%;" class="ag-questa grid-container"></div>');

    trUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.TEST_RECORDS, {
        pageUrl: pageUrl,
        pageSize: pageSize
    });

    createDataGridInstance('trGrid', testlistColumnDefs, getRowData(dataObj), {
        isTree: false,
        urlParams: trUrlParams,
        callback: function(firstNodeIndex) {
            var rowId = urlParams.hasOwnProperty(PREFIX.TEST_RECORDS) ? urlParams[PREFIX.TEST_RECORDS] : firstNodeIndex;
            $('a[name="' + rowId + '"]')[0].click();
        }
    });

    if (urlParams.p) {
        timeDiffTr = new Date() - startDateTr;
    }
}

function getRowData(data) {
    var rowData = [];

    Object.keys(data).forEach(function(test) {
        data[test].forEach(function(item) {
            rowData.push({
                testname: item[TEST_RECORD_ITEM.TESTNAME],
                user: item[TEST_RECORD_ITEM.USER],
                cpuTime: (item[TEST_RECORD_ITEM.CPUTIME]),
                simTime: item[TEST_RECORD_ITEM.SIMTIME] + ' ' + item[TEST_RECORD_ITEM.TIMESCALE],
                status: (item[TEST_RECORD_ITEM.STATUS] === TEST_RECORD_STATUS.OK) ? 'Ok' : (item[TEST_RECORD_ITEM.STATUS] === TEST_RECORD_STATUS.WARNING) ? 'Warning' : (item[TEST_RECORD_ITEM.STATUS] === TEST_RECORD_STATUS.ERROR)  ? 'Error' : (item[TEST_RECORD_ITEM.STATUS] === TEST_RECORD_STATUS.FATAL) ? 'Fatal' : (item[TEST_RECORD_ITEM.STATUS] === TEST_RECORD_STATUS.MISSING) ? 'Missing' : 'Merge error',
                detailsId: item[TEST_RECORD_ITEM.TESTDETAILS],
				file : item[TEST_RECORD_ITEM.FILENUMBER]
            });
        });
    });
    return rowData;
}

function processTestdetailsData(data) {
    var item = data[nodeParams.data.detailsId];
    if (!item) {
        loadJsonFile('td' + nodeParams.data.file);
    } else {
        $('.external-script').remove(); // Remove external Scripts loaded by details
        trDataObj = data;
        var detailsRowData = [];
        var rowItems;

        Object.keys(TEST_ATTR).forEach(function (attr) {
            rowItems = {};

            rowItems.attribute = TEST_ATTR[attr];
            rowItems.value = item[attr];

            detailsRowData.push(rowItems);
        });

        if (item[TEST_RECORD_ITEM.USERATTR]) {
            item[TEST_RECORD_ITEM.USERATTR].forEach(function (usrAttr) {
                rowItems = {};
                rowItems.attribute = usrAttr[0];
                rowItems.value = "";
                rowItems.externalValue = usrAttr[1]
                if (usrAttr[1].indexOf('<a') == 0 && usrAttr[1].indexOf('</a>') == (usrAttr[1].length - 4) ) { // Only anchor link
                    rowItems.anchorLink = true;
                }
                detailsRowData.push(rowItems);
            });
        }

        gridOptionsDetails.trs = createDataGridInstance('trsGrid', trDetailsColumnDefs, detailsRowData, {
            pageSize: pageSize,
            isTree: false
        });
        $('#trsGrid-toolbar').remove();
        $('#trsGrid .ag-paging-panel').remove();
        $('#trsGrid .ag-pivot-off').height('25px');

        if (urlParams.p) {
            timeDiffTrDetails = new Date() - startDateTrDetails;
            console.save(urlParams.p + ' ,Total Loading time ' + ((timeDiffTr || 0) + timeDiffTrDetails), 'z_console.txt');
        }
    }
}

function initializeData() {
    testlistColumnDefs = [
        {
            headerName: 'Testname',
            headerTooltip: 'Testname',
            headerClass: 'justify-left',
            field: 'testname',
            tooltipField: 'testname',
            minWidth: 200, width: 200,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellRenderer: NameCellRenderer,
            cellStyle: {
                'text-align': 'left',
            }
        },
        {
            headerName: 'User',
            headerTooltip: 'User',
            field: 'user',
            tooltipField: 'user',
            minWidth: 120, width: 120, maxWidth: 300,
            filter: 'text',
            headerClass: 'justify-left',
            cellStyle: {
                'text-align': 'left',

            },
        },
        {
            headerName: 'CPU Time',
            headerTooltip: 'CPU Time',
            field: 'cpuTime',
            tooltipField: 'cpuTime',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'text',
            comparator: function (number1, number2) {
    		if (number1 === null && number2 === null) {
        		return 0;
    		}
   		if (number1 === null) {
    			 return -1;
  		 }
  		if (number2 === null) {
    			  return 1;
  		 }

 			return number1 - number2;
 		}
        },
        {
            headerName: 'SIM Time',
            headerTooltip: 'SIM Time',
            field: 'simTime',
            tooltipField: 'simTime',
            minWidth: 120, width: 120, maxWidth: 200,
            filter: 'text',
            comparator: function (number1, number2) {
    		if (number1 === null && number2 === null) {
        		return 0;
    		}
   		if (number1 === null) {
    			 return -1;
  		 }
  		if (number2 === null) {
    			  return 1;
  		 }
  		 var num1 = number1.substring(0 ,number1.length - 2);
  		 var num2 = number2.substring(0, number2.length - 2);
  		 return  num1 - num2 ;

 		}
        },
        {
            headerName: 'Status',
            headerTooltip: 'Status',
            field: 'status',
            tooltipField: 'status',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'text',
            cellClassRules: {
                'undefined': function (params) {
                    return isValueUndefined(params);
                },
                'danger': function (params) {
                    return (params.value === 'Error') || (params.value === 'Fatal') || (params.value === 'Merge error');
                },
                'warning': function (params) {
                    return (params.value === 'Warning') || (params.value === 'Missing');
                },
                'success': function (params) {
                    return params.value === 'Ok';
                }
            }
        }
    ];

    trDetailsColumnDefs = [
        {
            headerName: 'Attribute',
            headerTooltip: 'Attribute',
            headerClass: 'justify-left',
            field: 'attribute',
            tooltipField: 'attribute',
            suppressFilter: true,
            minWidth: 125, width: 125, maxWidth: 125,
            cellStyle: {
                'text-align': 'left',
                'background-color': '#ecf0f1'
            }
        },
        {
            headerName: 'Value',
            headerTooltip: 'Value',
            field: 'value',
            tooltipField: 'value',
            suppressFilter: true,
            minWidth: 120,
            width: 'auto',
            headerClass: 'justify-left',
            cellStyle: {
                'text-align': 'left',
                'height':'auto',
                'left': '125px'
            },
            cellRenderer: function (params) {
                if (params.data.attribute === 'Date') {
                    return params.value.substring(DATE.MONTH_END, DATE.DAYS_END) + ' ' + MONTH[Number(params.value.substring(DATE.YEAR_END, DATE.MONTH_END))] + ' ' + params.value.substring(DATE.YEAR_START, DATE.YEAR_END) + ' ' + params.value.substring(DATE.DAYS_END, DATE.HOURS_END) + ':' + params.value.substring(DATE.HOURS_END, DATE.MINS_END) + ':' + params.value.substring(DATE.MINS_END, DATE.SECS_END);
                } else if (params.data.attribute === 'Compulsory') {
                    return (params.value === 1) ? 'Yes' : 'No';
                } else if (params.data.attribute === 'Log File') {
                    return '<a target="_blank" href="file:///'+ params.value+'">'+  params.value.split('/').pop() +'</a>'
                } else if (params.data.anchorLink) {
                    var result = parseAnchorLink(params.data.externalValue);
                    var divExtrAttr = 'z="' + result[0] + '"';
                    return '<div ' + divExtrAttr +' ><div class="link" onclick="navigateToExternalLink(event)">' + result[1] + '</div></div>';
                } else if (params.data.externalValue) {
                    var div = document.createElement('div');
                    div.innerHTML =params.data.externalValue;
                    div.title = params.data.externalValue;
                    detectScripts(params.data.externalValue);
                    return div;
                }

               else {
                    return params.value;
                }
            },
        },
    ];
}
function detectScripts(target) {
    var index = target.indexOf('<script')
    if (index == -1) {
        return;
    } else {
        var tmp = (target.split("<script")[1]).split('>')[1];
        var scriptText = tmp.split("</script>")[0];
        scriptText = scriptText.substr(0, scriptText.length - 8);
        var remaingString = tmp.split("</script>")[1];

        var script = document.createElement('script');
        script.className = "external-script";
        script.text = scriptText;
        $("head")[0].appendChild(script);

        if (remaingString) {
           detectScripts(remaingString);
        }
    }
}

function parseAnchorLink(link) {
	var href= (link.split('href="')[1]).split('"')[0];
	var linkText = (link.split('>')[1]).split('<')[0];
	return [href, linkText];

}


function navigateToExternalLink(e) {
	window.top.location.href= "http://" + e.path[1].attributes[0].value;
}

function getTemplate(tempId) {
    var templates = {
        'tr':
            '<div id="tr-container" class="row container-fluid" style="padding-top: 10px">' +
                '<div id="tr" class="col-xs-12" style="height:100%">' +
                    '<div id="trPanel" style="width:100%; margin-top: -15px" class="ag-questa grid-container"></div>' +
                '</div>' +
            '</div>',
        'details':
            '<div id="details-container" class="col-xs-7" style="display:none">' +
                '<div class="row container-fluid">' +
                    '<div class="pull-right" style="padding-bottom: 20px;">' +
                        '<a onClick="closeDetails()"> <i class="fa fa-3x fa-window-close" aria-hidden="true" style="color:red;"></i> </a>' +
                    '</div>' +
                '</div>' +
                '<br />' +
                '<div id="trsGrid" style="width:100%;" class="ag-questa grid-container"></div>' +
                '<br />' +
            '</div>'
    };
    return templates[tempId];
}

function closeDetails() {
    $('#tr').removeClass('col-xs-5 non-animated fadeInRightBig');
    $('#tr').addClass('col-xs-12 non-animated fadeInLeft');
    $('#details-container').remove();
}


function NameCellRenderer() {}

NameCellRenderer.prototype.init = function(params) {
    var renderDetails  = this.renderDetails;

    var href = 'testRecords.html?selected=' + params.rowIndex ;
    var cellValue = params.value;

    var cellTemplate = $(
        '<div style="display: inline;">' +
        ((typeof href === 'undefined') ? ('<span id="testRecords_a' + params.rowIndex + '">' + cellValue + '</span>') : ('<a id="testRecords_a' + params.rowIndex + '" href="' + href + '" name="' + params.rowIndex + '">' + cellValue + '</a>')) +
        '</div>'
    );

    var cellTemplateObj = $(cellTemplate);

    // handling details
    var details = cellTemplateObj[0].querySelector('a#testRecords_a' + params.rowIndex);
    if (details) {
        details.addEventListener('click', function (e) {
            startDateTrDetails = new Date();
            // console.log(e)
            e.preventDefault();

            if (e.which == 1) {
                // Remove old instance of testdetails
                for (var gridOptions in gridOptionsDetails) {
                    if (gridOptionsDetails.hasOwnProperty(gridOptions)) {
                        if (typeof gridOptionsDetails[gridOptions] !== 'undefined') {
                            gridOptionsDetails[gridOptions].api.destroy();
                            gridOptionsDetails[gridOptions] = undefined;
                        }
                    }
                }

                var headerTemplate = '<div class="pull-left panel-heading-title" style="font-size:22px"> Test details';

                headerTemplate += ': <br/> &nbsp; &nbsp; <span style="font-size:20px; color: black; word-break: break-all;">' + cellValue + '</span> <br/> <br/>';
                headerTemplate += '</div>';
                $('.ag-row').removeClass('clicked-row');
                $(e.path[5]).addClass('clicked-row');
                $('#details-container').remove();
                $('#tr-container').append(getTemplate('details'));
                $('#details-container .row').prepend( headerTemplate);

                if ($('#tr').hasClass('col-xs-12')) {
                    $('#details-container').addClass('col-xs-7 non-animated fadeInDown');
                }

                if (!$('#tr').hasClass('col-xs-5')) {
                    $('#tr').removeClass('col-xs-12');
                    $('#tr').addClass('col-xs-5 non-animated fadeInRight');
                }

                $('#details-container').css({'display': ''});
                renderDetails(params);
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
    updateUrlHash({selected: params.rowIndex});

    var pageUrl = 'testRecords.html?';
    $.extend(urlParams, {selected: params.rowIndex});
    Object.keys(urlParams).forEach(function(param) {
        pageUrl += param + '=' + urlParams[param] + '&';
    });
    pageUrl = pageUrl.substr(0, pageUrl.length - 1);
    window.history.replaceState(pageUrl, '', pageUrl);

    if (trDataObj == undefined) {
        loadJsonFile('td1');
    } else {
        processTestdetailsData(trDataObj);
    }
};
