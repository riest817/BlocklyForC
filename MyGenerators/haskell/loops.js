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
 * @fileoverview Generating Haskell for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Haskell.loops');

goog.require('Blockly.Haskell');


Blockly.Haskell['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Haskell.valueToCode(block, 'TIMES',
        Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  branch = Blockly.Haskell.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.Haskell.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Haskell.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Haskell['controls_repeat'] =
    Blockly.Haskell['controls_repeat_ext'];

Blockly.Haskell['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Haskell.valueToCode(block, 'BOOL',
      until ? Blockly.Haskell.ORDER_LOGICAL_NOT :
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  branch = Blockly.Haskell.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Haskell['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Haskell.valueToCode(block, 'FROM',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Haskell.valueToCode(block, 'TO',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Haskell.valueToCode(block, 'BY',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  branch = Blockly.Haskell.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.Haskell.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Haskell.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Haskell.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Haskell.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
        incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + '; ' +
        variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.Haskell['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  branch = Blockly.Haskell.addLoopTrap(branch, block.id);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.Haskell.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.Haskell.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.Haskell.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Haskell['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};

Blockly.Haskell['quiz1_for'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var dropdown_option = block.getFieldValue('option');
  if (Blockly.Haskell.INFINITE_LOOP_TRAP) {
    branch = Blockly.Haskell.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code = 'for ( i = 0; i ' + dropdown_option + '; i++ ) { \n' + branch + '}\n';
  return code;
};

Blockly.Haskell['quiz2_while'] = function(block) {
  var dropdown_option = block.getFieldValue('option');
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = ' while ( ' + dropdown_option + ' ) {\n' + branch + '}\n';
  return code;
};

Blockly.Haskell['quiz3_for'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = 'for ( i = 0; i < n; i++ ) { \n' + branch + '}\n';
  return code;
};


Blockly.Haskell['for_custom_before'] = function(block) {
  var value_input1 = Blockly.Haskell.valueToCode(block, 'INPUT1', Blockly.Haskell.ORDER_ATOMIC);
  var value_input2 = Blockly.Haskell.valueToCode(block, 'INPUT2', Blockly.Haskell.ORDER_ATOMIC);
  var value_input3 = Blockly.Haskell.valueToCode(block, 'INPUT3', Blockly.Haskell.ORDER_ATOMIC);
  var statements_name = Blockly.Haskell.statementToCode(block, 'NAME');
  // TODO: Assemble Haskell into code variable.
  var code = 'for ( ' + value_input1 + ' ; ' + value_input2 + ' ; ' + value_input3 + ' ) {\n' +
             statements_name +
             '};\n';
};

Blockly.Haskell['quiz_for'] = function(block) {
  var value_expression1 = Blockly.Haskell.valueToCode(block, 'EXPRESSION1', Blockly.Haskell.ORDER_ATOMIC);
  var value_expression2 = Blockly.Haskell.valueToCode(block, 'EXPRESSION2', Blockly.Haskell.ORDER_ATOMIC);
  var value_expression3 = Blockly.Haskell.valueToCode(block, 'EXPRESSION3', Blockly.Haskell.ORDER_ATOMIC);
  var statements_statement = Blockly.Haskell.statementToCode(block, 'STATEMENT');
  var code = 'for (' + value_expression1 + ';' + value_expression2 + ';' + value_expression3 + ';) {\n' +
             statements_statement +
             '}\n';

  return code;
};
