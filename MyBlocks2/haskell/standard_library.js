/*
19/02/26 新規作成
*/
/////////////////////////////////////////////
//    入出力処理
/////////////////////////////////////////////
Blockly.Blocks['putStr_hs'] = {
  init: function() {
    this.setColour(0);
    this.jsonInit({ "message0": Blockly.Msg.putStr_hs });
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    this.setTooltip("文字列を標準出力にそのまま出力するアクションを返します。");
  }
};

Blockly.Haskell['putStr_hs'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'putStr ';
  
  code += value_b + '\n';
  return code;
};

Blockly.Blocks['putStrLn_hs'] = {
  init: function() {
    this.setColour(0);
    this.jsonInit({ "message0": Blockly.Msg.putStrLn_hs });
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setPreviousStatement(true);  // 上部との接続を可能にする
    this.setNextStatement(true);      // 下部との接続を可能にする
    this.setTooltip("標準出力に文字列と改行を出力するときに使う関数です。");
  }
};

Blockly.Haskell['putStrLn_hs'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  var code = 'putStrLn ';
  
  code += value_b + '\n';
  return code;
};

// 19/04/03 追加
Blockly.Blocks['output_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {

    var OPERATORS =
        [[Blockly.Msg.putStr_hs, 'putstr'],
         //[Blockly.Msg.output_text, 'text'],
         [Blockly.Msg.output_var, 'var'],
         [Blockly.Msg.output_var2, 'var2']
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(0);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    /*
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendField(dropdown, 'OP');*/
    this.appendDummyInput()
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'putstr': "文字列を標準出力にそのまま出力するアクションを返します。",
        'text': "行単位のテキスト出力。",
        'var': "変数の出力。",
        'var2': "変数の出力。",
      };
      return TOOLTIPS[mode];
    });
  },

  updateType_: function(newOp) {
    if (this.getInput('TEXT')) this.removeInput('TEXT');
    if (this.getInput('B')) this.removeInput('B');
    switch (newOp) {
      case 'putstr':
        this.appendValueInput('B');
        this.setOutput(false);
        break;
      case 'text':
        this.appendDummyInput('TEXT')
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(false);
        break;
      case 'var':
        this.appendValueInput('B');
            //.setCheck('String', 'Array');
        this.setOutput(false);
        break;
      case 'var2':
        this.appendValueInput('B');
            //.setCheck('Number');
        this.setOutput(true);
        break;
      default:
        throw 'updateType_ Error'
    }/*
    if (newOp == 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }*/
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },

  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

Blockly.Haskell['output_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code;
  switch (func) {
    case 'putstr':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
      code = 'putStr ' + value + '\n';
      break;
    /*
    case 'text':
      list = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'lines ' + list + '';
      break;*/
    case 'var':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
      code = 'print ' + value + '\n';
      break;
    case 'var2':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
      code = 'print ' + value + '\n';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/04/03 ここまで

/////////////////////////////////////////////
//    リスト処理
/////////////////////////////////////////////


// 19/03/17 追加
Blockly.Blocks['list_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {

    var OPERATORS =
        [[Blockly.Msg.length, 'length'],
         [Blockly.Msg.lines, 'lines'],
         [Blockly.Msg.unlines, 'unlines'],
         [Blockly.Msg.take, 'take'],
         [Blockly.Msg.reverse, 'reverse'],
         [Blockly.Msg.words, 'words'],
         [Blockly.Msg.concat, 'concat'], // 19/04/03 追加
         [Blockly.Msg.replicate, 'replicate'] // 19/04/03 追加
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    /*
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendField(dropdown, 'OP');*/
    this.appendDummyInput()
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'length': "リストの長さ（要素の数）を返します。",
        'lines': "文字列を行のリストに分割します。分割するときに改行文字は取り除かれます。",
        'unlines': "行のリストを連結して文字列にします。各行の末尾に改行文字を付加します。",
        'take': "リスト先頭からn要素をとってリストで返します。",
        'reverse': "リストを逆順にします。",
        'words': "文字列を空白類文字だけで単語のリストに分割します。",
        'concat': "二重以上あるリストを一重減らします。",
        'replicate': "「replicate n x」は要素xをn個だけ含むリストを返します。"
      };
      return TOOLTIPS[mode];
    });
  },

  updateType_: function(newOp) {
    if (this.getInput('LIST')) this.removeInput('LIST');
    if (this.getInput('VALUE')) this.removeInput('VALUE');
    if (this.getInput('TEXT')) this.removeInput('TEXT');
    switch (newOp) {
      case 'length':
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'lines':
        this.appendValueInput('VALUE')
            .setCheck('String', 'Array');
        break;
      case 'unlines':
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'take':
        this.appendValueInput('VALUE')
            .setCheck('Number');
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'reverse':
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'words':
        this.appendValueInput('TEXT')
            .setCheck('String', 'Array');
        break;
      case 'concat':
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'replicate':
        this.appendValueInput('VALUE')
            .setCheck('Number');
        this.appendValueInput('TEXT');
        break;
      default:
        throw 'updateType_ Error'
    }/*
    if (newOp == 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }*/
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },

  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

Blockly.Haskell['list_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code;
  switch (func) {
    case 'length':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'length ' + list;
      break;
    case 'lines':
      list = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'lines ' + list + '';
      break;
    case 'unlines':
      list = list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'unlines ' + list + '';
      break;
    case 'take':
      value = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '0';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'take ' + value + ' ' + list;
      break;
    case 'reverse':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'reverse ' + list;
      break;
    case 'words':
      text = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'words ' + text;
      break;
    case 'concat':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'concat ' + list;
      break;
    case 'replicate':
      value = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '0';
      text = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'replicate ' + value + text;
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/03/17 ここまで

/////////////////////////////////////////////
//    高階関数
/////////////////////////////////////////////
// 19/04/03 追加
Blockly.Blocks['Higher_Order_func_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {

    var OPERATORS =
        [[Blockly.Msg.map, 'map'],
         [Blockly.Msg.concatMap, 'concatMap']];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(60);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    /*
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendField(dropdown, 'OP');*/
    this.appendDummyInput()
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'map': "「map f xs」はリストxsの各要素xに関数fを適用したリストを返します。",
        'concatMap': "concat関数とmap関数を1つにまとめた関数です。"
      };
      return TOOLTIPS[mode];
    });
  },

  updateType_: function(newOp) {
    if (this.getInput('FUNC')) this.removeInput('FUNC');
    if (this.getInput('LIST')) this.removeInput('LIST');
    if (this.getInput('VALUE')) this.removeInput('VALUE');
    if (this.getInput('TEXT')) this.removeInput('TEXT');
    switch (newOp) {
      case 'map':
        this.appendValueInput('FUNC');
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      case 'concatMap':
        this.appendValueInput('FUNC');
        this.appendValueInput('LIST')
            .setCheck('String', 'Array');
        break;
      default:
        throw 'updateType_ Error'
    }/*
    if (newOp == 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }*/
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },

  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

Blockly.Haskell['list_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code, func;
  switch (func) {
    case 'map':
      func = Blockly.Haskell.valueToCode(block, 'FUNC',
      Blockly.Haskell.ORDER_MEMBER) || '';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'map ' + func + list;
      break;
    case 'concatMap':
      func = Blockly.Haskell.valueToCode(block, 'FUNC',
      Blockly.Haskell.ORDER_MEMBER) || '';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'concatMap ' + func + list;
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/04/03 ここまで
