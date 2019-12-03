/**
19/10/19  CからPythonへ
 */
'use strict';

goog.provide('Blockly.C.logic');

goog.require('Blockly.C');

Blockly.Python['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || '0';
  var branch = Blockly.Python.statementToCode(block, 'DO' + n);
  var code = 'if ' + argument + ':\n' + branch + '';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Python.valueToCode(block, 'IF' + n,
        Blockly.Python.ORDER_NONE) || '0';
    branch = Blockly.Python.statementToCode(block, 'DO' + n);
    code += 'elif ' + argument + ':\n' + branch + '';
  }
  if (block.elseCount_) {
    branch = Blockly.Python.statementToCode(block, 'ELSE');
    code += ' else :\n' + branch + '';
  }
  return code + '\n';
};

Blockly.Python['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Python.ORDER_EQUALITY : Blockly.Python.ORDER_RELATIONAL;
  var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.C.ORDER_LOGICAL_AND :
      Blockly.Python.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Python.valueToCode(block, 'A', order);
  var argument1 = Blockly.Python.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = '0';
    argument1 = '0';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? '1' : '0';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Python.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Python.valueToCode(block, 'BOOL', order) ||
      '1';
  var code = 'not' + argument0;
  return [code, order];
};

Blockly.Python['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? '1' : '0';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Python.valueToCode(block, 'IF',
      Blockly.Python.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.Python.valueToCode(block, 'THEN',
      Blockly.Python.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.Python.valueToCode(block, 'ELSE',
      Blockly.Python.ORDER_CONDITIONAL) || 'null';
  var code = value_then + ' if ' + value_if + ' else ' + value_code;
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};
