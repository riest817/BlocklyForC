'use strict';

goog.provide('Blockly.Haskell.texts');

goog.require('Blockly.Haskell');


Blockly.Scheme['string'] = function (block) {
  // Text value.
  var code = Blockly.Scheme.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_text_operator'] = function (block) {
    var op = block.getFieldValue('NAME') || 'display';
    var code = '(' + op + ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_text_operator0'] = function (block) {
  var op = block.getFieldValue('NAME') || 'display';
  var code = '(' + op + ')';
  return [code, Blockly.Scheme.ORDER_ATOMIC];
};