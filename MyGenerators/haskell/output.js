Blockly.Haskell['output_text'] = function(block) {
  // Text value.
  var code = 'print "';
  code += block.getFieldValue('TEXT');
  code += '"\n';
  return code;
};

Blockly.Haskell['output_var'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'print ';
  
  code += value_b + '\n';
  return code;
};

Blockly.Haskell['output_var2'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'print ';
  
  code += value_b;
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/01/15 ここまで

Blockly.Haskell['string'] = function(block) {
  // Text value.
  var code = '"';
  code += block.getFieldValue('TEXT');
  code += '"';
  return [code, Blockly.Haskell.ORDER_ATOMIC];
};
