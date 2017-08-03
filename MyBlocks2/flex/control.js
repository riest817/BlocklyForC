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