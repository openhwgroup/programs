/* global $, document, console, getPageTemplate, createDataGridInstance, createPanel, parseUrl, GLOBAL_JSON, loadJsonFile, createCodeMirrorInstance, updateUrlHash, addHitsGutters, addMarkers, getFileName, hitsRenderer, getFileExt, jumpToLine, headerTemplate, urlParams, pageName, queryUrlParamsByPrefix */
/* exported processScopesDbFile, processSummaryData, processAssertionsData, processDirectivesData, processStatementsData, processSrcData, processSrcNamesData, helpModal */

'use strict';

var startDate;
var dataObj = {};
var columnDefs;
var pageSize = 25;

var srcData = [];
var editor = [];
var gridInstances = [];
var sourceMapData;
var tabId;
var sourceNumber;
var stmtsUrlParams;

var latestScrollPosition = [];
var renderedLines = {};
var covId = 0;
var itemId = 0;
var uniqueId;

var SRC = {
    NAME: 'name',
    LANG: 'lang',
    CODE: 'src',
};

var STATEMENTS_SRC = {
    SRC_NO: 'n',
    NAME: 'f',
    MAX_ITEMS: 'mi',
    LINENO: 'l',
    ITEM_NO: 'l',
    ITEMS_INFO: 'i',
    ITEM_HITS: 'h',
    ITEM_INDEX: 'in',
    GEN_BLK: 'gi',
    CLASS_PARAM: 'cp',
    ITEM_START: 's',
    ITEM_LENGTH: 'l',
    ITEM_EXC_COMMENT: 'ec',
    THIT: 'th',
    THIT_FILE_NUM: 0,
    THIT_SCOPE: 1
};

var PREFIX = {
    STMTS: 'st'
};

var pageUrl = pageName.s;

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

    // load json file
    loadJsonFile('srcn');
});

function processSrcNamesData(g_data) {
    sourceMapData = g_data;
    loadJsonFile('s' + urlParams.f);
}

function processStatementsData(g_data) {
    var panelBodyId;
    var sourceFileFound = 0;

    dataObj = g_data[Number(urlParams.s)] || g_data[Number(urlParams.oneInst)];
    if (urlParams.hasOwnProperty('fsub') && urlParams.f == urlParams.fsub) {
        if (g_data.hasOwnProperty(urlParams.s + '_sub')) {
            $.merge(dataObj.stmts, g_data[urlParams.s + '_sub'].stmts);

            dataObj.stmts = dataObj.stmts.reduce(function(o, cur) {
                var occurs = o.reduce(function(n, item, i) {
                    return (item.f === cur.f) ? i : n;
                }, -1);
                if (occurs >= 0) {
                    o[occurs].cov = o[occurs].cov.concat(cur.cov);
                } else {
                    var obj = {f: cur.f, cov: cur.cov, mi: cur.mi};
                    o = o.concat([obj]);
                }
                return o;
            }, []);
        }
    }

    topPageDescription(urlParams.pr || dataObj.pr);

    dataObj.stmts.some(function(stmt) {
        return (sourceFileFound = stmt.hasOwnProperty(STATEMENTS_SRC.SRC_NO));
    });

    if (sourceFileFound) {
        processSrcEditorData();
    } else {
        // initialize dataGrid data
        initializeData();

        panelBodyId = createPanel('#page-body', 'Statements Coverage', urlParams.cp);
        $('#' + panelBodyId).append('<div id="' + panelBodyId + 'Grid" style="width:100%;" class="ag-questa grid-container"></div>');

        stmtsUrlParams = queryUrlParamsByPrefix(urlParams, PREFIX.STMTS, {
            pageUrl: pageUrl,
            pageSize: pageSize
        });

        createDataGridInstance(panelBodyId + 'Grid', columnDefs, getRowData(dataObj.stmts), {
            urlParams: stmtsUrlParams
        });

        printPerformanceNumbers();
    }
}

