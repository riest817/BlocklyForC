/**
2017/08/28 definition.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.definition');

goog.require('Blockly.Flex');


Blockly.Flex['re_name_def'] = function(block) {
  var text = block.getFieldValue('NAME');
  var element = Blockly.Flex.valueToCode(block, 'A', Blockly.Flex.ORDER_NONE);
  return text + " " + element;
};


Blockly.Flex['re_name_use'] = function(block) {
  var text = block.getFieldValue('NAME');
  var code = '{' + text + '}';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};
