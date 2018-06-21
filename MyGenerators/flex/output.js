/**
2017/09/05 output.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.output');

goog.require('Blockly.Flex');

Blockly.Flex['printf'] = function(block) {

  var text = block.getFieldValue('TEXT');

  text = text.replace(/</g, '&lt;');  // 18/06/14
  text = text.replace(/>/g, '&gt;');  // 18/06/14

  var code = 'printf("' + text + '"); ';
  return code;
};

Blockly.Flex['putchar'] = function(block) {

  var text = block.getFieldValue('TEXT');
  text = text.replace(/</g, '&lt;');  // 18/06/14
  text = text.replace(/>/g, '&gt;');  // 18/06/14
  var code = 'putchar(\'' + text + '\'); ';
  return code;
};

Blockly.Flex['output_dropdown'] = function(block) {

  var OPERATORS = {
    'printf': 'printf',
    'putchar': 'putchar',
  };
  var operator = OPERATORS[block.getFieldValue('TYPE')];
  var text = block.getFieldValue('TEXT');
  text = text.replace(/</g, '&lt;');  // 18/06/14
  text = text.replace(/>/g, '&gt;');  // 18/06/14
  var code = '';
  if ( operator == 'printf' ) { code += 'printf("' + text + '"); '; }
  else if ( operator == 'putchar' ) { code += 'putchar(\'' + text + '\'); '; }
  return code;
};

Blockly.Flex['echo'] = function(block) {

  var code = 'ECHO; ';
  return code;
};
