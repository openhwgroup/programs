'use strict';

var startDate;
var testplanColumnDefs;
var pageSize = 25;
var tpUrlParams;
var urlParams;

var TESTPLAN_ITEM = {
    BINS: 0,
    HITS: 1,
    COVERAGE: 2,
    GOALP: 3,
    TYPE: 4,
    WEIGHT: 5,
    SECTION_NAME: 6,
    GOAL: 7,
    SCOPE: 8,
    FILE: 9,
    SUB_SCOPE: 10,
    LEVEL: 8,
    SECTION_NUMBER: 9,
    LINKSTATUS: 10
};
var parentExc;

var TESTPLAN_TYPE = {
    'stmt bin': 'Statement Bin',
    'expr bin': 'Expression Bin',
    'cond bin': 'Condition Bin',
    'toggle bin': 'Toggle Bin',
    'branch bin': 'Branch Bin',
    'fsm bin': 'FSM Bin',
    'cover bin': 'Cover Directive Bin',
    'assert bin': 'Assertion Fail Bin',
    'pass bin': 'Assertion Pass Bin',
};

var PREFIX = {
    TEST_PLAN: 'tp'
};


function buildTree (tree) {
    var map = {}, parents = [], i;
    for (i = 0; i < tree.length; i += 1) {
        map[tree[i].id] = i;
        if (tree[i].parent !== '' && tree[map[tree[i].parent]]) {
            if (!(tree[map[tree[i].parent]].hasOwnProperty('children'))) {
                tree[map[tree[i].parent]].children = [];
                tree[map[tree[i].parent]].group = true;
            }
            tree[map[tree[i].parent]].children.push(tree[i]);
        } else {
            tree[i].children = [];
            tree[i].group = true;
            parents.push(tree[i]);
        }
    }
    return parents;
}


function getTestPlanRowData(data, mode) {
    urlParams = parseUrl();
   var testPlanTree =  MapTPData(data.tp , mode , true);
    return testPlanTree;
}




function MapTPData (array , mode , firstParent) {
    var parentId, Idn;
    let result = [];
    array.forEach(function (testPlanItem, itemIndex) {
        if ((testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE]) === 'testplan') {
            var index = (testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER]).lastIndexOf('.');
            Idn = testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER];

            // Check the parent Id to be Empty ('') if first element in the Data and there is no dots ('.') in the section number
            // Check the parent Id to be (0) if there is no dots ('.') in the section number
            parentId = index == -1 ? Idn == 0 ? '' : 0 : (testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER]).slice(0, index);
        }

        var rowItems = {
            bins: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.BINS],
            hits: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.HITS],
            coverage: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.COVERAGE],
            goal: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.GOAL],
            goalP: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.GOALP],
            type: (TESTPLAN_TYPE[testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE]]) ? TESTPLAN_TYPE[testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE]] : testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE],
            weight: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.WEIGHT],
            f: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.FILE],
            s: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SCOPE],
            fsub: testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SUB_SCOPE],
        } ;

        if ((testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE]) === 'testplan') { //Section or SubSection
            rowItems.testplan = testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER] + ' ' + testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NAME];
            rowItems.sectionName = testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NAME];
            rowItems.linkStatus = (testPlanItem.fixed_attr_val[TESTPLAN_ITEM.LINKSTATUS] === 1) ? 'Clean' : 'Not Clean';
            rowItems.id = testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER];
            rowItems.parent = parentId;

            if ((testPlanItem).hasOwnProperty('usr_attr')) {
                for (var usratt = 0, l = testPlanItem.usr_attr.length; usratt < l; usratt++ ) {
                    rowItems['usrattr' + Object.keys(testPlanItem.usr_attr[usratt])] = testPlanItem.usr_attr[usratt][Object.keys(testPlanItem.usr_attr[usratt])];
                }
            }
        } else {
            rowItems.testplan = testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NAME];
            rowItems.parent = Idn;
        }

        ['coverage', 'goal', 'goalP', 'weight'].forEach(function(covType) {
            if (rowItems[covType] == '-') {
                delete rowItems[covType];
            }
        });



        if (testPlanItem.hasOwnProperty('children') && testPlanItem['children'].length) {
            rowItems['children'] = MapTPData(testPlanItem['children'] , mode, false);
            if (rowItems['children'].length) {
                rowItems.group = true;
            }
        }


        if (firstParent) { // First element in the testplan
            rowItems.expand = true
            firstParent = false;
        }
        if (urlParams.hasOwnProperty('section') && testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NAME] == urlParams.section) {
            rowItems.expand = true;
        }

        if (mode === 'summary')  // If summary mode we will check only for the section headers
        {
            if ((testPlanItem.fixed_attr_val[TESTPLAN_ITEM.TYPE]) === 'testplan' &&  (testPlanItem.fixed_attr_val[TESTPLAN_ITEM.SECTION_NUMBER]).indexOf('.') === -1 ) {
                result.push(rowItems);
            }

        } else { // Else Add sections and sub sections
            result.push(rowItems);
        }
    })
    return result;
}

