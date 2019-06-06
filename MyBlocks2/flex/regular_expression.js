/*
2017/08/02 regular_expression.js 新規作成
2017/08/22 Blockly.Blocks['RE_connection_mutator'] 作成
18/04/04 Blockly.Blockls['RE_minimum_match']をBlockly.Blocks['RE_repetition']に統合
18/04/10 Blockly.Blocks['RE_from_to_mutator'] 改良
18/05/08 概念と文法を分別化
*/
/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/

Blockly.Blocks['RE_text0'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_text0)
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setOutput(true, 'String');   // 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "特殊文字以外の文字を表します。";        // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_text'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_text)
        .appendField("\"")
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField("\"");
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "中の文字列そのものを表します。";        // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_any_one'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_any_one_left)
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(Blockly.Msg.RE_any_one_right);
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "中の文字列中の任意の文字を表します。";        // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_not_any_one'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_not_any_one_left)
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(Blockly.Msg.RE_not_any_one_right);
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "中の文字列に含まれない任意の文字列を表します。";        // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_from_to'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_from_to_left)
        .appendField(new Blockly.FieldTextInput(''), 'FROM')
        .appendField(Blockly.Msg.RE_from_to_middle)
        .appendField(new Blockly.FieldTextInput(''), 'TO')
        .appendField(Blockly.Msg.RE_from_to_right);
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
  }
};

// 18/06/07 追加 
Blockly.Blocks['RE_from_to_0'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'FROM')
        .appendField(Blockly.Msg.RE_from_to_0)
        .appendField(new Blockly.FieldTextInput(''), 'TO');
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
  }
};

Blockly.Blocks['RE_anything'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_anything);
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "改行以外の任意の文字を表します。";       // ポインタを合わせたときの説明文
    });
  }
};
/*
Blockly.Blocks['RE_new_line'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_new_line);
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "改行を表します。";     // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_tab'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_tab);
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "タブを表します。";     // ポインタを合わせたときの説明文
    });
  }
};
*/
//  18/06/21  作成
Blockly.Blocks['RE_sequence'] = {

  init: function() {
    var OPERATORS =
        [[Blockly.Msg.RE_new_line, 'n'],
         [Blockly.Msg.RE_tab, 't'],
         [Blockly.Msg.RE_single_quote, '\''],
         [Blockly.Msg.RE_double_quote, '\"'],
         [Blockly.Msg.RE_backslash, '\\']];
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_sequence);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE')
        .appendField(" ");
    this.setOutput(true, 'String');   // 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('MODE');
      var TOOLTIPS = {
        'n': "特殊文字の改行を表します。",
        't': "特殊文字のタブを表します。",
        '\'': "特殊文字のシングルクォートを表します。",
        '\"': "特殊文字のダブルクォートを表します。",
        '\\': "特殊文字のヌル文字を表します。"
      };
      return TOOLTIPS[op];
    });
  }
};


Blockly.Blocks['RE_connection'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.appendValueInput('A');
    this.appendValueInput('B');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "正規表現r1の後に正規表現r2を繋げます。";      // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_connection_or'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput();
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField("|");
    this.appendValueInput('B');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "正規表現r1または正規表現r2を繋げます。";      // ポインタを合わせたときの説明文
    });
  }
};

Blockly.Blocks['RE_repetition'] = {

  init: function() {
    var OPERATORS =
        [[Blockly.Msg.RE_repetition_0up, '*'],
         [Blockly.Msg.RE_repetition_1up, '+'],
         [Blockly.Msg.RE_repetition_0or1, '?']];
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_repetition_left);
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_repetition_middle)
    	  .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE')
        .appendField(" ");
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('MODE');
      var TOOLTIPS = {
        '*': "正規表現rの0回以上の繰り返し",
        '+': "正規表現rの1回以上の繰り返し",
        '?': "正規表現rの0回か1回の出現"
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['RE_from_to_mutator'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField("範囲の任意の文字");
    this.setOutput(true, 'String');   // 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.itemCount_ = 1;
    this.setMutator(new Blockly.Mutator(['create_join_item']));
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "複数の左の文字から右の文字の範囲の任意の文字を表します。";      // ポインタを合わせたときの説明文
    });
  },
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
    var containerBlock = workspace.newBlock('create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('create_join_item');
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
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i)
     
        .appendField("文字")
        .appendField(new Blockly.FieldTextInput(''), 'FROM' + i)
        .appendField("から文字")
        .appendField(new Blockly.FieldTextInput(''), 'TO' + i)
        .appendField("の範囲");
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

Blockly.Blocks['create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(0);
    this.appendDummyInput()
        .appendField("範囲");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("範囲を追加。");
    this.contextMenu = false;
  }
};

// 19/05/20 追加
Blockly.Blocks['RE_priority'] = {

  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(0);
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_priority_left);
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(Blockly.Msg.RE_priority_right);
    this.setOutput(true, 'String');   // 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "ソケット中の正規表現を優先します。";      // ポインタを合わせたときの説明文
    });
  }
};
