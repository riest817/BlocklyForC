/*
2017/08/21 RE_connection.js 新規作成
2017/08/31 RE_mutator.js に名称変更
*/
/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/


// 18/05/29 改変
Blockly.Blocks['RE_connection_mutator'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(0);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);     // ソケットを内側にする
    this.setMutator(new Blockly.Mutator(['RE_connection_join_item']));
    this.setTooltip("複数の正規表現を繋げます。");
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
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
  //newQuote_: Blockly.Blocks['text'].newQuote_
};

// 18/10/11 新規
Blockly.Blocks['RE_connection_or_mutator'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(0);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);     // ソケットを内側にする
    this.setMutator(new Blockly.Mutator(['RE_connection_join_item']));
    this.setTooltip("複数の正規表現を繋げます。");
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
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        if ( i == 0 ) {
          var input = this.appendValueInput('ADD' + i);
        } else {
          var input = this.appendValueInput('ADD' + i)
                          .appendField('|');
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
  //newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.Blocks['RE_connection_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(/* "結合" */ "concatenation");
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
        .appendField(/* "正規表現" */ "expression");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("正規表現を追加します。");
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
        .appendField(/* "文字" */ "character");
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
        .appendField(/* "特殊文字" */ "special character");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("特殊文字を追加します。");
    this.contextMenu = false;

  }
};

