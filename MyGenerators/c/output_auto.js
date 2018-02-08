/*
18/02/05    ['input_auto'] 新規作成
*/


Blockly.C['output_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var code = 'printf("';
  
  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,  Blockly.C.ORDER_NONE);
  }

  code += block.getFieldValue('TEXT');

  code += '\\n"';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';

  return code;
};



Blockly.C['input_auto'] = function(block) {
  // Text value.
  var arr = new Array(block.itemCount_);
  var code = 'scanf("';
  
  for (var n = 0; n < block.itemCount_; n++) {
    arr[n] = Blockly.C.valueToCode(block, 'ADD' + n,  Blockly.C.ORDER_NONE);
  }

  code += block.getFieldValue('TEXT');

  code += '\\n"';
  for (n = 0; n < block.itemCount_; n++) {
    code += ', &' + arr[n];
  }
  code += ');\n';

  return code;
};
