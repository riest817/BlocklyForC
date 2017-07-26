/*
2017/07/11 haskell\output.js 新規作成
*/

/*
・myCBlocks.js に新しいブロックの定義:
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。
*/
/*
・myCBlocks.js に新しいブロックが生成する C 言語のソース:
    Blockly.C['〜'] = function(block) {
        〜
    }
  を追加する。
*/
Blockly.Blocks['output_text'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(1000);
    this.appendDummyInput()
        .appendField("出力")
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    //this.setOutput(true, 'String');
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          "行単位のテキスト出力。";
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};


Blockly.Haskell['output_text'] = function(block) {
  // Text value.
  var code = 'print "';
  code += block.getFieldValue('TEXT');
  code += '"\n';
  return code;
};

Blockly.Blocks['output_var'] = {
  init: function() {
    this.setColour(1000);
    this.jsonInit({ "message0": "出力" });
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    this.setTooltip("変数の出力");
  }
};

Blockly.Haskell['output_var'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'print ';
  
  code += value_b + '\n';
  return code;
};