/*
2017/07/06 haskell\logic.js 新規作成
2017/07/06 ['if_then_else_haskell'] ブロック作成
2017/07/11 ['main_haskell'] ブロック作成
2017/07/11 ['do_haskell'] ブロック作成
2017/07/13 setTooltipの内容を変更
17/12/12  ['controls_if_haskell'] 作成
18/01/10  ['logic_compare'] 作成
18/01/16  17/07/**に作成したブロックを別のファイルに避難
18/11/28  ['let_in_haskell'] 作成
18/11/05  ['where_haskell'] 作成
18/12/12  ['case_haskell'] 作成 / ['controls_if_haskell'] 改良
*/

Blockly.Msg["LOGIC_HUE"] = 210;
// 18/12/12 変更
Blockly.Blocks['controls_if_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendValueInput('IF0')
        .setCheck('Boolean')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendValueInput('DO0')
        .appendField("実行");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'controls_if_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
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
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck('Boolean')
          .appendField("       もしも");
      this.appendValueInput('DO' + i)
          .appendField("実行");
    }
    if (this.elseCount_) {
      this.appendValueInput('ELSE')
          .appendField("その他");
    }
  }
};

Blockly.Blocks['controls_if_if'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_elseif'] = {
  /**
   * Mutator bolck for else-if condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput()
        .appendField("もしも");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_else'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput()
        .appendField("その他");
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Haskell['controls_if_haskell'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.valueToCode(block, 'DO' + n);
  var code = '  | ' + argument + ' = ' + branch + '\n';
  
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
        Blockly.Haskell.ORDER_NONE) || 'false';
    branch = Blockly.Haskell.valueToCode(block, 'DO' + n);
    code += '  | ' + argument + ' = ' + branch + '\n';
  }
  if (block.elseCount_) {
    branch = Blockly.Haskell.valueToCode(block, 'ELSE');
    code += '  | otherwise = ' + branch + '\n';
  }
  return code;
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 18/12/12 ここまで

Blockly.Blocks['main_haskell'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://qiita.com/7shi/items/145f1234f8ec2af923ef#%E3%83%8F%E3%83%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%AB%E3%83%89");
    this.setColour(Blockly.Msg["LOGIC_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    this.appendValueInput('DO0')
        .appendField("main");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip("mainアクションの評価から始まります。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['main_haskell'] = function(block) {
  var n = 0;
  // Text value.
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'main =' + branch;
  return code;
};


Blockly.Blocks['do_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    //this.appendField("do");
    this.appendStatementInput('DO0')
        .appendField("do");   
    this.setOutput(true);   // 左部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("do式でまとめられたアクションが上から下へ実行されるようになります。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['do_haskell'] = function(block) {
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'do\n' + branch + '\n';

  return code;
};

Blockly.Blocks['let_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    //this.appendField("do");
    this.appendStatementInput('DO')
        .appendField("let");    
    this.setPreviousStatement(true);  // 上部との接続を可能にする 
    this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setOutput(true);   // 左部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("let式の中だけ有効な束縛を導入できます。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['let_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = 'let\n' + branch ;

  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

// 18/11/28
Blockly.Blocks['let_in_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    //this.appendField("do");
    this.appendStatementInput('DO')
        .appendField("let");    
    this.appendValueInput('VALUE')
        .appendField("        in");
    this.setPreviousStatement(true);  // 上部との接続を可能にする 
    //this.setNextStatement(true);      // 下部との接続を可能にする
    this.setOutput(true);   // 左部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("let式の中だけ有効な束縛を導入できます。\nまた、let式の値はinの後に書いた式の値です。");     // ポインタを合わせたときの説明文
  }
};

// 18/11/29  インデントがおかしい
Blockly.Haskell['let_in_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var value = Blockly.Haskell.valueToCode(block, 'VALUE');
  var code = 'let\n' + branch + '    in ' + value;

  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

// 18/12/05 追加
Blockly.Blocks['where_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]); // Blockly.Msg["LOGIC_HUE"] = 210
    //this.appendField("do");
    this.appendStatementInput('DO0')
        .appendField("where");    
    this.setPreviousStatement(true);
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("後置型の構文で、ある式だけに有効な定義を導入します。特定の関数内だけで定義したいときなどに使います。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['where_haskell'] = function(block) {
  var n = 0;

  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'where\n' + branch + '\n';

  return code + '\n';
};

// 18/12/12 追加
Blockly.Blocks['case_haskell'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendDummyInput()
        .appendField("case");
    this.appendValueInput('VAR');
    this.appendDummyInput()
        .appendField("of");
    this.setOutput(true);
    this.setInputsInline(true);
    this.appendStatementInput('ADD');
    this.setTooltip("関数の引数以外でもパターンマッチやガードを使いたいときにはcase式を使います。");
  }
};

Blockly.Haskell['case_haskell'] = function(block) {
  // Call a procedure with a return value.
  var code = 'case ';
  code += Blockly.Haskell.valueToCode(block, 'VAR',
        Blockly.Haskell.ORDER_COMMA) || '_';
  code += ' of\n';

  code += Blockly.Haskell.statementToCode(block, 'ADD');
  //code += Blockly.Haskell.statementToCode(block, 'ADD');
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Blocks['single_pattern'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.appendValueInput('PATTERN');
    this.appendDummyInput()
        .appendField("->");
    this.appendValueInput('RESULT');
    //this.setOutput(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip("1つのパターンマッチを表します。");
  }
};

Blockly.Haskell['single_pattern'] = function(block) {
    // Call a procedure with a return value.
  
  var arg1 = Blockly.Haskell.valueToCode(block, 'PATTERN',
        Blockly.Haskell.ORDER_COMMA) || '_';
  var arg2 = Blockly.Haskell.valueToCode(block, 'RESULT',
        Blockly.Haskell.ORDER_COMMA) || '_';
  var code =　arg1 + ' -> ' + arg2 ;
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};

// 19/02/13 
Blockly.Blocks['logic_boolean_haskell'] = {
  /**
   * Block for boolean data type: true and false.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
          "options": [
            [Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]
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
// 19/02/13 ここまで