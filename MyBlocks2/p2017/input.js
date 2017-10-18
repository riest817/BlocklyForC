/*
2017/10/12 input.js 新規作成
*/
Blockly.Blocks['input_dropdown'] = {
  init: function() {
    this.setColour(0);
    this.jsonInit({ "message0": "scanf" });
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["char", "char"], ["char*", "char*"]]), "TYPE")
        .appendField(" ");
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("変数の入力");
  },

  getVars: function() {
    return [this.getFieldValue('VAR')];
  },

  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['input_mutator'] = {
  init: function() {
    this.setColour(0);
    this.jsonInit({ "message0": "scanf" });
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["char", "char"], ["char*", "char*"]]), "TYPE")
        .appendField(" ");
    //this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['output_create_join_item']));
    this.setTooltip("変数の入力");
  },

  getVars: function() {
    return [this.getFieldValue('VAR')];
  },

  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
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
    var containerBlock = workspace.newBlock('output_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('input_create_join_item');
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
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
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
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      /*this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));*/
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          //input.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.Blocks['input_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("結合");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['input_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("項目");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("入力項目を追加。");
    this.contextMenu = false;

  }
};

  /*
・myCBlocks.js に新しいブロックが生成する C 言語のソース:
    Blockly.C['〜'] = function(block) {
        〜
    }
  を追加する。
*/

// ↓ 自作

Blockly.C['input_dropdown'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'scanf("';
  
  if ( dropdown_type == 'int') { code += '%d'}
  else if ( dropdown_type == 'double') { code += '%f'}
  else if ( dropdown_type == 'char') { code += '%c'}
  else if ( dropdown_type == 'char*') { code += '%s'}
  code += '", ';
  if ( dropdown_type != 'char*') { code += '&'}
  code += value_b + ');\n';
  return code;
};

Blockly.C['input_mutator'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var arr = new Array(block.itemCount_);
  var code = 'scanf("';

  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
      Blockly.C.ORDER_NONE) || '0';
  }
  
  for (n = 0; n < block.itemCount_; n++) {
    if ( dropdown_type == 'int') { code += '%d '}
    else if ( dropdown_type == 'double') { code += '%f '}
    else if ( dropdown_type == 'char') { code += '%c '}
    else if ( dropdown_type == 'char*') { code += '%s '}
  }
  code += '"';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ';
    if ( dropdown_type != 'char*') { code += '&'}
    code += arr[n];
  }
  code += ');\n';
  return code;
};