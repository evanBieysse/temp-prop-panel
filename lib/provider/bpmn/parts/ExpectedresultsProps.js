var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var expectedResultsEntry = entryFactory.textBox({
            id: 'expected result',
            label: translate('Expected Results'),
            modelProperty: 'expectedResults',
            description : 'Set expected results for a task'
        });
        group.entries.push(expectedResultsEntry); 
    }

};