/*
2017/07/13 c/header.js 新規作成
*/
/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。

・myCBlocks.js に新しいブロックが生成する C 言語のソース:
    Blockly.C['〜'] = function(block) {
        〜
    }
  を追加する。
*/

Blockly.Blocks['header_container_c'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
  	this.setHelpUrl("http://www.c-tipsref.com/reference.html");
    this.setColour(Blockly.Msg.HEADER);
    this.appendDummyInput()
        .appendField("ヘッダ結合");
    this.appendStatementInput('STACK');
    var thisBlock = this;
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
  }
};

Blockly.C['header_container_c'] = function(block) {
  var n = 0;
  var branch = Blockly.C.statementToCode(block, 'DO' + n);
  var code = branch + '\n';

  return code + '\n';
};


Blockly.Blocks['include_stdio_c'] = {
  
    init: function() {
    this.setHelpUrl("http://www.c-tipsref.com/reference/stdio.html");
    this.setColour(Blockly.Msg.HEADER);
    this.appendDummyInput()
        .appendField("stdio");
    //this.setOutput(true, 'String');
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("入出力に関する関数が定義されています。");		// ポインタを合わせたときの説明文
  }
};

Blockly.C['include_stdio_c'] = function(block) {
  var code = '#include &lt';
  code += 'stdio.h';
  code += '&gt\n'
  return code;
};


Blockly.Blocks['include_stdlib_c'] = {
  
  init: function() {
    this.setHelpUrl("http://www.c-tipsref.com/reference/stdlib.html");
    this.setColour(Blockly.Msg.HEADER);
    this.appendDummyInput()
        .appendField("stdlib");
    //this.setOutput(true, 'String');
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("いくつかの一般ユーティリティ関数とマクロが定義されています。");		// ポインタを合わせたときの説明文
  }
};

Blockly.C['include_stdlib_c'] = function(block) {
  var code = '#include &lt';
  code += 'stdlib.h';
  code += '&gt\n'
  return code;
};


Blockly.Blocks['include_string_c'] = {
  
  init: function() {
    this.setHelpUrl("http://www.c-tipsref.com/reference/string.html");
    this.setColour(Blockly.Msg.HEADER);
    this.appendDummyInput()
        .appendField("string");
    //this.setOutput(true, 'String');
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("文字列操作に関する関数が定義されています。");		// ポインタを合わせたときの説明文
  }
};

Blockly.C['include_string_c'] = function(block) {
  var code = '#include &lt';
  code += 'string.h';
  code += '&gt\n'
  return code;
};


Blockly.Blocks['include_math_c'] = {
  
  init: function() {
    this.setHelpUrl("http://www.c-tipsref.com/reference/math.html");
    this.setColour(Blockly.Msg.HEADER);
    this.appendDummyInput()
        .appendField("math");
    //this.setOutput(true, 'String');
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("引数や戻り値の型の違う同機能の関数がそれぞれ３種類宣言されています。また，多くのマクロも定義されています。");		// ポインタを合わせたときの説明文
  }
};

Blockly.C['include_math_c'] = function(block) {
  var code = '#include &lt';
  code += 'math.h';
  code += '&gt\n'
  return code;
};