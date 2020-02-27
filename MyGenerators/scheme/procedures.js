'use strict';

goog.provide('Blockly.Scheme.procedures');

goog.require('Blockly.Scheme');

Blockly.Scheme['procedures_defreturn'] = function (block) {
    var code = '(define (';
    var funcName = Blockly.Scheme.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    code += funcName;
    for (var i = 0; i < block.arguments_.length; i++) {
        code += ' ';
        code += Blockly.Scheme.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }
    code += ')\n';
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        code += Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
    }
    code += ')';
    code += '\n'; 
    return code;
};

Blockly.Scheme['procedures_lambda'] = function (block) {
    var code = '(lambda ';
    code += '(';
    if (block.arguments_.length > 0) {
        code += Blockly.Scheme.variableDB_.getName(block.arguments_[0],
            Blockly.Variables.NAME_TYPE);
    }
    for (var i = 1; i < block.arguments_.length; i++) {
        code += ' ';
        code += Blockly.Scheme.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }
    code += ')';
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        code += Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['procedures_callreturn'] = function (block) {
    var code = '(';
    var funcName = Blockly.Scheme.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    code += funcName;
    for (var i = 0; i < block.arguments_.length; i++) {
        code += ' ';
        code += Blockly.Scheme.valueToCode(block, 'ARG' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};