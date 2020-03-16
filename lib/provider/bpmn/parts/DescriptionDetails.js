var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var descriptionEntry = entryFactory.textBox({
            id: 'description',
            label: translate('Task Description'),
            modelProperty: 'description',
            description : 'Apply Description in a task'
        });
        group.entries.push(descriptionEntry); 
    }

};