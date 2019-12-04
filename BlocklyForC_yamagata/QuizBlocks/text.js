Blockly.Blocks['quiz_printf2'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\",")
        .appendField(new Blockly.FieldDropdown([["arr[i]", "arr[i]"], ["arr[n]", "arr[n]"], ["arr[tmp]", "arr[tmp]"]]), "option")
        .appendField(");");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_printf2'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'printf("%d\n", ' + option + ' );\n';
  return code;
};

Blockly.Python['quiz_printf2'] = function(block) {
  var code = '//////////////////////////////\n';
  code += '//Pythonのソースコードでは出力できません//\n';
  code += '//////////////////////////////\n';
  return code;
};

Blockly.Blocks['quiz_printf2_pre'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[0]);");
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[1]);");
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[2]);");
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[3]);");
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[4]);");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_printf2_pre'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[0]);\nprintf(\"%d\\n\", arr[1]);\nprintf(\"%d\\n\", arr[2]);\nprintf(\"%d\\n\", arr[3]);\nprintf(\"%d\\n\", arr[4]);\n';
  return code;
};

Blockly.Blocks['quiz_printf_arr'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", arr[i]);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_printf_arr'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[i]);\n';
  return code;
};


Blockly.Blocks['quiz_printf_n'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\",arr[n] );")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_printf_n'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[n]);\n';
  return code;
};

Blockly.Blocks['quiz_printf_i'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", i);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_printf_i'] = function(block) {
  var code = 'printf(\"%d\\n\", i);\n';
  return code;
};

Blockly.Blocks['quiz3_printf1'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d : Good\\n\", arr[i]);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_printf1'] = function(block) {
  var code = 'printf(\"%d : Good\\n\", arr[i]);\n';
  return code;
};

