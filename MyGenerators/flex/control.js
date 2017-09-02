/**
2017/08/28 control.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.control');

goog.require('Blockly.Flex');


Blockly.Flex['first_flex'] = function(block) {

  var branch0 = Blockly.Flex.statementToCode(block, 'DO0');
  var branch1 = Blockly.Flex.statementToCode(block, 'DO1');
  var branch2 = Blockly.Flex.statementToCode(block, 'DO2');
  var code = '';

  code += '%{\n';
  code += '#define YY_SKIP_YYWRAP\n';
  code += 'int yywrap(void) { return 1; }\n';
  code += '%}\n';
  code += branch0 + '\n';
  code += '%option always-interactive\n';
  code += '%%\n';
  code += branch1 + '\n';
  code += '%%\n';
  code += branch2 + '\n';

  return code;

};
