'use strict';

var nameEntryFactory = require('./implementation/Name'),
    is = require('bpmn-js/lib/util/ModelUtil').is;

var entryFactory = require('../../../factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    utils = require('../../../Utils'),
    cmdHelper = require('../../../helper/CmdHelper');

module.exports = function(group, element, translate) {

  if (!is(element, 'bpmn:Collaboration')) {

    var options;
    if (is(element, 'bpmn:TextAnnotation')) {
      options = { modelProperty: 'text' };
    }
  
    var name = getBusinessObject(element).name;
    var id = getBusinessObject(element).id;

    if( name == "undefined" || name == null ){     //il faut trouver la valeur dans l'input text !
      getBusinessObject(element).name = id;
      group.entries = group.entries.concat(nameEntryFactory(element, options, translate));
    }else{
      group.entries = group.entries.concat(nameEntryFactory(element, options, translate));
    }
  }

};