'use strict';

goog.provide('Blockly.Prolog.procedures');

goog.require('Blockly.Prolog');


Blockly.Prolog['procedures_defnoreturn'] = function(block) {
    var funcName = Blockly.Prolog.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    
    for (var i = 0; i < block.itemCount_; i++) { 
      args[i] = Blockly.Prolog.valueToCode(block, 'ARG' + i,
          Blockly.Prolog.ORDER_FUNCTION_CALL) || '_';
    }

    var code = funcName + '(' + args.join(',') + ')';
    if (!block.hasStatements_) {
        return code + '.\n';
    }
    code += ' :-\n';
    var branch = Blockly.Prolog.statementToCodeWithSeparator(block, 'STACK', ', ');
    branch = Blockly.Prolog.prefixLines(branch, '    ');
    // if (branch) {
    //     branch = Blockly.Prolog.prefixLines(branch, ',');
    // }
    return code + Blockly.Prolog.insertBeforeNewline(branch, '.');
  };

  Blockly.Prolog['procedures_callnoreturn'] = function(block) {
    var funcName = Blockly.Prolog.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    
    for (var i = 0; i < block.itemCount_; i++) { 
      args[i] = Blockly.Prolog.valueToCode(block, 'ARG' + i,
          Blockly.Prolog.ORDER_FUNCTION_CALL) || '_';
    }

    var code = funcName + '(' + args.join(',') + ')';
    return code + '\n';
  };

  Blockly.Prolog['prolog_query'] = function(block) {
    var code = "?- ";
    var branch = Blockly.Prolog.statementToCodeWithSeparator(block, 'STACK', ', ');
    return code + Blockly.Prolog.insertBeforeNewline(branch, '.');
  };