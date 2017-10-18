/*
2017/07/11 c/math.js 新規作成
2017/10/17 Blockly.Blocks['var_arithmetic'] 変更
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
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'REMAINDER': "2 つの数の剰余を返します。",    // 2017/10/17 追加
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
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