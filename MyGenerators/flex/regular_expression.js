/**
2017/08/31 regular_expression.js を新規作成
18/04/04 Blockly.Flex['RE_minimum_match']をBlockly.Flex['RE_repetition']に統合
18/04/10 Blockly.Flex['RE_from_to_mutator'] 作成
 */
'use strict';

goog.provide('Blockly.Flex.regular_expression');

goog.require('Blockly.Flex');


Blockly.Flex['RE_text0'] = function(block) {

  var code = block.getFieldValue('TEXT');
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_text'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '"' + text + '"';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_any_one'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '[' + text + ']';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_not_any_one'] = function(block) {

  var text = block.getFieldValue('TEXT');
  var code = '[^' + text + ']';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_from_to'] = function(block) {

  var from = block.getFieldValue('FROM');
  var to = block.getFieldValue('TO');
  var code = '[' + from + '-' + to + ']';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_anything'] = function(block) {

  var code = '.';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_new_line'] = function(block) {

  var code = '\\n';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_tab'] = function(block) {

  var code = '\\t';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_sequence'] = function(block) {

  var OPERATORS = {
    'n': 'n',
    't': 't',
    '\'': '\'',
    '\"': '\"',
    '\\': '\\',
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var code = '\\' + operator;
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

Blockly.Flex['RE_connection'] = function(block) {
  var a = Blockly.Flex.valueToCode(block, 'A', Blockly.Flex.ORDER_SEQUENCE);
  var b = Blockly.Flex.valueToCode(block, 'B', Blockly.Flex.ORDER_SEQUENCE);
  var code = a + b;
  return [code, Blockly.Flex.ORDER_SEQUECE];
};

Blockly.Flex['RE_connection_or'] = function(block) {
  var a = Blockly.Flex.valueToCode(block, 'A', Blockly.Flex.ORDER_SELECT);
  var b = Blockly.Flex.valueToCode(block, 'B', Blockly.Flex.ORDER_SELECT);
  var code = a + '|' + b;
  return [code, Blockly.Flex.ORDER_SELECT];
};

Blockly.Flex['RE_repetition'] = function(block) {

  var OPERATORS = {
    '*': '*',
    '+': '+',
    '?': '?',
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var a = Blockly.Flex.valueToCode(block, 'A', Blockly.Flex.ORDER_REPEAT);
  var code = a + operator;
  return [code, Blockly.Flex.ORDER_REPEAT];
};
/*
Blockly.Flex['RE_minimum_match'] = function(block) {

  var a = Blockly.Flex.statementToCode(block, 'A');
  var code = a + '?';
  return code;
};
*/

Blockly.Flex['RE_from_to_mutator'] = function(block) {

  var from = block.getFieldValue('FROM');
  var to = block.getFieldValue('TO');
  var elements = new Array(block.itemCount_);
  var code = '[';

  for (var i = 0; i < block.itemCount_; i++) {
    from = block.getFieldValue('FROM' + i);
    to = block.getFieldValue('TO' + i);
    code += from + '-' + to; 
  }
  code += ']';
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

// 18/05/29 新規作成
Blockly.Flex['RE_connection_mutator'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code = "";
  switch (block.itemCount_) {
    case 1:
      code += Blockly.Flex.valueToCode(block, 'ADD0', Blockly.Flex.ORDER_SEQUENCE);
      return [code, Blockly.Flex.ORDER_FUNCTION_CALL];
    default:
      for (var i = 0; i < block.itemCount_; i++) {
        code += Blockly.Flex.valueToCode(block, 'ADD' + i, Blockly.Flex.ORDER_SEQUENCE);
      }

      return [code, Blockly.Flex.ORDER_SEQUENCE];
  }
};

// 18/10/11 新規作成
Blockly.Flex['RE_connection_or_mutator'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code = "";
  switch (block.itemCount_) {
    case 1:
      code += Blockly.Flex.valueToCode(block, 'ADD0', Blockly.Flex.ORDER_SELECT);
      //return [code, Blockly.Flex.ORDER_FUNCTION_CALL];
      return code;
    default:
      for (var i = 0; i < block.itemCount_; i++) {
        if ( i > 0 ) { code += "|"; }
        code += Blockly.Flex.valueToCode(block, 'ADD' + i, Blockly.Flex.ORDER_SELECT);
      }

      //return [code, Blockly.Flex.ORDER_FUNCTION_CALL];
      return [code, Blockly.Flex.ORDER_SELECT];
  }
};


//  18/06/21  作成
Blockly.Flex['RE_any_one_mutator'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var OPERATORS = {
    'n': '\\n',
    't': '\\t',
    '\'': '\\\'',
    '\"': '\\\"',
    '\\': '\\\\',
  };
  var total = block.itemCount_ + block.textCount_ + block.sequenceCount_;
  var code = "[";
  
  for (var i = 0; i < total; i++) {
    code += Blockly.Flex.valueToCode(block, 'ADD' + i, Blockly.Flex.ORDER_NONE) || '';
    code += block.getFieldValue('TEXT' + i) || '';
    code += OPERATORS[block.getFieldValue('MODE' + i)] || '';
  }
  code += "]";
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

//  18/06/21  作成
Blockly.Flex['RE_not_any_one_mutator'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code = "[^";

  for (var i = 0; i < block.itemCount_; i++) {
    code += Blockly.Flex.valueToCode(block, 'ADD' + i, Blockly.Flex.ORDER_NONE);
  }
  code += "]";
  return [code, Blockly.Flex.ORDER_ATOMIC];
};


//  18/07/18  作成
Blockly.Flex['field_dropdown'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var OPERATORS = {
    'n': '\\n',
    't': '\\t',
//    '\'': '\\\'',
//    '\"': '\\\"',
    ']': '\\]',
    '-': '\\-',
    '^': '\\^',
    '\\': '\\\\',
  };
  
  var code = "[";
  for (var i = 0; i < block.optionList_.length; i++) {
    code += block.getFieldValue('BEGIN' + i) || '';
    //console.log(block.getFieldValue('BEGIN' + i));
    if ( block.getFieldValue('BEGIN' + i) != null ) {
      code += "-"
    }
    code += block.getFieldValue('END' + i) || '';
    code += block.getFieldValue('CHAR' + i) || '';
    code += OPERATORS[block.getFieldValue('SEQ' + i)] || '';
  }
  code += "]";
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

//  18/07/19  作成
Blockly.Flex['field_dropdown_not'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var OPERATORS = {
    'n': '\\n',
    't': '\\t',
//    '\'': '\\\'',
//    '\"': '\\\"',
    ']': '\\]',
    '-': '\\-',
    '^': '\\^',
    '\\': '\\\\',
  };
  
  var code = "[^";
  for (var i = 0; i < block.optionList_.length; i++) {
    code += block.getFieldValue('BEGIN' + i) || '';
    //console.log(block.getFieldValue('BEGIN' + i));
    if ( block.getFieldValue('BEGIN' + i) != null ) {
      code += "-"
    }
    code += block.getFieldValue('END' + i) || '';
    code += block.getFieldValue('CHAR' + i) || '';
    code += OPERATORS[block.getFieldValue('SEQ' + i)] || '';
  }
  code += "]";
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

//  18/09/12  作成
Blockly.Flex['select'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var OPERATORS = {
    "INNER JOIN": "INNER JOIN",
    "LEFT JOIN": "LEFT JOIN",
    "RIGHT JOIN": "RIGHT JOIN",
    "FULL OUTER JOIN": "FULL OUTER JOIN",
  };
  
  var code = "";
  
  return [code, Blockly.Flex.ORDER_ATOMIC];
};

// 19/05/20   作成
Blockly.Flex['RE_priority'] = function(block) {

  var a = Blockly.Flex.valueToCode(block, 'A', Blockly.Flex.ORDER_NONE);
  var code = "(" + a + ")";
  return [code, Blocky.Flex.ORDER_ATOMIC];
};