// 18/07/18 追加
Blockly.Blocks['field_dropdown'] = {
  // Dropdown menu.
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_any_one_left);
    this.optionList_ = ['char'];
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['field_dropdown_option_range',
                                         'field_dropdown_option_char',
                                         'field_dropdown_option_sequence']));
    this.setColour(0);
    this.setTooltip("中の文字中の任意の文字を表します。");
    this.setHelpUrl();
    this.sequenceCount_ = 0;
    this.old_sequenceCount_ = 0;
  },
  mutationToDom: function(workspace) {
    // Create XML to represent menu options.
    var container = document.createElement('mutation');
    container.setAttribute('options', JSON.stringify(this.optionList_));
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the menu options.
    var value = JSON.parse(container.getAttribute('options'));
    if (typeof value == 'number') {
      this.optionList_ = [];
      for (var i = 0; i < value; i++) {
        this.optionList_.push('range');
      }
    } else {
      this.optionList_ = value;
    }
    this.sequenceCount_ = parseInt(container.getAttribute('sequence'), 10) || 0;
    this.updateShape_();
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('field_dropdown_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.optionList_.length; i++) {
      var optionBlock = workspace.newBlock(
          'field_dropdown_option_' + this.optionList_[i]);
      optionBlock.initSvg();
      connection.connect(optionBlock.previousConnection);
      connection = optionBlock.nextConnection;
    }
    return containerBlock;
  },
  
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var type_blocks = [];
    var num = 0;
    this.sequenceCount_ = 0;
    // Count number of inputs.
    this.optionList_.length = 0;
    var data = [];
    while (optionBlock) {
      if (optionBlock.type == 'field_dropdown_option_range') {
        this.optionList_.push('range');
        type_blocks[num] = 'range';
      } else if (optionBlock.type == 'field_dropdown_option_char') {
        this.optionList_.push('char');
        type_blocks[num] = 'char';
      } else if (optionBlock.type == 'field_dropdown_option_sequence') {
        this.optionList_.push('sequence');
        type_blocks[num] = 'sequence';
        this.sequenceCount_++;
      }
      num++;
      data.push([optionBlock.userData_, optionBlock.cpuData_]);
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
    this.updateShape_();

    for (var i = 0; i < this.optionList_.length; i++) {
      var userData = data[i][0];
      if (userData !== undefined) {
        if (type_blocks[i] == 'range') {
          this.setFieldValue(userData  , 'BEGIN' + i);
          this.setFieldValue(data[i][1] , 'END' + i);
        } else if (type_blocks[i] == 'char') {
          this.setFieldValue(userData, 'CHAR' + i);
        } else if (type_blocks[i] == 'sequence') {
          //this.setFieldValue(userData, 'SEQ' + i);
        }
      }
    }
  },

  saveConnections: function(containerBlock) {
    // Store all data for each option.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (optionBlock) {
      optionBlock.userData_ = this.getUserData(i);
      optionBlock.cpuData_ = this.getFieldValue('END' + i);
      i++;
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Delete everything.
    var i = 0;
    var no = 0; // 順番
    while (this.getInput('OPTION' + i)) {
      this.removeInput('OPTION' + i);
      i++;
    }
    if (this.getInput('END')) {
      this.removeInput('END');  // Remove deleted inputs.
    }

    // Rebuild block.
    var OPERATORS =
        [[Blockly.Msg.RE_new_line, 'n'],
         [Blockly.Msg.RE_tab, 't'],
//         [Blockly.Msg.RE_single_quote, '\''],
//         [Blockly.Msg.RE_double_quote, '\"'],
         [']', ']'],
         ['-', '-'],
         ['^', '^'],
         [Blockly.Msg.RE_backslash, '\\']];

    for (var i = 0; i < this.optionList_.length; i++) {
      var type = this.optionList_[i];
      if (type == 'range') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'BEGIN' + i)
            .appendField('-')
            .appendField(new Blockly.FieldTextInput(''), 'END' + i)
            .appendField(' ');
        //no++;
      } else if (type == 'char') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'CHAR' + i)
            .appendField(' ');
        //no++;
      } else if (type == 'sequence') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField(Blockly.Msg.RE_sequence)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'SEQ' + i)
            .appendField(' ');
      } /*else if ( this.sequenceCount_-1 == this.old_sequenceCount_) {
      this.removeInput('END');  // Remove deleted inputs.
      this.appendDummyInput('OPTION' + i)
          .appendField(Blockly.Msg.RE_sequence)
          .appendField(new Blockly.FieldDropdown(OPERATORS), 'SEQ' + i);
      this.appendDummyInput('END')
          .appendField(Blockly.Msg.RE_any_one_right);
     }*/
    }
    this.appendDummyInput('END')
        .appendField(Blockly.Msg.RE_any_one_right);
    
    this.old_sequenceCount_ = this.sequenceCount_;
  },
  onchange: function() {
    if (this.workspace && this.optionList_.length < 1) {
      this.setWarningText('歯車マークを押したときに表示される\n子ブロックを必ず一つ以上接続してください');
    } else {
      //fieldNameCheck(this);
      this.setWarningText(null);
    }
  },
  getUserData: function(n) {
    if (this.optionList_[n] == 'range') {
      return this.getFieldValue('BEGIN' + n);
    }
    if (this.optionList_[n] == 'char') {
      return this.getFieldValue('CHAR' + n);
    }
    if (this.optionList_[n] == 'sequence') {
      return this.getFieldValue('SEQ' + n);
    }
    throw 'Unknown dropdown type';
  }
};