Blockly.Blocks['quiz3_printf2'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("printf(\"%d : Bad\\n\", arr[i]);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_printf2'] = function(block) {
  var code = 'printf(\"%d : Bad\\n\", arr[i]);\n';
  return code;
};

Blockly.Blocks['quiz_scanf_n'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("scanf(\"%d\", &n);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_scanf_n'] = function(block) {
  var code = 'scanf(\"%d\", &n);\n';
  return code;
};

Blockly.Blocks['quiz_scanf_arr'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField("scanf(\"%d\", &arr[i]);")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_scanf_arr'] = function(block) {
  var code = 'scanf(\"%d\", &arr[i]);\n';
  return code;
};

Blockly.Blocks['quiz_process_a'] = {
  init: function() {
    this.setColour(5);
    this.appendDummyInput()
        .appendField("//----\n処理A\n//----");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_process_a'] = function(block) {
  var code = '//----------------\n' + '//  ProcessA\n' + '//----------------\n\n';
  return code;
};

Blockly.Python['quiz_process_a'] = function(block) {
  var code = '//----------------\n' + '//  ProcessA\n' + '//----------------\n\n';
  return code;
};

Blockly.Blocks['quiz_frame'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(5);
    this.appendDummyInput()
        .appendField("          (1)        ");
    this.appendStatementInput("DO");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz_frame'] = function(block) {
  var branch = Blockly.C.statementToCode(block, 'DO');
  var code = branch;
  return code;
};

Blockly.Blocks['quiz_print1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("printf(\"%d\\n\", ")
        .appendField(new Blockly.FieldTextInput(""), "NAME")
        .appendField(");");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.C['quiz_print1'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'printf("%d\\n", ' + text_name + ' );\n';
  return code;
};

Blockly.Python['quiz_print1'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'print(' + text_name +')\n';
  return code;
};

Blockly.Blocks['printf_join'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
/*    this.appendDummyInput()
        .appendField("printf(\" ")
        .appendField(new Blockly.FieldTextInput("%)d\\n"), "VALUE");
*/    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['printf_create_join_item']));
    this.setTooltip("使用できる引数の数は変更できます");
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
    var containerBlock = workspace.newBlock('printf_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('printf_create_join_item');
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
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
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
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      if (this.getInput('TEXT')) { this.removeInput('TEXT'); }
      if (this.getInput('END')) { this.removeInput('END'); }
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("printf(\"%d\\n\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(",");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.Blocks['printf_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField("join");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['printf_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField("item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;

  }
};

Blockly.C['printf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'printf("%d\\n"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;
};

Blockly.Python['printf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,
          Blockly.Python.ORDER_NONE) || '0';
    }
    code = 'print(';
    for (n = 0; n < block.itemCount_; n++) {
    code += arr[n];
    if (n != block.itemCount_-1 ) { code += ', ';}
  }
  code += ')\n';
    return code;
};

Blockly.Blocks['quiz_scanf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("scanf(\"");
    this.appendValueInput("TYPE")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("\",");
    this.appendValueInput("VAR")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.C['quiz_scanf'] = function(block) {
  var value_type = Blockly.C.valueToCode(block, 'TYPE', Blockly.C.ORDER_ATOMIC);
  var value_var = Blockly.C.valueToCode(block, 'VAR', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'scanf(\"' + value_type + '\", ' + value_var + ' );\n';
  return code;
};

Blockly.Python['quiz_scanf'] = function(block) {
  var value_type = Blockly.Python.valueToCode(block, 'TYPE', Blockly.Python.ORDER_ATOMIC);
  var value_var = Blockly.Python.valueToCode(block, 'VAR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'input(\'' + value_type + '\', ' + value_var + ')\n';
  return code;
};

//quiz_scanf���g���₷������block
Blockly.Blocks['quiz_scanf2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("scanf(\"")
        .appendField(new Blockly.FieldDropdown([["%d", "INT"], ["%f", "DOUBLE"], ["%s", "STR"], ["%c", "CHAR"]]), "TYPE")
        .appendField("\", ")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField(");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.C['quiz_scanf2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.C.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = 'scanf(\"' + dropdown_type + '", ' + variable_var + ');\n';
  return code;
};

Blockly.Python['quiz_scanf2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var variable_var = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var type;
  if (dropdown_type == 'INT') { type = 'int'; }
  else if (dropdown_type == 'DOUBLE') { type = 'double'; }
  else if (dropdown_type == 'STR') { type = 'string'; }
  else if (dropdown_type == 'CHAR') { type = 'char'; }
  var code = variable_var + ' = ' + type + '(input())\n';
  return code;
};


//以下はHaskellで使用するブロック

Blockly.Blocks['printf_join2'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
/*    this.appendDummyInput()
        .appendField("printf(\" ")
        .appendField(new Blockly.FieldTextInput("%)d\\n"), "VALUE");
*/    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['printf_create_join_item']));
    this.setTooltip("引数の数を変えることができます。");
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
    var containerBlock = workspace.newBlock('printf_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('printf_create_join_item');
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
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
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
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      if (this.getInput('TEXT')) { this.removeInput('TEXT'); }
      if (this.getInput('END')) { this.removeInput('END'); }
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == -1) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("printf(\"")
        .appendField(new Blockly.FieldTextInput("%d\\n"), "INPUT")
        .appendField("\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(",");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.C['printf_join2'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'printf("' + text_input + '"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;
};

Blockly.Python['printf_join2'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,
          Blockly.Python.ORDER_NONE) || '0';
    }
    code = 'print(';
    for (n = 0; n < block.itemCount_; n++) {
    code += arr[n];
    if (n != block.itemCount_-1 ) { code += ', ';}
  }
  code += ')\n';
  return code;
};

Blockly.Blocks['printf_in_join2'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
/*    this.appendDummyInput()
        .appendField("printf(\" ")
        .appendField(new Blockly.FieldTextInput("%)d\\n"), "VALUE");
*/    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setMutator(new Blockly.Mutator(['printf_create_join_item']));
    this.setTooltip("引数の数を変えることができます。");
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
    var containerBlock = workspace.newBlock('printf_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('printf_create_join_item');
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
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
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
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      if (this.getInput('TEXT')) { this.removeInput('TEXT'); }
      if (this.getInput('END')) { this.removeInput('END'); }
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == -1) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("printf(\"")
        .appendField(new Blockly.FieldTextInput("%d\\n"), "INPUT")
        .appendField("\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(",");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.C['printf_in_join2'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'printf("' + text_input + '"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ')';
  return [code, Blockly.C.ORDER_NONE];
};

Blockly.Python['printf_in_join2'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,
          Blockly.Python.ORDER_NONE) || '0';
    }
    code = 'print(';
    for (n = 0; n < block.itemCount_; n++) {
    code += arr[n];
    if (n != block.itemCount_-1 ) { code += ', ';}
  }
  code += ')\n';
  return code;
};

Blockly.Blocks['quiz_puts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("puts(\"")
        .appendField(new Blockly.FieldTextInput(""), "INPUT")
        .appendField("\");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.C['quiz_puts'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'puts(\"' + text_input + '\");\n';
  return code;
};

Blockly.Python['quiz_puts'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'print(\'' + text_input + '\')\n';
  return code;
};

Blockly.Blocks['quiz_in_puts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("puts(\"")
        .appendField(new Blockly.FieldTextInput(""), "INPUT")
        .appendField("\");");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
  }
};

Blockly.C['quiz_in_puts'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'puts(\"' + text_input + '\")';
  return [code, 0];
};

Blockly.Python['quiz_in_puts'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'print(\'' + text_input + '\')';
  return [code, 0];
};

Blockly.Blocks['scanf_join'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
/*    this.appendDummyInput()
        .appendField("printf(\" ")
        .appendField(new Blockly.FieldTextInput("%)d\\n"), "VALUE");
*/  this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['printf_create_join_item']));
    this.setTooltip("引数の数を変えることができます。");
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
    var containerBlock = workspace.newBlock('printf_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('printf_create_join_item');
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
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
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
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      if (this.getInput('TEXT')) { this.removeInput('TEXT'); }
      if (this.getInput('END')) { this.removeInput('END'); }
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == -1) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    } else {
      var input = "";
       input = this.appendDummyInput('TEXT').appendField("scanf(\"")
        .appendField(new Blockly.FieldTextInput("%d"), "INPUT")
        .appendField("\"");
       /*
       input = this.appendDummyInput()
       .appendField(new Blockly.FieldTextInput("%d\\n"), "ValueText");
       */
      for (var i = 0; i < this.itemCount_; i++) {
         input = this.appendValueInput('ADD' + i)
                        .appendField(", ");
/*        if (i == 0) {

}*/
      }
      input = this.appendDummyInput('END').appendField(");");
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.C['scanf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var text_input = block.getFieldValue('INPUT');
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,
          Blockly.C.ORDER_NONE) || '0';
    }
    code = 'scanf("' + text_input + '"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
  return code;
};

