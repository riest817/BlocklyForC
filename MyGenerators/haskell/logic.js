/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Haskell for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Haskell.logic');

goog.require('Blockly.Haskell');


Blockly.Haskell['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'if ' + argument + '\n  then ' + branch + '\n';
  /*
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
        Blockly.Haskell.ORDER_NONE) || 'false';
    branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }*/
  if (block.elseCount_) {
    branch = Blockly.Haskell.statementToCode(block, 'ELSE');
    code += '  else ' + branch;
  }
  return code + '\n';
};

Blockly.Haskell['logic_compare'] = function(block) {
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
      Blockly.Haskell.ORDER_EQUALITY : Blockly.Haskell.ORDER_RELATIONAL;
  var argument0 = Blockly.Haskell.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Haskell.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Haskell['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Haskell.ORDER_LOGICAL_AND :
      Blockly.Haskell.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Haskell.valueToCode(block, 'A', order);
  var argument1 = Blockly.Haskell.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
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

Blockly.Haskell['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Haskell.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Haskell.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = 'not ' + argument0;
  return [code, order];
};
/*
Blockly.Haskell['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Haskell.ORDER_ATOMIC];
};
*/
Blockly.Haskell['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Haskell.ORDER_ATOMIC];
};

Blockly.Haskell['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Haskell.valueToCode(block, 'IF',
      Blockly.Haskell.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.Haskell.valueToCode(block, 'THEN',
      Blockly.Haskell.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.Haskell.valueToCode(block, 'ELSE',
      Blockly.Haskell.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.Haskell.ORDER_CONDITIONAL];
};

Blockly.Haskell['quiz3_if0'] = function(block) {
  var branch1 = Blockly.Haskell.statementToCode(block, 'DO1');
  var branch2 = Blockly.Haskell.statementToCode(block, 'DO2');
  var branch3 = Blockly.Haskell.statementToCode(block, 'DO3');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else if ( arr[i] == 60 ) {\n' + branch2 +
             '} else if ( arr[i] <  60 ) {\n' + branch3 + '}\n';
  return code;
};

Blockly.Haskell['quiz3_if1'] = function(block) {
  var branch1 = Blockly.Haskell.statementToCode(block, 'DO1');
  var branch2 = Blockly.Haskell.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <  60 ) {\n' + branch1 +
             '} else if ( arr[i] <= 60 ) {\n' + branch2 + '}\n';
  return code;
};

Blockly.Haskell['quiz3_if2'] = function(block) {
  var branch1 = Blockly.Haskell.statementToCode(block, 'DO1');
  var branch2 = Blockly.Haskell.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.Haskell['quiz3_if3'] = function(block) {
  var branch1 = Blockly.Haskell.statementToCode(block, 'DO1');
  var branch2 = Blockly.Haskell.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};


Blockly.Haskell['quiz_if4'] = function(block) {
  var dropdown_option = block.getFieldValue('OPTION');
  var statements_then = Blockly.Haskell.statementToCode(block, 'THEN');
  var statements_else = Blockly.Haskell.statementToCode(block, 'ELSE');
  // TODO: Assemble Haskell into code variable.
  var code = 'if ( n1 ' + dropdown_option + ' n2 ) {\n'
                + statements_then
           + '} else {\n'
                + statements_else
           + '}\n';
};

Blockly.Haskell['quiz_if'] = function(block) {
  var value_expression = Blockly.Haskell.valueToCode(block, 'EXPRESSION', Blockly.Haskell.ORDER_ATOMIC);
  var statements_statement = Blockly.Haskell.statementToCode(block, 'STATEMENT');
  var code = 'if (' + value_expression + ') {\n' +
             statements_statement +
             '}\n';

  return code;
};
