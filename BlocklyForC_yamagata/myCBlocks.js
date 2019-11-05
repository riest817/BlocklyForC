Blockly.Blocks['printf_join'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
/*    this.appendDummyInput()
        .appendField("printf(\" ")
        .appendField(new Blockly.FieldTextInput("%)d\\n"), "VALUE");
*/    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['printf_create_join_item']));
    this.setTooltip("使用できる引数の数は変更できます");
  },
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('printf_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('printf_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      if (this.getInput('TEXT')) { this.removeInput('TEXT'); }
      if (this.getInput('END')) { this.removeInput('END'); }
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("printf(\"%d\\n\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(",");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.Blocks['printf_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField("join");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['printf_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField("item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;

  }
};

Blockly.Blocks['quiz_variable2'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["float", "float"]]), "TYPE")
        .appendField(" ");
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
        .appendField(" = ");
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("変数の宣言");
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};



Blockly.C['quiz_print1'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble C into code variable.
  var code = 'printf("%d\\n", ' + text_name + ' );\n';
  return code;
};

Blockly.C['printf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'printf("%d\\n"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;
};

Blockly.C['quiz_declaration1'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.C['quiz_declaration1_def'] = function(block) {
  var code = 'int i, ' + 'n;\n' +
             'int arr[5] = {0};\n\n';
  return code;
};

Blockly.C['quiz_declaration2_def'] = function(block) {
  var code = 'int i, ' + 'n;\n\n';
  return code;
};

Blockly.C['quiz_variable'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_variable = block.getFieldValue('VARIABLE');
  var code = dropdown_type + ' ' + text_variable + ';\n';
  return code;
};

Blockly.C['quiz_variable2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var varName = Blockly.C.variableDB_.getName(
                block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = dropdown_type + ' ' + varName + ' = ' + value_b + ';\n';
  return code;
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

Blockly.C['quiz3_if1'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <  60 ) {\n' + branch1 +
             '} else if ( arr[i] <= 60 ) {\n' + branch2 + '}\n';
  return code;
};

Blockly.C['quiz3_if2'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.C['quiz3_if3'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};


Blockly.C['quiz_if4'] = function(block) {
  var dropdown_option = block.getFieldValue('OPTION');
  var statements_then = Blockly.C.statementToCode(block, 'THEN');
  var statements_else = Blockly.C.statementToCode(block, 'ELSE');
  // TODO: Assemble C into code variable.
  var code = 'if ( n1 ' + dropdown_option + ' n2 ) {\n'
                + statements_then
           + '} else {\n'
                + statements_else
           + '}\n';
};

Blockly.C['quiz_if'] = function(block) {
  var value_expression = Blockly.C.valueToCode(block, 'EXPRESSION', Blockly.C.ORDER_ATOMIC);
  var statements_statement = Blockly.C.statementToCode(block, 'STATEMENT');
  var code = 'if (' + value_expression + ') {\n' +
             statements_statement +
             '}\n';

  return code;
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

Blockly.C['quiz2_while'] = function(block) {
  var dropdown_option = block.getFieldValue('option');
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = ' while ( ' + dropdown_option + ' ) {\n' + branch + '}\n';
  return code;
};

Blockly.C['quiz3_for'] = function(block) {
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = 'for ( i = 0; i < n; i++ ) { \n' + branch + '}\n';
  return code;
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

Blockly.C['quiz_for'] = function(block) {
  var value_expression1 = Blockly.C.valueToCode(block, 'EXPRESSION1', Blockly.C.ORDER_ATOMIC);
  var value_expression2 = Blockly.C.valueToCode(block, 'EXPRESSION2', Blockly.C.ORDER_ATOMIC);
  var value_expression3 = Blockly.C.valueToCode(block, 'EXPRESSION3', Blockly.C.ORDER_ATOMIC);
  var statements_statement = Blockly.C.statementToCode(block, 'STATEMENT');
  var code = 'for (' + value_expression1 + ';' + value_expression2 + ';' + value_expression3 + ';) {\n' +
             statements_statement +
             '}\n';

  return code;
};

Blockly.C['quiz_start_main'] = function(block) {
  var do0 = Blockly.C.statementToCode(block, 'DO');
  var temp0 = '#include  <stdio.h>';
  var temp1 = 'int main(void)';
  var temp2 = '\n' + temp0 + '\n' + '\n' + temp1 + '\n' + '{' + '\n' + do0 + '  return 0;' + '\n' + '}\n';
  var code = temp2;
  return code;
};

Blockly.C['quiz_printf2'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'printf("%d\n", ' + option + ' );\n';
  return code;
};

Blockly.C['quiz_printf2_pre'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[0]);\nprintf(\"%d\\n\", arr[1]);\nprintf(\"%d\\n\", arr[2]);\nprintf(\"%d\\n\", arr[3]);\nprintf(\"%d\\n\", arr[4]);\n';
  return code;
};

Blockly.C['quiz_printf_arr'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[i]);\n';
  return code;
};

Blockly.C['quiz_printf_n'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[n]);\n';
  return code;
};

Blockly.C['quiz_printf_i'] = function(block) {
  var code = 'printf(\"%d\\n\", i);\n';
  return code;
};

Blockly.C['quiz3_printf1'] = function(block) {
  var code = 'printf(\"%d : Good\\n\", arr[i]);\n';
  return code;
};

Blockly.C['quiz3_printf2'] = function(block) {
  var code = 'printf(\"%d : Bad\\n\", arr[i]);\n';
  return code;
};

Blockly.C['quiz_scanf_n'] = function(block) {
  var code = 'scanf(\"%d\", &n);\n';
  return code;
};

Blockly.C['quiz_scanf_arr'] = function(block) {
  var code = 'scanf(\"%d\", &arr[i]);\n';
  return code;
};

Blockly.C['quiz_process_a'] = function(block) {
  var code = '//----------------\n' + '//  ProcessA\n' + '//----------------\n\n';
  return code;
};

Blockly.C['quiz_frame'] = function(block) {
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = branch;
  return code;
};

Blockly.C['quiz_print1'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble C into code variable.
  var code = 'printf("%d\\n", ' + text_name + ' );\n';
  return code;
};

Blockly.C['printf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'printf("%d\\n"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;
};

Blockly.C['quiz_declaration1'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.C['quiz_declaration1_def'] = function(block) {
  var code = 'int i, ' + 'n;\n' +
             'int arr[5] = {0};\n\n';
  return code;
};

Blockly.C['quiz_declaration2_def'] = function(block) {
  var code = 'int i, ' + 'n;\n\n';
  return code;
};

Blockly.C['quiz_variable'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_variable = block.getFieldValue('VARIABLE');
  var code = dropdown_type + ' ' + text_variable + ';\n';
  return code;
};

Blockly.C['quiz_variable2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var varName = Blockly.C.variableDB_.getName(
                block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = dropdown_type + ' ' + varName + ' = ' + value_b + ';\n';
  return code;
};
