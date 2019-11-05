Blockly.Blocks['quiz_declaration1'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int  ")
        .appendField(new Blockly.FieldDropdown([["i", "i"], ["n", "n"], ["num", "num"], ["sum", "sum"], ["tmp", "tmp"]]), "option")
        .appendField(";");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_declaration1'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'int ' + option + ';\n';
  return code;
};

Blockly.Blocks['quiz_declaration1_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int i, n;");
    this.appendDummyInput()
        .appendField("int arr[5] = {0};");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_declaration1_def'] = function(block) {
  var code = 'int i, ' + 'n;\n' +
             'int arr[5] = {0};\n\n';
  return code;
};

Blockly.Blocks['quiz_declaration2_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int i, n;");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_declaration2_def'] = function(block) {
  var code = 'int i, ' + 'n;\n\n';
  return code;
};

Blockly.Blocks['quiz_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["char", "char"], ["float", "float"]]), "TYPE")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['quiz_variable'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_type + ' ' + variable_var + ';\n';
  return code;
};

//以下はHaskellで使用するブロック

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
    this.appendDummyInput().appendField(";");
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

Blockly.C['quiz_variable2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var varName = Blockly.C.variableDB_.getName(
                block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = dropdown_type + ' ' + varName + ' = ' + value_b + ';\n';
  return code;
};

Blockly.Blocks['quiz_variable3'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int","int"], ["double","double"], ["char","char"], ["float","float"]]), "TYPE")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['quiz_variable3'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_type + ' ' + variable_var + ';\n';
  return code;
};

Blockly.Blocks['quiz_variable_foundation'] = {
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
    this.setTooltip("使用できる引数の数は変更できま��?");
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
       input = this.appendDummyInput('TEXT').appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["float", "float"]]), "TYPE");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
        if (i == 0) { input = this.appendValueInput('ADD' + i).appendField(" "); }
        else {
                input = this.appendValueInput('ADD' + i)
                            .appendField(",");
             }
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

Blockly.C['quiz_variable_foundation'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  var dropdown_type = block.getFieldValue('TYPE');
  var arr = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
  }
  code = dropdown_type + " " + arr[0];
  for (n = 1; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ';\n';
    return code;


};

//++a;,--a;だけに対応
Blockly.Blocks['prefix_syntax_first'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['prefix_syntax_first'] = function(block) {
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_syntax + variable_var + ';\n';
  return code;
};

//i++; i--;だけに対応
Blockly.Blocks['postfix_syntax_first'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['postfix_syntax_first'] = function(block) {
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  // TODO: Assemble JavaScript into code variable.
  var code = variable_var + dropdown_syntax + ';\n';
  return code;
};

//i = x++;とかに対応
Blockly.Blocks['postfix_syntax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['postfix_syntax'] = function(block) {
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  // TODO: Assemble JavaScript into code variable.
  var code = variable_var + dropdown_syntax;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.C.ORDER_NONE];
};

//i = ++x;とかに対応
Blockly.Blocks['prefix_syntax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['prefix_syntax'] = function(block) {
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_syntax + variable_var;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['quiz_cast'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("(")
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["float", "float"]]), "TYPE")
        .appendField(")");
    this.appendValueInput("EXP")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.C['quiz_cast'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_exp = Blockly.C.valueToCode(block, 'EXP', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '(' + dropdown_type + ')' + value_exp;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.C.ORDER_NONE];
};

Blockly.Blocks['unop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["~","~"], ["*","*"], ["!","!"]]), "TYPE")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['unop'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_type + variable_var + ';\n';
  return code;
};

Blockly.Blocks['in_unop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["~","~"], ["*","*"], ["!","!"]]), "TYPE")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.setOutput(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['in_unop'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_type + variable_var + ' ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, 0];
};
