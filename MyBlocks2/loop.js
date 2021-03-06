/*
2017/11/16 山形さんから頂いたloop.js
*/

//下に行くほど新しい
Blockly.Blocks['quiz1_for'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField("for ( i = 0; i")
        .appendField(new Blockly.FieldDropdown([["> 5", "> 5"], ["< 5", "< 5"], [">= 5", ">= 5"], ["<= 5", "<= 5"]]), "option")
        .appendField("; i++ ) {");
    this.appendStatementInput("DO")
        .appendField("");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz1_for'] = function(block) {
  var branch = Blockly.C.statementToCode(block, 'DO');
  var dropdown_option = block.getFieldValue('option');
  if (Blockly.C.INFINITE_LOOP_TRAP) {
    branch = Blockly.C.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code = 'for ( i = 0; i ' + dropdown_option + '; i++ ) { \n' + branch + '}\n';
  return code;
};

Blockly.Blocks['quiz2_while'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField("while ( ")
        .appendField(new Blockly.FieldDropdown([["n", "n"], ["n > 0", "n > 0"], ["n < 0", " n < 0"]]), "option")
        .appendField(" ) {");
    this.appendStatementInput("DO")
        .appendField("");
        this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz2_while'] = function(block) {
  var dropdown_option = block.getFieldValue('option');
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = ' while ( ' + dropdown_option + ' ) {\n' + branch + '}\n';
  return code;
};

Blockly.Blocks['quiz3_for'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("for ( i = 0; i < n; i++ ) {");
    this.appendStatementInput("DO");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_for'] = function(block) {
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = 'for ( i = 0; i < n; i++ ) { \n' + branch + '}\n';
  return code;
};

Blockly.Blocks['for_custom_before'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for ( ");
    this.appendValueInput("INPUT1");
    this.appendValueInput("INPUT2")
        .appendField(";");
    this.appendValueInput("INPUT3")
        .appendField(";");
    this.appendDummyInput()
        .appendField("; )  {");
    this.appendStatementInput("NAME");
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setColour(120);
    this.setTooltip('');
    //this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.C['for_custom_before'] = function(block) {
  var value_input1 = Blockly.C.valueToCode(block, 'INPUT1', Blockly.C.ORDER_ATOMIC);
  var value_input2 = Blockly.C.valueToCode(block, 'INPUT2', Blockly.C.ORDER_ATOMIC);
  var value_input3 = Blockly.C.valueToCode(block, 'INPUT3', Blockly.C.ORDER_ATOMIC);
  var statements_name = Blockly.C.statementToCode(block, 'NAME');
  // TODO: Assemble C into code variable.
  var code = 'for ( ' + value_input1 + ' ; ' + value_input2 + ' ; ' + value_input3 + ' ) {\n' +
             statements_name +
             '};\n';
};

//以下はHaskellで使用するブロック


Blockly.Blocks['quiz_for'] = {
  init: function() {
    this.appendValueInput("EXPR1")
        .appendField("for  (");
    this.appendValueInput("EXPR2")
        .appendField(";");
    this.appendValueInput("EXPR3")
        .appendField(";");
    this.appendDummyInput()
        .appendField(" )  {");
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

Blockly.C['quiz_for'] = function(block) {
  var value_expr1 = Blockly.C.valueToCode(block, 'EXPR1', Blockly.C.ORDER_NONE);
  var value_expr2 = Blockly.C.valueToCode(block, 'EXPR2', Blockly.C.ORDER_NONE);
  var value_expr3 = Blockly.C.valueToCode(block, 'EXPR3', Blockly.C.ORDER_NONE);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var code = 'for (' + value_expr1 + ';' + value_expr2 + ';' + value_expr3 + ') {\n' +
             statements_a +
             '}\n';

  return code;
};

Blockly.Blocks['quiz_for_simple'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null)
        .appendField("for (")
        .appendField(new Blockly.FieldVariable("item"), "VAR1")
        .appendField("=");
    this.appendValueInput("B")
        .setCheck(null)
        .appendField("; ")
        .appendField(new Blockly.FieldVariable("item"), "VAR2")
        .appendField(new Blockly.FieldDropdown([["==", "=="], ["<", "<"], [">", ">"], ["<=", "<="], [">=", ">="]]), "OPERATOR1");
    this.appendDummyInput()
        .appendField("; ")
        .appendField(new Blockly.FieldVariable("item"), "VAR3")
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "--"]]), "OPERATOR2")
        .appendField(")  {");
    this.appendStatementInput("C");
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
  }
};

