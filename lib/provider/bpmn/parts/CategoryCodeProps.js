var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var expectedResultsEntry = entryFactory.textBox({
            id: 'category code',
            label: translate('Category'),
            modelProperty: 'categoryGroupCode',
            description : 'Code category'
        });
        group.entries.push(expectedResultsEntry); 
    }

};