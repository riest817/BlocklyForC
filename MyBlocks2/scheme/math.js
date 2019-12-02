Blockly.Msg["MATH_HUE"] = 230;
Blockly.Msg["VARIABLE_HUE"] = 330;

Blockly.Blocks['scheme_math_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function () {
    // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["MATH_HUE"]);
    this.appendDummyInput('')
      .appendField("(")
      .appendField(new Blockly.FieldDropdown([
        ["+", '+'],
        ["-", '-'],
        ["*", '*'],
        ["/", '/'],
        ["max", "max"],
        ["min", "min"],
        ["gcd", "gcd"],
        ["lcm", "lcm"],
      ]), "KIND");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("論理和または論理積を求めます。");
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape0_: Blockly.Blocks['scheme_begin'].updateShape0_,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
  saveConnections: Blockly.Blocks['scheme_begin'].saveConnections,
};

Blockly.Blocks['scheme_math_operator'] = {
  init: function () {
    this.jsonInit({
      "message0": "(%1 %2)",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": [
            ["abs", "abs"],
            ["numerator", "numerator"],
            ["denominator", "denominator"],
            ["floor","floor"],
            ["ceiling","ceiling"],
            ["truncate","truncate"],
            ["round","round"],
            ["exp", "exp"],
            ["sin", "sin"],
            ["cos", "cos"],
            ["tan", "tan"],
            ["asin", "asin"],
            ["acos", "acos"],
            ["atan", "atan"],
            ["sqrt", "sqrt"]
          ]
        },
        {
          "type": "input_value",
          "name": "ADD0"
        }
      ],
      "output": null,
      "inputsInline": true,
      "colour": Blockly.Msg["MATH_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['scheme_math_operator2'] = {
  init: function () {
    this.jsonInit({
      "message0": "(%1 %2 %3)",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": [
            ["quotient", "quotient"],
            ["remainder", "remainder"],
            ["modulo", "modulo"],
            ["rationalize", "rationalize"],
            ["atan", "atan"],
            ["expt", "expt"]
          ]
        },
        {
          "type": "input_value",
          "name": "ADD0"
        },
        {
          "type": "input_value",
          "name": "ADD1"
        }
      ],
      "output": null,
      "inputsInline": true,
      "colour": Blockly.Msg["MATH_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};