// 18/07/19 追加
Blockly.Blocks['field_dropdown_not'] = {
  // Dropdown menu.
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_not_any_one_left);
    this.optionList_ = ['char'];
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['field_dropdown_option_range',
                                         'field_dropdown_option_char',
                                         'field_dropdown_option_sequence']));
    this.setColour(0);
    this.setTooltip("中の文字列に含まれない任意の文字列を表します。");
    this.setHelpUrl();
    this.sequenceCount_ = 0;
    this.old_sequenceCount_ = 0;
  },
  mutationToDom: function(workspace) {
    // Create XML to represent menu options.
    var container = document.createElement('mutation');
    container.setAttribute('options', JSON.stringify(this.optionList_));
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the menu options.
    var value = JSON.parse(container.getAttribute('options'));
    if (typeof value == 'number') {
      this.optionList_ = [];
      for (var i = 0; i < value; i++) {
        this.optionList_.push('range');
      }
    } else {
      this.optionList_ = value;
    }
    this.sequenceCount_ = parseInt(container.getAttribute('sequence'), 10) || 0;
    this.updateShape_();
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('field_dropdown_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.optionList_.length; i++) {
      var optionBlock = workspace.newBlock(
          'field_dropdown_option_' + this.optionList_[i]);
      optionBlock.initSvg();
      connection.connect(optionBlock.previousConnection);
      connection = optionBlock.nextConnection;
    }
    return containerBlock;
  },
  
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var type_blocks = [];
    var num = 0;
    this.sequenceCount_ = 0;
    // Count number of inputs.
    this.optionList_.length = 0;
    var data = [];
    while (optionBlock) {
      if (optionBlock.type == 'field_dropdown_option_range') {
        this.optionList_.push('range');
        type_blocks[num] = 'range';
      } else if (optionBlock.type == 'field_dropdown_option_char') {
        this.optionList_.push('char');
        type_blocks[num] = 'char';
      } else if (optionBlock.type == 'field_dropdown_option_sequence') {
        this.optionList_.push('sequence');
        type_blocks[num] = 'sequence';
        this.sequenceCount_++;
      }
      num++;
      data.push([optionBlock.userData_, optionBlock.cpuData_]);
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
    this.updateShape_();

    for (var i = 0; i < this.optionList_.length; i++) {
      var userData = data[i][0];
      if (userData !== undefined) {
        if (type_blocks[i] == 'range') {
          this.setFieldValue(userData  , 'BEGIN' + i);
          this.setFieldValue(data[i][1] , 'END' + i);
        } else if (type_blocks[i] == 'char') {
          this.setFieldValue(userData, 'CHAR' + i);
        } else if (type_blocks[i] == 'sequence') {
          this.setFieldValue(userData, 'SEQ' + i);
        }
      }
    }
  },

  saveConnections: function(containerBlock) {
    // Store all data for each option.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (optionBlock) {
      optionBlock.userData_ = this.getUserData(i);
      optionBlock.cpuData_ = this.getFieldValue('END' + i);
      i++;
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Delete everything.
    var i = 0;
    var no = 0; // 順番
    while (this.getInput('OPTION' + i)) {
      this.removeInput('OPTION' + i);
      i++;
    }
    if (this.getInput('END')) {
      this.removeInput('END');
    } 

    // Rebuild block.
    var OPERATORS =
        [[Blockly.Msg.RE_new_line, 'n'],
         [Blockly.Msg.RE_tab, 't'],
//         [Blockly.Msg.RE_single_quote, '\''],
//         [Blockly.Msg.RE_double_quote, '\"'],
         [']', ']'],
         ['-', '-'],
         ['^', '^'],
         [Blockly.Msg.RE_backslash, '\\']];

    for (var i = 0; i < this.optionList_.length; i++) {
      var type = this.optionList_[i];
      if (type == 'range') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'BEGIN' + i)
            .appendField('-')
            .appendField(new Blockly.FieldTextInput(''), 'END' + i)
            /*.appendField(' ')*/;
        //no++;
      } else if (type == 'char') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField('')
            .appendField(new Blockly.FieldTextInput(''), 'CHAR' + i)
            /*.appendField(' ')*/;
        //no++;
      } else if (type == 'sequence') {
//        this.removeInput('END');  // Remove deleted inputs.
        this.appendDummyInput('OPTION' + i)
            .appendField(Blockly.Msg.RE_sequence)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'SEQ' + i)
            /*.appendField(' ')*/;
      } /*else if ( this.sequenceCount_-1 == this.old_sequenceCount_) {
      this.removeInput('END');  // Remove deleted inputs.
      this.appendDummyInput('OPTION' + i)
          .appendField(Blockly.Msg.RE_sequence)
          .appendField(new Blockly.FieldDropdown(OPERATORS), 'SEQ' + i);
      this.appendDummyInput('END')
          .appendField(Blockly.Msg.RE_any_one_right);
     }*/

    }
    this.appendDummyInput('END')
        .appendField(Blockly.Msg.RE_not_any_one_right);
    this.old_sequenceCount_ = this.sequenceCount_;
  },
  onchange: function() {
    if (this.workspace && this.optionList_.length < 1) {
      this.setWarningText('歯車マークを押したときに表示される\n子ブロックを必ず一つ以上接続してください');
    } else {
      //fieldNameCheck(this);
      this.setWarningText(null);
    }
  },
  getUserData: function(n) {
    if (this.optionList_[n] == 'range') {
      return this.getFieldValue('BEGIN' + n);
    }
    if (this.optionList_[n] == 'char') {
      return this.getFieldValue('CHAR' + n);
    }
    if (this.optionList_[n] == 'sequence') {
      return this.getFieldValue('SEQ' + n);
    }
    throw 'Unknown dropdown type';
  }
};

