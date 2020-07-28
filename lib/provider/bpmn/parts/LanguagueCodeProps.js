var entryFactory = require('../../../factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is;


module.exports = function (group, element, translate) {

    if (is(element, "bpmn:Task")) {
        var languageCodeEntry = entryFactory.textBox({
            id: 'Languague Code',
            label: translate('Language'),
            modelProperty: 'languageCode',
            description : 'Code language'
        });
        group.entries.push(languageCodeEntry); 
    }

};
