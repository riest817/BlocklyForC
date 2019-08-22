/**
19/07/10 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');

Blockly.Prolog['lists'] = function(block) {
    // Call a procedure with a return value.
  
  var arg1 = Blockly.Prolog.valueToCode(block, 'ADD1',
        Blockly.Prolog.ORDER_COMMA) || '_';
  var arg2 = Blockly.Prolog.valueToCode(block, 'ADD2',
        Blockly.Prolog.ORDER_COMMA) || '_';
  var code = '[' + arg1 + '|' + arg2 + ']';
  
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Prolog['lists_empty'] = function(block) {
    // Call a procedure with a return value.
  var code = '[]';
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

