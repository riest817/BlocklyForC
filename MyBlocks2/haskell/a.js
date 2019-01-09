Blockly.Blocks['controls_if_haskell'] = {
  /**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('IF')
        .setCheck('Boolean')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput('DO')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendValueInput('ELSE')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true);

    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
  }
};

Blockly.Haskell['controls_if_haskell'] = function(block) {
  // If/elseif/else condition.

  var argument = Blockly.Haskell.valueToCode(block, 'IF',
      Blockly.Haskell.ORDER_NONE) || 'false';  
  var branch1 = Blockly.Haskell.valueToCode(block, 'DO',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var branch2 = Blockly.Haskell.valueToCode(block, 'ELSE',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var code = 'if ' + argument + ' then ' + branch1 + ' else ' + branch2;

  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};