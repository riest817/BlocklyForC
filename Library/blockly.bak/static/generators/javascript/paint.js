'use strict';

goog.provide('Blockly.JavaScript.paint');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['paint_stroke'] = function(block) {
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  var code = 'stroke(' + colour + ');';
  return code + '\n';
};

Blockly.JavaScript['paint_strokeweight'] = function(block) {
  var weight = Blockly.JavaScript.valueToCode(block, 'WEIGHT',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var code = 'strokeWeight(' + weight + ');';
  return code + '\n';
};

Blockly.JavaScript['paint_fill'] = function(block) {
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  var code = 'fill(' + colour + ');';
  return code + '\n';
};