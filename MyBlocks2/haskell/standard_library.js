/*
19/02/26 新規作成
*/
/////////////////////////////////////////////
//    入出力処理
/////////////////////////////////////////////
// Blockly.Blocks['putStr_hs'] = {
//   init: function() {
//     this.setColour(0);
//     this.jsonInit({ "message0": Blockly.Msg.putStr_hs });
//     this.appendValueInput('B');
//     this.setOutput(true);
//     this.setInputsInline(true);
// //    this.setPreviousStatement(true);  // 上部との接続を可能にする
// //    this.setNextStatement(true);      // 下部との接続を可能にする
//     this.setTooltip("文字列を標準出力にそのまま出力するアクションを返します。");
//   }
// };

// Blockly.Blocks['putStrLn_hs'] = {
//   init: function() {
//     this.setColour(0);
//     this.jsonInit({ "message0": Blockly.Msg.putStrLn_hs });
//     this.appendValueInput('B');
//     this.setOutput(true);
//     this.setInputsInline(true);
// //    this.setPreviousStatement(true);  // 上部との接続を可能にする
// //    this.setNextStatement(true);      // 下部との接続を可能にする
//     this.setTooltip("標準出力に文字列と改行を出力するときに使う関数です。");
//   }
// };

// 19/04/03 追加
Blockly.Blocks['output_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [//[Blockly.Msg.putStr_hs, 'putStr'],
         //[Blockly.Msg.output_text, 'text'],
         ['show', 'show'],
         ['read', 'read'],
         [Blockly.Msg.output_var, 'print'],
         ['putChar', 'putChar'],
         ['putStr', 'putStr'],
         ['putStrLn', 'putStrLn']
//         [Blockly.Msg.output_var2, 'var2']
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(Blockly.Msg['TEXTS_HUE']);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
//      thisBlock.updateType_(newOp);
    });
    /*
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendField(dropdown, 'OP');*/
    this.appendDummyInput()
        .appendField(dropdown, 'OP');
//    thisBlock.updateType_('putStr');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'putStr': "文字列を標準出力にそのまま出力するアクションを返します。",
        'print': "式を標準出力にそのまま出力するアクションを返します。" /*,
        'var': "変数の出力。",
        'var2': "変数の出力。",*/
      };
      return TOOLTIPS[mode];
    });
  },

//   updateType_: function(newOp) {
// //    if (this.getInput('TEXT')) this.removeInput('TEXT');
//     if (this.getInput('B')) this.removeInput('B');
//     switch (newOp) {
//       case 'putStr':
//         this.appendValueInput('B');
//         this.setOutput(true);
//         break;
// /*
//       case 'text':
//         this.appendDummyInput('TEXT')
//             .appendField(this.newQuote_(true))
//             .appendField(new Blockly.FieldTextInput(''), 'TEXT')
//             .appendField(this.newQuote_(false));
//         this.setOutput(false);
//         break;
// */
//       case 'print':
//         this.appendValueInput('B');
//             //.setCheck('String', 'Array');
//         this.setOutput(true);
//         break;
// /*
//       case 'var2':
//         this.appendValueInput('B');
//             //.setCheck('Number');
//         this.setOutput(true);
//         break;
// */
//       default:
//         throw 'updateType_ Error'
//     }/*
//     if (newOp == 'MODE') {
//       this.outputConnection.setCheck('Array');
//     } else {
//       this.outputConnection.setCheck('Number');
//     }*/
//   },
/*
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },

  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
*/
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
         [Blockly.Msg.replicate, 'replicate'], // 19/04/03 追加
         ["zip", 'zip'],
         ["zip3", 'zip3'],
         ["unzip", 'unzip'],
         ["unzip3", 'unzip3'],
         ["repeat", 'repeat'],
         ["cycle", 'cycle'],
         ["drop", 'drop'],
         ["head", 'head'],
         ["tail", 'tail'],
         ["last", 'last'],
         ["init", 'init'],
         ["null", 'null'],
         ["elem", 'elem'],
         ["sort", 'sort'],
         ["sequence", 'sequence'],
         ["lookup", 'lookup']
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
//      thisBlock.updateType_(newOp);
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

  // updateType_: function(newOp) {
  //   if (this.getInput('LIST')) this.removeInput('LIST');
  //   if (this.getInput('VALUE')) this.removeInput('VALUE');
  //   if (this.getInput('TEXT')) this.removeInput('TEXT');
  //   switch (newOp) {
  //     case 'length':
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'lines':
  //       this.appendValueInput('VALUE')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'unlines':
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'take':
  //       this.appendValueInput('VALUE')
  //           .setCheck('Number');
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'reverse':
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'words':
  //       this.appendValueInput('TEXT')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'concat':
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'replicate':
  //       this.appendValueInput('VALUE')
  //           .setCheck('Number');
  //       this.appendValueInput('TEXT');
  //       break;
  //     default:
  //       throw 'updateType_ Error'
  //   }/*
  //   if (newOp == 'MODE') {
  //     this.outputConnection.setCheck('Array');
  //   } else {
  //     this.outputConnection.setCheck('Number');
  //   }*/
  // },

  // mutationToDom: function() {
  //   var container = document.createElement('mutation');
  //   container.setAttribute('op', this.getFieldValue('OP'));
  //   return container;
  // },

  // domToMutation: function(xmlElement) {
  //   this.updateType_(xmlElement.getAttribute('op'));
  // }
};

