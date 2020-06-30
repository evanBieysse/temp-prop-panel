var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var categoryCodeEntry = entryFactory.textBox({
            id: 'category code',
            label: translate('Category'),
            modelProperty: 'categoryCode',
            description : 'Code category'
        });
        group.entries.push(categoryCodeEntry); 
    }

};