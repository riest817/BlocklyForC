/**
 * 2017/07/05 variables.js　の135行目以降を a.js に避難
 * 
 */

Blockly.Blocks['variables_dec'] = {
  // Variable setter.
  init: function() {
    var TYPES =
        [["int", "INT"],
         ["double", "DOUBLE"],
         ["float", "FLOAT"],
         ["char", "CHAR"]];
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.setColour(330);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(TYPES), "TYPE")
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_SET_ITEM), 'VAR');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setTooltip('変数の型を宣言します。');
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};

Blockly.Blocks['quiz_declaration1'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int  ")
        .appendField(new Blockly.FieldDropdown([["i", "i"], ["n", "n"], ["num", "num"], ["sum", "sum"], ["tmp", "tmp"]]), "option")
        .appendField(";");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_declaration1_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int i, n;");
    this.appendDummyInput()
        .appendField("int arr[5] = {0};");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_declaration2_def'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField("int i, n;");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["float", "float"]]), "TYPE")
        .appendField(new Blockly.FieldTextInput("variable"), "VARIABLE")
        .appendField(";");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['quiz_variable2'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["int", "int"], ["double", "double"], ["float", "float"]]), "TYPE")
        .appendField(" ");
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
        .appendField(" = ");
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("変数の宣言");
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};
