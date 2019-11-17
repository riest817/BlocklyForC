'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Msg["LISTS_HUE"] = 260;

Blockly.Blocks['scheme_lists_list'] = {
  init: function () {
    // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput('')
      .appendField("(list");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("リストを作ります。");
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
};

Blockly.Blocks['scheme_lists_quote'] = {
  init: function () {
    this.jsonInit({
      "message0": "(quote %1)",
      "args0": [
        {
          "type": "input_value",
          "name": "ADD0"
        },
      ],
      "inputsInline": true,
      "output": null,
      "colour": Blockly.Msg["LISTS_HUE"],
      "tooltip": '',
      "helpUrl": ''
    });
  }
};

Blockly.Blocks['scheme_lists_plain'] = {
  init: function () {
    // this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Msg["LISTS_HUE"]);
    this.appendDummyInput('')
      .appendField("(");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['scheme_begin_item']));
    this.setTooltip("リストを作ります。");
  },

  mutationToDom: Blockly.Blocks['scheme_begin'].mutationToDom,
  domToMutation: Blockly.Blocks['scheme_begin'].domToMutation,
  updateShape_: Blockly.Blocks['scheme_begin'].updateShape_,
  decompose: Blockly.Blocks['scheme_begin'].decompose,
  compose: Blockly.Blocks['scheme_begin'].compose,
};



Blockly.Blocks['scheme_lists_operator'] = {
  init: function () {
    this.jsonInit({
      "message0": "(%1 %2)",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": [
            ["car", "car"],
            ["cdr", "cdr"],
            ["null?", "null?"],
            ["length","length"],
            ["reverse","reverse"]
          ]
        },
        {
          "type": "input_value",
          "name": "ADD0"
        }
      ],
      "output": null,
      "inputsInline": true,
      "colour": Blockly.Msg["LISTS_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['scheme_lists_operator2'] = {
  init: function () {
    this.jsonInit({
      "message0": "(%1 %2 %3)",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": [
            ["cons", "cons"],
            ["append", "append"],
            ["list-ref", "list-ref"],
            ["memq", "memq"],
            ["memv", "memv"],
            ["member", "member"],
            ["assq", "assq"],
            ["assv", "assv"],
            ["assoc", "assoc"]
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
      "colour": Blockly.Msg["LISTS_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};