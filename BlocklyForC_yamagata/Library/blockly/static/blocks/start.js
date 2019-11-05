﻿/**
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
        .appendTitle('int main(void)');
    this.appendStatementInput('DO')
        .appendTitle('');
    this.setTooltip('初めにこのブロックを設置してください。');
  }
};

Blockly.Blocks['quiz_start_main'] = {
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendTitle("int main(void) {");
    this.appendStatementInput("DO");
    this.appendDummyInput()
        .appendTitle("  return 0;");
    this.appendDummyInput()
        .appendTitle("}");
    this.setTooltip('');
  }
};