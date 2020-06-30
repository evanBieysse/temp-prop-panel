var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var keywordCodeEntry = entryFactory.textBox({
            id: 'keyword Code',
            label: translate('Keyword'),
            modelProperty: 'keywordCode',
        });
        group.entries.push(keywordCodeEntry); 
    }

};