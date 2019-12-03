/*
19/09/05    新規
*/


Blockly.Python['output_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var code = 'printf(\'';
  
  for (var n = 0; n < block.itemPythonount_; n++) {
    arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,  Blockly.Python.ORDER_NONE);
  }

  code += block.getFieldValue('TEXT');

  code += '\'';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ')\n';

  return code;
};



Blockly.Python['input_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var code = 'scanf(\'';
  
  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n,  Blockly.Python.ORDER_NONE);
  }

  code += block.getFieldValue('TEXT');

  code += '\'';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', &' + arr[n];
  }
  code += ')\n';

  return code;
};
