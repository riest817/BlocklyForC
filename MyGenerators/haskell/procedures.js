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
 * 
 */

/**
 * @fileoverview Generating Haskell for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * 2017/07/13  Haskellにコード最適化
 */
'use strict';

goog.provide('Blockly.Haskell.procedures');

goog.require('Blockly.Haskell');


Blockly.Haskell['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Haskell.statementToCode(block, 'STACK');
  if (Blockly.Haskell.STATEMENT_PREFIX) {
    branch = Blockly.Haskell.prefixLines(
        Blockly.Haskell.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Haskell.INDENT) + branch;
  }
  if (Blockly.Haskell.INFINITE_LOOP_TRAP) {
    branch = Blockly.Haskell.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Haskell.valueToCode(block, 'RETURN',
      Blockly.Haskell.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = ' ' + returnValue + '\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Haskell.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = funcName + ' ' + args.join(' ') + ' =' +
      branch + returnValue + '';
  code = Blockly.Haskell.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Haskell.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Haskell['procedures_defnoreturn'] =
    Blockly.Haskell['procedures_defreturn'];

Blockly.Haskell['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || 'null';
  }
  var code = funcName + ' ' + args.join(' ') + '';
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || 'null';
  }
  var code = funcName + ' ' + args.join(' ') + '';
  return code;
};

Blockly.Haskell['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Haskell.valueToCode(block, 'CONDITION',
      Blockly.Haskell.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Haskell.valueToCode(block, 'VALUE',
        Blockly.Haskell.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
