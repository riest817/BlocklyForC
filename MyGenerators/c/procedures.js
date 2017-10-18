/**
2017/07/03  61,86行目あたり追加
2017/10/17  60行目あたり変更
 */
'use strict';

goog.provide('Blockly.C.procedures');

goog.require('Blockly.C');


Blockly.C['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.C.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.C.statementToCode(block, 'STACK');
  if (Blockly.C.STATEMENT_PREFIX) {
    branch = Blockly.C.prefixLines(
        Blockly.C.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.C.INDENT) + branch;
  }
  if (Blockly.C.INFINITE_LOOP_TRAP) {
    branch = Blockly.C.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.C.valueToCode(block, 'RETURN',
      Blockly.C.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.C.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  // ===== 追加 (2017/07/03) =====
  if ( block.arguments_.length == 0 ) { args[0] = 'void'; }
  // ===== 追加ここまで
  var code = 'int ' + funcName + '(' + args.join(', ') + ') {\n' +  // voidからintに変更(2017/10/17)
      branch + returnValue + '}';
  code = Blockly.C.scrub_(block, code);
  // 定義リストのヘルパー関数と衝突しないように％を追加する。
  Blockly.C.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.C['procedures_defnoreturn'] =
    Blockly.C['procedures_defreturn'];

Blockly.C['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.C.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.C.valueToCode(block, 'ARG' + i,
        Blockly.C.ORDER_COMMA) || 'null';
  }
  // ===== 追加 (2017/07/03) =====
  if ( block.arguments_.length == 0 ) { args[0] = 'void'; }
  // ===== 追加ここまで
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.C.ORDER_FUNCTION_CALL];
};

Blockly.C['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.C.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.C.valueToCode(block, 'ARG' + i,
        Blockly.C.ORDER_COMMA) || 'null';
  }
  // ===== 追加 (2017/07/03) =====
  if ( block.arguments_.length == 0 ) { args[0] = 'void'; }
  // ===== 追加 (2017/07/03) ここまで
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.C['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.C.valueToCode(block, 'CONDITION',
      Blockly.C.ORDER_NONE) || '0';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.C.valueToCode(block, 'VALUE',
        Blockly.C.ORDER_NONE) || '0';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
