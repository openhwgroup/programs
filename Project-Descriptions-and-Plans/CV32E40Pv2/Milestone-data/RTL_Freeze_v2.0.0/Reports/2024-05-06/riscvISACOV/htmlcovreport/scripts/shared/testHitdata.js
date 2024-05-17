/* exported hitsRenderer, processTestsData, processTestHitData, thdModal */
/* global $, GLOBAL_JSON, loadJsonFile, createDataGridInstance, dataObj, STATEMENTS_SRC, isValueExcluded */
/*
    Testhit Data Routines
*/
var tests;
var testhitFiles = [];
var testhitInfo = {};

// hitsRenderer is reponsible for rendering hits by displaying testhitdata through a modal, displaying exclusion by showing 'Excluded' string also an icon if comment or reason exist or just displaying the hits value
function hitsRenderer(params, thd) {
    var exclusion = {
        hasComment: params.data.c != undefined || params.data.exc != undefined ,
        excludedStatus: isValueExcluded(params),
        hasReason: GLOBAL_JSON.exclReason[params.value]
    };

    //Testhit Data Renderer
    if (params.data[thd.fileNum] && params.data[thd.scope] !== undefined &&
        params.value != 0     // testhitdata should not be shown if hits == 0
    ) {
        return thdRenderer(params, thd);
    //Exclusion Renderer
    } else if (exclusion.excludedStatus || exclusion.hasReason) {
        return exclRenderer(params, exclusion);
    } else { //Normal hits renderer neither excluded hits nor test hit data only hits number
        return params.value;
    }
}
//Testhit Data Rendering
function thdRenderer(params, thd) {
    var template;

    template = ($('<a>' + params.value + '</a>'))[0];
    template.addEventListener('click', function() {
        showTestHitData({fileNum: params.data[thd.fileNum], scope: params.data[thd.scope], fieldName: ((thd.fieldName) ? params.data[thd.fieldName] : params.data.name) });
    });
    return template;
}

//Exclusion Renderer
function exclRenderer(params, exclusion) {
    var exclusionText = (params.value === 'E-hit') ? 'Excluded-Hit' : 'Excluded' ;
    var exclusionIcon = ((exclusion.hasComment && exclusion.excludedStatus) || exclusion.hasReason );
    var cellTemplate = $(
        '<div style="display: inline;">' +
            ('<span id="item_a' + params.rowIndex + '">' + exclusionText + '</span>') +
        '&nbsp;' +
        ( exclusionIcon ? //Adding icon in case of exclusion comment or exclusion reason
            ('<i class="fa fa-info-circle" aria-hidden="true" data-toggle="popover" title="Exclusion comment : '+ HTMLEncode((params.data.c ?  params.data.c : params.data.exc )) +'" style="color:#2361a0" id="item' + params.rowIndex + '"></i></div>') : ('</div>'))
    );

    var cellTemplateObj = $(cellTemplate);

    //Icon tooltip handler
    // if ((exclusion.hasComment && exclusion.excludedStatus) || exclusion.hasReason) {
    //     var toolTip = cellTemplateObj[0].querySelector('#item' + params.rowIndex);
    //     toolTip.addEventListener('click', function (e) {
    //         $('#hoverTableH').remove();
    //         var hoverTableTemplate =
    //                 '<div class="wellEx" id="hoverTableH" style="position: relative; min-width: 180px; max-width: 300px;width:190px;">' +
    //                 '<table class="table table-striped table-bordered table-hover table-condensed tableEx-popover">' ;
    //         //Incase of exclusion comment
    //         if ((exclusion.hasComment && exclusion.excludedStatus)) {
    //             hoverTableTemplate += '<tr> <th class="th-popover"> Exclusion Comment </th> </tr>';
    //             hoverTableTemplate += '<tr> <td class="td-popover">' + (params.data.c ?  params.data.c : params.data.exc ) + '</td> </tr>';
    //         }
    //         //Incase of exclusion reason
    //         if (GLOBAL_JSON.exclReason[params.value] ) {
    //             hoverTableTemplate += '<tr> <th class="th-popover"> Exclusion Reason </th> </tr>';
    //             hoverTableTemplate += '<tr> <td class="td-popover">' + GLOBAL_JSON.exclReason[params.value] + '</td> </tr>';
    //         }

    //         hoverTableTemplate +=
    //             '</table>';
    //         //Adjusting hoverTable position
    //         $('#page-body').append(hoverTableTemplate);
    //         $('#hoverTableH').css({
    //             position: 'fixed',
    //             top: e.clientY - ($('.wellEx').outerHeight() / 2) + 4,
    //             left: e.clientX + 10,
    //             display: 'block !important'
    //         });
    //     });

    //     toolTip.addEventListener('mouseleave', function () {
    //         $('#hoverTableH').hide();
    //     });
    // }

    return cellTemplateObj[0];
}
//Setting file number, scope, name.
function showTestHitData(thd) {
    testhitInfo = {
        fileNum: thd.fileNum,
        scope: thd.scope,
        fieldName: thd.fieldName
    };

    loadTests();
}
//Load Tests' json if it's not loaded
function loadTests () {
    if ( typeof tests === 'undefined') {
        loadJsonFile('tests');
    } else {
        loadTesthitData();
    }
}

