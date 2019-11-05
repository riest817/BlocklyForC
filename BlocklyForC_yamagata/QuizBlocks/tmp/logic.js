Blockly.Blocks['quiz3_if0'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] > 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] == 60 ) {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] < 60 ) {");
    this.appendStatementInput("DO3");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if0'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var branch3 = Blockly.C.statementToCode(block, 'DO3');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else if ( arr[i] == 60 ) {\n' + branch2 +
             '} else if ( arr[i] <  60 ) {\n' + branch3 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if1'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] < 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] <= 60 ) {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if1'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <  60 ) {\n' + branch1 +
             '} else if ( arr[i] <= 60 ) {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if2'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] <= 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if2'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if3'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField('if ( arr[i] >= 60 ) {');
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if3'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz_if4'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if  ( n1 ")
        .appendField(new Blockly.FieldDropdown([[">", ">"], ["<", "<"], [">=", ">="], ["<=", "<="], ["==", "=="]]), "OPTION")
        .appendField(" n2 );");
    this.appendStatementInput("THEN");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("ELSE");
    this.appendDummyInput()
        .appendField("}");
  }
};

Blockly.C['quiz_if4'] = function(block) {
  var dropdown_option = block.getFieldValue('OPTION');
  var statements_then = Blockly.C.statementToCode(block, 'THEN');
  var statements_else = Blockly.C.statementToCode(block, 'ELSE');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if ( n1 ' + dropdown_option + ' n2 ) {\n'
                + statements_then
           + '} else {\n'
                + statements_else
           + '}\n';
};

Blockly.Blocks['quiz_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", " = "], [" + ", " + "], [" - ", " - "], [" * ", " * "], [" / ", " / "], [" > "," > "], [" < "," < "], [" >= "," >= "], [" <= "," <= "], [" & "," & "], [" | "," | "], [" && "," && "], [" || "," || "], [" == ", " == "], [" += ", " += "], [" -= ", " -= "], ["*=", "*="], [" /= ", " /= "]]), "OP");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_compare'] = function(block) {
  var value_var1 = Blockly.C.valueToCode(block, 'Var1', Blockly.C.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.C.valueToCode(block, 'Var2', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2 + ';\n';
  return code;
};

Blockly.Blocks['quiz_in_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", " = "], [" + ", " + "], [" - ", " - "], [" * ", " * "], [" / ", " / "], [" > "," > "], [" < "," < "], [" >= "," >= "], [" <= "," <= "], [" & "," & "], [" | "," | "], [" && "," && "], [" || "," || "], [" == ", " == "], [" += ", " += "], [" -= ", " -= "], ["*=", "*="], [" /= ", " /= "]]), "OP");
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
  var code = value_var1 + dropdown_op + value_var2;
  return [code, Blockly.C.ORDER_NONE];
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
  var code = value_var1 + dropdown_op + value_var2;
  return [code, Blockly.C.ORDER_NONE];
};
*/

Blockly.Blocks['quiz_if'] = {
  init: function() {
    this.appendValueInput("EXPR")
        .appendField("if  ( ");
    this.appendDummyInput()
        .appendField(")  {");
    this.appendStatementInput("A");
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if'] = function(block) {
  var value_expr = Blockly.C.valueToCode(block, 'EXPRESSION', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var code = 'if (' + value_expression + ') {\n' +
             statements_statement +
             '}\n';

  return code;
};

Blockly.Blocks['quiz_if_else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if (");
    this.appendValueInput("EXPR")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("B")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if_else'] = function(block) {
  var value_expr = Blockly.C.valueToCode(block, 'EXPR', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var statements_b = Blockly.C.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_expr + ') {\n' + statements_a + '\n} else {\n' + statements_b + '\n}\n';
  return code;
};

Blockly.Blocks['quiz_if_else_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if (");
    this.appendValueInput("EXPR1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} else if (");
    this.appendValueInput("EXPR2")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("B")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if_else_if'] = function(block) {
  var value_expr1 = Blockly.C.valueToCode(block, 'EXPR1', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var value_expr2 = Blockly.C.valueToCode(block, 'EXPR2', Blockly.C.ORDER_ATOMIC);
  var statements_b = Blockly.C.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_expr1 + ') {\n' + statements_a + '\n} else if (' + value_expr2 + ') {\n' + statements_b + '\n}\n';
  return code;
};
