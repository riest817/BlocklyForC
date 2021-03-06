/*
2017/10/12 output_auto.js 新規作成
2017/11/14 output_auto.js (Cookie専用) に変更
*/

Blockly.Blocks['output_auto'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    var result = GetCookies();    // 2017/10/31 追加
    // ==============  追加 (2017/11/08) ================
    var element = Blockly.Xml.blockToDom(this, false);
    var text = Blockly.Xml.domToText(element);
    id = this.findID(text);   // グローバル変数
    if ( result[id] === undefined ) { result[id] = ""; }
    //console.log(id);        // コンソール出力
    // ==============  追加ここまで (2017/11/08) ===========
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(0);
    this.appendDummyInput()
        .appendField("printf")
        .appendField(this.newQuote_(true))
        //.appendField(new Blockly.FieldTextInput('%d', this.validator), 'TEXT')    2017/10/31 ↓に変更
        .appendField(new Blockly.FieldTextInput(result[id], this.validator), 'TEXT')
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
    //this.itemCount_ = 1;   
    console.log(result[id]); 
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

  // ==============  追加 (2017/06/29) ===========================
  validator: function(text) {    

  	var target = this.getText(text);			// 入力文字を動的に記録する
  	var counter = function(str,seq){
    	return str.split(seq).length - 1;
		}
    this.sourceBlock_.itemCount_ = counter(target,"%");    
    //this.updateShape_();
    this.sourceBlock_.updateShape_();
    document.cookie = id + "=" + target;    // 2017/10/31 追加
    //console.log(document.cookie);        // コンソール出力
  },
  // ==============  追加ここまで (2017/06/29) ======================


  // ==============  追加 (2017/11/08) ===========================
  findID: function(text) {
    var p = text.indexOf("id");
    var text2 = text.substr(p+4);
    p = text2.indexOf("\"");
    var text0 = text2.substr(0, p);
    //console.log(result);
    return text0;
  },
  // ==============  追加ここまで (2017/11/08) ======================

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
  var code = 'printf("';
  
  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,  Blockly.C.ORDER_NONE);
  }

  code += block.getFieldValue('TEXT');

  code += '\\n"';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';

  return code;
};
