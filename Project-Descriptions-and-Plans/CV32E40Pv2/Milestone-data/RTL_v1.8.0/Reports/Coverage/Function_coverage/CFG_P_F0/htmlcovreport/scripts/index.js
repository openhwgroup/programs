/* global $, document, window, localStorage, GLOBAL_JSON */

'use strict';

$(document).ready(function () {
    $('title').text(GLOBAL_JSON.prod + ' ' + GLOBAL_JSON.formal_report_name + 'Coverage Report');

    if (GLOBAL_JSON.testPlanReport) { // In case of testPlan report
        $('#menuFrame').remove();
        $('frameset')[0].cols = '100%,0%';
        $("#mainFrame").contents().find("#page-header-container a").remove();
        $('#mainFrame').attr('src', 'testPlan.html');

    } else if (GLOBAL_JSON.summaryReport) {
        $('#menuFrame').remove();
        $('frameset')[0].cols = '100%,0%';
    }
    else {
        $('frameset')[0].cols="20%,80%";
        if (window.location.hash.length) {
            $('#mainFrame').attr('src', window.location.hash.substr(1));
        }
    }

    window.addEventListener('message', receiveMessage, false);
    function receiveMessage(event) {
        if (event.data.qTarget === 'index') {
            if (event.data.qAction === 'updateFrame') {
                $('#mainFrame').attr('src', event.data.url);
            } else if (event.data.qAction === 'replaceState') {
                window.history.replaceState(event.data.url, '', '#' + event.data.url);
            }
        } else if (event.data.qTarget === 'menu') {
            window.top.frames[0].postMessage(event.data, '*');
        }
    }
});
