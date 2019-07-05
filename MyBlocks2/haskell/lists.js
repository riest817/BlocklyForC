/**
17/12/13 新規作成
18/01/10 内包表記ブロック ['inner_table'] 作成    192行目~
18/01/10 ['lists_group'] ['lists_range'] 作成
18/12/20 ['lists_connection'] 作成
19/01/30 ['lists_create_with_haskell'] 移動, 一部表記切り替え対応
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Msg["LISTS_HUE"] = 260;

Blockly.Blocks['lists_container'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput('HEAD')
        .appendField(Blockly.Msg.lists_container_head);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['lists_create_join_item']));
    this.setTooltip("リストを表します。");
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
    var containerBlock = workspace.newBlock('lists_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_join_item');
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
      this.appendDummyInput('HEAD')
          .appendField(Blockly.Msg.lists_container_head);
      this.setOutput(true);
      this.setColour(Blockly.Msg["LISTS_HUE"]);
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("項目数0では使用できません");
      this.removeInput('HEAD');
      this.setOutput(false);
      //this.setColour(500);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if ( i > 0 ) {
          input.appendField(Blockly.Msg.lists_container_middle);
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

// 18/12/20
Blockly.Blocks['lists_connection'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_connection_head);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['lists_create_join_item']));
    this.setTooltip("リスト同士を連結できます。");
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
    var containerBlock = workspace.newBlock('lists_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_join_item');
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
      this.appendDummyInput('EMPTY');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if ( i > 0 ) {
          input.appendField(Blockly.Msg.lists_connection_middle);
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
// 18/12/20 ここまで

Blockly.Blocks['lists_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField("結合");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField("項目");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("関数へ引数を追加");
    this.contextMenu = false;
  }
};

Blockly.Haskell['lists_container'] = function(block) {
    // Call a procedure with a return value.
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ADD' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = '(' + args.join(':') + ')';
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

// 18/12/20 
Blockly.Haskell['lists_connection'] = function(block) {
    // Call a procedure with a return value.
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ADD' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = '' + args.join(' ++ ') + ' ';
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};
// 18/12/20 ここまで

// 19/01/30 追加
Blockly.Blocks['lists_create_with_haskell'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
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
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
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
      this.removeInput('END');  // Remove deleted inputs.
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.lists_create_with_empty);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_ ; i++) {
      if (!this.getInput('ADD' + i)) {
        if ( this.getInput('END') ) { this.removeInput('END'); }
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.lists_create_with_head);
        } else if ( i > 0 ) {
          input.appendField(Blockly.Msg.lists_create_with_middle);
        }
        if ( i == this.itemCount_-1 ) {
          this.appendDummyInput('END')
              .appendField(Blockly.Msg.lists_create_with_end);
        }

      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Blocks['lists_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};
// 19/01/30 ここまで

// ↓ 内包表記ブロック //////////////////////////////////////////

Blockly.Blocks['inner_table'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField("内包表記");
    this.appendValueInput('ADD0');
    this.setOutput(true);
    this.setInputsInline(true);
    this.appendStatementInput('ADD')
        .appendField("限定式");
    this.setTooltip("リストの内包表記を表します。");
  }
};

Blockly.Haskell['inner_table'] = function(block) {
  // Call a procedure with a return value.
  var code = '[ ';
  code += Blockly.Haskell.valueToCode(block, 'ADD0',
        Blockly.Haskell.ORDER_COMMA) || '_';
  code += ' |';

  code += Blockly.Haskell.statementToCode(block, 'ADD');
  //code += Blockly.Haskell.statementToCode(block, 'ADD');
  code += ']';
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

/////////////////////////////// ↑ 内包表記ここまで

Blockly.Blocks['lists_group'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_group_head);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['lists_create_join_item']));
    this.setTooltip("リストの中の組を表します。");
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
    var containerBlock = workspace.newBlock('lists_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_join_item');
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
      this.appendDummyInput('EMPTY');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        if ( this.getInput('END') ) { this.removeInput('END'); }
        var input = this.appendValueInput('ADD' + i);
        if ( i > 0 ) {
          input.appendField(Blockly.Msg.lists_group_middle);
        }
        if ( i == this.itemCount_-1 ) {
          this.appendDummyInput('END')
              .appendField(Blockly.Msg.lists_group_end);
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

Blockly.Haskell['lists_group'] = function(block) {
    // Call a procedure with a return value.
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ADD' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = '(' + args.join(', ') + ')';
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Blocks['lists_range'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_head);
    this.appendValueInput('ADD1');
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_middle);
    this.appendValueInput('ADD2');
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_range_end);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip("リストの値の範囲を表します。");
  }
};

Blockly.Haskell['lists_range'] = function(block) {
    // Call a procedure with a return value.
  
  var arg1 = Blockly.Haskell.valueToCode(block, 'ADD1',
        Blockly.Haskell.ORDER_COMMA) || '_';
  var arg2 = Blockly.Haskell.valueToCode(block, 'ADD2',
        Blockly.Haskell.ORDER_COMMA) || '_';
  var code = '[' + arg1 + '..' + arg2 + ']';
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

// 19/01/09
Blockly.Blocks['lists_element'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_element_head);
    this.appendValueInput('VALUE');
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_element_middle);
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber('0'), 'NUM')
        .appendField(Blockly.Msg.lists_element_end);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip("リストから指定されたN番目の要素を取り出します。");
  }
};

Blockly.Haskell['lists_element'] = function(block) {
  // String or array length.
  var val = Blockly.Haskell.valueToCode(block, 'VALUE',
        Blockly.Haskell.ORDER_COMMA) || '_';
  var num = parseFloat(block.getFieldValue('NUM'));
  var code = val + ' !! ' + num;
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};
// 19/01/09 ここまで

// 19/01/31 移動
Blockly.Blocks['lists_length_haskell'] = {

  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.lists_length,
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ['String', 'Array']
        }
      ],
      "output": 'Number',
      "colour": Blockly.Msg["LISTS_HUE"],
      "tooltip": Blockly.Msg.LISTS_LENGTH_TOOLTIP,
      "helpUrl": Blockly.Msg.LISTS_LENGTH_HELPURL
    });
  }
};

Blockly.Blocks['lists_isEmpty_haskell'] = {

  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.lists_isEmpty,
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ['String', 'Array']
        }
      ],
      "output": 'Boolean',
      "colour": Blockly.Msg["LISTS_HUE"],
      "tooltip": Blockly.Msg.LISTS_ISEMPTY_TOOLTIP,
      "helpUrl": Blockly.Msg.LISTS_ISEMPTY_HELPURL
    });
  }
};
// 19/01/31 ここまで