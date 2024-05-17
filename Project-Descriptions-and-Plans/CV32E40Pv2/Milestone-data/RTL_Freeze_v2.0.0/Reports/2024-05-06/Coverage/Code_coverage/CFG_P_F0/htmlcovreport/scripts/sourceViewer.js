/* global $, document, getPageTemplate, console, parseUrl, GLOBAL_JSON, loadJsonFile, createCodeMirrorInstance, updateUrlHash, jumpToLine, headerTemplate, urlParams */
/* exported processScopesDbFile, processSummaryData, processAssertionsData, processDirectivesData, processStatementsData, processSrcData, helpModal */

'use strict';

var startDate;

var SRC = {
    NAME: 'name',
    MAX_ITEMS: 'maxItems',
    LANG: 'lang',
    CODE: 'src',
};

//var editor;

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
    loadJsonFile('src' + urlParams.f);
});

function processSrcData(g_data) {
    var dataObj = g_data;

    topPageDescription();

    // file name
    $('#page-body').append(
        '<div class="srcMenu-src"style="display: block; margin-bottom: -9px; width: 100%;">' +
                '<div class="lineN" >Ln#</div>' +
                '<span class="file" >' +
                '<span style="font-weight: bold; "> Filename:  <br></span>' +
                    '<span class="file-name" title="' + dataObj[SRC.NAME] + '">' +
                        dataObj[SRC.NAME] +
                    '</span>' +
                '</span>' +
                '<a id="helpIcon" style="padding: 2px 0px 0px 0px;margin-right:0px;" title="help" class="help-logo-1src" onclick="helpModal()">' +
                     '<i class="fa fa-question-circle" aria-hidden="true" style="font-size: 20px;margin-top: -1px;"></i>' +
                '</a>' +
        '</div>'
    );

    $('#page-body').append('<div id="editor"></div>');
    var editor = createCodeMirrorInstance('#editor', 0, 0, {
        mode: dataObj[SRC.LANG],
        code: ''
    });
    editor.getDoc().setValue(dataObj[SRC.CODE]);
    editor.setSize(null, 'calc(100vh - 140px)');
    var lineNGutWidth = $('.CodeMirror-gutter.CodeMirror-linenumbers').width();
    $('.lineN').css({'width': (lineNGutWidth + 9.09)});
    $('.file').css({'width': 'calc(100% - ' + lineNGutWidth + 'px - 9.09px)'});
    jumpToLine(editor, urlParams.l == 0 ? 0 : urlParams.l - 1);

    if (urlParams.p) {
        var timeDiff = new Date() - startDate;
        console.save(urlParams.p + ',' + timeDiff, 'z_console.txt');
    }
}

function topPageDescription() {
    $('#page-header-text').text(GLOBAL_JSON.prod  + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');
    headerTemplate(urlParams);
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
        '<span class="keybinding" style="font-weight: bold;">We can search either normally by writing the string dirctly or by using Regex.</span>' +
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
