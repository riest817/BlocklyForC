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

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


Blockly.Blocks['variables_get'] = {
  // Variable getter.
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.VARIABLES_GET_TITLE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
        .appendTitle(Blockly.Msg.VARIABLES_GET_TAIL);
    this.setOutput(true);
    //this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.setTooltip('変数の中の値を返します。');
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    this.contextMenuType_ = 'variables_set';
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getTitleValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlTitle = goog.dom.createDom('title', null, name);
    xmlTitle.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Blocks['variables_set'] = {
  // Variable setter.
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(330);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.Msg.VARIABLES_SET_TITLE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_SET_ITEM), 'VAR')
        .appendTitle(Blockly.Msg.VARIABLES_SET_TAIL);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setTooltip('変数の中に値を代入します。');
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};

Blockly.Blocks['variables_dec'] = {
  // Variable setter.
  init: function() {
    var TYPES =
        [["int", "INT"], 
         ["double", "DOUBLE"], 
         ["float", "FLOAT"], 
         ["char", "CHAR"]];
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(TYPES), "TYPE")
        .appendTitle(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_SET_ITEM), 'VAR');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setTooltip('変数の型を宣言します。');
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};

Blockly.Blocks['variables_selec'] = {
  init: function() {
    var TYPES =
        [["int", "INT"], 
         ["double", "DOUBLE"], 
         ["float", "FLOAT"], 
         ["char", "CHAR"]];
    this.setHelpUrl('http://www.example.com/');
    this.setColour(182);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(TYPES), "TYPE");
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Blocks['variables_line'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(182);
    this.appendValueInput('X1')
        .setCheck('Number')
        .appendTitle('X1');
    this.appendValueInput('Y1')
        .setCheck('Number')
        .appendTitle('Y1');
    this.appendValueInput('X2')
        .setCheck('Number')
        .appendTitle('kara')
        .appendTitle('X2');
    this.appendValueInput('Y2')
        .setCheck('Number')
        .appendTitle('Y2');
    //this.setOutput(true, 'Type');
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_declaration1'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle("int  ")
        .appendTitle(new Blockly.FieldDropdown([["i", "i"], ["n", "n"], ["num", "num"], ["sum", "sum"], ["tmp", "tmp"]]), "option")
        .appendTitle(";");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_declaration1_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle("int i, n;");
    this.appendDummyInput()
        .appendTitle("int arr[5] = {0};");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_declaration2_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle("int i, n;");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};