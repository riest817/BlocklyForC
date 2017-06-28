/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Haskell for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Haskell.texts');

goog.require('Blockly.Haskell');


Blockly.Haskell['text'] = function(block) {
  // Text value.
  var code = Blockly.Haskell.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Haskell.ORDER_ATOMIC];
};

Blockly.Haskell['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.Haskell.ORDER_ATOMIC];
    case 1:
      var element = Blockly.Haskell.valueToCode(block, 'ADD0',
          Blockly.Haskell.ORDER_NONE) || '\'\'';
      var code = 'String(' + element + ')';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
    case 2:
      var element0 = Blockly.Haskell.valueToCode(block, 'ADD0',
          Blockly.Haskell.ORDER_NONE) || '\'\'';
      var element1 = Blockly.Haskell.valueToCode(block, 'ADD1',
          Blockly.Haskell.ORDER_NONE) || '\'\'';
      var code = 'String(' + element0 + ') + String(' + element1 + ')';
      return [code, Blockly.Haskell.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Haskell.valueToCode(block, 'ADD' + i,
            Blockly.Haskell.ORDER_COMMA) || '\'\'';
      }
      var code = '[' + elements.join(',') + '].join(\'\')';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  }
};

Blockly.Haskell['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Haskell.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + value + ');\n';
};

Blockly.Haskell['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_FUNCTION_CALL) || '\'\'';
  return [text + '.length', Blockly.Haskell.ORDER_MEMBER];
};

Blockly.Haskell['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '\'\'';
  return ['!' + text + '.length', Blockly.Haskell.ORDER_LOGICAL_NOT];
};

Blockly.Haskell['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var substring = Blockly.Haskell.valueToCode(block, 'FIND',
      Blockly.Haskell.ORDER_NONE) || '\'\'';
  var text = Blockly.Haskell.valueToCode(block, 'VALUE',
      Blockly.Haskell.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  // Adjust index if using one-based indices.
  if (Blockly.Haskell.ONE_BASED_INDEXING) {
    return [code + ' + 1', Blockly.Haskell.ORDER_ADDITION];
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.Haskell.ORDER_NONE :
      Blockly.Haskell.ORDER_MEMBER;
  var text = Blockly.Haskell.valueToCode(block, 'VALUE',
      textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var at = Blockly.Haskell.getAdjusted(block, 'AT');
      // Adjust index if using one-based indices.
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var at = Blockly.Haskell.getAdjusted(block, 'AT', 1, true);
      var code = text + '.slice(' + at + ').charAt(0)';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.Haskell.provideFunction_(
          'textRandomLetter',
          ['function ' + Blockly.Haskell.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
           '  var x = Math.floor(Math.random() * text.length);',
           '  return text[x];',
           '}']);
      var code = functionName + '(' + text + ')';
      return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

/**
 * Returns an expression calculating the index into a string.
 * @private
 * @param {string} stringName Name of the string, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string} Index expression.
 */
Blockly.Haskell.text.getIndex_ = function(stringName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return stringName + '.length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return stringName + '.length - 1';
  } else {
    return opt_at;
  }
};

Blockly.Haskell['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Haskell.valueToCode(block, 'STRING',
      Blockly.Haskell.ORDER_FUNCTION_CALL) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else if (text.match(/^'?\w+'?$/) ||
      (where1 != 'FROM_END' && where1 != 'LAST' &&
      where2 != 'FROM_END' && where2 != 'LAST')) {
    // If the text is a variable or literal or doesn't require a call for
    // length, don't generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Haskell.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Haskell.getAdjusted(block, 'AT1', 1, false,
            Blockly.Haskell.ORDER_SUBTRACTION);
        at1 = text + '.length - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.Haskell.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.Haskell.getAdjusted(block, 'AT2', 0, false,
            Blockly.Haskell.ORDER_SUBTRACTION);
        at2 = text + '.length - ' + at2;
        break;
      case 'LAST':
        var at2 = text + '.length';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    code = text + '.slice(' + at1 + ', ' + at2 + ')';
  } else {
    var at1 = Blockly.Haskell.getAdjusted(block, 'AT1');
    var at2 = Blockly.Haskell.getAdjusted(block, 'AT2');
    var getIndex_ = Blockly.Haskell.text.getIndex_;
    var wherePascalCase = {'FIRST': 'First', 'LAST': 'Last',
      'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'};
    var functionName = Blockly.Haskell.provideFunction_(
        'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
        ['function ' + Blockly.Haskell.FUNCTION_NAME_PLACEHOLDER_ +
        '(sequence' +
        // The value for 'FROM_END' and'FROM_START' depends on `at` so
        // we add it as a parameter.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
        ') {',
          '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
          '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
          '  return sequence.slice(start, end);',
          '}']);
    var code = functionName + '(' + text +
        // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
        // pass it.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
        ')';
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var textOrder = operator ? Blockly.Haskell.ORDER_MEMBER :
      Blockly.Haskell.ORDER_NONE;
  var text = Blockly.Haskell.valueToCode(block, 'TEXT',
      textOrder) || '\'\'';
  if (operator) {
    // Upper and lower case are functions built into Haskell.
    var code = text + operator;
  } else {
    // Title case is not a native Haskell function.  Define one.
    var functionName = Blockly.Haskell.provideFunction_(
        'textToTitleCase',
        ['function ' + Blockly.Haskell.FUNCTION_NAME_PLACEHOLDER_ +
            '(str) {',
         '  return str.replace(/\\S+/g,',
         '      function(txt) {return txt[0].toUpperCase() + ' +
            'txt.substring(1).toLowerCase();});',
         '}']);
    var code = functionName + '(' + text + ')';
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
    'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_MEMBER) || '\'\'';
  return [text + operator, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Haskell.valueToCode(block, 'TEXT',
      Blockly.Haskell.ORDER_NONE) || '\'\'';
  return 'window.alert(' + msg + ');\n';
};

Blockly.Haskell['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Haskell.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Haskell.valueToCode(block, 'TEXT',
        Blockly.Haskell.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.Haskell.ORDER_FUNCTION_CALL];
};

Blockly.Haskell['text_prompt'] = Blockly.Haskell['text_prompt_ext'];

Blockly.Haskell['quiz_printf2'] = function(block) {
  var option = block.getFieldValue('option');
  var code = 'printf("%d\n", ' + option + ' );\n';
  return code;
};

Blockly.Haskell['quiz_printf2_pre'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[0]);\nprintf(\"%d\\n\", arr[1]);\nprintf(\"%d\\n\", arr[2]);\nprintf(\"%d\\n\", arr[3]);\nprintf(\"%d\\n\", arr[4]);\n';
  return code;
};

Blockly.Haskell['quiz_printf_arr'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[i]);\n';
  return code;
};

