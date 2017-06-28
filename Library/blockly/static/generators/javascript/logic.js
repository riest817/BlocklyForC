/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Generating JavaScript for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.logic');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  //var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
  //    Blockly.JavaScript.ORDER_NONE) || 'false';
  var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || '0';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    //argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
    //    Blockly.JavaScript.ORDER_NONE) || 'false';
    argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || '0';
    branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}\n';
  }
  return code + '\n';
};

Blockly.JavaScript['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
  };
  var operator = OPERATORS[block.getTitleValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getTitleValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    //argument0 = 'false';
    //argument1 = 'false';
    argument0 = '0';
    argument1 = '0';
  } else {
    // Single missing arguments have no effect on the return value.
    //var defaultArgument = (operator == '&&') ? 'true' : 'false';
    var defaultArgument = (operator == '&&') ? '1' : '0';
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

Blockly.JavaScript['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) ||
      '1';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
  // Boolean values true and false.
  //var code = (block.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  var code = (block.getTitleValue('BOOL') == 'TRUE') ? '1' : '0';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_ternary'] = function(block) {
  // Ternary operator.
  //var value_if = Blockly.JavaScript.valueToCode(block, 'IF',
  //    Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
  var value_if = Blockly.JavaScript.valueToCode(block, 'IF',
      Blockly.JavaScript.ORDER_CONDITIONAL) || '0';
  var value_then = Blockly.JavaScript.valueToCode(block, 'THEN',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScript.valueToCode(block, 'ELSE',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};

Blockly.JavaScript['controls_switch'] = function(block) {
  // switch condition.
  var n = 0;
  var argument = Blockly.JavaScript.valueToCode(block, 'SWITCH' + n,
      Blockly.JavaScript.ORDER_NONE) || '0';
  var branch;
  var code = 'switch (' + argument + ') {\n';
  for (n = 1; n <= block.caseCount_; n++) {
    argument = Blockly.JavaScript.valueToCode(block, 'CASE' + n,
        Blockly.JavaScript.ORDER_NONE) || n;
    branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += ' case ' + argument + ' :\n' + branch;
  }
  if (block.defaultCount_) {
    branch = Blockly.JavaScript.statementToCode(block, 'DEFAULT');
    code += ' default :\n' + branch;
  }
  return code + '}\n';
};

Blockly.JavaScript['quiz3_if0'] = function(block) {
  var branch1 = Blockly.JavaScript.statementToCode(block, 'DO1');
  var branch2 = Blockly.JavaScript.statementToCode(block, 'DO2');
  var branch3 = Blockly.JavaScript.statementToCode(block, 'DO3');
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else if ( arr[i] == 60 ) {\n' + branch2 +
             '} else if ( arr[i] <  60 ) {\n' + branch3 + '}\n';
  return code;
};

Blockly.JavaScript['quiz3_if1'] = function(block) {
  var branch1 = Blockly.JavaScript.statementToCode(block, 'DO1');
  var branch2 = Blockly.JavaScript.statementToCode(block, 'DO2');
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'if ( arr[i] <  60 ) {\n' + branch1 +
             '} else if ( arr[i] <= 60 ) {\n' + branch2 + '}\n';
  return code;
};

Blockly.JavaScript['quiz3_if2'] = function(block) {
  var branch1 = Blockly.JavaScript.statementToCode(block, 'DO1');
  var branch2 = Blockly.JavaScript.statementToCode(block, 'DO2');
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'if ( arr[i] <= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.JavaScript['quiz3_if3'] = function(block) {
  var branch1 = Blockly.JavaScript.statementToCode(block, 'DO1');
  var branch2 = Blockly.JavaScript.statementToCode(block, 'DO2');
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};



// ↓ 自作

Blockly.JavaScript['input_test'] = function(block) {
  var value_a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'scanf("%d", a);\n';
  return code;
};
