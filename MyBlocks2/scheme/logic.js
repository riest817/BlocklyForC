// TODO: 別のファイルに移す
Blockly.Msg["LOGIC_HUE"] = 210;
Blockly.Msg['SCHEME_BEGIN_CONTAINER_TITLE_ADD'] = '列';
Blockly.Msg['SCHEME_BEGIN_CONTAINER_TOOLTIP'] = '';
Blockly.Msg['SCHEME_BEGIN_ITEM_TITLE'] = '式';
Blockly.Msg['SCHEME_BEGIN_ITEM_TOOLTIP'] = '';

Blockly.Blocks['scheme_begin'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOOPS_HUE"]);
    this.appendDummyInput('START').appendField("(begin ");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("begin式でまとめられたアクションが上から下へ実行されるようになります。");     // ポインタを合わせたときの説明文
  },
  /**
 * Create XML to represent list inputs.
 * @return {!Element} XML storage element.
 * @this Blockly.Block
 */
  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('scheme_begin_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('scheme_begin_item');
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
  compose: function (containerBlock) {
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
  saveConnections: function (containerBlock) {
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
  updateShape_: function () {
    if (this.getInput('END')) {
      this.removeInput('END');
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
    this.appendDummyInput('END').appendField(')');
  }
};

Blockly.Blocks['scheme_begin_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function () {
    this.setStyle('list_blocks');
    this.appendDummyInput()
      .appendField(Blockly.Msg['SCHEME_BEGIN_CONTAINER_TITLE_ADD']);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg['SCHEME_BEGIN_CONTAINER_TOOLTIP']);
    this.contextMenu = false;
  }
};

Blockly.Blocks['scheme_begin_item'] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setStyle('list_blocks');
    this.appendDummyInput()
      .appendField(Blockly.Msg['SCHEME_BEGIN_ITEM_TITLE']);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg['SCHEME_BEGIN_ITEM_TOOLTIP']);
    this.contextMenu = false;
  }
};

Blockly.Blocks['scheme_let_in'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOOPS_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    //this.appendField("do");
    this.appendStatementInput('DO')
      .setCheck(['DECL'])
      .appendField("(")
      .appendField(new Blockly.FieldDropdown([["let", "let"], ["let*", "let*"], ["letrec", "letrec"]]), "KIND")
      .appendField("(");
    this.appendDummyInput('')
      .appendField(")");
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("let式の中だけ有効な束縛を導入できます。\nまた、let式の値はinの後に書いた式の値です。");     // ポインタを合わせたときの説明文
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
};

Blockly.Blocks['scheme_call_cc'] = {
  init: function () {
    this.jsonInit({
      "message0": "(call/cc %1)",
      "args0": [
        {
          "type": "input_value",
          "name": "ADD0"
        },
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": Blockly.Msg["LOOPS_HUE"],
      "tooltip": '',
      "helpUrl": ''
    });
  }
};

// 19/02/13 
Blockly.Blocks['scheme_logic_boolean'] = {
  /**
   * Block for boolean data type: true and false.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
          "options": [
            ["#t", "#t"],
            ["#f", "#f"]
          ]
        }
      ],
      "output": "Boolean",
      "colour": Blockly.Msg["LOGIC_HUE"],
      "tooltip": Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_BOOLEAN_HELPURL
    });
  }
};

Blockly.Blocks['scheme_logic_operation'] = {
  init: function () {
    // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput('')
      .appendField("(")
      .appendField(new Blockly.FieldDropdown([["and", "and"], ["or", "or"]], "KIND"));
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("論理和または論理積を求めます。");
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
};

Blockly.Blocks['scheme_logic_compare'] = {
  init: function () {
    // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput('')
      .appendField("(")
      .appendField(new Blockly.FieldDropdown([
        ["=", "="],
        ["\u200F<", "<"],
        ["\u200F\u2264", "<="],
        ["\u200F>", ">"],
        ["\u200F\u2265", ">="]
      ], "KIND"));
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("論理和または論理積を求めます。");
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
};

Blockly.Blocks['scheme_logic_not'] = {
  init: function () {
    this.jsonInit({
      "message0": "(not %1)",
      "args0": [
        {
          "type": "input_value",
          "name": "ADD0"
        },
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": Blockly.Msg["LOGIC_HUE"],
      "tooltip": '',
      "helpUrl": ''
    });
  }
};

Blockly.Blocks['scheme_decl'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LOOPS_HUE"]);
    this.appendDummyInput('')
      .appendField('(')
      .appendField(new Blockly.FieldVariable("x"), "VAR");
    this.appendValueInput('VALUE');
    this.appendDummyInput().appendField(')');
    this.setOutput(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'DECL');
    this.setNextStatement(true, 'DECL');
    this.setTooltip("パターンを束縛します。");
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  }
};


Blockly.Blocks['scheme_if'] = {
  init: function () {
    this.jsonInit({
      "message0": "(if %1",
      "args0": [
        {
          "type": "input_value",
          "name": "IF",
          "check": "Boolean"
        }
      ],
      "message1": "%1",
      "args1": [
        {
          "type": "input_value",
          "name": "THEN"
        }
      ],
      "message2": "%1",
      "args2": [
        {
          "type": "input_value",
          "name": "ELSE"
        }
      ],
      "message3": ")",
      "output": null,
      "style": "logic_blocks",
      "tooltip": "%{BKY_LOGIC_TERNARY_TOOLTIP}",
      "helpUrl": "%{BKY_LOGIC_TERNARY_HELPURL}"
    });
  }
};

Blockly.Msg["LOGIC_OPERATION_AND"] = "and";
Blockly.Msg["LOGIC_OPERATION_OR"] = "or";
