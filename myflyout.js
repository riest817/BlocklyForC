// see, https://developers.google.com/blockly/guides/configure/web/toolbox
/* 
19/06/06  新規
 */
Blockly.Msg['REGULAR_EXPRESSION_NAMES_HIGHLIGHT_DEF'] = "定義を強調表示します。"
Blockly.Msg['REGULAR_EXPRESSION_NAMES_CREATE_DO'] = "%1をつくる";

Blockly.RegularExpressionNames = {};
Blockly.REGULAR_EXPRESSION_NAME_CATEGORY_NAME = 'REGULAR_EXPRESSION_NAME';
Blockly.RegularExpressionNames.NAME_TYPE = Blockly.REGULAR_EXPRESSION_NAME_CATEGORY_NAME;

Blockly.Blocks['re_name_def'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(65);
    this/*.appendDummyInput()*/.appendValueInput('A')
        .appendField("定義")
        .appendField(new Blockly.FieldTextInput(''), 'NAME');
//        .appendField("");
//    this.appendValueInput('A')
//        .appendField(" ");
    //this.setOutput(true, 'String');   // 左部との接続を可能にする
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "正規表現を定義します。";        // ポインタを合わせたときの説明文
    });
  },
  /**
   * Return the name of this definition
   * @return {!Array} Tuple containing one element:
   *     - the name of the definition,
   * @this Blockly.Block
   */
  getRegularExpressionNameDef: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    // Add option to create user.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.REGULAR_EXPRESSION_NAMES_CREATE_DO.replace('%1', name);
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', 're_name_use');
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Blocks['re_name_use'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField("使用")
        .appendField('', 'NAME')
        .appendField("");
    this.setOutput(true, 'String');		// 左部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "定義した正規表現を使います。";        // ポインタを合わせたときの説明文
    });
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getRegularExpressionNameCall: function() {
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
    if (Blockly.Names.equals(oldName, this.getRegularExpressionNameCall())) {
      this.setFieldValue(newName, 'NAME');
    }
  },

  /**
   * Create XML to represent the (non-editable) name.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getRegularExpressionNameCall());
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getRegularExpressionNameCall(), name);
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
      var name = this.getRegularExpressionNameCall();
      var def = Blockly.RegularExpressionNames.getDefinition(name, this.workspace);
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
         *   <block type="re_name_def" x="10" y="20">
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
        var field = document.createElement('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(document.createTextNode(this.getRegularExpressionNameCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getRegularExpressionNameCall();
      var def = Blockly.RegularExpressionNames.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.CHANGE && event.element == 'disabled') {
      var name = this.getRegularExpressionNameCall();
      var def = Blockly.RegularExpressionNames.getDefinition(name, this.workspace);
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
    var option = {enabled: true};
    option.text = Blockly.Msg['REGULAR_EXPRESSION_NAMES_HIGHLIGHT_DEF'];
    var name = this.getRegularExpressionNameCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.RegularExpressionNames.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 're_name_def'
};

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.RegularExpressionNames.nameComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Find all user-created name definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.RegularExpressionNames.allRegularExpressionNames = function(root) {
  var blocks = root.getAllBlocks(false);
  var reNames = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getRegularExpressionNameDef) {
      var tuple = blocks[i].getRegularExpressionNameDef();
      if (tuple) {
          reNames.push(tuple);
      }
    }
  }
  reNames.sort(Blockly.RegularExpressionNames.nameComparator_);
  return reNames;
};

/**
 * Find the definition block for the named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 */
Blockly.RegularExpressionNames.getDefinition = function(name, workspace) {
  // Assume that a procedure definition is a top block.
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getRegularExpressionNameDef) {
      var tuple = blocks[i].getRegularExpressionNameDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];
      }
    }
  }
  return null;
};
/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.RegularExpressionNames.rename = function(name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');

  // Ensure two identically-named procedures don't exist.
  var legalName = Blockly.RegularExpressionNames.findLegalName(name, this.sourceBlock_);
  var oldName = this.text_;
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.sourceBlock_.workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renameProcedure) {
        blocks[i].renameProcedure(oldName, legalName);
      }
    }
  }
  return legalName;
};

/**
 * Ensure two identically-named procedures don't exist.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.RegularExpressionNames.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple procedures called 'do something'.
    return name;
  }
  while (!Blockly.RegularExpressionNames.isLegalName_(name, block.workspace, block)) {
    // Collision with another procedure.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};

/**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.RegularExpressionNames.isLegalName_ = function(name, workspace, opt_exclude) {
  return !Blockly.RegularExpressionNames.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a procedure name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.RegularExpressionNames.isNameUsed = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getRegularExpressionNameDef) {
      var procName = blocks[i].getRegularExpressionNameDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.RegularExpressionNames.flyoutCategory = function(workspace) {
  var xmlList = [];
  if (Blockly.Blocks['re_name_def']) {
    // <block type="re_name_def" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.Xml.utils.createElement('block');
    block.setAttribute('type', 're_name_def');
    block.setAttribute('gap', 16);
    var nameField = Blockly.Xml.utils.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.Xml.utils.createTextNode("FOO"));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
  }

  function populateNames(nameList, templateName) {
    for (var i = 0; i < nameList.length; i++) {
      var name = nameList[i][0];
      // <block type="re_name_use" gap="16">
      // </block>
      var block = Blockly.Xml.utils.createElement('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);
      var mutation = Blockly.Xml.utils.createElement('mutation');
      mutation.setAttribute('name', name);
      block.appendChild(mutation);
      xmlList.push(block);
    }
  }

  var tuple = Blockly.RegularExpressionNames.allRegularExpressionNames(workspace);
  populateNames(tuple, 're_name_use');
  return xmlList;
};


Blockly.RegularExpressionNames.init = function(workspace)  {
  if (Blockly.RegularExpressionNames && Blockly.RegularExpressionNames.flyoutCategory) {
    workspace.registerToolboxCategoryCallback(Blockly.REGULAR_EXPRESSION_NAME_CATEGORY_NAME,
        Blockly.RegularExpressionNames.flyoutCategory);
  } 
}

// 登録順に呼び出される。
window.addEventListener('load', function() { Blockly.RegularExpressionNames.init(Code.workspace); });
