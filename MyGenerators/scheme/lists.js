'use strict';

goog.provide('Blockly.Scheme.lists');
goog.require('Blockly.Scheme');

Blockly.Scheme['scheme_lists_list'] = function (block) {
    var code = '(list ';
    if (block.itemCount_ > 0) {
        var elem = Blockly.Scheme.valueToCode(block, 'ADD0',
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    for (var i = 1; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_lists_quote'] = function (block) {
    var code = '(quote ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_lists_plain'] = function (block) {
    var code = '(';
    if (block.itemCount_ > 0) {
        var elem = Blockly.Scheme.valueToCode(block, 'ADD0',
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    for (var i = 1; i < block.itemCount_; i++) {
        code += ' ';
        var elem = Blockly.Scheme.valueToCode(block, 'ADD' + i,
            Blockly.Scheme.ORDER_NONE) || "'()";
        code += elem;
    }
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_lists_operator'] = function (block) {
    var op = block.getFieldValue('NAME') || 'car';
    var code = '(' + op + ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_lists_operator2'] = function (block) {
    var op = block.getFieldValue('NAME') || 'cons';
    var code = '(' + op + ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "'()";
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD1',
    Blockly.Scheme.ORDER_NONE) || "'()";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};