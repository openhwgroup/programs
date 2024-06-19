/* global $, document, window, alert, GLOBAL_JSON, setTimeout, clearTimeout, loadJsonFile, OVERALL, escapeAngleBrackets */
/* exported processInstLinks, processDuLinks, processTpLinks, filterMenu, enableSearchBtn, clearInput, selectNode */

'use strict';

/* variables */
var dataObj = [];
var treeSelector;
var href;
var selectedNode;
var overallDataObj;
var menuData;

var FILE_SIZE_LIMIT = 52428800; // 50 MB
var treeLoaded = false;
var menuFileNames = {
    'instances': 'instlink',
    'design-units': 'dulink'
};

var TYPES = {
    DU: 1,
    INST: 2
};

// var PREFIX = {
//     MENU: 'me'
// };
var parents = [];

/* main routine */
$(document).ready(function () {
    window.addEventListener('message', receiveMessage, false);
    function receiveMessage(event) {
        if (event.data.qTarget === 'menu') {
            if (event.data.qAction === 'selectNode') {
                var tabSelector = (event.data.qType === 'inst') ? 'instances' : 'design-units';
                if (treeSelector !== ('#' + tabSelector + '-menu')) {
                    $('#menu-tabs li button#' + tabSelector + '-tab')[0].click();
                    treeLoaded = false;
                }

                selectedNode = event.data.qId;
                selectNode();
            }
        }
    }

    $('#menu-tabs li a').on('click', function (e) {
        e.preventDefault();
        var pane = $(this);
        href = this.hash;
        if (typeof treeSelector !== 'undefined' && treeSelector !== href + '-menu') {
            $(treeSelector).jstree('destroy').empty();
        }
        getTreeData(href.replace('#', ''));

        pane.tab('show');
    });
    $('#expandTree').on('click', function () {
        document.getElementById('menuspin').style.display = 'block';
        setTimeout(function () {
            $(treeSelector).jstree('open_all');
        }, 0);
    });

    $('#collapseTree').on('click', function () { $(treeSelector).jstree('close_all'); });
    if (GLOBAL_JSON.hasOwnProperty('byDu') && !GLOBAL_JSON.byDu && GLOBAL_JSON.hasOwnProperty('byInstance') && GLOBAL_JSON.byInstance) {     // byInstance only
        $('#designUnitsTab').hide();
        $('#duList').hide();
        $('#instancesTab').css('width', '100%');
        $('#instances-tab').trigger('click');
    } else if (GLOBAL_JSON.hasOwnProperty('byDu') && GLOBAL_JSON.byDu && GLOBAL_JSON.hasOwnProperty('byInstance') && !GLOBAL_JSON.byInstance) { // byDu only
        $('#instancesTab').hide();
        $('#designUnitsTab').css('width', '100%');
        $('#design-units-tab').trigger('click');
    } else {
        $('#instances-tab').trigger('click');
    }

    if (GLOBAL_JSON.hasOwnProperty('pa') && GLOBAL_JSON.pa) {
        $('#designUnitsTab').hide();
        $('#instancesTab').css('width', '100%');
    }
});


function getTreeData(type) {
    var typeKey = menuFileNames[type] + 'Size';
    if (GLOBAL_JSON.hasOwnProperty(typeKey) && GLOBAL_JSON[typeKey] > FILE_SIZE_LIMIT) {
        $('.tab-content').css('display', 'none');
        $('#warning-message').remove();

        $('.card').append(
            '<div id="warning-message">' +
            '<div style="text-align: center;"><i class="fa fa-exclamation-triangle warning-icon"></i></div>' +
            '<span class="menu-not-found"> Number of ' + (type == 'instances' ? 'Instances' : 'Design Units') + ' exceeds the maximum limit. </span>' +
            '<span class="menu-not-found">  ' + (type == 'instances' ? 'Please refer to \'Design Coverage By Instance\' Table in Home page' : '') + '</span>' +
            '</div>'
        );
    } else {
        $('.tab-content').css('display', 'inherit');
        $('#warning-message').remove();
        loadJsonFile(menuFileNames[type]);
    }
}

function processInstLinks(g_data) {
    menuData = g_data;
    if (overallDataObj == undefined) {
        loadJsonFile('overalldu');
    } else {
        processOverallduData(overallDataObj);
    }
}

function processOverallduData(g_data) {
    overallDataObj = g_data;
    buildTreeInst(menuData, overallDataObj[OVERALL.DESIGN_STRUCTURE_DATA]);
    treeSelector = createTree(href);
}

function processDuLinks(g_data) {
    menuData = g_data;
    buildTreeDu(menuData);
    treeSelector = createTree(href);
}

