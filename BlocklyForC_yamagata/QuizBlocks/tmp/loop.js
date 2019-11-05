Blockly.Blocks['quiz_for'] = {
  init: function() {
    this.appendValueInput("EXPR1")
        .appendField("for  (");
    this.appendValueInput("EXPR2")
        .appendField(";");
    this.appendValueInput("EXPR3")
        .appendField(";");
    this.appendDummyInput()
        .appendField("; )  {");
    this.appendStatementInput("A");
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
  }
};

Blockly.JavaScript['quiz_for'] = function(block) {
  var value_expr1 = Blockly.JavaScript.valueToCode(block, 'EXPR1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_expr2 = Blockly.JavaScript.valueToCode(block, 'EXPR2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_expr3 = Blockly.JavaScript.valueToCode(block, 'EXPR3', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_a = Blockly.JavaScript.statementToCode(block, 'A');
  var code = 'for (' + value_expr1 + ';' + value_expr2 + ';' + value_expr3 + ';) {\n' +
             statements_a +
             '}\n';

  return code;
};

Blockly.Blocks['quiz_while'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("while(");
    this.appendValueInput("EXPR")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
  }
};

Blockly.JavaScript['quiz_while'] = function(block) {
  var value_expr = Blockly.JavaScript.valueToCode(block, 'EXPR', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_a = Blockly.JavaScript.statementToCode(block, 'A');
  // TODO: Assemble JavaScript into code variable.
  var code = 'while(' + value_expr + ') {\n' + statements_a + '\n}\n';
  return code;
};
