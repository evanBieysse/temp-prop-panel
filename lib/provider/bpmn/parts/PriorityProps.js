var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var priorityEntry = entryFactory.selectBox({
            id: 'priority',
            label: translate('Task Priority'),
            modelProperty: 'priority',
            description : 'Apply a priority in a task',
            selectOptions: [{ name: 'Low', value: 'low' }, { name: 'Medium', value: 'medium' }, { name: 'High', value: 'high' }]
        });
        group.entries.push(priorityEntry); 
    }

};