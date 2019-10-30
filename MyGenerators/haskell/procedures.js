/**
2017/07/13  Haskellにコード最適化
2017/12/05  Blockly.Haskell['procedures_defreturn'] Blockly.Haskell['procedures_callreturn'] 改良
17/12/12    ['procedures_call'] 作成
18/12/19  ['procedures_defreturn_statement'] 作成
19/01/09  ['procedures_defreturn_where'] ['procedures_defreturn_statement_where'] 作成
19/01/15 ['procedures_single'] 作成
 */
'use strict';

goog.provide('Blockly.Haskell.procedures');

goog.require('Blockly.Haskell');


// Blockly.Haskell['procedures_defreturn'] = function(block) {
//   // Define a procedure with a return value.
//   var funcName = Blockly.Haskell.variableDB_.getName(
//       block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
//   // var branch = Blockly.Haskell.statementToCode_0indent(block, 'STACK');
//   // if (Blockly.Haskell.STATEMENT_PREFIX) {
//   //   branch = Blockly.Haskell.prefixLines(
//   //       Blockly.Haskell.STATEMENT_PREFIX.replace(/%1/g,
//   //       '\'' + block.id + '\''), Blockly.Haskell.INDENT) + branch;
//   // }
//   // if (Blockly.Haskell.INFINITE_LOOP_TRAP) {
//   //   branch = Blockly.Haskell.INFINITE_LOOP_TRAP.replace(/%1/g,
//   //       '\'' + block.id + '\'') + branch;
//   // }
//   var returnValue = Blockly.Haskell.valueToCode(block, 'RETURN',
//       Blockly.Haskell.ORDER_NONE) || '';
//   var args = [];
//   for (var i = 0; i < block.arguments_.length; i++) {
//     args[i] = block.arguments_[i];
//   }
//   var code = funcName + /* ' :: ' + args.join(' -> ') + '\n' + branch */ " = " + returnValue;   // 17/12/07 
//   code = Blockly.Haskell.scrub_(block, code);
//   // 定義リストのヘルパー関数と衝突しないように％を追加する。
//   Blockly.Haskell.definitions_['%' + funcName] = code;
//   return null;
// };

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Haskell['procedures_defnoreturn'] =
    Blockly.Haskell['procedures_defreturn'];

Blockly.Haskell['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.itemCount_; i++) { // 17/12/05 this.arguments_.lengthに-1
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_FUNCTION_CALL) || '_';
  }
  var code = funcName + ' ' + args.join(' ') ;
  var order = block.itemCount_ == 0 ? Blockly.Haskell.ORDER_ATOMIC : Blockly.Haskell.ORDER_FUNCTION_CALL;
  return [code, order];
};

/*
Blockly.Haskell['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || 'null';
  }
  var code = funcName + ' ' + args.join(' ') + '';
  return code;
};

Blockly.Haskell['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Haskell.valueToCode(block, 'CONDITION',
      Blockly.Haskell.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Haskell.valueToCode(block, 'VALUE',
        Blockly.Haskell.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
*/

Blockly.Haskell['procedures_call'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) {
    args[i] = Blockly.Haskell.valueToStatement(block, 'ADD' + i,
        Blockly.Haskell.ORDER_FUNCTION_CALL) || '_';
  }
  var code = funcName + ' ' + args.join(' ');
  var order = block.itemCount_ == 0 ? Blockly.Haskell.ORDER_ATOMIC : Blockly.Haskell.ORDER_FUNCTION_CALL;
  return [code, order];
  //return code + '\n';
};

/*
Blockly.Haskell['procedures_call2'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }

  var code = funcName + ' ' + args.join(' ');
  var order = block.itemCount_ == 0 ? Blockly.Haskell.ORDER_ATOMIC : Blockly.Haskell.ORDER_FUNCTION_CALL;
  return [code, order];
  //return code + '\n';
};
*/

Blockly.Haskell['procedures_defreturn'] = function(block) {
  // Call a procedure with a return value.
  
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.itemCount_; i++) { 
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_FUNCTION_CALL) || '_';
  }
  var code = funcName + ' ' + args.join(' ') + ' = ';
  code += Blockly.Haskell.valueToCode(block, 'RETURN',
        Blockly.Haskell.ORDER_NONE) || 'null';
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};

/*
// 18/12/19 
Blockly.Haskell['procedures_defreturn_statement'] = function(block) {
  // Call a procedure with a return value.
  
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.arguments_.length; i++) { 
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = funcName + ' ' + args.join(' ') + '\n';
  code += Blockly.Haskell.statementToCode(block, 'DELTA',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};
// 18/12/19 ここまで

// 19/01/09 
Blockly.Haskell['procedures_defreturn_where'] = function(block) {
  // Call a procedure with a return value.
  
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.arguments_.length; i++) { 
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = funcName + ' ' + args.join(' ') + ' = ';
  code += Blockly.Haskell.valueToCode(block, 'DELTA',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var branch = Blockly.Haskell.statementToCode(block, 'WHERE');
  code += '  where\n' + branch;
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
  
};

Blockly.Haskell['procedures_defreturn_statement_where'] = function(block) {
  
  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.arguments_.length; i++) { 
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = funcName + ' ' + args.join(' ') + '\n';
  code += Blockly.Haskell.statementToCode(block, 'DELTA',
        Blockly.Haskell.ORDER_COMMA) || 'null';
  var branch = Blockly.Haskell.statementToCode(block, 'WHERE');
  code += '  where\n' + branch;
  
  //return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  return code + '\n';
};
// 19/01/09 ここまで

// 19/01/15
Blockly.Haskell['procedures_single'] = function(block) {

  var funcName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  
  for (var i = 0; i < block.arguments_.length; i++) { 
    args[i] = Blockly.Haskell.valueToCode(block, 'ARG' + i,
        Blockly.Haskell.ORDER_COMMA) || '_';
  }
  var code = funcName + ' ' + args.join(' ');
  
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  //return code + '\n';
};
// 19/01/15 ここまで
*/
