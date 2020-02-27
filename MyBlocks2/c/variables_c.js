/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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

 /**
 * 2017/07/05 新たに variables.js を作成
   2017/07/06以降保留中
 */
'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_new_c'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField("変数定義")
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["char", "char"], ["char*", "char*"]]), "TYPE")
        .appendField(new Blockly.FieldVariable(
        "n"), 'VAR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("変数を定義します。");
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
  },
  contextMenuType_: 'variables_set',
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },

  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};
/*
Blockly.Blocks['variables_set_c'] = {

  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.VARIABLES_SET,
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.variables.HUE,
      "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
      "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
    });
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};
*/


// 19/12/11
Blockly.Msg["VARIABLES_SET"] = "%1 = %2";

Blockly.Blocks['variables_set'] = {
    init: function() {
        this.jsonInit( {
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
              {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
              },
              {
                "type": "input_value",
                "name": "VALUE"
              }
            ],
            "previousStatement": "DECL",
            "nextStatement": "DECL",
            "style": "variable_blocks",
            "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
            "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
            "extensions": ["contextMenu_variableSetterGetter"]
          });

        // this.appendDummyInput()
        //     .appendField(new Blockly.FieldVariable(Blockly.Msg["VARIABLES_DEFAULT_NAME"]), "VAR");
        // this.appendValueInput('VALUE').appendField(' = ');
        // this.setPreviousStatement(true, "DECL");
        // this.setNextStatement(true, "DECL");
        // this.setInputsInline(true);
        // this.setOutput(false);
        // this.setColour(Blockly.Msg["VARIABLES_HUE"]);
        // this.setTooltip(Blockly.Msg["VARIABLES_SET_TOOLTIP"]);
        // this.setHelpUrl(Blockly.Msg["VARIABLES_SET_HELPURL"]);
        // this.setStyle("variable_blocks");
        // this.setExtensions(["contextMenu_variableSetterGetter"]);
    }
};

Blockly.Blocks['variables_equal_c'] = {
  // Variable setter.
  init: function() {
    var TYPES =
        [["int", "INT"],
         ["double", "DOUBLE"],
         ["float", "FLOAT"],
         ["char", "CHAR"]];
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(330);
    this.appendValueInput()
        .appendTitle(new Blockly.FieldDropdown(TYPES), "TYPE")
        .appendTitle(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_SET_ITEM), 'VAR')
        .appendTitle("=");
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

Blockly.C['variables_new_c'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value = block.getFieldValue('VAR');

  return dropdown_type + " " + value + ";\n";
};