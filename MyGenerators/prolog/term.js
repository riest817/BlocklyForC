/**
19/06/26 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');

Blockly.Prolog['term_name'] = function(block) {
  // Text value.
  var code = block.getFieldValue('TEXT') + ', ';  
  return code;
};

Blockly.Prolog['term_name2'] = function(block) {
  // Text value.
  var code = block.getFieldValue('TEXT') + ', ';  
  return code;
};
