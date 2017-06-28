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
 * @fileoverview Generating JavaScript for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(block.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['variables_dec'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getTitleValue('TYPE')];
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + varName + ';\n';
};

Blockly.JavaScript['variables_selec'] = function(block) {
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var code = TYPES[block.getTitleValue('TYPE')];
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['quiz_declaration1'] = function(block) {
  var option = block.getTitleValue('option');
  // TODO: Assemble ' + language + ' into code variable.
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.JavaScript['quiz_declaration1_def'] = function(block) {
  var code = 'int i;\n' + 'int num;\n' + 'int sum;\n' + 'int tmp;\n' + 'int arr[5] = {0};\n\n';
  return code;
};

Blockly.JavaScript['quiz_declaration_n'] = function(block) {
  var code = 'int n = 0;\n\n';
  return code;
};