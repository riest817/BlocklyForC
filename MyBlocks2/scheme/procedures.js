'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['procedures_defreturn'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
      var nameField = new Blockly.FieldTextInput('',
          Blockly.Procedures.rename);
      nameField.setSpellcheck(false);
      this.appendDummyInput()
          .appendField('(define (')
          .appendField(nameField, 'NAME')
          .appendField('', 'PARAMS')
          .appendField(')');
      this.appendValueInput('ADD0')
          .setAlign(Blockly.ALIGN_RIGHT)/*
          .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN'])*/;
      this.appendDummyInput('END').appendField(')');
      this.setInputsInline(true);
      this.setMutator(new Blockly.Mutator(['procedures_mutatorarg', 'scheme_begin_item']));
      if ((this.workspace.options.comments ||
           (this.workspace.options.parentWorkspace &&
            this.workspace.options.parentWorkspace.options.comments)) &&
          Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
        this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
      }
      this.setStyle('procedure_blocks');
      this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
      this.itemCount_ = 1;
      this.arguments_ = [];
      this.argumentVarModels_ = [];
    },

  /**
   * Update the display of parameters for this procedure definition block.
   * @private
   * @this Blockly.Block
   */
  updateParams_: function() {

    // Merge the arguments into a human-readable list.
    var paramString = '';
    if (this.arguments_.length) {
      paramString = /* Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] +
          ' ' + */ this.arguments_.join(' ');
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    try {
      this.setFieldValue(paramString, 'PARAMS');
    } finally {
      Blockly.Events.enable();
    }

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
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {boolean=} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function(opt_paramIds) {
    var container = document.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      var parameter = document.createElement('arg');
      var argModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', argModel.name);
      parameter.setAttribute('varid', argModel.getId());
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
    }

    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        var varName = childNode.getAttribute('name');
        var varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
        this.arguments_.push(varName);
        var variable = Blockly.Variables.getOrCreateVariablePackage(
            this.workspace, varId, varName, '');
        if (variable != null) {
          this.argumentVarModels_.push(variable);
        } else {
          console.log('Failed to create a variable with name ' + varName + ', ignoring.');
        }
      }
    }
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
    containerBlock.initSvg();

    // Parameter list.
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.arguments_.length; i++) {
      var paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[i], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }

    // Implicit Begin
    var connection2 = containerBlock.getInput('STACK2').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('scheme_begin_item');
      itemBlock.initSvg();
      connection2.connect(itemBlock.previousConnection);
      connection2 = itemBlock.nextConnection;
    }

    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);


    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    this.argumentVarModels_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      var varName = paramBlock.getFieldValue('NAME');
      this.arguments_.push(varName);
      var variable = this.workspace.getVariable(varName, '');
      if (variable != null) {
        this.argumentVarModels_.push(variable);
      } else {
        console.log('Failed to get variable named ' + varName + ', ignoring.');
      }

      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }

    var itemBlock = containerBlock.getInputTargetBlock('STACK2');
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

    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

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
    var itemBlock = containerBlock.getInputTargetBlock('STACK2');
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
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function () {
      return [this.getFieldValue('NAME'), this.arguments_];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return this.arguments_;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this Blockly.Block
   */
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  /**
   * Notification that a variable is renaming.
   * If the ID matches one of this block's variables, rename it.
   * @param {string} oldId ID of variable to rename.
   * @param {string} newId ID of new variable.  May be the same as oldId, but
   *     with an updated name.  Guaranteed to be the same type as the old
   *     variable.
   * @override
   * @this Blockly.Block
   */
  renameVarById: function(oldId, newId) {
    var oldVariable = this.workspace.getVariableById(oldId);
    if (oldVariable.type != '') {
      // Procedure arguments always have the empty type.
      return;
    }
    var oldName = oldVariable.name;
    var newVar = this.workspace.getVariableById(newId);

    var change = false;
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() == oldId) {
        this.arguments_[i] = newVar.name;
        this.argumentVarModels_[i] = newVar;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newVar.name);
      Blockly.Procedures.mutateCallers(this);
    }
  },
  /**
   * Notification that a variable is renaming but keeping the same ID.  If the
   * variable is in use on this block, rerender to show the new name.
   * @param {!Blockly.VariableModel} variable The variable being renamed.
   * @package
   * @override
   * @this Blockly.Block
   */
  updateVarName: function(variable) {
    var newName = variable.name;
    var change = false;
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() == variable.getId()) {
        var oldName = this.arguments_[i];
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newName);
      Blockly.Procedures.mutateCallers(this);
    }
  },
  /**
   * Update the display to reflect a newly renamed argument.
   * @param {string} oldName The old display name of the argument.
   * @param {string} newName The new display name of the argument.
   * @private
   */
  displayRenamedVar_: function(oldName, newName) {
    this.updateParams_();
    // Update the mutator's variables if the mutator is open.
    if (this.mutator.isVisible()) {
      var blocks = this.mutator.workspace_.getAllBlocks(false);
      for (var i = 0, block; block = blocks[i]; i++) {
        if (block.type == 'procedures_mutatorarg' &&
            Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
          block.setFieldValue(newName, 'NAME');
        }
      }
    }
  },
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
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = document.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = document.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        var option = {enabled: true};
        var argVar = this.argumentVarModels_[i];
        var name = argVar.name;
        option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', name);

        var xmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        var xmlBlock = document.createElement('block');
        xmlBlock.setAttribute('type', 'variables_get');
        xmlBlock.appendChild(xmlField);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callreturn'
};


