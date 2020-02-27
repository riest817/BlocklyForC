/**

 */

/**
 * @fileoverview Generating Prolog for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Prolog.variables');

goog.require('Blockly.Prolog');


Blockly.Prolog['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Prolog.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Prolog.ORDER_ATOMIC];
};

Blockly.Prolog['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Prolog.valueToCode(block, 'VALUE',
      Blockly.Prolog.ORDER_NONE) || '0';
  var varName = Blockly.Prolog.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + '\n';
};

Blockly.Prolog['variables_equal'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Prolog.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Prolog.valueToCode(block, 'VALUE',
      Blockly.Prolog.ORDER_ASSIGNMENT) || '0';
  return type + ' ' + varName + ' = ' + argument0 + '\n';
};

Blockly.Prolog['variables_dec'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Prolog.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + varName + '\n';
};

