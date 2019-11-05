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
 * @fileoverview Generating JavaScript for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['variables_equal'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  return type + ' ' + varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['variables_dec'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + varName + ';\n';
};

Blockly.JavaScript['quiz_declaration1'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.JavaScript['quiz_declaration1_def'] = function(block) {
  var code = 'int i, ' + 'n;\n' +
             'int arr[5] = {0};\n\n';
  return code;
};

Blockly.JavaScript['quiz_declaration2_def'] = function(block) {
  var code = 'int i, ' + 'n;\n\n';
  return code;
};

Blockly.JavaScript['quiz_variable'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_variable = block.getFieldValue('VARIABLE');
  var code = dropdown_type + ' ' + text_variable + ';\n';
  return code;
};

Blockly.JavaScript['quiz_variable2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var varName = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = dropdown_type + ' ' + varName + ' = ' + value_b + ';\n';
  return code;
};
