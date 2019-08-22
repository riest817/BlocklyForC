/**
19/07/10 新規作成

 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Msg["LISTS_HUE"] = 260;


Blockly.Blocks['lists'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_head);
    this.appendValueInput('ADD1');
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_middle);
    this.appendValueInput('ADD2');
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_end);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip("リストの値の範囲を表します。");
  }
};

Blockly.Blocks['lists_empty'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_empty);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip("空リストを表します。");
  }
};