function topPageDescription(instance) {
    $('#page-header-text').text(GLOBAL_JSON.prod  + ' Statements ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    headerTemplate(urlParams, instance);
}

function getRowData(data) {
    var rowData = [];

    data.forEach(function(file) {
        var row = {
            name: sourceMapData[file[STATEMENTS_SRC.NAME]],
            group: true,
            children: []
        };

        file.cov.forEach(function(stmt) {
            stmt[STATEMENTS_SRC.ITEMS_INFO].forEach(function(item) {
                var currentRowData = {
                    line: stmt[STATEMENTS_SRC.LINENO],
                    fileName: row.name,
                    //item: (item.hasOwnProperty(STATEMENTS_SRC.GEN_BLK) ? (item[STATEMENTS_SRC.GEN_BLK] + ' ') : '') + item[STATEMENTS_SRC.ITEM_INDEX],
                    item: (item.hasOwnProperty(STATEMENTS_SRC.CLASS_PARAM) ? (item[STATEMENTS_SRC.CLASS_PARAM] + ' ') : '') + item[STATEMENTS_SRC.ITEM_INDEX],
                    genblk: (item.hasOwnProperty(STATEMENTS_SRC.GEN_BLK) ? (item[STATEMENTS_SRC.GEN_BLK] + ' ') : ''),
                    hits: item[STATEMENTS_SRC.ITEM_HITS],
                    thitf: (item.hasOwnProperty(STATEMENTS_SRC.THIT)) ? item[STATEMENTS_SRC.THIT][STATEMENTS_SRC.THIT_FILE_NUM] : undefined,
                    thits: (item.hasOwnProperty(STATEMENTS_SRC.THIT)) ? item[STATEMENTS_SRC.THIT][STATEMENTS_SRC.THIT_SCOPE] : undefined,
                    c: item[STATEMENTS_SRC.ITEM_EXC_COMMENT],
                    nameSt: sourceMapData[file[STATEMENTS_SRC.NAME]] + ' [L: ' + stmt[STATEMENTS_SRC.LINENO] + ', Item: ' + item[STATEMENTS_SRC.ITEM_INDEX] + ']'
                };

                row.children.push(currentRowData);
            });
        });

        rowData.push(row);
    });

    return rowData;
}

function processSrcEditorData() {

    $('#page-body').append(getSourceCodeTemplate());
    if (dataObj.stmts.length === 1) {
        tabId = 0;
        for (var h = 1; h <= (dataObj.stmts[tabId][STATEMENTS_SRC.MAX_ITEMS] >  GLOBAL_JSON.maxNumberOfGutters ? GLOBAL_JSON.maxNumberOfGutters :dataObj.stmts[tabId][STATEMENTS_SRC.MAX_ITEMS] ); h++) {
            $('.hits' + tabId + '').append('<div id="h' + h + '" class="hitsItems">Item' + h + '</div>');
        }
        $('.lineN' + tabId + '').css({'height': '46px', 'border': '1px solid #eee', 'color': '#3c3838', 'background': '#f1f1f1', 'margin-top': '10px', 'font-size': '15px', 'float': 'left', 'font-weight': 'bold'});
        $('.hits' + tabId + '').css({'height': '23px', 'border': '1px solid #eee', 'color': '#3c3838', 'background': '#f1f1f1', 'margin-top': '10px', 'margin-bottom': '10px', 'font-size': '15px', 'float': 'left', 'text-align': 'center'});
        var tabData = dataObj.stmts[tabId];
        sourceNumber = tabData[STATEMENTS_SRC.SRC_NO];
        if (srcData[sourceNumber] == undefined) {
            loadJsonFile('src' + sourceNumber);
        } else {
            constructSrcData(tabId, sourceNumber);
        }
    } else {
        $('#source-tabs li a').on('click', function (e) {
            e.preventDefault();
            covId = 0;
            var pane = $(this);
            var prevTabId = tabId;
            tabId = this.hash.replace('#editor-tab', '');
            var tabData = dataObj.stmts[tabId];

            if (tabData.hasOwnProperty(STATEMENTS_SRC.SRC_NO)) {
                sourceNumber = tabData[STATEMENTS_SRC.SRC_NO];
                $('.srcMenu' + prevTabId + '').css('display', 'none');
                if (editor[sourceNumber] == undefined) {

                    $('#tabs-body').append(
                        '<div class="srcMenu' + tabId + '"style="display: none; margin-bottom: -9px;">' +
                            '<div class="lineN' + tabId + '">Ln#</div>' +
                            '<div class="hits' + tabId + '" style="width:auto;"> <span style="font-weight: bold; ">Hits</span>' +
                            '<hr class="horizL">' +
                            '</div>' +
                            '<span class="file">' +
                                '<span style="font-weight: bold; "> Filename:  <br></span>' +
                            '<span class="file-name" title="' + sourceMapData[sourceNumber] + '">' +
                            sourceMapData[sourceNumber] +
                            '</span>' +
                            '</span>' +
                            '<a id="helpIcon" style="padding: 2px 0px 0px 0px;margin-right:0px;" title="help" class="help-logo" onclick="helpModal()">' +
                                 '<i class="fa fa-question-circle" aria-hidden="true" style="font-size: 20px;margin-top: -1px;"></i>' +
                            '</a>' +

                        '</div>' +
                        '<div id="editor-tab' + tabId + '" class="tab-pane fade ' + (tabId == 0 ? 'in active' : '') + '">' +
                            '<div id="editor' + tabId + '"></div>' +
                        '</div>'
                    );

                    for (var h = 1; h <= (dataObj.stmts[tabId][STATEMENTS_SRC.MAX_ITEMS] >  GLOBAL_JSON.maxNumberOfGutters ? GLOBAL_JSON.maxNumberOfGutters : dataObj.stmts[tabId][STATEMENTS_SRC.MAX_ITEMS]); h++) {
                        $('.hits' + tabId + '').append('<div id="h' + h + '" class="hitsItems">Item' + h + '</div>');
                    }
                    $('.lineN' + tabId + '').css({'height': '46px', 'border': '1px solid #eee', 'color': '#3c3838', 'background': '#f1f1f1', 'margin-top': '10px', 'font-size': '15px', 'float': 'left', 'font-weight': 'bold'});
                    $('.hits' + tabId + '').css({'height': '23px', 'border': '1px solid #eee', 'color': '#3c3838', 'background': '#f1f1f1', 'margin-top': '10px', 'margin-bottom': '10px', 'font-size': '15px', 'float': 'left', 'text-align': 'center'});

                    if (srcData[sourceNumber] == undefined) {
                        loadJsonFile('src' + sourceNumber);
                    } else {
                        constructSrcData(tabId, sourceNumber);
                    }
                }
                $('.srcMenu' + tabId + '').css('display', 'block');
            } else {
                if (gridInstances[tabId] == undefined) {
                    if (columnDefs == undefined) {
                        // initialize dataGrid data
                        initializeData();
                    }

                    $('#tabs-body').append(
                        '<div id="editor-tab' + tabId + '" class="tab-pane fade ' + (tabId == 0 ? 'in active' : '') + '" style="padding: 10px 0 15px 0">' +
                            '<div id="grid' + tabId + '" style="width:100%;" class="ag-questa grid-container"></div>' +
                        '</div>'
                    );

                    $('#editor-body' + tabId).append();
                    gridInstances[tabId] = createDataGridInstance('grid' + tabId, columnDefs, getRowData([tabData]), {
                        pageSize: pageSize
                    });
                }
            }

            pane.tab('show');
        });
    }


    $('#tab-anchor0').trigger('click');
}

function getSourceCodeTemplate() {
    var template;
    var tabHeaderTemplate = '';
    var file;
    var fileName;

    if (dataObj.stmts.length === 1) {
        //var gutterWidth = 60.5*dataObj.stmts[0][STATEMENTS_SRC.MAX_ITEMS];
        file = dataObj.stmts[0];
        fileName = (file.hasOwnProperty(STATEMENTS_SRC.SRC_NO)) ? sourceMapData[file[STATEMENTS_SRC.SRC_NO]] : sourceMapData[file[STATEMENTS_SRC.NAME]];

        template =
        '<div class="srcMenu0 "style="display: block; margin-bottom: -9px;">' +
                            '<div class="lineN0">Ln#</div>' +
                            '<div class="hits0" style="width:auto;"> <span style="font-weight: bold; ">Hits</span>' +
                            '<hr class="horizL">' +
                            '</div>' +
                            '<span class="file">' +
                                '<span style="font-weight: bold; "> Filename:  <br></span>' +
                            '<span class="file-name" title="' + fileName + '">' +
                            fileName +
                            '</span>' +
                            '</span>' +
        '<a id="helpIcon" style="padding: 2px 0px 0px 0px;margin-right:0px;" title="help" class="help-logo-1srcst" onclick="helpModal()">' +
             '<i class="fa fa-question-circle" aria-hidden="true" style="font-size: 20px;margin-top: -1px;"></i>' +
        '</a>' +
        '</div>' +
        '<div id="editor0"></div>' ;
    } else {
        for (var i = 0; i < dataObj.stmts.length; i++) {
            file = dataObj.stmts[i];
            fileName = (file.hasOwnProperty(STATEMENTS_SRC.SRC_NO)) ? sourceMapData[file[STATEMENTS_SRC.SRC_NO]] : sourceMapData[file[STATEMENTS_SRC.NAME]];

            tabHeaderTemplate +=
                '<li data-toggle="tooltip" data-placement="top" title="' + fileName + '" ' + (i == 0 ? 'class="active"' : '') + '>' +
                    '<a id="tab-anchor' + i + '" data-toggle="tab" href="#editor-tab' + i + '" style="padding: 0;" aria-controls="editor-tab' + i + '">' +
                        '<span style="position: relative;" >' +
                            '<i class="fa fa-file source-code-icon"> </i>' +
                            '<span class="source-code-text"> ' +
                                getFileExt(fileName) +
                            '</span>' +
                        '</span>' +
                        '<span style="font-size: 15px;word-break: break-all">' +
                            '&nbsp;&nbsp;' + getFileName(fileName) +
                        '</span>' +
                    '</a>' +
                '</li>';
        }
        template =
            '<div class="tabs-container" style="margin-bottom: 0px !important;">' +
                '<ul class="nav nav-tabs" id="source-tabs">' +
                    tabHeaderTemplate +
                '</ul>' +
                '<div id="tabs-body" class="tabs tab-content">' +
                '</div>' +
            '</div>';
    }
    return template;
}

function helpModal() {
    var id = 'help-modal';
    $('#help').remove();
    $('body').append(getHelpTemplate(id, 'Help'));
    constructHelpData(id);
    $('#' + id).modal();
}
function getHelpTemplate(id, title) {
    var template;
    template =
        '<div id="help">' +
            '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="' + id + 'Title" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header" style="padding-bottom: 6px;">' +
                            '<i class="fa fa-question-circle" aria-hidden="true" style="font-size: 20px;margin-top: -1px;color: #2361a0;"></i> <span class="modal-title" id="' + id + 'Title">' + title + '</span>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="opacity:1">' +
                                '<span aria-hidden="true" style="color:red">&times;</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<div class="tabs-container" style="margin-bottom: 0px !important;">' +
                            '<ul class="nav nav-tabs" id="source-tabs">' +
                            '<li data-toggle="tooltip" data-placement="top" title="Shortcuts" class="active" >' +
                            '<a id="tab-anchor0" data-toggle="tab" href="#' + id + 'Shortcuts" style="padding: 0;" aria-controls="' + id + 'Shortcuts">' +
                                '<span style="font-size: 15px;word-break: break-all">' +
                                    'Shortcuts' +
                                '</span>' +
                            '</a>' +
                            '</li>' +
                            '<li data-toggle="tooltip" data-placement="top" title="Icons" >' +
                            '<a id="tab-anchor1" data-toggle="tab" href="#' + id + 'icons" style="padding: 0;" aria-controls="' + id + 'icons">' +
                                '<span style="font-size: 15px;word-break: break-all">' +
                                'Icons' +
                                '</span>' +
                            '</a>' +
                            '</li>' +
                            '</ul>' +
                            '<div id="tabs-body" class="tabs tab-content" style=" padding-bottom: 0px;">' +
                                '<div id="' + id + 'Shortcuts" class="tab-pane fade in active" style="width:100%;"> </div>' +
                                '<div id="' + id + 'icons" class="tab-pane fade in" style="width:100%;"> </div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    return template;
}

function constructHelpData(id) {
    $('#' + id + 'Shortcuts').append(getHelpDataTemplate('shortcuts'));
    $('#' + id + 'icons').append(getHelpDataTemplate('icons'));
}
function getHelpDataTemplate(tempId) {
    var templates = {
        'shortcuts':
        '<h4 style="border-bottom: 1px solid #dadada !important; margin-top: 10px; margin-bottom: 10px;"> Search </h4>'  +
        '<dl class="shortcuts">' +
        '<dt class="command" id="command_find"><code><strong>find</strong></code><span class="keybinding">Ctrl-F (PC), Cmd-F (Mac)</span></dt>' +
        '<dt class="command" id="command_findNext"><code><strong>findNext</strong></code><span class="keybinding">Ctrl-G (PC), Cmd-G (Mac)</span></dt>' +
        '<dt class="command" id="command_findPrev"><code><strong>findPrev</strong></code><span class="keybinding">Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)</span></dt>' +
        '<br>' +
        '<span class="keybinding" style="font-weight: bold;">There are two modes of search: Search by string and Search Text with Regular Expressions.</span>' +
        '<br><br>' +
        '<span class="keybinding" style="font-weight: bold;">Regex Search Example:</span>' +
        '<br><br>' +
        '<dt class="command" id="command_findPrev"><code style="color: #3c763d;"><strong>/^.*\\b(reg|input|logic)\\b.*$/</strong></code><span class="keybinding">:  Finding Lines Containing reg or input or logic keywords</span></dt>' +
        '<h4 style="border-bottom: 1px solid #dadada !important; margin-top: 10px; margin-bottom: 10px;"> Navigation </h4>'  +
        '<dt class="command" id="command_selectAll"><code><strong>selectAll</strong></code><span class="keybinding">Ctrl-A (PC), Cmd-A (Mac)</span></dt>' +
        '<dd>Select the whole content of the editor.</dd>' +
        '<dt class="command" id="command_singleSelection"><code><strong>singleSelection</strong></code><span class="keybinding">Esc</span></dt>' +
        '<dd>When multiple selections are present, this deselects all but the primary selection.</dd>' +
        '<dt class="command" id="command_undoSelection"><code><strong>undoSelection</strong></code><span class="keybinding">Ctrl-U (PC), Cmd-U (Mac)</span></dt>' +
        '<dd>Undo the last change to the selection, or if there are no selection-only changes at the top of the history, undo the lastchange.</dd>' +
        '<dt class="command" id="command_redoSelection"><code><strong>redoSelection</strong></code><span class="keybinding">Alt-U (PC), Shift-Cmd-U (Mac)</span></dt>' +
        '<dd>Redo the last change to the selection, or the last text change if no selection changes remain.</dd>' +
        '<dt class="command" id="command_goDocStart"><code><strong>goDocStart</strong></code><span class="keybinding">Ctrl-Home (PC), Cmd-Up (Mac), Cmd-Home (Mac)</span></dt>' +
        '<dd>Move the cursor to the start of the document.</dd>' +
        '<dt class="command" id="command_goDocEnd"><code><strong>goDocEnd</strong></code><span class="keybinding">Ctrl-End (PC), Cmd-End (Mac), Cmd-Down (Mac)</span></dt>' +
        '<dd>Move the cursor to the end of the document.</dd>' +
        '<dt class="command" id="command_goPageUp"><code><strong>goPageUp</strong></code><span class="keybinding">PageUp, Shift-Ctrl-V (Mac)</span></dt>' +
        '<dd>Move the cursor up one screen, and scroll up by the same distance.</dd>' +
        '<dt class="command" id="command_goPageDown"><code><strong>goPageDown</strong></code><span class="keybinding">PageDown, Ctrl-V (Mac)</span></dt>' +
        '<dd>Move the cursor down one screen, and scroll down by the same distance.</dd>' +
      '</dl>',


        'icons':

        /*'<h3 style="border-bottom: 1px solid #dadada !important;"> Icons </h3>'  +*/
        '<table style="width:100%">' +

            '<tr>' +
                '<td><img src="icons/exclude.png" class="center-img" alt="E" width="18px" height="18px" style="float: left;margin-left: -3px;"></img></td>' +
                '<td style="font-weight: 600;">Excluded </td>' +
            '</tr>' +
            '<tr>' +
                '<td><img src="icons/echeck.png" class="center-img" alt="E" width="20px" height="20px" style=" float: left;"></img></td>' +
                '<td style="font-weight: 600;">Excluded and Hit</td>' +
            '</tr>' +
            '<tr>' +
                '<td><img src="icons/ecomment.png" class="center-img" alt="E" width="20px" height="20px" style=" float: left;"></img></td>' +
                '<td style="font-weight: 600;">Excluded with Comment</td>' +
            '</tr>' +
            '<tr>' +
                '<td><img src="icons/echeckcomment.png" class="center-img" alt="E" width="20px" height="20px" style=" float: left;"></img></td>' +
                '<td style="font-weight: 600;">Excluded and Hit with Comment</td>' +
            '</tr>' +
            '<tr>' +
                '<td><span class="fa fa-flask"" style=" float: left; font-size: 20px; margin-left: -4px;"></span><i id= "thdCheck" class="fa fa-check" style="position: absolute;margin-left: 3px;display: block;color: #11ef06;margin-top: 3px;font-size: 18px;z-index: 30;cursor: default !important;"></i></td>' +
                '<td style="font-weight: 600;">Test Hit Data</td>' +
            '</tr>' +
        '</table>'
    };

    return templates[tempId];
}
function processSrcData(g_data) {
    var srcNumber = sourceNumber;
    var tabIndex = tabId;

    srcData[srcNumber] = g_data;
    constructSrcData(tabIndex, srcNumber);
}

function constructSrcData(tabId, srcNumber) {
    var data = srcData[srcNumber];



    editor[srcNumber] = createCodeMirrorInstance('#editor' + tabId, tabId, dataObj.stmts[tabId][STATEMENTS_SRC.MAX_ITEMS], {
        mode: data[SRC.LANG],
        code: ''
    });

    editor[srcNumber].setSize(null, 'calc(100vh - 205px)');
    editor[srcNumber].getDoc().setValue(data[SRC.CODE]);
    editor[srcNumber].on('scroll', function() {
        var scrollPosition = editor[srcNumber].getViewport();
        if (!latestScrollPosition[srcNumber] ||  latestScrollPosition[srcNumber].from !== scrollPosition.from  && latestScrollPosition[srcNumber].to !== scrollPosition.to ) {
            latestScrollPosition[srcNumber] = scrollPosition;
            highlightViewPort(latestScrollPosition[srcNumber], srcNumber, tabId);
        }

    });


    var lineNWidth = $('.CodeMirror-gutter.CodeMirror-linenumbers').width();
    $('.lineN' + tabId + '').css({'width': lineNWidth});
    var gutterWidth = $('.CodeMirror-gutter.codemirror-gut1').width() * dataObj.stmts[0][STATEMENTS_SRC.MAX_ITEMS];
    var fileWidth = 'calc(100% - ' + gutterWidth + 'px - ' + lineNWidth  + 'px - 4px)';
    $('.file').css({'width': (fileWidth)});


    // jump to first statement in DU
    jumpToLine(editor[srcNumber], dataObj.stmts[tabId].cov[0][STATEMENTS_SRC.LINENO] - 1);

    // In case of small file and the first staement is in the beginging of the file we will trigger the scroll event manually
    var scrollPosition = editor[srcNumber].getViewport();
    if (scrollPosition.from === 0 ) {
        highlightViewPort({ from: 0, to: 50}, srcNumber, tabId);
    }
}


// highlightViewPort
function highlightViewPort(event, srcNumber, tabId) {

    var timeout = setTimeout(function () {
        clearTimeout(timeout);
        var lineNo;
        var itemN;
        var markers = [];

        dataObj.stmts[tabId].cov.forEach(function (cov) {
            itemId = 0;
            lineNo = cov[STATEMENTS_SRC.LINENO];
            if (!renderedLines[srcNumber]) {
                renderedLines[srcNumber] = {};
            }
            if (lineNo >= event.from && lineNo <= event.to && !renderedLines[srcNumber][lineNo]) {

                renderedLines[srcNumber][lineNo] = true;
                cov[STATEMENTS_SRC.ITEMS_INFO] = getItemInfo(cov[STATEMENTS_SRC.ITEMS_INFO]);
                cov[STATEMENTS_SRC.ITEMS_INFO].forEach(function (item) {
                    uniqueId = tabId + ',' + covId + ',' + itemId;
            itemN = item[STATEMENTS_SRC.ITEM_INDEX];
            if (itemN > GLOBAL_JSON.maxNumberOfGutters) {
                addHitsLastGutter(editor[srcNumber], lineNo - 1 , cov[STATEMENTS_SRC.ITEMS_INFO] );
            }
            else {
                addHitsGutters(editor[srcNumber], lineNo - 1, itemN, item[STATEMENTS_SRC.ITEM_HITS], uniqueId, item[STATEMENTS_SRC.ITEM_EXC_COMMENT], item[STATEMENTS_SRC.THIT] , null, null);
                addMarkers(editor[srcNumber], markers, lineNo - 1, item[STATEMENTS_SRC.ITEM_START], lineNo, (item[STATEMENTS_SRC.ITEM_START]) + (item[STATEMENTS_SRC.ITEM_LENGTH]), item[STATEMENTS_SRC.ITEM_LENGTH], 0);
            }
            itemN++;
            itemId++;
            });

                covId++;
            }
        });
    }, 100);
}

function getItemInfo(itemsInfo) {
    var newItemsInfo = [];
    var uniqueItemsFlags = {};

    itemsInfo.forEach(function(item) {
        if (!uniqueItemsFlags.hasOwnProperty(item[STATEMENTS_SRC.ITEM_INDEX])) {
            uniqueItemsFlags[item[STATEMENTS_SRC.ITEM_INDEX]] = true;
        }
    });

    var uniqueItems = Object.keys(uniqueItemsFlags);

    uniqueItems.forEach(function(item) {
        var filteredItems = itemsInfo.filter(function(obj) {
            return obj[STATEMENTS_SRC.ITEM_INDEX] === Number(item);
        });

        if (filteredItems && filteredItems.length > 0) {
            var newItem = {};
            newItem[STATEMENTS_SRC.ITEM_INDEX] = item;
            if (filteredItems[0].hasOwnProperty(STATEMENTS_SRC.ITEM_EXC_COMMENT)) {
                newItem[STATEMENTS_SRC.ITEM_EXC_COMMENT] = filteredItems[0][STATEMENTS_SRC.ITEM_EXC_COMMENT];
            }
            if (filteredItems[0].hasOwnProperty(STATEMENTS_SRC.THIT)) {
                newItem[STATEMENTS_SRC.THIT] = filteredItems[0][STATEMENTS_SRC.THIT];
            }

            if (filteredItems.length == 1 && !filteredItems[0].hasOwnProperty(STATEMENTS_SRC.GEN_BLK)) {
                newItem[STATEMENTS_SRC.ITEM_HITS] = filteredItems[0][STATEMENTS_SRC.ITEM_HITS];
            }else if (filteredItems.length == 1 && !filteredItems[0].hasOwnProperty(STATEMENTS_SRC.CLASS_PARAM)) {
                newItem[STATEMENTS_SRC.ITEM_HITS] = filteredItems[0][STATEMENTS_SRC.ITEM_HITS];
            }  else {
                newItem[STATEMENTS_SRC.ITEM_HITS] = [];

                Object.keys(filteredItems).forEach(function(filteredItem) {
                    newItem[STATEMENTS_SRC.ITEM_HITS].push({
                        'h': filteredItems[filteredItem][STATEMENTS_SRC.ITEM_HITS],
                        'gi': filteredItems[filteredItem][STATEMENTS_SRC.GEN_BLK],
                        'cp': filteredItems[filteredItem][STATEMENTS_SRC.CLASS_PARAM]
                    });
                });
            }

            newItemsInfo.push(newItem);
        }
    });

    return newItemsInfo;
}
function printPerformanceNumbers() {
    if (urlParams.hasOwnProperty('p')) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

function initializeData() {
    columnDefs = [
        {
            headerClass: 'justify-left',
            field: 'name',
            tooltipField: 'name',
            headerName: 'Source File',
            headerTooltip: '',
            suppressHideColumn: true,
            suppressMovable: true,
            suppressFilter: true,
            suppressSorting: true,
            minWidth: 1, width: 1, maxWidth: 1,
            cellStyle: {
                'text-align': 'left',
                'left': '0px'
            },
            colSpan: function(params) {
                return params.data.name ?  6 : 1;
            },
            cellRenderer: 'group',
            cellRendererParams: {
                suppressCount: true,
                innerRenderer: function(params) {
                    return params.data.name;
                }
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
        },
        {
            headerClass: 'justify-left',
            headerName: 'File Name',
            headerTooltip: 'Line',
            field: 'fileName',
            tooltipField: 'fileName',
            filter: 'text',
            minWidth: 150, width: 150, maxWidth: 150,
            cellStyle: {
                'text-align': 'left',
                'padding-left': '30px'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return params.data.fileName.split('/').pop();
            }
        },
        {
            headerClass: 'justify-center',
            headerName: 'Line Number',
            headerTooltip: 'Line',
            field: 'line',
            tooltipField: 'line',
            filter: 'number',
            minWidth: 80, width: 80, maxWidth: 120,
            cellStyle: {
                'text-align': 'center',
            }, cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            }
        },
        {
            headerClass: 'justify-center',
            headerName: 'Item',
            headerTooltip: 'Item',
            field: 'item',
            tooltipField: 'item',
            filter: 'number',
            minWidth: 80, width: 80, maxWidth: 120,
            cellRenderer: function (params) {
                if (params.value) {
                    return '<span title="' + params.data.genblk + params.value + '">' + params.data.genblk + params.value + '</span>';
                }
            },
            cellStyle: {
                'text-align': 'center',
            }, cellClassRules: {
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            }
        },
        {
            headerClass: 'justify-center',
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            filter: 'number',
            minWidth: 120, width: 120, maxWidth: 120,
            cellStyle: {
                'text-align': 'center',
            }, cellClassRules: {
                'danger': function (params) {
                    return params.value == 0;
                },
                'exclusion': function (params) {
                    return (typeof params.data.hits === 'string');
                },
            },
            cellRenderer: function(params) {
                return hitsRenderer(params, {fileNum: 'thitf', scope: 'thits', fieldName: 'nameSt'});
            }
        },
        {
            headerName: '',
            headerTooltip: '',
            field: '',
            tooltipField: '',
            suppressHideColumn: true,
            suppressMovable: true,
            suppressFilter: true,
            suppressSorting: true
        }
    ];
}
