/*
2017/08/02 control.js 新規作成
*/
/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/

Blockly.Blocks['first_flex'] = {
  init: function() {
    this.setHelpUrl("http://okumocchi.jp/php/re.php");
    this.setColour(170);
    this.appendDummyInput()
        .appendField("最初にこのブロックを設置してください");
    this.appendStatementInput('DO0')
        .appendField("定義");
    this.appendStatementInput('DO1')
        .appendField("動作");
	  this.appendStatementInput('DO2')
        .appendField("関数");
    //this.setPreviousStatement(true);  // 上部との接続を可能にする	
    //this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("最初にこのブロックを設置して、定義、動作、関数ブロックを接続してください。");     // ポインタを合わせたときの説明文
  }
};

// 18/05/29
Blockly.Blocks['exit'] = {

  init: function() {
    var OPERATORS =
        [[Blockly.Msg.exit_0, '0'],
         [Blockly.Msg.exit_1, '1']];
    this.setHelpUrl("http://kaworu.jpn.org/c/C%E8%A8%80%E8%AA%9E%E3%81%AEexit%E9%96%A2%E6%95%B0%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9");
    this.setColour(170);
    this.appendDummyInput()
        .appendField(Blockly.Msg.exit)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.setOutput(false);   // 左部との接続を可能にする
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    //this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "プログラミングを終了する処理です。";      // ポインタを合わせたときの説明文
    });
  }
};