'use strict';

goog.provide('Blockly.Scheme.variables');

goog.require('Blockly.Scheme');

Blockly.Scheme['variables_get'] = function (block) {
    // Variable getter.
    var code = Blockly.Scheme.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['variables_set'] = function (block) {
    var code = '(set! ';
    code += Blockly.Scheme.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE) || '_';
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'VALUE',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_variables_decl'] = function (block) {
    var code = '(';
    code += Blockly.Scheme.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE) || '_';
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'VALUE',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    code += '\n';
    return code;
};

Blockly.Scheme['scheme_variables_define'] = function (block) {
    var code = '(define ';
    code += Blockly.Scheme.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE) || '_';
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'VALUE',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    code += '\n';
    return code;
};