/////////////////////////////////////////////
//    高階関数
/////////////////////////////////////////////
// 19/04/03 追加
Blockly.Blocks['higher_order_func_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.map, 'map'],
         [Blockly.Msg.concatMap, 'concatMap'],
         ["filter", 'filter'],
         ["takeWhile", 'takeWhile'],
         ["dropWhile", 'dropWhile'],
         ["any", 'any'],
         ["all", 'all'],
         ["zipWith", 'zipWith'],
         ["zipWith3", 'zipWith3'],
         ["iterate", 'iterate'],
         ["foldl", 'foldl'],
         ["foldl1", 'foldl1'],
         ["foldr", 'foldr'],
         ["foldr1", 'foldr1'],
         ["mapM", 'mapM']
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    // this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(60);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
//      thisBlock.updateType_(newOp);
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

  // updateType_: function(newOp) {
  //   if (this.getInput('FUNC')) this.removeInput('FUNC');
  //   if (this.getInput('LIST')) this.removeInput('LIST');
  //   if (this.getInput('VALUE')) this.removeInput('VALUE');
  //   if (this.getInput('TEXT')) this.removeInput('TEXT');
  //   switch (newOp) {
  //     case 'map':
  //       this.appendValueInput('FUNC');
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     case 'concatMap':
  //       this.appendValueInput('FUNC');
  //       this.appendValueInput('LIST')
  //           .setCheck('String', 'Array');
  //       break;
  //     default:
  //       throw 'updateType_ Error'
  //   }/*
  //   if (newOp == 'MODE') {
  //     this.outputConnection.setCheck('Array');
  //   } else {
  //     this.outputConnection.setCheck('Number');
  //   }*/
  // },

  // mutationToDom: function() {
  //   var container = document.createElement('mutation');
  //   container.setAttribute('op', this.getFieldValue('OP'));
  //   return container;
  // },

  // domToMutation: function(xmlElement) {
  //   this.updateType_(xmlElement.getAttribute('op'));
  // }
};

Blockly.Blocks['logic_library'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [["not", 'not'],
         ["and", 'and'],
         ["or", 'or'],
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    // this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(Blockly.Msg["LOGIC_HUE"]);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
//      thisBlock.updateType_(newOp);
    });

    this.appendDummyInput()
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
      };
      return TOOLTIPS[mode];
    });
  },
};

Blockly.Blocks['math_library'] = {
   /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [["sqrt", 'sqrt'],
         ["abs", 'abs'],
         ["signum", 'signum'],
         ["negate", 'negate'],

         ["truncate", 'truncate'],
         ["round", 'round'],
         ["ceiling", 'ceiling'],
         ["floor", 'floor'],

         ["even", 'even'],
         ["odd", 'odd'],

         ["log", 'log'],
         ["exp", 'exp'],
         ["sin", 'sin'],
         ["cos", 'cos'],
         ["tan", 'tan'],
         ["asin", 'asin'],
         ["acos", 'acos'],
         ["atan", 'atan'],
         ["sinh", 'sinh'],
         ["cosh", 'cosh'],
         ["tanh", 'tanh'],
         ["asinh", 'asinh'],
         ["acosh", 'acosh'],
         ["atanh", 'atanh'],

         ["max", 'max'],
         ["min", 'min'],

         ["quot", 'quot'],
         ["rem", 'rem'],
         ["div", 'div'],
         ["mod", 'mod'],

         ["atan2", 'atan2'],

         ["maximum", 'maximum'],
         ["minimum", 'minimum'],
         ["sum", 'sum'],
         ["product", 'product'],
         ];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    // this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
    this.setColour(Blockly.Msg["MATH_HUE"]);
    this.setOutput(true);
    this.setInputsInline(true);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
//      thisBlock.updateType_(newOp);
    });

    this.appendDummyInput()
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
      };
      return TOOLTIPS[mode];
    });
  },
};