Blockly.Haskell['quiz_printf_n'] = function(block) {
  var code = 'printf(\"%d\\n\", arr[n]);\n';
  return code;
};

Blockly.Haskell['quiz_printf_i'] = function(block) {
  var code = 'printf(\"%d\\n\", i);\n';
  return code;
};

Blockly.Haskell['quiz3_printf1'] = function(block) {
  var code = 'printf(\"%d : Good\\n\", arr[i]);\n';
  return code;
};

Blockly.Haskell['quiz3_printf2'] = function(block) {
  var code = 'printf(\"%d : Bad\\n\", arr[i]);\n';
  return code;
};

Blockly.Haskell['quiz_scanf_n'] = function(block) {
  var code = 'scanf(\"%d\", &n);\n';
  return code;
};

Blockly.Haskell['quiz_scanf_arr'] = function(block) {
  var code = 'scanf(\"%d\", &arr[i]);\n';
  return code;
};

Blockly.Haskell['quiz_process_a'] = function(block) {
  var code = '//----------------\n' + '//  ProcessA\n' + '//----------------\n\n';
  return code;
};

Blockly.Haskell['quiz_frame'] = function(block) {
  var branch = Blockly.Haskell.statementToCode(block, 'DO');
  var code = branch;
  return code;
};


Blockly.Haskell['quiz_print1'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble Haskell into code variable.
  var code = 'printf("%d\\n", ' + text_name + ' );\n';
  return code;
};

Blockly.Haskell['printf_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
    var arr = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      arr[n] = Blockly.Haskell.valueToCode(block, 'ADD' + n,
          Blockly.Haskell.ORDER_NONE) || '0';
    }
    code = 'printf("%d\\n"';
    for (n = 0; n < block.itemCount_; n++) {
    code += ', ' + arr[n];
  }
  code += ');\n';
    return code;


};
