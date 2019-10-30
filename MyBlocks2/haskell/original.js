/*
2017/12/05 haskell\original.js 新規作成
18/01/16 ['emer_block'] 作成
*/

Blockly.Blocks['pattern_match'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(new Blockly.FieldTextInput(''), 'NAME');
    //this.setOutput(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.logic.HUE);
    // Tooltip is set in domToMutation.
    this.setHelpUrl("関数によるパターンマッチングを行います。");
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    //this.arguments_.length = this.arguments_.length - 1;
    statement_f = true;
  },
  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_:
      Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  //updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  updateShape_: function() {
    //this.arguments_.length--;   // 17/12/05 "procedures_defreturn"のブロックがもう一つ作成されるため、コメントアウト
    for (var i = 0; i < this.arguments_.length-1; i++) {  // 17/12/05 this.arguments_.lengthに-1
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length-1) { // 17/12/05 this.arguments_.lengthに-1
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    if (statement_f) {
      this.jsonInit({
        "message0": "式 ===> %1",
        "args0": [
          {
            "type": "input_value",
            "name": "DELTA",
            //"check": "Number"   // 17/12/12 コメントアウト
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": Blockly.Blocks.math.HUE,
        "helpUrl": Blockly.Msg.MATH_CHANGE_HELPURL
      });
      statement_f = false;
    }
  },  

  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
  onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
  customContextMenu:
      Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
  defType_: 'procedures_defreturn'
};

Blockly.Blocks['emer_block'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl();
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendValueInput('VALUE');
    this.setOutput(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ブロックの形状で接続できないとき使う");
  }
};


