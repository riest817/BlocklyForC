Blockly.Blocks['quiz_foundation'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
  }
};


Blockly.C['quiz_foundation'] = function(block) {
  var value_name = Blockly.C.valueToCode(block, 'NAME', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_name + ';\n';
  return code;
};
/*
Blockly.Blocks['quiz_in_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", "Just"], [" + ", "Add"], [" - ", "Sub"], [" * ", "Mul"], [" / ", "Mod"], [" == ", "Eq"], ["+=", "AddAssign"], ["-=", "SubAssign"], ["*=", "MulAssign"], ["/=", "ModAssign"]]), "OP");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_in_compare'] = function(block) {
  var value_var1 = Blockly.C.valueToCode(block, 'Var1', Blockly.C.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.C.valueToCode(block, 'Var2', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2 + ';\n';
  return [code, Blockly.C.ORDER_NONE];
};
*/
