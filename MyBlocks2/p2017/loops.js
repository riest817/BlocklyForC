/**
2017/10/26 p2017\loops.js 新規作成
 */
'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.loops.HUE = 120;


Blockly.Blocks['controls_do_while'] = {
  /**
   * Block for 'do while/until' loop.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
         [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendStatementInput('DO')
        .appendField("実行");
    this.appendValueInput('BOOL')
        .setCheck('Boolean')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('MODE');
      var TOOLTIPS = {
        'WHILE': "値がtrueの間、いくつかのステートメントを実行する。",
        'UNTIL': "値がfalseの間、いくつかのステートメントを実行する。"
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.C['controls_do_while'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.C.valueToCode(block, 'BOOL',
      until ? Blockly.C.ORDER_LOGICAL_NOT :
      Blockly.C.ORDER_NONE) || '0';
  var branch = Blockly.C.statementToCode(block, 'DO');
  branch = Blockly.C.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'do {\n' + branch + '} while (' + argument0 + ');\n' ;
};

