/**
19/06/26 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');

Blockly.Msg["RULE_HUE"] = 210;


Blockly.Blocks['rule_single'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["RULE_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.lists_group_head1)
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(Blockly.Msg.lists_group_head2);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['rule_create_join_item']));
    this.setTooltip("事実を定義します。");
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
    var containerBlock = workspace.newBlock('rule_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('rule_create_join_item');
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

Blockly.Blocks['rule_connection'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["RULE_HUE"]);
    this.appendDummyInput('HEAD')
        .appendField(Blockly.Msg.rule_connection_head);
    this.appendValueInput('HEAD0');
    this.appendDummyInput()
        .appendField(Blockly.Msg.rule_connection_middle1);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(false);
    this.setInputsInline(false);
    this.setMutator(new Blockly.Mutator(['rule_create_join_item']));
    this.setTooltip("複数の事実を用いて、一つの事実を表します。");
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
    var containerBlock = workspace.newBlock('rule_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('rule_create_join_item');
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
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField("項目数0では使用できません");
      this.removeInput('HEAD');
      this.setOutput(false);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        if ( this.getInput('END') ) { this.removeInput('END'); }
        var input = this.appendValueInput('ADD' + i);
        if ( i > 0 ) {
          input.appendField(Blockly.Msg.rule_connection_middle2);
        }
        if ( i == this.itemCount_ -1 ) {
          this.appendDummyInput('END')
              .appendField(Blockly.Msg.rule_connection_end);
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

Blockly.Blocks['rule_connection2'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.appendValueInput('DELTA')
        .appendField("式 ===> ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setStatements_(false);
    this.setMutator(new Blockly.Mutator(['rule_create_join_container']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["RULE_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      if ( this.getInput('DELTA') ) { this.removeInput('DELTA'); }  // 追加 19/07/17
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
      this.appendValueInput('DELTA')
          .appendField("式 ===> ");
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    

  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("rule_create_join_container");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("rule_create_join_item");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};

Blockly.Blocks['rule_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["RULE_HUE"]);
    this.appendDummyInput()
        .appendField("結合");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['rule_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["RULE_HUE"]);
    this.appendDummyInput()
        .appendField("項目");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("関数へ引数を追加");
    this.contextMenu = false;
  }
};

