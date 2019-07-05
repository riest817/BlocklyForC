/**
19/06/12 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');

Blockly.Prolog['fact_definition0'] = function(block) {
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

Blockly.Prolog['fact_definition'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Prolog.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Prolog.statementToCode(block, 'DELTA',
        Blockly.Prolog.ORDER_COMMA) || 'null';
  var code = funcName +  '('  + branch + ').\n'; 

  // 定義リストのヘルパー関数と衝突しないように％を追加する。
  //Blockly.Prolog.definitions_['%' + funcName] = code;return null;
  return code;
};

