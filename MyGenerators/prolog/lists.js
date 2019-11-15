/**
 * @fileoverview Generating Prolog for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Prolog.lists');

goog.require('Blockly.Prolog');


Blockly.Prolog['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Prolog.ORDER_ATOMIC];
};

Blockly.Prolog['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Prolog.valueToCode(block, 'ADD' + i,
        Blockly.Prolog.ORDER_NONE) || 'null';
  }
  var code = '[' + elements.join(',') + ']';
  return [code, Blockly.Prolog.ORDER_ATOMIC];
};



Blockly.Prolog['lists_cons'] = function(block) {
  var code = '[';
  code += Blockly.Prolog.valueToCode(block, 'HEAD', Blockly.Prolog.ORDER_NONE);
  code += '|';
  code += Blockly.Prolog.valueToCode(block, 'TAIL', Blockly.Prolog.ORDER_NONE);
  code += ']';
  return [code, Blockly.Prolog.ORDER_ATOMIC];
};

