/*
18/01/16 17/07/**に作成したブロックをこちらに避難
*/

Blockly.Blocks['main_haskell'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://qiita.com/7shi/items/145f1234f8ec2af923ef#%E3%83%8F%E3%83%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%AB%E3%83%89");
    this.setColour(Blockly.Blocks.logic.HUE);	// Blockly.Blocks.logic.HUE = 210
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
    this.setColour(Blockly.Blocks.logic.HUE);	// Blockly.Blocks.logic.HUE = 210
    //this.appendField("do");
    this.appendStatementInput('DO0')
        .appendField("do");		
    this.setOutput(true);   // 右部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
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

  return code + '\n';
};

Blockly.Blocks['where_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);	// Blockly.Blocks.logic.HUE = 210
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

Blockly.Blocks['let_haskell'] = {

  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);	// Blockly.Blocks.logic.HUE = 210
    //this.appendField("do");
    this.appendStatementInput('DO0')
        .appendField("let");		
    this.setPreviousStatement(true);  // 上部との接続を可能にする	
    this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("ある式の中だけ有効な束縛を導入できます。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['let_haskell'] = function(block) {
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'let\n' + branch ;

  return code;
};

Blockly.Blocks['let_in_haskell'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);	// Blockly.Blocks.logic.HUE = 210
    //this.appendField("do");
    this.appendStatementInput('DO0')
        .appendField("let");
    this.appendValueInput('DO0')
        .appendField("in");
    this.setPreviousStatement(true);  // 上部との接続を可能にする	
    this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("doがなければ最後にinが必要になります。");     // ポインタを合わせたときの説明文
  }
};

Blockly.Haskell['let_in_haskell'] = function(block) {
  var n = 0;
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'in' + branch ;

  return code;
};


