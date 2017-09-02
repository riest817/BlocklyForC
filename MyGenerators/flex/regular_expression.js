/**
2017/08/31 regular_expression.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.regular_expression');

goog.require('Blockly.Flex');


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

  var a = Blockly.Flex.statementToCode(block, 'A');
  var b = Blockly.Flex.statementToCode(block, 'B');
  var code = a + b;
  return code;
};

Blockly.Flex['RE_connection_or'] = function(block) {

  var a = Blockly.Flex.statementToCode(block, 'A');
  var b = Blockly.Flex.statementToCode(block, 'B');
  var code = a + '  |' + b;
  return code;
};

Blockly.Flex['RE_repetition'] = function(block) {

  var OPERATORS = {
    '*': '*',
    '+': '+',
  };
  var operator = OPERATORS[block.getFieldValue('TYPE')];
  var a = Blockly.Flex.statementToCode(block, 'A');
  var code = a + operator;
  return code;
};

Blockly.Flex['RE_minimum_match'] = function(block) {

  var a = Blockly.Flex.statementToCode(block, 'A');
  var code = a + '?';
  return code;
};