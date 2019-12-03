Blockly.Blocks['printf_join2'] = {
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
    this.setTooltip("引数の数を変えることができます。");
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
    if (this.itemCount_ == -1) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("printf(\"")
        .appendField(new Blockly.FieldTextInput("%d\\n"), "INPUT")
        .appendField("\"");
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

Blockly.JavaScript['printf_join2'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
          Blockly.JavaScript.ORDER_NONE) || '0';
    }
    code = 'printf("' + text_input + '"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;


};

Blockly.Blocks['quiz_puts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("puts(\"")
        .appendField(new Blockly.FieldTextInput(""), "INPUT")
        .appendField("\");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.JavaScript['quiz_puts'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'puts(\"' + text_input + '\");\n';
  return code;
};

Blockly.Blocks['scanf_join'] = {
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
    this.setTooltip("引数の数を変えることができます。");
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
    if (this.itemCount_ == -1) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("scanf(\"")
        .appendField(new Blockly.FieldTextInput("%d"), "INPUT")
        .appendField("\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(", &");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.JavaScript['scanf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
          Blockly.JavaScript.ORDER_NONE) || '0';
    }
    code = 'scanf("' + text_input + '"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', &' + arr[n];
  }
  code += ');\n';
    return code;


};
