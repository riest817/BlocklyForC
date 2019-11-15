goog.provide('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks');
goog.require('Blockly');
/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Msg["PROCEDURES_HUE"] = 290;
Blockly.Msg['PROCEDURES_ALLOW_STATEMENTS'] = "ゴールを許す";

Blockly.Blocks['procedures_defnoreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    var nameField = new Blockly.FieldTextInput(''/*,
        Blockly.Procedures.rename*/);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField("/* 述語定義 */")
        .appendField(nameField, 'NAME')
/*        .appendField('', 'PARAMS')
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("="); */;
//    this.setPreviousStatement(true);
//    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    // if (Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
    //   this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
    // }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("述語を定義します。");
    this.setHelpUrl();
    this.itemCount_ = 0;
//    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },

  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  /**
   * Create XML to represent the argument inputs.
   * @return {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }
    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateParams_(); 
    Blockly.Procedures.mutateCallers(this);
//    Blockly.Procedures.mutateDefinitions(this);  // Todo
    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("procedures_mutatorcontainer");
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    containerBlock.setFieldValue(
      this.hasStatements_ ? 'TRUE' : 'FALSE', 'STATEMENTS');

    // Parameter list.
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function (containerBlock) {
    var paramBlock = containerBlock.getInputTargetBlock("STACK");
    var connections = [];
    while (paramBlock) {
      connections.push(paramBlock.valueConnection_);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ARG' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i);
    }

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements == 'TRUE';
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            var stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours_();
          }
          this.setStatements_(false);
        }
      }
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
      var input = this.getInput('ARG' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
    var ret = this.getInput('STACK');
    containerBlock.statementConnection_ = ret && ret.connection.targetConnection;
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
    return [this.getFieldValue('NAME'), this.itemCount_ /*, true*/];
  },

  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    if (this.isInFlyout){
      return;
    }
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    var xmlMutation = document.createElement('mutation');
    xmlMutation.setAttribute('name', name);
/*
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = document.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
*/
    var xmlBlock = document.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    // if (!this.isCollapsed()) {
    //   for (var i = 0; i < this.argumentVarModels_.length; i++) {
    //     var option = {enabled: true};
    //     var argVar = this.argumentVarModels_[i];
    //     var name = argVar.name;
    //     option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', name);

    //     var xmlField = Blockly.Variables.generateVariableFieldDom(argVar);
    //     var xmlBlock = document.createElement('block');
    //     xmlBlock.setAttribute('type', 'variables_get');
    //     xmlBlock.appendChild(xmlField);
    //     option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    //     options.push(option);
    //   }
    // }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateParams_: function() {
//    var stack = false;
//    if (this.getInput('STACK')) {
//      this.removeInput('STACK');
//      stack = true;
//    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ARG' + i)) {
        var input = this.appendValueInput('ARG' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }

//    if (stack) {
//      this.appendStatementInput('STACK');
//    }
    if (this.getInput('STACK')) {
      this.moveInputBefore('STACK', null); 
    }
  },
  callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
  /**
   * Mutator block for procedure container.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("引数列");
    this.appendStatementInput('STACK');
    this.appendDummyInput('STATEMENT_INPUT')
        .appendField(Blockly.Msg['PROCEDURES_ALLOW_STATEMENTS'])
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("この述語への引数の追加、削除、順番の変更");
    this.contextMenu = false;
  }
};

Blockly.Blocks['procedures_mutatorarg'] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        //.appendField("引数")
        .appendField('引数', 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("述語への引数の追加");
    this.contextMenu = false;
  },
  /**
   * Obtain a valid name for the procedure.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Beyond this, all names are legal.
   * @param {string} newVar User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified.
   * @private
   * @this Blockly.Block
   */
  validator_: function(newVar) {
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
  }
};

Blockly.Blocks['procedures_callnoreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        // .appendField("述語呼出し")
        .appendField('', 'NAME')
        .appendField('', 'PARAMS');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
//    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    // if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
    //   this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    // }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("述語を呼び出します。");
    this.setHelpUrl();
    this.itemCount_ = 0;
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.updateParams_();
  },

  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },

  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      // var baseMsg = this.outputConnection ?
      //     Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
      //     Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      // this.setTooltip(baseMsg.replace('%1', newName));
    }
  },

  updateParams_: function () {
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ARG' + i)) {
        var input = this.appendValueInput('ARG' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
  },

  mutationToDom: function (opt_paramIds) {
    var container = document.createElement("mutation");
    container.setAttribute('name', this.getProcedureCall());
    container.setAttribute('items', this.itemCount_);
    // Save whether the statement input is visible.
    // if (!this.hasStatements_) {
    //   container.setAttribute('statements', 'false');
    // }
    return container;
  },

  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation: function (xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateParams_(); 
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("procedures_mutatorcontainer");
    containerBlock.initSvg();

    var connection = containerBlock.getInput("STACK").connection;
    for (i = 0; i < this.itemCount_; i++) {
        var paramBlock = workspace.newBlock("procedures_mutatorarg");
        paramBlock.initSvg();
//        paramBlock.setFieldValue(this.arguments_[i], "NAME");
//        paramBlock.oldLocation = i;
        connection.connect(paramBlock.previousConnection);
        connection = paramBlock.nextConnection;
    }
//    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },

  compose: function (containerBlock) {
//    this.arguments_ = [];
//    this.paramIds_  = [];
    var paramBlock = containerBlock.getInputTargetBlock("STACK");
    var connections = [];
    while (paramBlock) {
      connections.push(paramBlock.valueConnection_);
//      this.arguments_.push(paramBlock.getFieldValue("NAME")),
//      this.paramIds_.push(paramBlock.id),
      paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ARG' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateParams_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i);
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
      var input = this.getInput('ARG' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
    // var ret = this.getInput('RETURN');
    // containerBlock.returnConnection_ = ret && ret.connection.targetConnection;
  },
  defType_: 'procedures_defnoreturn'
};

Blockly.Blocks['prolog_query'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("/* 質問 */ ?-");
    this.setColour(Blockly.Msg["LOOPS_HUE"]);
    this.setTooltip("質問を定義します。");
    this.setHelpUrl();
    this.appendStatementInput('STACK')
        .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
  }
};