Blockly.Blocks['procedures_lambda'] = {
    /**
     * Block for defining a anonymous procedure with a return value.
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput()
            .appendField('(lambda (')
            .appendField('', 'PARAMS')
            .appendField(')');
        this.appendValueInput('ADD0')
            .setAlign(Blockly.ALIGN_RIGHT)/*
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN'])*/;
        this.appendDummyInput('END').appendField(')');
        this.setInputsInline(true);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg', 'scheme_begin_item']));
        this.setStyle('procedure_blocks');
        this.setOutput(true);
        this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
        this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
    },

    updateParams_: Blockly.Blocks['procedures_defreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defreturn'].decompose,
    compose: Blockly.Blocks['procedures_defreturn'].compose,
    saveConnections: Blockly.Blocks['procedures_defreturn'].saveConnections,
    getProcedureDef: function () {
        return ["", this.arguments_];
    },
    getVars: Blockly.Blocks['procedures_defreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defreturn'].updateVarName,
    displayRenamedVar_: Blockly.Blocks['procedures_defreturn'].displayRenamedVar_,
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
    // var xmlMutation = document.createElement('mutation');
    // xmlMutation.setAttribute('name', name);
    // for (var i = 0; i < this.arguments_.length; i++) {
    //   var xmlArg = document.createElement('arg');
    //   xmlArg.setAttribute('name', this.arguments_[i]);
    //   xmlMutation.appendChild(xmlArg);
    // }
    // var xmlBlock = document.createElement('block');
    // xmlBlock.setAttribute('type', this.callType_);
    // xmlBlock.appendChild(xmlMutation);
    // option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    // options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        var option = {enabled: true};
        var argVar = this.argumentVarModels_[i];
        var name = argVar.name;
        option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', name);

        var xmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        var xmlBlock = document.createElement('block');
        xmlBlock.setAttribute('type', 'variables_get');
        xmlBlock.appendChild(xmlField);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },

    
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TITLE']);
      this.appendStatementInput('STACK').setCheck(['Arg']);
    //   this.appendDummyInput('STATEMENT_INPUT')
    //       .appendField(Blockly.Msg['PROCEDURES_ALLOW_STATEMENTS'])
    //       .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
      this.appendDummyInput()
          .appendField(Blockly.Msg['SCHEME_BEGIN_CONTAINER_TITLE_ADD']);
      this.appendStatementInput('STACK2').setCheck(['Item']);
      this.setStyle('procedure_blocks');
      this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TOOLTIP']);
      this.contextMenu = false;
    },
    /**
     * This will create & delete variables and in dialogs workspace to ensure
     * that when a new block is dragged out it will have a unique parameter name.
     * @param {!Blockly.Events.Abstract} event Change event.
     * @this Blockly.Block
     */
    onchange: function(event) {
      if (!this.workspace || this.workspace.isFlyout ||
          (event.type != Blockly.Events.BLOCK_DELETE && event.type != Blockly.Events.BLOCK_CREATE)) {
        return;
      }
      var blocks = this.workspace.getAllBlocks();
      var allVariables = this.workspace.getAllVariables();
      if (event.type == Blockly.Events.BLOCK_DELETE) {
        var variableNamesToKeep = [];
        for (var i = 0; i < blocks.length; i += 1) {
          if (blocks[i].getFieldValue('NAME')) {
            variableNamesToKeep.push(blocks[i].getFieldValue('NAME'));
          }
        }
        for (var k = 0; k < allVariables.length; k += 1) {
          if (variableNamesToKeep.indexOf(allVariables[k].name) == -1) {
            this.workspace.deleteVariableById(allVariables[k].getId());
          }
        }
        return;
      }
        
      if (event.type != Blockly.Events.BLOCK_CREATE) {
        return;
      }
  
      var block = this.workspace.getBlockById(event.blockId);
      // This is to handle the one none variable block
      // Happens when all the blocks are regenerated
      if (!block.getField('NAME')) {
        return;
      }
      var varName = block.getFieldValue('NAME');
      var variable = this.workspace.getVariable(varName);
  
      if (!variable) {
        // This means the parameter name is not in use and we can create the variable.
        variable = this.workspace.createVariable(varName);
      }
      // If the blocks are connected we don't have to check duplicate variables
      // This only happens if the dialog box is open
      if (block.previousConnection.isConnected() || block.nextConnection.isConnected()) {
        return;
      }
  
      for (var j = 0; j < blocks.length; j += 1) {
        // filter block that was created
        if (block.id != blocks[j].id && blocks[j].getFieldValue('NAME') == variable.name) {
          // generate new name and set name field
          varName = Blockly.Variables.generateUniqueName(this.workspace);
          variable = this.workspace.createVariable(varName);
          block.setFieldValue(variable.name, 'NAME');
          return;
        }
      }
    }
  };
  
  
  Blockly.Blocks['procedures_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function() {
      var field = new Blockly.FieldTextInput('x', this.validator_);
      // Hack: override showEditor to do just a little bit more work.
      // We don't have a good place to hook into the start of a text edit.
      field.oldShowEditorFn_ = field.showEditor_;
      var newShowEditorFn = function() {
        this.createdVariables_ = [];
        this.oldShowEditorFn_();
      };
      field.showEditor_ = newShowEditorFn;
  
      this.appendDummyInput()
          .appendField(Blockly.Msg['PROCEDURES_MUTATORARG_TITLE'])
          .appendField(field, 'NAME');
      this.setPreviousStatement(true, 'Arg');
      this.setNextStatement(true, 'Arg');
      this.setStyle('procedure_blocks');
      this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORARG_TOOLTIP']);
      this.contextMenu = false;
  
      // Create the default variable when we drag the block in from the flyout.
      // Have to do this after installing the field on the block.
      field.onFinishEditing_ = this.deleteIntermediateVars_;
      // Create an empty list so onFinishEditing_ has something to look at, even
      // though the editor was never opened.
      field.createdVariables_ = [];
      field.onFinishEditing_('x');
    },
  
    /**
     * Obtain a valid name for the procedure argument. Create a variable if
     * necessary.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} varName User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.FieldTextInput
     */
    validator_: function(varName) {
      var outerWs = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
      varName = varName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
      if (!varName) {
        return null;
      }
      // Prevents duplicate parameter names in functions
      var blocks = this.sourceBlock_.workspace.getAllBlocks();
      for (var i = 0; i < blocks.length; i += 1) {
        if (blocks[i].id == this.sourceBlock_.id) {
          continue;
        }
        if (blocks[i].getFieldValue('NAME') == varName) {
          return null;
        }
      }
      var model = outerWs.getVariable(varName, '');
      if (model && model.name != varName) {
        // Rename the variable (case change)
        outerWs.renameVarById(model.getId(), varName);
      }
      if (!model) {
        model = outerWs.createVariable(varName, '');
        if (model && this.createdVariables_) {
          this.createdVariables_.push(model);
        }
      }
      return varName;
    },
    /**
     * Called when focusing away from the text field.
     * Deletes all variables that were created as the user typed their intended
     * variable name.
     * @param {string} newText The new variable name.
     * @private
     * @this Blockly.FieldTextInput
     */
    deleteIntermediateVars_: function(newText) {
      var outerWs = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
      if (!outerWs) {
        return;
      }
      for (var i = 0; i < this.createdVariables_.length; i++) {
        var model = this.createdVariables_[i];
        if (model.name != newText) {
          outerWs.deleteVariableById(model.getId());
        }
      }
    }
  };

  Blockly.Blocks['procedures_callreturn'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
      this.appendDummyInput('TOPROW')
          .appendField('(')
          .appendField('', 'NAME');
      this.appendDummyInput('END')
          .appendField(')');
      this.setOutput(true);
      this.setStyle('procedure_blocks');
      // Tooltip is set in domToMutation.
      this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
      this.arguments_ = [];
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
      this.previousDisabledState_ = false;
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
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      var baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function(paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }
    // Test arguments (arrays of strings) for changes. '\n' is not a valid
    // argument name character, so it is a valid delimiter here.
    if (paramNames.join('\n') == this.arguments_.join('\n')) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw RangeError('paramNames and paramIds must be the same length.');
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      this.quarkIds_ = [];
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
            paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours_();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    // And rebuild the argument model list.
    this.argumentVarModels_ = [];
    for (var i = 0; i < this.arguments_.length; i++) {
      var variable = Blockly.Variables.getOrCreateVariablePackage(
          this.workspace, null, this.arguments_[i], '');
      this.argumentVarModels_.push(variable);
    }

    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.getInput('END')) {
        this.removeInput('END');
    }

    for (var i = 0; i < this.arguments_.length; i++) {
    //   var field = this.getField('ARGNAME' + i);
    //   if (field) {
    //     // Ensure argument name is up to date.
    //     // The argument name field is deterministic based on the mutation,
    //     // no need to fire a change event.
    //     Blockly.Events.disable();
    //     try {
    //       field.setValue(this.arguments_[i]);
    //     } finally {
    //       Blockly.Events.enable();
    //     }
    //   } else {
        // Add new input.
        // field = new Blockly.FieldLabel(this.arguments_[i]);
        if (!this.getInput('ARG' + i)) {
            var input = this.appendValueInput('ARG' + i)
                .setAlign(Blockly.ALIGN_RIGHT)
            /* .appendField(field, 'ARGNAME' + i) */;
            input.init();
        }
    //   }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    var end =this.appendDummyInput('END')
                 .appendField(')');
    end.init();
    // Add 'with:' if there are parameters, remove otherwise.
    // var topRow = this.getInput('TOPROW');
    // if (topRow) {
    //   if (this.arguments_.length) {
    //     if (!this.getField('WITH')) {
    //       topRow.appendField(Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'], 'WITH');
    //       topRow.init();
    //     }
    //   } else {
    //     if (this.getField('WITH')) {
    //       topRow.removeField('WITH');
    //     }
    //   }
    // }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this Blockly.Block
   */
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  /**
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CREATE &&
        event.ids.indexOf(this.id) != -1) {
      // Look for the case where a procedure call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && (def.type != this.defType_ ||
          JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
        /**
         * Create matching definition block.
         * <xml>
         *   <block type="procedures_defreturn" x="10" y="20">
         *     <mutation name="test">
         *       <arg name="x"></arg>
         *     </mutation>
         *     <field name="NAME">test</field>
         *   </block>
         * </xml>
         */
        var xml = document.createElement('xml');
        var block = document.createElement('block');
        block.setAttribute('type', this.defType_);
        var xy = this.getRelativeToSurfaceXY();
        var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        var y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        var mutation = this.mutationToDom();
        block.appendChild(mutation);
        var field = document.createElement('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(document.createTextNode(this.getProcedureCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.CHANGE && event.element == 'disabled') {
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && def.id == event.blockId) {
        // in most cases the old group should be ''
        var oldGroup = Blockly.Events.getGroup();
        if (oldGroup) {
          // This should only be possible programatically and may indicate a problem
          // with event grouping. If you see this message please investigate. If the
          // use ends up being valid we may need to reorder events in the undo stack.
          console.log('Saw an existing group while responding to a definition change');
        }
        Blockly.Events.setGroup(event.group);
        if (event.newValue) {
          this.previousDisabledState_ = this.disabled;
          this.setDisabled(true);
        } else {
          this.setDisabled(this.previousDisabledState_);
        }
        Blockly.Events.setGroup(oldGroup);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    if (!this.workspace.isMovable()) {
      // If we center on the block and the workspace isn't movable we could
      // loose blocks at the edges of the workspace.
      return;
    }

    var option = {enabled: true};
    option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  }, 

  defType_: 'procedures_defreturn'
};

// Blockly.Blocks['scheme_implicit_begin'] = {
//     init: function () {
//       // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
//       this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
//       this.itemCount_ = 1;
//       this.updateShape_();
//       this.setOutput(true);
//       this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
//       this.setTooltip("暗黙の begin を作ります。");
//     },
  
//     mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
//     domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
//     updateShape0_: Blockly.Blocks['scheme_begin'].updateShape0_,
//     decompose: Blockly.Blocks['scheme_begin'].decompose,
//     compose: Blockly.Blocks['scheme_begin'].compose,
//     saveConnections: Blockly.Blocks['scheme_begin'].saveConnections,

//     /**
//      * Modify this block to have the correct number of inputs.
//      * @private
//      * @this Blockly.Block
//      */
//     updateShape_: function () {
//         this.updateShape0_();
//     }
//   };