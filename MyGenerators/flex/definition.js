/**
2017/08/28 definition.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.definition');

goog.require('Blockly.Flex');


Blockly.Flex['declaration'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var element = Blockly.Flex.statementToCode(block, 'A');
  return text + element;

};


Blockly.Flex['use'] = function(block) {
  // 未完成 2017/08/29
  var text = block.getFieldValue('TEXT');
  var code = '{' + text + '}';
  return code;
};