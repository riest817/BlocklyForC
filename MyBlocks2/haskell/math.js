/*
2017/07/11 haskell/math.js 新規作成
2017/10/18 Blockly.Blocks['var_arithmetic']　コード修正、追加
18/01/10   ['bondage'] 作成
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
          // 2017/10/18 変更
            [["+", 'ADD'],
             ["-", 'MINUS'],
             ["*", 'MULTIPLY'],
             ["/", 'DIVIDE'],
             //["%", 'REMAINDER'],   // 追加
             ["^", 'POWER']]
          // 2017/10/18 ここまで
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
        //'REMAINDER': "2 つの数の剰余を返します。",    // 2017/10/17 追加
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
    //'REMAINDER': [' % ', 5.4],  // 2017/10/18 追加
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

Blockly.Blocks['bondage'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {

    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VALUE')
        .appendField("束縛")
        .appendField(new Blockly.FieldVariable("項目"), 'VAR');
    this.setOutput(true);
    this.setInputsInline(false);
    this.setTooltip("変数を束縛します。");
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },
  contextMenuType_: 'variables_get',
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Haskell['bondage'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' <- ' + argument0 + ';\n';
};