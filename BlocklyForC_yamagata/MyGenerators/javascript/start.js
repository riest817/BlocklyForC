'use strict';

goog.provide('Blockly.JavaScript.start');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['start_main'] = function(block) {
  var do0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var temp0 = '#include  <stdio.h>';
  var temp1 = 'int main(void)';
  var temp2 = temp0 + '\n' + '\n' + temp1 + '\n' + '{' + '\n' + do0 + '  return 0;' + '\n' + '}\n';
  var code = temp2;
  return code;
};

Blockly.JavaScript['quiz_start_main'] = function(block) {
  var do0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var temp0 = '#include  <stdio.h>';
  var temp1 = 'int main(void)';
  var temp2 = '\n' + temp0 + '\n' + '\n' + temp1 + '\n' + '{' + '\n' + do0 + '  return 0;' + '\n' + '}\n';
  var code = temp2;
  return code;
};