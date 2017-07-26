/*
2017/07/11 haskell/math.js 新規作成
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
            [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
             [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
             [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
             [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
             [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']]
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
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Haskell['var_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Haskell.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Haskell.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Haskell.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Haskell.ORDER_DIVISION],
    'POWER': [' ^ ', Blockly.Haskell.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Haskell.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Haskell.valueToCode(block, 'B', order) || '0';
  var code;
  
  code = argument0 + operator + argument1;
  return [code, order];
};