Blockly.C['quiz_for_simple'] = function(block) {
  var variable_var1 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
  var value_A = Blockly.C.valueToCode(block, 'A', Blockly.C.ORDER_ATOMIC);
  var variable_var2 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR2'), Blockly.Variables.NAME_TYPE);
  var dropdown_operator1 = block.getFieldValue('OPERATOR1');
  var value_B = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var variable_var3 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR3'), Blockly.Variables.NAME_TYPE);
  var dropdown_operator2 = block.getFieldValue('OPERATOR2');
  var statements_C = Blockly.C.statementToCode(block, 'C');

  var code = 'for ( ' + variable_var1 + ' = ' + value_A + '; ' + variable_var2 + ' ' + dropdown_operator1 + ' ' + value_B + '; ' + variable_var3 + dropdown_operator2 + ') {\n' + statements_C + '}\n';
  return code;
};

Blockly.Blocks['quiz_for_simple2'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null)
        .appendField("for (")
        .appendField(new Blockly.FieldVariable("item"), "VAR1")
        .appendField("=");
    this.appendValueInput("B")
        .setCheck(null)
        .appendField("; ")
        .appendField(new Blockly.FieldVariable("item"), "VAR2")
        .appendField(new Blockly.FieldDropdown([["==", "=="], ["<", "<"], [">", ">"], ["<=", "<="], [">=", ">="]]), "OPERATOR1");
    this.appendValueInput("C")
        .setCheck(null)
        .appendField("; ")
        .appendField(new Blockly.FieldVariable("item"), "VAR3")
        .appendField(" += ");
    this.appendDummyInput()
        .appendField(")  {");
    this.appendStatementInput("D")
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

Blockly.C['quiz_for_simple'] = function(block) {
  var variable_var1 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
  var value_A = Blockly.C.valueToCode(block, 'A', Blockly.C.ORDER_ATOMIC);
  var variable_var2 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR2'), Blockly.Variables.NAME_TYPE);
  var dropdown_operator1 = block.getFieldValue('OPERATOR1');
  var value_B = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var variable_var3 = Blockly.C.variableDB_.getName(block.getFieldValue('VAR3'), Blockly.Variables.NAME_TYPE);
  var value_C = Blockly.C.valueToCode(block, 'C', Blockly.C.ORDER_ATOMIC);
  var statements_D = Blockly.C.statementToCode(block, 'D');
  // TODO: Assemble C into code variable.
  var code = 'for ( ' + variable_var1 + ' = ' + value_A + ';' + variable_var2 + dropdown_operator1 + value_B + ';' + variable_var3 + ' += ' + value_C + ') {\n' + statements_D + '}\n';
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

Blockly.C['quiz_while'] = function(block) {
  var value_expr = Blockly.C.valueToCode(block, 'EXPR', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  // TODO: Assemble C into code variable.
  var code = 'while(' + value_expr + ') {\n' + statements_a + '\n}\n';
  return code;
};

Blockly.Blocks['do_while'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("do {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} while (");
    this.appendValueInput("condExp")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
  }
};

Blockly.C['do_while'] = function(block) {
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var value_condexp = Blockly.C.valueToCode(block, 'condExp', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble C into code variable.
  var code = 'do {\n' + statements_a + '\n} while (' + value_condexp + ');\n';
  return code;
};
