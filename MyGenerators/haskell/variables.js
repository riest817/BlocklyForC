/**

 */

/**
 * @fileoverview Generating Haskell for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Haskell.variables');

goog.require('Blockly.Haskell');


Blockly.Haskell['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Haskell.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Haskell.ORDER_ATOMIC];
};

Blockly.Haskell['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + '\n';
};

Blockly.Haskell['variables_equal'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  return type + ' ' + varName + ' = ' + argument0 + '\n';
};

Blockly.Haskell['variables_dec'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + varName + '\n';
};

