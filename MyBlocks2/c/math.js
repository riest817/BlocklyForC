/*
2017/07/11 c/math.js 新規作成
2017/10/17 Blockly.Blocks['var_arithmetic'] 変更
2017/10/25 Blockly.Blocks['var_arithmetic2'] 作成
2017/10/25 Blockly.Blocks['prefix_clement'] と Blockly.Blocks['postfix_clement'] 作成
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

Blockly.Blocks['var_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
          // 2017/10/17 変更
            [["+", 'ADD'],
             ["-", 'MINUS'],
             ["*", 'MULTIPLY'],
             ["/", 'DIVIDE'],
             ["%", 'REMAINDER'],   // 追加
             ["^", 'POWER']]
          // 2017/10/17 ここまで
        },
        {
          "type": "input_value",
          "name": "B",
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
      "helpUrl": Blockly.Msg.MATH_ARITHMETIC_HELPURL
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        // 2017/10/25 変更
        'ADD': "２つの数を加算します。",
        'MINUS': "2つの数を減算します。",
        'MULTIPLY': "2つの数を乗算します。",
        'DIVIDE': "2つの数を除算します。",
        'REMAINDER': "右の数から左の数を剰余します。",    
        'POWER': "右の数から左の数を階乗します。"
        // 2017/10/25 変更ここまで
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.C['var_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.C.ORDER_ADDITION],   // 6.2
    'MINUS': [' - ', Blockly.C.ORDER_SUBTRACTION],  // 6.1
    'MULTIPLY': [' * ', Blockly.C.ORDER_MULTIPLICATION],   // 5.2
    'DIVIDE': [' / ', Blockly.C.ORDER_DIVISION],  // 5.1
    'REMAINDER': [' % ', 5.4],  // 2017/10/18 追加
    'POWER': [null, Blockly.C.ORDER_COMMA]  // Handle power separately. // 17
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.C.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.C.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in C requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';   // 2017/10/18 変更
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
Blockly.Blocks['var_arithmetic2'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [["+=", 'ADD'],
             ["-=", 'MINUS'],
             ["*=", 'MULTIPLY'],
             ["/=", 'DIVIDE'],
             ["%=", 'REMAINDER']]
        },
        {
          "type": "input_value",
          "name": "B",
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
      "helpUrl": Blockly.Msg.MATH_ARITHMETIC_HELPURL
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': "２つの数を加算したものを左に代入します。",
        'MINUS': "2つの数を減算したものを左に代入します。",
        'MULTIPLY': "2つの数を乗算したものを左に代入します。",
        'DIVIDE': "2つの数を除算したものを左に代入します。",
        'REMAINDER': "右の数から左の数を剰余したものを左に代入します。"
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.C['var_arithmetic2'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' += ', Blockly.C.ORDER_ADDITION],   // 6.2
    'MINUS': [' -= ', Blockly.C.ORDER_SUBTRACTION],  // 6.1
    'MULTIPLY': [' *= ', Blockly.C.ORDER_MULTIPLICATION],   // 5.2
    'DIVIDE': [' /= ', Blockly.C.ORDER_DIVISION],  // 5.1
    'REMAINDER': [' %= ', 5.4], 
    'POWER': [null, Blockly.C.ORDER_COMMA]  // Handle power separately. // 17
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.C.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.C.valueToCode(block, 'B', order) || '0';
  var code;

  code = argument0 + operator + argument1;
  //return [code, order];
  return [code, 0];
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////    前置_クリメント     ///////////////////////////////////////////////////////////////////////////
Blockly.Blocks['prefix_clement'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [["++", 'Increment'],
             ["--", 'Decrement']]
        }/*,
        {
          "type": "input_value",
          "name": "B",
        }*/
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
      "helpUrl": "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%83%88"
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'Increment': "前置インクリメントします。",
        'Decrement': "前置デクリメントします。"
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.C['prefix_clement'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'Increment': ['++', 6.3],
    'Decrement': ['--', 6.4]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.C.valueToCode(block, 'A', order) || '0';
  //var argument1 = Blockly.C.valueToCode(block, 'B', order) || '0';
  var code;

  //code = argument0 + operator + argument1;
  code = argument0 + operator;
  return [code, order];
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////    後置_クリメント     ///////////////////////////////////////////////////////////////////////////
Blockly.Blocks['postfix_clement'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2",
      "args0": [
        /*{
          "type": "input_value",
          "name": "A",
        },*/
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [["++", 'Increment'],
             ["--", 'Decrement']]
        },
        {
          "type": "input_value",
          "name": "B",
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
      "helpUrl": "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%83%88"
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'Increment': "後置インクリメントします。",
        'Decrement': "後置デクリメントします。"
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.C['postfix_clement'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'Increment': ['++', 6.3],
    'Decrement': ['--', 6.4]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  //var argument0 = Blockly.C.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.C.valueToCode(block, 'B', order) || '0';
  var code;

  //code = argument0 + operator + argument1;
  code = operator + argument1;
  return [code, order];
};