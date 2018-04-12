/**
2017/08/31 regular_expression.js を新規作成
18/04/04 Blockly.Flex['RE_minimum_match']をBlockly.Flex['RE_repetition']に統合
18/04/10 Blockly.Flex['RE_from_to_mutator'] 作成
 */
'use strict';

goog.provide('Blockly.Flex.regular_expression');

goog.require('Blockly.Flex');


Blockly.Flex['RE_text0'] = function(block) {

  var code = block.getFieldValue('TEXT');
  return code;
};

Blockly.Flex['RE_text'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '"' + text + '"';
  return code;
};

Blockly.Flex['RE_any_one'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '[' + text + ']';
  return code;
};

Blockly.Flex['RE_not_any_one'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '[^' + text + ']';
  return code;
};

Blockly.Flex['RE_from_to'] = function(block) {

  var from = block.getFieldValue('FROM');
  var to = block.getFieldValue('TO');
  var code = '[' + from + '-' + to + ']';
  return code;
};

Blockly.Flex['RE_anything'] = function(block) {

  var code = '.';
  return code;
};

Blockly.Flex['RE_new_line'] = function(block) {

  var code = '\\n';
  return code;
};

Blockly.Flex['RE_tab'] = function(block) {

  var code = '\\t';
  return code;
};

Blockly.Flex['RE_connection'] = function(block) {
//18/04/05  インデント無効化
  var a = Blockly.Flex.statementToCode_0indent(block, 'A');
  var b = Blockly.Flex.statementToCode_0indent(block, 'B');
  var code = a + b;
  return code;
};

Blockly.Flex['RE_connection_or'] = function(block) {
//18/04/05  インデント無効化
  var a = Blockly.Flex.statementToCode_0indent(block, 'A');
  var b = Blockly.Flex.statementToCode_0indent(block, 'B');
  var code = a + '  |' + b;
  return code;
};

Blockly.Flex['RE_repetition'] = function(block) {

  var OPERATORS = {
    '*': '*',
    '+': '+',
    '?': '?',
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var a = Blockly.Flex.statementToCode_0indent(block, 'A');
  var code = a + operator;
  return code;
};
/*
Blockly.Flex['RE_minimum_match'] = function(block) {

  var a = Blockly.Flex.statementToCode(block, 'A');
  var code = a + '?';
  return code;
};
*/

Blockly.Flex['RE_from_to_mutator'] = function(block) {

  var from = block.getFieldValue('FROM');
  var to = block.getFieldValue('TO');
  var elements = new Array(block.itemCount_);
  var code = '[';

  for (var i = 0; i < block.itemCount_; i++) {
    from = block.getFieldValue('FROM' + i);
    to = block.getFieldValue('TO' + i);
    code += from + '-' + to; 
  }
  code += ']';
  return code;
};