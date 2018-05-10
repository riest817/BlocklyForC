/*
2017/08/02 function.js 新規作成
18/05/08 概念と文法を分別化
*/
/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/

Blockly.Blocks['yylex'] = {

  init: function() {
    this.setHelpUrl();
    this.setColour(290);
    this.appendDummyInput()
        .appendField(Blockly.Msg.yylex);
    //this.setOutput(true, 'String');		// 左部との接続を可能にする
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    //this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "yylex関数の記述を追加します。";			// ポインタを合わせたときの説明文
    });
  }
};
