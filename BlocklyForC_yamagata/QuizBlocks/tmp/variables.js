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

Blockly.JavaScript['quiz_variable_foundation'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  var dropdown_type = block.getFieldValue('TYPE');
  var arr = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
          Blockly.JavaScript.ORDER_NONE) || '0';
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

Blockly.JavaScript['prefix_syntax_first'] = function(block) {
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
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

Blockly.JavaScript['postfix_syntax_first'] = function(block) {
  var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
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
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX")
        .appendField(";");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.JavaScript['postfix_syntax'] = function(block) {
  var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  // TODO: Assemble JavaScript into code variable.
  var code = variable_var + dropdown_syntax;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//i = ++x;とかに対応
Blockly.Blocks['prefix_syntax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["++", "++"], ["--", "Dec"]]), "SYNTAX")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(";");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.JavaScript['prefix_syntax'] = function(block) {
  var dropdown_syntax = block.getFieldValue('SYNTAX');
  var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_syntax + variable_var;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