function processTestsData(g_data) {
    tests = g_data;
    loadTesthitData();
}

function loadTesthitData() {
    if ( typeof testhitFiles[testhitInfo.fileNum] === 'undefined') {
        loadJsonFile('thit' + testhitInfo.fileNum);
    } else {
        constructTestHitDataModal();
    }
}

function processTestHitData(g_data) {
    testhitFiles[testhitInfo.fileNum] = g_data;
    constructTestHitDataModal();
}
//Constructing Testhit Data Modal
function constructTestHitDataModal() {
    var id = 'testhitdata-modal';
    $('#testhitdata').remove();
    $('body').append(getTesthitDataTemplate(id, testhitInfo.fieldName));
    constructTesthitData(id, testhitFiles[testhitInfo.fileNum][testhitInfo.scope]);
    $('#' + id).modal();
}

//Testhit Data Modal Template
function getTesthitDataTemplate(id, title) {
    var template;

    template =
        '<div id="testhitdata">' +
            '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="' + id + 'Title" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<span class="modal-title" id="' + id + 'Title">' + title + '</span>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="opacity:1">' +
                                '<span aria-hidden="true" style="color:red">&times;</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<div id="' + id + 'Grid" style="width:100%;" class="ag-questa grid-container"> </div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    return template;
}
//Constructing Testhit Data in source editor
function thdModal(e) {
    var exclId = e.path[1].attributes.excl;
    var scope = exclId.nodeValue.split(',').map(Number);
    var lineN = Number(e.path[1].attributes.line.nodeValue) + 1;
    var itemN = Number(e.path[1].attributes[3].nodeValue);
    var thData = dataObj.stmts[scope[0]].cov[scope[1]].i[scope[2]].th;
    if (thData) {
        showTestHitData({fileNum: thData[STATEMENTS_SRC.THIT_FILE_NUM], scope: thData[STATEMENTS_SRC.THIT_SCOPE], fieldName: ('Line: ' + lineN  + ' Item:' + itemN) });
    }
}

function constructTesthitData(id, dataArr) {
    var isPreserveCount = Array.isArray(dataArr[0]);

    var columnDefs = [
        {
            headerName: 'Testname',
            headerTooltip: 'Testname',
            headerClass: 'justify-left',
            field: 'name',
            sort: 'asc',
            minWidth: 300,
            cellStyle: {
                'text-align': 'left',
                'left': '4px'
            }
        }
    ];
    if (isPreserveCount) {
        columnDefs.push({
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120
        });
    }

    var rowData = [];
    // construct RowData
    dataArr.forEach(function(data) {
        var row = {};

        if (isPreserveCount) {
            row.name = tests[data[0]];
            row.hits = data[1];
        } else {
            row.name = tests[data];
        }

        rowData.push(row);
    });

    createDataGridInstance(id + 'Grid', columnDefs, rowData);
}

function HTMLEncode(str) {
    if(str){
    var i = str.length,
        aRet = [];

    while (i--) {
        var iC = str[i].charCodeAt();
        if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
            aRet[i] = '&#'+iC+';';
        } else {
            aRet[i] = str[i];
        }
    }
    return aRet.join('');
}
else
    return "";
}
