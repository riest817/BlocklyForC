 /**
 2017/06/28  javascriptのソースコードをhaskell用に編集
 * 編集できないところをコメントアウト
 * おそらく山形さんが作ったと思われるブロックをコメントアウト
 * 'quiz_if'など

 */

'use strict';

goog.provide('Blockly.Haskell.logic');

goog.require('Blockly.Haskell');


Blockly.Haskell['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
  var code = 'if ' + argument + ' then ' + branch;
  /*
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
        Blockly.Haskell.ORDER_NONE) || 'false';
    branch = Blockly.Haskell.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }*/
  if (block.elseCount_) {
    branch = Blockly.Haskell.statementToCode(block, 'ELSE');
    code += '  else ' + branch;
  }
  return code + '\n';
};

Blockly.Haskell['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '/=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Haskell.ORDER_EQUALITY;
  var argument0 = Blockly.Haskell.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Haskell.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Haskell['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Haskell.ORDER_LOGICAL_AND :
      Blockly.Haskell.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Haskell.valueToCode(block, 'A', order);
  var argument1 = Blockly.Haskell.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Haskell['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Haskell.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Haskell.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = 'not ' + argument0;
  return [code, order];
};

// 19/02/13 
Blockly.Haskell['logic_boolean_haskell'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'True') ? 'True' : 'False';
  return [code, Blockly.Haskell.ORDER_ATOMIC];
};
// 19/02/13 ここまで

Blockly.Haskell['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Haskell.ORDER_ATOMIC];
};

Blockly.Haskell['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Haskell.valueToCode(block, 'IF',
      Blockly.Haskell.ORDER_NONE) || 'False';
  var value_then = Blockly.Haskell.valueToCode(block, 'THEN',
      Blockly.Haskell.ORDER_NONE) || '1';
  var value_else = Blockly.Haskell.valueToCode(block, 'ELSE',
      Blockly.Haskell.ORDER_IF) || '0';
  var code = 'if ' + value_if + ' then ' + value_then + ' else ' + value_else;
  return [code, Blockly.Haskell.ORDER_IF];
};

Blockly.Haskell['controls_if_haskell'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
      Blockly.Haskell.ORDER_NONE) || 'false';
  var branch = Blockly.Haskell.valueToCode(block, 'DO' + n);
  var code = '  | ' + argument + ' = ' + branch + '\n';
  
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Haskell.valueToCode(block, 'IF' + n,
        Blockly.Haskell.ORDER_NONE) || 'false';
    branch = Blockly.Haskell.valueToCode(block, 'DO' + n);
    code += '  | ' + argument + ' = ' + branch + '\n';
  }
  if (block.elseCount_) {
    branch = Blockly.Haskell.valueToCode(block, 'ELSE');
    code += '  | otherwise = ' + branch + '\n';
  }
  return code;
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 18/12/12 ここまで

Blockly.Haskell['main_haskell'] = function(block) {
  // Text value.
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = 'main = ' + branch;
  return code;
};

Blockly.Haskell['do_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  if (branch) {
    branch = Blockly.Haskell.prefixLines(branch, '    ');
  }
  var code = 'do\n' + branch + '\n';

  return code;
};

Blockly.Haskell['let_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  if (branch) {
    branch = Blockly.Haskell.prefixLines(branch, '    ');
  }
  var code = 'let {\n' + branch + '}\n';
  return code;
};

// 18/11/29  インデントがおかしい
Blockly.Haskell['let_in_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  if (branch) {
    branch = Blockly.Haskell.prefixLines(branch, '    ');
  } 
  var value = Blockly.Haskell.valueToCode(block, 'VALUE', Blockly.Haskell.ORDER_IF);
  var code = 'let\n' + branch + '  in ' + value;

  return [code, Blockly.Haskell.ORDER_IF];
};

Blockly.Haskell['where_haskell'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = 'where\n' + branch + '\n';

  return code + '\n';
};

Blockly.Haskell['case_haskell'] = function(block) {
  // Call a procedure with a return value.
  var code = 'case ';
  code += Blockly.Haskell.valueToCode(block, 'VAR',
        Blockly.Haskell.ORDER_NONE) || '_';
  code += ' of\n';

  var branch =  Blockly.Haskell.statementToCode(block, 'ADD');
  if (branch) {
    branch = Blockly.Haskell.prefixLines(branch, '    ');
  }
  code += branch;
  //code += Blockly.Haskell.statementToCode(block, 'ADD');
  
  return [code, Blockly.Haskell.ORDER_IF];
  //return code + '\n';
};

Blockly.Haskell['single_pattern'] = function(block) {
    // Call a procedure with a return value.
  
  var arg1 = Blockly.Haskell.valueToCode(block, 'PATTERN',
        Blockly.Haskell.ORDER_NONE) || '_';
  var arg2 = Blockly.Haskell.valueToCode(block, 'RESULT',
        Blockly.Haskell.ORDER_NONE) || '0';
  var code =　arg1 + ' -> ' + arg2 ;
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};

Blockly.Haskell['controls_if_haskell'] = function(block) {
  // If/elseif/else condition.

  var argument = Blockly.Haskell.valueToCode(block, 'IF',
      Blockly.Haskell.ORDER_NONE) || 'false';  
  var branch1 = Blockly.Haskell.valueToCode(block, 'DO',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var branch2 = Blockly.Haskell.valueToCode(block, 'ELSE',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var code = 'if ' + argument + ' then ' + branch1 + ' else ' + branch2;

  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};

Blockly.Haskell['pattern_match'] = function(block) {
  // Call a procedure with a return value.
  
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.arguments_.length-1; i++) { // 17/12/05 this.arguments_.lengthに-1
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = funcName + ' ' + args.join(' ') + ' = ';
  code += Blockly.Haskell.valueToCode(block, 'DELTA',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
  
};

Blockly.Haskell['emer_block'] = function(block) {
  var argument0 = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_NONE) || 'True';
  var code = argument0;
  return code + '\n';
};

Blockly.Haskell['haskell_decl'] = function(block) {
  var argument0 = Blockly.Haskell.valueToCode(block, 'PAT', Blockly.Haskell.ORDER_NONE) || '_';
  var argument1 = Blockly.Haskell.valueToCode(block, 'VALUE', Blockly.Haskell.ORDER_NONE) || '0';
  var code = argument0 + ' = ' + argument1 + '\n';
  return code;
};
