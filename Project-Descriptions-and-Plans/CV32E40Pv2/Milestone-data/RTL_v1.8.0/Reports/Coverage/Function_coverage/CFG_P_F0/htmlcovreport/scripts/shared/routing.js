/* global urlParams */
/* exported parseUrl, updateUrlParams, updateUrlParamsFrame, queryUrlParamsByPrefix, clearUrlParamsByPrefix, updateMenuSelection */

function parseUrl() {
    var urlParams = {};

    var qs = location.search.substr(1);
    var params = qs.split('&');
    var pair;

    if (qs) {
        for (var i = 0; i < params.length; i++) {
            pair = params[i].split('=');
            urlParams[pair[0]] = pair[1];
        }
    }

    return urlParams;
}

function updateUrlHash(extraParams) {
    var paramsList  = '';
    var pageUrl = window.location.pathname.split('/').pop() + '?';

    $.extend(urlParams, extraParams);
    Object.keys(urlParams).forEach(function(param) {
        if (typeof urlParams[param] !== 'undefined' && urlParams[param] != '') {
            paramsList += param + '=' + urlParams[param] + '&';
        }
    });

    pageUrl += paramsList;
    pageUrl = pageUrl.substr(0, pageUrl.length - 1);

    window.top.postMessage({
        url: pageUrl,
        qTarget: 'index',
        qAction: 'replaceState'
    }, '*');

    window.location.ref = pageUrl;

    return paramsList;
}

function updateUrlParams(newUrlParams, pageUrl) {
    pageUrl += updateUrlHash(newUrlParams);

    pageUrl = pageUrl.substr(0, pageUrl.length - 1);

    window.history.replaceState(pageUrl, '', pageUrl);

    return urlParams;
}

function updateUrlParamsFrame(newUrlParams) {
    window.parent.postMessage({
        urlParams: newUrlParams,
        qTarget: 'cvg',
        qAction: 'replaceState'
    }, '*');
}

/*
 Routines related to saving url state
*/
var gridParams = [
    'page',
    'pageSize',
    'sort',
    'filter'
];

function queryUrlParamsByPrefix(urlParams, prefix, extraParams) {
    var queryParams = {};

    gridParams.forEach(function(param) {
        var prefixParam = prefix + '_' + param;
        if (urlParams.hasOwnProperty(prefixParam)) {
            queryParams[param] = urlParams[prefixParam];
        }
    });

    queryParams = parseQueryParams(queryParams, (extraParams) ? extraParams.options : undefined);

    queryParams.prefix = prefix;

    if (urlParams.hasOwnProperty(prefix)) {
        queryParams[prefix] = Number(urlParams[prefix]);
    }

    if (urlParams.hasOwnProperty(prefix + '_c')) {
        queryParams[prefix + '_c'] = Number(urlParams[prefix + '_c']);
    }

    if (extraParams) {
        if (extraParams.hasOwnProperty('pageUrl')) {
            queryParams.pageUrl = extraParams.pageUrl;
        }

        if (extraParams.hasOwnProperty('pageSize') && !queryParams.hasOwnProperty('pageSize')) {
            queryParams.pageSize = extraParams.pageSize;
        }
    }

    return queryParams;
}

function parseQueryParams(queryParams, options) {
    var params = {};

    if (queryParams.hasOwnProperty('page')) {
        params.page = Number(queryParams.page) - 1; // zero-based pagination in ag-grid lib
    }

    if (queryParams.hasOwnProperty('pageSize')) {
        params.pageSize = queryParams.pageSize;
    }

    if (queryParams.hasOwnProperty('sort') && ! (options && options.skipParsingSorting)) {
        params.sort = [];
        var sortParams = queryParams.sort.split(';');
        sortParams.forEach(function(sortParam) {
            var param = sortParam.split(',');
            params.sort.push({
                colId: param[0],
                sort: param[1]
            });
        });
    } else if (queryParams.hasOwnProperty('sort')) {
        params.sort = queryParams.sort;
    }

    if (queryParams.hasOwnProperty('filter') && ! (options && options.skipParsingFiltering)) {
        params.filter = {};
        var filterParams = queryParams.filter.split(';');
        filterParams.forEach(function(filterParam) {
            var param = filterParam.split(',');
            params.filter[param[0]] = {
                type: param[1],
                filter: decodeURIComponent(param[2])
            };
        });
    } else if (queryParams.hasOwnProperty('filter')) {
        params.filter = queryParams.filter;
    }

    return params;
}

function clearUrlParamsByPrefix(urlParams, prefix) {
    gridParams.forEach(function(param) {
        var prefixParam = prefix + '_' + param;
        if (urlParams.hasOwnProperty(prefixParam)) {
            delete urlParams[prefixParam];
        }
    });

    if (urlParams.hasOwnProperty(prefix)) {
        delete urlParams[prefix];
    }

    if (urlParams.hasOwnProperty(prefix + '_c')) {
        delete urlParams[prefix];
    }

    return urlParams;
}

function getCvgCommonUrlParams(urlParams, prefix) {

    gridParams.forEach(function(param) {
        var prefixParam = prefix + '_' + param;
        if (urlParams.hasOwnProperty(prefixParam) && param != 'filter') {
            delete urlParams[prefixParam];
        }
    });

    if (urlParams.hasOwnProperty(prefix)) {
        delete urlParams[prefix];
    }

    if (urlParams.hasOwnProperty(prefix + '_c')) {
        delete urlParams[prefix];
    }

    return urlParams;
}

//Update menu selection upon selecting any instance or DU
function updateMenuSelection(type, id) {
    window.top.postMessage({
        qType: type,
        qId: id,
        qTarget: 'menu',
        qAction: 'selectNode'
    }, '*');
}
