/**
19/06/26 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');

Blockly.Prolog['rule_single'] = function(block) {
    // Call a procedure with a return value.
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Prolog.valueToCode(block, 'ADD' + i,
        Blockly.Prolog.ORDER_COMMA) || '_';
  }
  var code = block.getFieldValue('TEXT');
  code += '(' + args.join(', ') + ')';
  
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Prolog['rule_connection'] = function(block) {
    // Call a procedure with a return value.
  var args = [];
  
  var head = Blockly.Prolog.valueToCode(block, 'HEAD0',
        Blockly.Prolog.ORDER_COMMA) || '_';
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Prolog.valueToCode(block, 'ADD' + i,
        Blockly.Prolog.ORDER_COMMA) || '_';
  }
  var code = head + ':-' + args.join(', ') + '.';
  
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

