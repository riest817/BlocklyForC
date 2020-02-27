'use strict';

goog.provide('Blockly.Scheme.logic');
goog.require('Blockly.Scheme');

Blockly.Scheme['scheme_begin'] = function (block) {
    var code = '(begin';
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_let_in'] = function (block) {
    var kind = block.getFieldValue('KIND') || 'let';
    var code = '(' + kind + ' (';
    var decls = Blockly.Scheme.statementToCode(block, 'DECLS');
    code += decls;
    code += ')';
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_call_cc'] = function (block) {
    var code = '(call-with-current-continuation ';
    code += Blockly.Scheme.valueToCode(block, 'CALLBACK',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_logic_boolean'] = function (block) {
    var code = block.getFieldValue('BOOL') || '#t';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_logic_operation'] = function (block) {
    var kind = block.getFieldValue('KIND') || 'and';
    var vacant = "kind" == "and" ? "#t" : "#f";
    var code = '(' + kind;
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || vacant;
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_logic_compare'] = function (block) {
    var kind = block.getFieldValue('KIND') || '<';
    var code = '(' + kind ;
    for (var i = 0; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || 0;
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_logic_not'] = function (block) {
    var code = '(not ';
    code += Blockly.Scheme.valueToCode(block, 'BOOL',
        Blockly.Scheme.ORDER_NONE) || "#f";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

// Blockly.Scheme['scheme_decl'] = function (block) {
//     var code = '(';
//     code += block.getFieldValue('VAR') || '_';
//     code += ' ';
//     code += Blockly.Scheme.valueToCode(block, 'VALUE',
//         Blockly.Scheme.ORDER_NONE) || "'()";
//     code += ')';
//     code += '\n';
//     return code;
// };

Blockly.Scheme['scheme_if'] = function (block) {
    var code = '(if ';
    code += Blockly.Scheme.valueToCode(block, 'IF',
        Blockly.Scheme.ORDER_NONE) || "#f";
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'THEN',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'ELSE',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

