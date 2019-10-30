Blockly.Haskell['putStr_hs'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  //var varName = Blockly.C.variableDB_.getName(
  //              block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'putStr ';
  
  code += value_b + '\n';
  return code;
};

Blockly.Haskell['putStrLn_hs'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var value_b = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
  var code = 'putStrLn ';
  
  code += value_b + '\n';
  return code;
};

Blockly.Haskell['output_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code;
  switch (func) {
    case 'putStr':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC) || '""';
      code = 'putStr ' + value + '';
      break;
    /*
    case 'text':
      list = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'lines ' + list + '';
      break;*/
    case 'print':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC) || '""';
      code = 'print ' + value + '';
      break;
/*
    case 'var2':
      value = Blockly.Haskell.valueToCode(block, 'B', Blockly.Haskell.ORDER_ATOMIC);
      code = 'print ' + value + '\n';
      break;
*/
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['list_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code;
  switch (func) {
    case 'length':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'length ' + list;
      break;
    case 'lines':
      list = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'lines ' + list + '';
      break;
    case 'unlines':
      list = list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'unlines ' + list + '';
      break;
    case 'take':
      value = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '0';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'take ' + value + ' ' + list;
      break;
    case 'reverse':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'reverse ' + list;
      break;
    case 'words':
      text = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'words ' + text;
      break;
    case 'concat':
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'concat ' + list;
      break;
    case 'replicate':
      value = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '0';
      text = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_MEMBER) || '""';
      code = 'replicate ' + value + text;
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/03/17 ここまで

Blockly.Haskell['list_library'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, value, text, code, func;
  switch (func) {
    case 'map':
      func = Blockly.Haskell.valueToCode(block, 'FUNC',
      Blockly.Haskell.ORDER_MEMBER) || '';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'map ' + func + list;
      break;
    case 'concatMap':
      func = Blockly.Haskell.valueToCode(block, 'FUNC',
      Blockly.Haskell.ORDER_MEMBER) || '';
      list = Blockly.Haskell.valueToCode(block, 'LIST',
      Blockly.Haskell.ORDER_MEMBER) || '[]';
      code = 'concatMap ' + func + list;
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};
// 19/04/03 ここまで
