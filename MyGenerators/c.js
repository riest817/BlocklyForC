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
 * @fileoverview Helper functions for generating C for blocks.
 * 
 */
'use strict';

goog.provide('Blockly.C');

goog.require('Blockly.Generator');


/**
 * C code generator.
 * @type {!Blockly.Generator}
 */
Blockly.C = new Blockly.Generator('C');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.C.addReservedWords(
    'Blockly,' +  
    'auto,break,case,char,const,continue,default,do,double,else,enum,extern,for,goto,if,int,long,register,return,short,signe,sizeof,static,switch,typedef,union,unsigned,void,volatile,while');

/**
 * Order of operation ENUMs.
 */
Blockly.C.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.C.ORDER_MEMBER = 1.2;         // . -> []
Blockly.C.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.C.ORDER_INCREMENT = 3;        // ++
Blockly.C.ORDER_DECREMENT = 3;        // --
Blockly.C.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.C.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.C.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.C.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.C.ORDER_VOID = 4.6;           // void
Blockly.C.ORDER_DIVISION = 5.1;       // /
Blockly.C.ORDER_MULTIPLICATION = 5.2; // *
Blockly.C.ORDER_MODULUS = 5.3;        // %
Blockly.C.ORDER_SUBTRACTION = 6.1;    // -
Blockly.C.ORDER_ADDITION = 6.2;       // +
Blockly.C.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.C.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.C.ORDER_EQUALITY = 9;         // == != === !==
Blockly.C.ORDER_BITWISE_AND = 10;     // &
Blockly.C.ORDER_BITWISE_XOR = 11;     // ^
Blockly.C.ORDER_BITWISE_OR = 12;      // |
Blockly.C.ORDER_LOGICAL_AND = 13;     // &&
Blockly.C.ORDER_LOGICAL_OR = 14;      // ||
Blockly.C.ORDER_CONDITIONAL = 15;     // ?:
Blockly.C.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.C.ORDER_COMMA = 17;           // ,
Blockly.C.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.C.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.C.ORDER_FUNCTION_CALL, Blockly.C.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.C.ORDER_FUNCTION_CALL, Blockly.C.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.C.ORDER_MEMBER, Blockly.C.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.C.ORDER_MEMBER, Blockly.C.ORDER_FUNCTION_CALL],
  // !(!foo) -> !!foo
  [Blockly.C.ORDER_LOGICAL_NOT, Blockly.C.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.C.ORDER_MULTIPLICATION, Blockly.C.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.C.ORDER_ADDITION, Blockly.C.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.C.ORDER_LOGICAL_AND, Blockly.C.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.C.ORDER_LOGICAL_OR, Blockly.C.ORDER_LOGICAL_OR]
];

/**
 * Allow for switching between one and zero based indexing for lists and text,
 * one based by default.
 */
Blockly.C.ONE_BASED_INDEXING = true;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.C.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.C.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.C.functionNames_ = Object.create(null);

  if (!Blockly.C.variableDB_) {
    Blockly.C.variableDB_ =
        new Blockly.Names(Blockly.C.RESERVED_WORDS_);
  } else {
    Blockly.C.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  if (variables.length) {
    for (var i = 0; i < variables.length; i++) {
      defvars[i] = Blockly.C.variableDB_.getName(variables[i],
          Blockly.Variables.NAME_TYPE);
    }
    Blockly.C.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';    // ????
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.C.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.C.definitions_) {
    definitions.push(Blockly.C.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.C.definitions_;
  delete Blockly.C.functionNames_;
  Blockly.C.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.C.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped C string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} C string.
 * @private
 */
Blockly.C.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating C from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The C code created for this block.
 * @return {string} C code with comments and subsequent blocks added.
 * @private
 */
Blockly.C.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.C.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                       Blockly.C.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.C.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.C.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.C.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.C.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.C.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.C.ORDER_NONE;
  if (Blockly.C.ONE_BASED_INDEXING) {
    delta--;
  }
  var defaultAtIndex = Blockly.C.ONE_BASED_INDEXING ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.C.valueToCode(block, atId,
        Blockly.C.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.C.valueToCode(block, atId,
        Blockly.C.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.C.valueToCode(block, atId,
        Blockly.C.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.C.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.C.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.C.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.C.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
