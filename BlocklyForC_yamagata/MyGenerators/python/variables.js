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
 * @fileoverview Generating C for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python.variables');

goog.require('Blockly.Python');


Blockly.Python['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + '\n';
};

Blockly.Python['variables_equal'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_ASSIGNMENT) || '0';
  return type + ' ' + varName + ' = ' + argument0 + '\n';
};

Blockly.Python['variables_dec'] = function(block) {
  // Variable setter.
  var TYPES = {
    INT: 'int',
    DOUBLE: 'double',
    FLOAT: 'float',
    CHAR: 'char'
  };
  var type = TYPES[block.getFieldValue('TYPE')];
  var varName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return type + ' ' + varName + '\n';
};