Blockly.Blocks['field_dropdown_container'] = {
  // Container.
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(/* '結合' */ 'one of');
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.setHelpUrl();
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_dropdown_option_range'] = {
  // Add text option.
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(/* '範囲' */ 'range');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("範囲を追加します。");
    this.setHelpUrl();
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_dropdown_option_char'] = {
  // Add text option.
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(/* '文字' */ "character");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("文字を追加します。");
    this.setHelpUrl();
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_dropdown_option_sequence'] = {
  // Add image option.
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(/* "特殊文字" */ "special character");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("特殊文字を追加します。");
    this.setHelpUrl();
    this.contextMenu = false;
  }
};

// 18/07/31 追加  これを参考にブロック['field_dropdown']を作成 ////////////////////////////////////////////
Blockly.Blocks['select'] = {
    init: function () {
        this.join_ = 0;
        this.updateShape_();
        this.setMutator(new Blockly.Mutator(['join']));
    }
    ,
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('join', this.join_);
        return container;
    }
    , 
    domToMutation: function (xmlElement) {
        this.join_ = parseInt(xmlElement.getAttribute('join'), 10);
        this.updateShape_();
    }
    , 
    decompose: function (workspace) {
        var topBlock = workspace.newBlock('container');
        topBlock.initSvg();
        var connection = topBlock.getInput('JOIN').connection;
        if (this.join_ == 1) {
            var itemBlock = workspace.newBlock('join');
            itemBlock.initSvg();
            connection.connect(itemBlock.outputConnection);
        }

        return topBlock;
    }
    ,
    compose: function (topBlock) {
        var itemBlock = topBlock.getInputTargetBlock('JOIN');
        if (itemBlock == "JOIN") {
            this.join_ = 1;
        } else {
            this.join_ = 0;
        }

        this.updateShape_();
    }
    , 
    updateShape_: function () {
        if (this.join_ == 1 && !this.getInput('JOIN')) {
            var input = this.appendValueInput("JOIN").setCheck("table").appendField(new Blockly.FieldDropdown([["INNER JOIN", "INNER JOIN"], ["LEFT JOIN", "LEFT JOIN"], ["RIGHT JOIN", "RIGHT JOIN"], ["FULL OUTER JOIN", "FULL OUTER JOIN"]]), "JOINS");
        } else if (this.join_ == 0 && this.getInput('JOIN')) {
            this.removeInput('JOIN');
        }

   
    }
};

Blockly.Blocks['container'] = {
    init: function () {
        this.setColour(60);
        this.appendValueInput("JOIN")
            .setCheck("join")
            .appendField("CONTAINER");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks['join'] = {
    init: function () {
        this.setColour(60);
        this.appendDummyInput()
            .appendField("JOIN");
        this.setOutput(true, "join");
        this.setTooltip("");
        this.contextMenu = !1
    }
};

Blockly.Blocks['RE_from_to_mutaor'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField("文字")
        .appendField(new Blockly.FieldTextInput(''), 'FROM')
        .appendField("から文字")
        .appendField(new Blockly.FieldTextInput(''), 'TO')
        .appendField("の範囲の任意の文字");
    this.setOutput(true, 'String');   // 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "左の文字から右の文字の範囲の任意の文字を表します。";      // ポインタを合わせたときの説明文
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