function buildTreeInst(data, overallData) {
    dataObj = [];
    var instText, perColour, iconClass;
    for (var key in data) {
        var parentId = data[key][0];
        data[key].push((parentId === -1 ? '' : data[parentId][3]) + '/' + data[key][1]);
        if (data.hasOwnProperty(key)) {
            if ((overallData[key])) {
                if (typeof overallData[key][2] != 'string') {
                    if (overallData[key][2] >= 0 && overallData[key][2] < GLOBAL_JSON.lthres) {
                        perColour = '#ff5e50';
                        iconClass = 'icon-color-danger';
                    } else if (overallData[key][2] >= GLOBAL_JSON.lthres && overallData[key][2] < GLOBAL_JSON.hthres) {
                        perColour = '#ea8600';
                        iconClass = 'icon-color-warning';
                    } else {
                        perColour = '#02cc1d';
                        iconClass = 'icon-color-success';
                    }
                } else {
                    iconClass = 'icon-color-exclude';
                }
            } else {
                iconClass = 'icon-color';
            }
            data[key][1] = escapeAngleBrackets(data[key][1]);
            instText = (overallData[key] && (typeof overallData[key][2] != 'string')) ? (data[key][1] + ' (' + '<span style="color: ' + perColour + ';font-weight: bold;">' + overallData[key][2] + '%' + '</span>)') : data[key][1];
            dataObj.push({
                id: key,
                parent: (data[key][0] == -1) ? '#' : data[key][0],
                text: instText,
                icon: 'fa fa-square ' + iconClass + '',
                a_attr: {
                    'style': 'font-size:small',
                    'href': 'summary.html?f=' + data[key][2] + '&s=' + key + '&type=inst'
                },
                path: data[key][3]
            });
        }
    }
}

function buildTreeDu(data) {
    dataObj = [];
    var instText, perColour, iconClass;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key][1] != 'string') {
                if (data[key][1] >= 0 && data[key][1] < GLOBAL_JSON.lthres) {
                    perColour = '#ff5e50';
                    iconClass = 'icon-color-danger';
                } else if (data[key][1] >= GLOBAL_JSON.lthres && data[key][1] < GLOBAL_JSON.hthres) {
                    perColour = '#ea8600';
                    iconClass = 'icon-color-warning';
                } else {
                    perColour = '#02cc1d';
                    iconClass = 'icon-color-success';
                }
            } else {
                iconClass = 'icon-color-exclude';
            }
            instText = (data[key] && (typeof data[key][1] != 'string')) ? (data[key][0] + ' (' + '<span style="color: ' + perColour + ';font-weight: bold;">' + data[key][1] + '%' + '</span>)') : data[key][0];
            dataObj.push({
                id: key,
                text: instText,
                icon: 'fa fa-square ' + iconClass + '',
                a_attr: {
                    'style': 'font-size:small',
                    'href': 'summary.html?f=' + data[key][2] + '&s=' + key + '&type=du'
                },
                type: TYPES.DU
            });
        }
    }
}

