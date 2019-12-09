/**
<<<<<<< HEAD
 * @fileoverview Generating Prolog for list blocks.
=======
19/07/10 新規作成
 */

/**
 * @fileoverview Procedure blocks for Blockly.
>>>>>>> origin
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//<<<<<<< HEAD
goog.provide('Blockly.Prolog.lists');

goog.require('Blockly.Prolog');


Blockly.Prolog['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Prolog.ORDER_ATOMIC];
};

Blockly.Prolog['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Prolog.valueToCode(block, 'ADD' + i,
        Blockly.Prolog.ORDER_NONE) || 'null';
  }
  var code = '[' + elements.join(',') + ']';
  return [code, Blockly.Prolog.ORDER_ATOMIC];
};



Blockly.Prolog['lists_cons'] = function(block) {
  var code = '[';
  code += Blockly.Prolog.valueToCode(block, 'HEAD', Blockly.Prolog.ORDER_NONE);
  code += '|';
  code += Blockly.Prolog.valueToCode(block, 'TAIL', Blockly.Prolog.ORDER_NONE);
  code += ']';
  return [code, Blockly.Prolog.ORDER_ATOMIC];
}
//=======
goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');

Blockly.Prolog['lists'] = function(block) {
    // Call a procedure with a return value.
  
  var arg1 = Blockly.Prolog.valueToCode(block, 'ADD1',
        Blockly.Prolog.ORDER_COMMA) || '_';
  var arg2 = Blockly.Prolog.valueToCode(block, 'ADD2',
        Blockly.Prolog.ORDER_COMMA) || '_';
  var code = '[' + arg1 + '|' + arg2 + ']';
  
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Prolog['lists_empty'] = function(block) {
    // Call a procedure with a return value.
  var code = '[]';
  return [code, Blockly.Prolog.ORDER_FUNCTION_CALL];
  //return code + '\n';
//>>>>>>> origin
};

