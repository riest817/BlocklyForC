/**
2017/08/29 operation.js を新規作成
2017/09/04 編集
 */
'use strict';

goog.provide('Blockly.Flex.operation');

goog.require('Blockly.Flex');


Blockly.Flex['regular_expression_connection'] = function(block) {

  // var argument = Blockly.Flex.valueToCode(block, 'IF',  Blockly.Flex.ORDER_NONE); 2017/09/04 コメントアウト
  var argument = Blockly.Flex.statementToCode(block, 'IF');		// 2017/09/04 追加
  var branch = Blockly.Flex.statementToCode(block, 'THEN');
  var code = argument + '    { ' + branch + ' }';

  return code + '\n';
};

Blockly.Flex['operation'] = function(block) {
  // 未完成 2017/08/29
  var text = block.getFieldValue('TEXT');
  // var code = '{' + text + '}';  2017/09/04 コメントアウト
  var code = text;	// 2017/09/04 完成
  return code;
};