function initializeTestPlanData(usr_attr, mode) {
    testplanColumnDefs = [
        {
            headerName: 'Testplan Section / Coverage Link',
            headerTooltip: 'Testplan Section / Coverage Link',
            headerClass: 'justify-left',
            field: 'testplan',
            tooltipField: 'testplan',
            minWidth: 180, width: 250,
            filter: 'text',
            suppressHideColumn: true,
            suppressMovable: true,
            cellStyle: {
                'text-align': 'left'
            },
            expanded: true,
            cellRenderer: 'group',
            cellRendererParams: {
                suppressCount: true,
                innerRenderer: function (params) {
                    if (mode === 'summary') {
                        return '<a href="testPlan.html?section='+ params.data.sectionName + '">' + params.value + '</a>'
                    } else if (params && params.data && params.data.type !== 'testplan' && params.data.type !== 'test' && params.data.type !== 'potential_test' && params.data.f > -1) {
                        return '<a href="' + testPlanPageName[params.data.type] + 'f=' + params.data.f + (params.data.hasOwnProperty('fsub') ? ('&fsub=' + params.data.fsub) : '')  + '&s=' + params.data.s +'&'+ getTypeFilter(params.data) +'">' + params.value + '</a>';
                    } else {
                         // Handling Linking testplan to crossbin by replacing "<" and ">" by the corresponding HTML symbols
                     if (params.data.type === 'cvg bin' && params.value.indexOf('<') > -1 && params.value.indexOf('>') > -1) {
                         return params.value.replace('<', '&lt;').replace('>', '&gt;')
                     } else {

                         return params.value;
                     }

                    }
                }
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
        {
            headerName: 'Type',
            headerTooltip: 'Type',
            field: 'type',
            tooltipField: 'type',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'text',
            headerClass: 'justify-left',
            cellStyle: {
                'text-align': 'left'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
        {
            headerName: 'Hits',
            headerTooltip: 'Hits',
            field: 'hits',
            tooltipField: 'hits',
            minWidth: 100, width: 100, maxWidth: 100,
            filter: 'number',
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
        {
            headerName: 'Bins',
            headerTooltip: 'Bins',
            field: 'bins',
            tooltipField: 'bins',
            minWidth: 100, width: 100, maxWidth: 100,
            filter: 'number',
            filterParams: {
                clearButton: true,
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
        {
            headerName: 'Coverage',
            headerTooltip: 'Coverage',
            field: 'coverage',
            tooltipField: 'coverage',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'number',
            cellRenderer: function (params) {
                if (params.value == 'C') {
                    return 'Covered';
                } else if (params.value == 'U') {
                    return 'Uncovered';
                } else if (isValueUndefined(params)) {
                    return '-';
                } else {
                    return params.value + '%';
                }
            },
            cellClassRules: {
                'fg-disabled': function (params) {
                    return params.value === 'na';
                },
                'undefined': function (params) {
                    return isValueUndefined(params);
                },
                'danger': function (params) {
                    return isValueBelowThreshold(params) || params.value === 'U';
                },
                'warning': function (params) {
                    return isValueInRange(params);
                },
                'success': function (params) {
                    return isValueAboveThreshold(params) || params.value === 'C';
                },
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            }
        },
        {
            headerName: '% of Goal',
            headerTooltip: '% of Goal',
            field: 'goalP',
            tooltipField: 'goalP',
            minWidth: 100, width: 100, maxWidth: 100,
            filter: 'number',
            cellRenderer: function (params) {
                return (typeof params.value !== 'undefined') ? (params.value + '%') : '-';
            },
            cellClassRules: {
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
                    return CheckExclusion(params);
                },
            }
        },
        {
            headerName: 'Goal',
            headerTooltip: 'Goal',
            field: 'goal',
            tooltipField: 'goal',
            comparator: gridSortingCustomComparator,
            minWidth: 100, width: 100, maxWidth: 100,
            filter: 'number',
            cellRenderer: function (params) {
                return (typeof params.value !== 'undefined') ? (params.value) : '-';
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
                'justify-center': function (params) {
                    return isValueUndefined(params) ||  params.value === '-';
                },
            }
        },
        {
            headerName: 'Weight',
            headerTooltip: 'Weight',
            field: 'weight',
            tooltipField: 'weight',
            minWidth: 100, width: 100, maxWidth: 100,
            filter: 'number',
            cellRenderer: function (params) {
                return (typeof params.value !== 'undefined') ? Number(params.value) : '-';
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
        {
            headerName: 'Link Status',
            headerTooltip: 'Link Status',
            field: 'linkStatus',
            tooltipField: 'linkStatus',
            minWidth: 120, width: 120, maxWidth: 120,
            filter: 'text',
            headerClass: 'justify-left',
            cellStyle: {
                'text-align': 'left'
            },
            cellClassRules: {
                'exclusion': function (params) {
                    return CheckExclusion(params);
                },
            },
        },
    ];

    if (mode != 'summary') {
        for (var usratt = 0; usratt < usr_attr.length; usratt++ ) {
            testplanColumnDefs.push({
                headerName: usr_attr[usratt],
                headerTooltip: usr_attr[usratt],
                field: 'usrattr' + usr_attr[usratt],
                tooltipField: 'usrattr' + usr_attr[usratt],
                minWidth: 120, width: 120,
                filter: 'text',
                hide: true,
                cellStyle: {
                    'text-align': 'left'
                },
                headerClass: 'justify-left',
                cellClassRules: {
                    'exclusion': function (params) {
                        return CheckExclusion(params);
                    },
                    'justify-right': function (params) {
                        return (!isNaN(params.value));
                    },
                },

            });
        }
    } else { // In case of summary tracker remove unwanted columns

        delete testplanColumnDefs.splice(8, 1); // Remove Hits Column
        delete testplanColumnDefs.splice(7, 1); // Remove Hits Column
        delete testplanColumnDefs.splice(3, 1); // Remove Hits Column
        delete testplanColumnDefs.splice(2, 1);  // Remove Hits Column
        delete testplanColumnDefs.splice(1, 1);  // Remove Type Column
    }

}

function getTypeFilter(data) {
    switch(data.type){
        case 'toggle' : {
            var toggle = data.testplan.split('/').pop().split('[')[0];
            return 'tsca_filter=name,contains,' + toggle;
        }
        case 'cross':
        case 'coverpoint':
            {
            var href = ''
            var fullName = data.testplan.split('\\').pop();
            var lastIndex = fullName.lastIndexOf('/');
            var instance = fullName.substr(0, lastIndex);
            var cross = fullName.split('/').pop();
            if  (instance){
                href+= '&cg_filter=name,contains,' +  instance ;
            }
            if (data.type == 'cross'){
                href += '&cg_c=1&c=1&&c_page=1&c_filter=name,contains,' + cross;
            } else {
                href += '&cpp_filter=name,contains,' + cross;
            }
            return href;
        }
        case 'coverinstance': {
            return '&cg_filter=name,equals,' + data.testplan;
        }
        case 'branch' : {
            var lineNumber = data.testplan.split('#')[1];
            return  '&br_sort=line,asc&br_filter=line,greaterThan,' + (lineNumber - 1);
        }
        case 'cond' :
        case 'expr' :
        {
            var lineNumber = data.testplan.split('#')[1];
            return  '&ex_filter=line,equals,' + lineNumber;
        }
        case 'assert': {
            return  '&a_filter=name,contains,' + data.testplan.split('/').pop();
       }
        case 'cover': {
            return  '&d_filter=name,contains,' + data.testplan.split('/').pop();
   }
    }
}

function CheckExclusion(params) {
    var node = params.node;
    parentExc = false;
    while (node.parent) {
        if (!node.parent.data.weight) {
            parentExc = true;
            break;
        }
        node = node.parent;
    }
    return (!params.data.weight || parentExc);
}