Blockly.Python['scanf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  var text_input = block.getFieldValue('INPUT');
  var arr = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,
      Blockly.Python.ORDER_NONE) || '0';
  }
  code = 'input(\'' + text_input + '\')\n';
  return code;
};

/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/

Blockly.Blocks['output_auto'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(1000);
    this.appendDummyInput()
        .appendField("出力(自動)")
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('', this.validator), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setInputsInline(true);		  // インプットを内側にする
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "テキストボックスの中の%の数で変数を動的に検出して出力します。";
    });
    //this.itemCount_ = 0;
    this.updateShape_();
  },

  /**
   * 開いたまたは閉じた見積もりのイメージを作成します。
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },

  // ==============  追加 (06/29) ======================
  validator: function(text) {
  	//var target = this.getFieldValue('TEXT');	// 入力文字を動的に記録する
  	var target = this.getText(text);			// 入力文字を動的に記録する
  	var counter = function(str,seq){
    	return str.split(seq).length - 1;
		}
    this.sourceBlock_.itemCount_ = counter(target,"%");
    //console.log(this.sourceBlock_.itemCount_);				// コンソール出力
    //this.updateShape_();
    this.sourceBlock_.updateShape_();
  },
  // ==============  追加ここまで (06/29) ======================

  /**
   * このブロックを修正して、正しい数の入力を持つようにします。
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {

    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      /*this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));*/
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
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
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  },

};

  /*
・myCBlocks.js に新しいブロックが生成する C 言語のソース:
    Blockly.C['〜'] = function(block) {
        〜
    }
  を追加する。
*/

Blockly.C['output_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var text_input = block.getFieldValue('TEXT');
  var code = 'printf("' + text_input;

  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,  Blockly.C.ORDER_NONE);
  }

  code += '\\n"';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';

  return code;
};

Blockly.Python['output_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var text_input = block.getFieldValue('TEXT');
  var code = 'print(';

  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,  Blockly.Python.ORDER_NONE);
  }
  var text_arr = text_input.split('%');

  code += '\'' + text_arr[0] + '\'';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
    if ( text_arr[n+1].slice(1).length > 0 ) { 
      text_arr[n+1] = text_arr[n+1].slice(1);
      code += ', \'' + text_arr[n+1] + '\''; 
    }
  }
  code += ')\n';

  return code;
};

Blockly.Blocks['putchar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("putchar('")
        .appendField(new Blockly.FieldTextInput(""), "INPUT")
        .appendField("');");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['putchar'] = function(block) {
  var text_input = block.getFieldValue('INPUT');
  // TODO: Assemble JavaScript into code variable.
  var code = 'putchar(' + text_input + ');\n';
  return code;
};
