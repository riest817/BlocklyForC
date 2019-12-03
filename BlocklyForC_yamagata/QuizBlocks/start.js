/**
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.start');

goog.require('Blockly.Blocks');


Blockly.Blocks['start_main'] = {
  init: function() {
    this.setColour(180);
    var name = Blockly.Procedures.findLegalName(
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendField('int main(void)');
    this.appendStatementInput('DO')
        .appendField('');
    this.setTooltip('初めにこのブロックを設置してください。');
  }
};

Blockly.C['start_main'] = function(block) {
  var do0 = Blockly.C.statementToCode(block, 'DO');
  var temp0 = '#include  <stdio.h>';
  var temp1 = 'int main(void)';
  var temp2 = temp0 + '\n' + '\n' + temp1 + '\n' + '{' + '\n' + do0 + '  return 0;' + '\n' + '}\n';
  var code = temp2;
  return code;
};

Blockly.Blocks['quiz_start_main'] = {
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField("int main(void) {");
    this.appendStatementInput("DO");
    this.appendDummyInput()
        .appendField("  return 0;");
    this.appendDummyInput()
        .appendField("}");
    this.setTooltip('');
  }
};

Blockly.C['quiz_start_main'] = function(block) {
  var do0 = Blockly.C.statementToCode(block, 'DO');
  var temp0 = '#include  <stdio.h>';
  var temp1 = 'int main(void)';
  var temp2 = '\n' + temp0 + '\n' + '\n' + temp1 + '\n' + '{' + '\n' + do0 + '  return 0;' + '\n' + '}\n';
  var code = temp2;
  return code;
};

Blockly.Python['quiz_start_main'] = function(block) {

};