function createTree(href) {
    var treeSelector = href + '-menu';

    //$.noConflict();
    $(treeSelector).on('changed.jstree', function (e, data) {
        if (data.selected.length) {
            var searchParams = {
                f: (typeof menuData[data.selected[0]][2] !== 'undefined') ? menuData[data.selected[0]][2] : menuData[data.selected[0]][1],
                s: data.selected[0]
            };

            var summaryPageURL = 'summary.html?f=' + searchParams.f + '&s=' + searchParams.s + '&type=' + ((treeSelector === '#instances-menu') ? 'inst' : 'du');

            if (data.event) {
                window.top.postMessage({
                    url: summaryPageURL,
                    qTarget: 'index',
                    qAction: 'updateFrame'
                }, '*');
            }
        }
    }).jstree({
        'core': {
            'data': dataObj,
            'animation': 300,
            'multiple': false,
            'expand_selected_onload': true,
            'themes': {
                'name': 'default',
                // 'stripes' : true,
                'dots': false,
                // 'responsive': true,
                // 'ellipsis': true
                // 'icons': false
            },
        },
        'state': {
            'key': 'questaMenu' + GLOBAL_JSON.time,
            filter: function (state) {
                return filterState(state);
            },
            'events': 'open_node.jstree close_node.jstree'
        },
        'plugins': [
            'changed',
            'search',
            'state'
            // 'wholerow',
            // 'themes',
            // 'ui'
        ],
        'search': {
            'show_only_matches': true,
            'show_only_matches_children': true,
            'case_sensitive': false,
            'search_callback': function (str, node) {
                var word;
                word = str.toLowerCase();
                if (word.substring(word.length - 1) == '/') {
                    word = word.substring(0, word.length - 1);
                }

                if (node.original.type === TYPES.DU ) {    // DU flat List search
                    return  ((node.text.toLowerCase() || '').indexOf(word) >= 0) ;
                } else {                                       // Instance tree search
                    var wordIndex = (node.original.path.toLowerCase() || '').indexOf(word);
                    var remaining = node.original.path.substr((wordIndex + word.length - 1), (node.original.path.length  - wordIndex + 1 ));
                    var pathLength = remaining.split('/').length;
                    if (wordIndex >= 0  && pathLength <= 1) {
                        return true;
                    }
                }
                return false;
            }
        }
    });

    $(document).on('mousedown', 'a.jstree-anchor,i.jstree-icon.fa', function (e) {
        if (e.which == 2) {
            var found = dataObj.find(function (element) {
                if ($(e.target).is('i')) {
                    if (element.hasOwnProperty('text')) {
                        return element.text == $(e.target).parent().text();
                    }
                } else {
                    if (element.hasOwnProperty('text')) {
                        return element.text == e.target.innerText;
                    }
                }
            });

            var f = (typeof menuData[found.id][2] !== 'undefined') ? menuData[found.id][2] : menuData[found.id][1];
            var s = found.id;
            if (!window.open('summary.html?f=' + f + '&s=' + s, '_blank')) {
                alert('Please allow popups to open page in a new tab');
            }
        }
    });

    $(treeSelector + '-search').keyup(function (event) {
        if (event.keyCode === 13) {
            $('#noitemsText').remove();
            $(treeSelector).jstree(true).show_all();
            parents = [];
            filterMenu();
        }
    });

    $(treeSelector).bind('ready.jstree', function () {
        treeLoaded = true;
        selectNode();
        selectedNode = undefined;
    });

    $(treeSelector).on('open_all.jstree', function () {
        document.getElementById('menuspin').style.display = 'none';
    });

    $(treeSelector).on('search.jstree', function (nodes, str) {
        var searchFor = str.str;
        var wordsc = [];
        if (searchFor.charAt(0) === '/' || searchFor.charAt(0) === '\\') {
            searchFor = searchFor.substr(1);
        }
        if (searchFor.charAt(searchFor.length - 1) === '/' || searchFor.charAt(searchFor.length - 1) === '\\') {
            searchFor = searchFor.substr(0, searchFor.length - 1);
        }
        if (searchFor.indexOf('/') >= 0 || searchFor.indexOf('\\') >= 0) {
            if (searchFor.indexOf('/') >= 0) {
                wordsc = searchFor.split('/');
            } else {
                wordsc = searchFor.split('\\');
            }

        } else {
            wordsc = [searchFor];
        }
        if (str.nodes.length === 0) {
            $(treeSelector).jstree(true).hide_all();
            $('#noitemsText').remove();
            $(treeSelector).before('<p id="noitemsText"; style="font-family: sans-serif; color: red;float: left;font-size: 14px;margin-right: 10px;padding: 5px;">  No items found </p>');  //<a class="jstree-anchor jstree-hovered jstree-clicked" href="summary.html?f=1&amp;s=221&amp;type=inst" tabindex="-1" style="font-size:small" id="221_anchor"><i class="jstree-icon jstree-themeicon fa fa-square icon-color jstree-themeicon-custom" role="presentation"></i>coverpkg</a>
            //parents = [];
        }
    });
    return treeSelector;
}

function filterMenu() {
    var filterText = $(treeSelector + '-search').val();
    if (filterText === '') {
        $(treeSelector + '-search-btn').attr('disabled');
        $(treeSelector + '-search-btn').addClass('disabled');
        parents = [];
    }
    $(treeSelector).jstree('close_all');
    $(treeSelector).jstree(true).search(filterText);
}

function filterState(state) {
    var selected = state.core.selected;
    state.core.selected = {
        selected: selected,
        action: 'update state'
    };

    return state;
}

function enableSearchBtn(inputId) {
    var btnId = inputId + '-btn';
    if ($('#' + inputId).val() === '') {
        $('#' + btnId).addClass('disabled');
        $('#' + btnId).attr('disabled');
        $('#noitemsText').remove();
        $(treeSelector).jstree(true).show_all();
        filterMenu();
    } else {
        $('#' + btnId).removeClass('disabled');
        $('#' + btnId).removeAttr('disabled');
    }
}

function clearInput(inputId) {
    $('#' + inputId).val('');
    enableSearchBtn(inputId);
    parents = [];
}

function selectNode() {
    if (typeof selectedNode !== 'undefined' && treeLoaded) {
        $(treeSelector).jstree(true).deselect_all(true);
        $(treeSelector).jstree(true).select_node(selectedNode, true);
        if ($('#' + selectedNode + '_anchor').length) {
            $('#' + selectedNode + '_anchor')[0].scrollIntoView();
        }
    }
}

function viewTab(tabId) {
    href = tabId;
    if (typeof treeSelector !== 'undefined' && treeSelector !== href + '-menu') {
        $(treeSelector).jstree('destroy').empty();
    }
    getTreeData(href.replace('#', ''));
    $('.tab-pane').hide();
    $(tabId).show();
}
