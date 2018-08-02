

// 18/06/21 作成
Blockly.Blocks['RE_not_any_one_mutator'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_not_any_one_left);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['RE_connection_join_item']));
    this.setTooltip("中の文字列に含まれない任意の文字列を表します。");
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
    var containerBlock = workspace.newBlock('RE_connection_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('RE_connection_join_item');
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
        this.removeInput('END');  // Remove deleted inputs.
        var input = this.appendValueInput('ADD' + i);
        if ( i == this.itemCount_-1 ) {
        this.appendDummyInput('END')
            .appendField(Blockly.Msg.RE_not_any_one_right);
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

// 18/06/21 作成
// 18/07/05 子ブロック改変
Blockly.Blocks['RE_any_one_mutator'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_any_one_left);
    this.appendDummyInput('END')
        .appendField(Blockly.Msg.RE_any_one_right);
    this.itemCount_ = 0;
    this.textCount_ = 0;
    this.old_textCount_ = 0;
    this.sequenceCount_ = 0;
    this.old_sequenceCount_ = 0;
    this.totalCount_ = 0;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['RE_connection_join_item', 'RE_connection_join_text', 'RE_connection_join_sequence']));
    this.setTooltip("中の文字中の任意の文字を表します。");
  },
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * 
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    if (this.itemCount_) {
      container.setAttribute('items', this.itemCount_);
    }
    if (this.textCount_) {
      container.setAttribute('text', this.textCount_);
    }
    if (this.sequence_) {
      container.setAttribute('sequence', this.sequenceCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10) || 0;
    this.textCount_ = parseInt(xmlElement.getAttribute('text'), 10) || 0;
    this.sequenceCount_ = parseInt(xmlElement.getAttribute('sequence'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('RE_connection_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('RE_connection_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    for (var i = 0; i < this.textCount_; i++) {
      var textBlock = workspace.newBlock('RE_connection_join_text');
      textBlock.initSvg();
      connection.connect(textBlock.previousConnection);
      connection = textBlock.nextConnection;
    }
    for (var i = 0; i < this.sequenceCount_; i++) {
      var sequenceBlock = workspace.newBlock('RE_connection_join_sequence');
      itemBlock.initSvg();
      connection.connect(sequenceBlock.previousConnection);
      connection = sequenceBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    totalCount_ = this.itemCount_ + this.textCount_ + this.sequenceCount_;
    // Count number of inputs.
    this.itemCount_ = 0;
    this.textCount_ = 0;
    this.sequenceCount_ = 0;
    var valueConnections = [null];
    var itemConnections = [null];
    var textConnections = [null];
    var sequenceConnections = [null];
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'RE_connection_join_item':
          this.itemCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          itemConnections.push(clauseBlock.valueConnection_);
          break;
        case 'RE_connection_join_text':
          this.textCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          textConnections.push(clauseBlock.valueConnection_);
          break;
        case 'RE_connection_join_sequence':
          this.sequenceCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          sequenceConnections.push(clauseBlock.valueConnection_);
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.totalCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    //this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(itemConnections[i], this, 'ADD' + i);
    }
    for (var i = 0; i < this.textCount_; i++) {
      Blockly.Mutator.reconnect(textConnections[i], this, 'ADD' + i);
    }
    for (var i = 0; i < this.sequenceCount_; i++) {
      Blockly.Mutator.reconnect(sequenceConnections[i], this, 'ADD' + i);
    }  
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (clauseBlock) {
          var inputItem = this.getInput('ADD' + i);
          clauseBlock.valueConnection_ =
              inputItem && inputItem.connection.targetConnection;
          clauseBlock.itemConnection_ =
              inputItem && inputItem.connection.targetConnection;
          i++;
          break;
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    var no = 0; // 順番
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY');
    }
    if (this.textCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.textCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY');
    }
    if (this.sequenceCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.sequenceCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY');
    }

    var OPERATORS =
        [[Blockly.Msg.RE_new_line, 'n'],
         [Blockly.Msg.RE_tab, 't'],
         [Blockly.Msg.RE_single_quote, '\''],
         [Blockly.Msg.RE_double_quote, '\"'],
         [Blockly.Msg.RE_backslash, '\\']];

    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        this.removeInput('END');  // Remove deleted inputs.
        var input = this.appendValueInput('ADD' + i);
        no++;
                        //.appendField(" ");
        if ( i == this.itemCount_-1 ) {
        this.appendDummyInput('END')
            .appendField(Blockly.Msg.RE_any_one_right);
        }
      }
    }

    if ( this.textCount_-1 == this.old_textCount_ ) {
      this.removeInput('END');  // Remove deleted inputs.
      var input = this.appendDummyInput('TEXT' + this.textCount_)
                      .appendField(" ")
                      .appendField(new Blockly.FieldTextInput(''), 'TEXT' + no++);
      this.appendDummyInput('END')
          .appendField(Blockly.Msg.RE_any_one_right);
    } else if ( this.sequenceCount_-1 == this.old_sequenceCount_) {
      this.removeInput('END');  // Remove deleted inputs.
      this.appendDummyInput('MODE' + this.sequenceCount_)
          .appendField(Blockly.Msg.RE_sequence)
          .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE' + no++);
      this.appendDummyInput('END')
          .appendField(Blockly.Msg.RE_any_one_right);
    }
    else if ( this.textCount_ == this.old_textCount_-1 ) {
      this.removeInput( 'TEXT' + this.textCount_ );
      //console.log("remove text" + this.textCount_);
    }
    this.old_textCount_ = this.textCount_;
    this.old_sequenceCount_ = this.sequenceCount_;

    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};


Blockly.Blocks['RE_connection_join_container'] = {
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

Blockly.Blocks['RE_connection_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("ソケット");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ソケット（穴）を追加します。");
    this.contextMenu = false;

  }
};

//  18/07/05 追加
Blockly.Blocks['RE_connection_join_text'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("文字");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("入力する文字を追加します。");
    this.contextMenu = false;

  }
};

//  18/07/05 追加
Blockly.Blocks['RE_connection_join_sequence'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("特殊文字");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("特殊文字を追加します。");
    this.contextMenu = false;

  }
};