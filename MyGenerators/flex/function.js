/**
2017/08/28 function.js を新規作成
 */
'use strict';

goog.provide('Blockly.Flex.function');

goog.require('Blockly.Flex');


Blockly.Flex['yylex'] = function(block) {

  var code = '';

  code += 'int main (void) {\n';
  code += '  return yylex();\n';
  code += '}\n';

  return code;
};

