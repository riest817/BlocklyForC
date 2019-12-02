'use strict';

goog.provide('Blockly.Haskell.math');

goog.require('Blockly.Haskell');

Blockly.Scheme['math_number'] = function(block) {
    // Numeric value.
    var code = parseFloat(block.getFieldValue('NUM'));
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_math_arithmetic'] = function(block) {
    var kind = block.getFieldValue('KIND') || '+';
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

Blockly.Scheme['scheme_math_operator'] = function(block) {
    var op = block.getFieldValue('NAME') || 'abs';
    var code = '(' + op + ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "0";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};

Blockly.Scheme['scheme_math_operator2'] = function(block) {
    var op = block.getFieldValue('NAME') || 'atan';
    var code = '(' + op + ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD0',
        Blockly.Scheme.ORDER_NONE) || "0";
    code += ' ';
    code += Blockly.Scheme.valueToCode(block, 'ADD1',
    Blockly.Scheme.ORDER_NONE) || "0";
    code += ')';
    return [code, Blockly.Scheme.ORDER_ATOMIC];
};