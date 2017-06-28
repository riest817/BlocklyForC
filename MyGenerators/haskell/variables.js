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
  return varName + ' = ' + argument0 + ';\n';
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
  return type + ' ' + varName + ' = ' + argument0 + ';\n';
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
  return type + ' ' + varName + ';\n';
};

Blockly.Haskell['quiz_declaration1'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.Haskell['quiz_declaration1_def'] = function(block) {
  var code = 'int i, ' + 'n;\n' +
             'int arr[5] = {0};\n\n';
  return code;
};

Blockly.Haskell['quiz_declaration2_def'] = function(block) {
  var code = 'int i, ' + 'n;\n\n';
  return code;
};

Blockly.Haskell['quiz_variable'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_variable = block.getFieldValue('VARIABLE');
  var code = dropdown_type + ' ' + text_variable + ';\n';
  return code;
};

Blockly.Haskell['quiz_variable2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  var varName = Blockly.Haskell.variableDB_.getName(
                block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = dropdown_type + ' ' + varName + ' = ' + value_b + ';\n';
  return code;
};
