/**
2017/12/05 コメントアウトのコード 変更
 */
'use strict';

goog.provide('Blockly.Haskell');

goog.require('Blockly.Generator');


/**
 * Haskell code generator.
 * @type {!Blockly.Generator};
 */
Blockly.Haskell = new Blockly.Generator('Haskell');

Blockly.Haskell.INDENT = '';  // 19/06/06

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Haskell.addReservedWords(
    'Blockly,' +  
    // https://wiki.haskell.org/Keywords
    'case,class,data,default,deriving,do,else,forall,foreign,if,import,in,infix,infixl,infixr,instance,let,module,newtpe,of,then,type,where,_' +
    'True,False,Just,Nothing,');
/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/Haskell/Reference/Operators/Operator_Precedence
 */
Blockly.Haskell.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Haskell.ORDER_FUNCTION_CALL = 1;    //
Blockly.Haskell.ORDER_DOT = 2;              // .
Blockly.Haskell.ORDER_POWER = 3;            // ^ 
Blockly.Haskell.ORDER_MULTIPLICATION = 4;   // *
Blockly.Haskell.ORDER_ADDITION = 5;         // +, -
Blockly.Haskell.ORDER_CONS = 6;             // : 
Blockly.Haskell.ORDER_EQUALITY = 7;         // == != > >= < <=
Blockly.Haskell.ORDER_LOGICAL_AND = 8;      // &&
Blockly.Haskell.ORDER_LOGICAL_OR = 9;       // ||
Blockly.Haskell.ORDER_BIND = 10;            // >>, >>=
Blockly.Haskell.ORDER_DNIB = 11;            // =<<
Blockly.Haskell.ORDER_SEQ  = 12;            // $, $!, `seq`
// ``ambiguities that are to be resolved by making grammatical phrases as long as possible''
Blockly.Haskell.ORDER_IF   = 50;            // if then else , case of, let in, \ ->,  
Blockly.Haskell.ORDER_NONE = 99;            // (...)
/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Haskell.ORDER_OVERRIDES = [
  // (foo bar) baz -> foo bar baz
  //  [Blockly.Haskell.ORDER_FUNCTION_CALL, Blockly.Haskell.ORDER_FUNCTION_CALL],
  // foo. (bar . baz) -> foo . bar . baz
  [Blockly.Haskell.ORDER_DOT, Blockly.Haskell.ORDER_DOT],
  // a ^ (b ^ c) -> a ^ b ^ c
  [Blockly.Haskell.ORDER_POWER, Blockly.Haskell.ORDER_POWER],
  // (a * b) * c -> a * b * c
  [Blockly.Haskell.ORDER_MULTIPLICATION, Blockly.Haskell.ORDER_MULTIPLICATION],
  // (a + b) + c -> a + b + c
  [Blockly.Haskell.ORDER_ADDITION, Blockly.Haskell.ORDER_ADDITION],
  // a : (b : c) -> a : b : c
  [Blockly.Haskell.ORDER_CONS, Blockly.Haskell.ORDER_CONS],
  // a && (b && c) -> a && b && c
  [Blockly.Haskell.ORDER_LOGICAL_AND, Blockly.Haskell.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Haskell.ORDER_LOGICAL_OR, Blockly.Haskell.ORDER_LOGICAL_OR],
  // (a >> b) >> c -> a >> b >> c
  [Blockly.Haskell.ORDER_BIND, Blockly.Haskell.ORDER_BIND],
  // a =<< (b =<< c) -> a =<< b =<< c
  [Blockly.Haskell.ORDER_DNIB, Blockly.Haskell.ORDER_DNIB],
  // a $ (b $ c) -> a $ b $ c
  [Blockly.Haskell.ORDER_SEQ, Blockly.Haskell.ORDER_SEQ],
];

/**
 * Allow for switching between one and zero based indexing for lists and text,
 * one based by default.
 リストとテキストの1と0の間のインデックス付けを切り替えることができます。
 デフォルトでは1つです。
 */
Blockly.Haskell.ONE_BASED_INDEXING = true;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Haskell.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Haskell.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Haskell.functionNames_ = Object.create(null);

  if (!Blockly.Haskell.variableDB_) {
    Blockly.Haskell.variableDB_ =
        new Blockly.Names(Blockly.Haskell.RESERVED_WORDS_);
  } else {
    Blockly.Haskell.variableDB_.reset();
  }
  Blockly.Haskell.variableDB_.setVariableMap(workspace.getVariableMap());
  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.JavaScript.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.Haskell.variableDB_.getName(variables[i].getId(),
        Blockly.Variables.NAME_TYPE));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.Haskell.definitions_['variables'] = '';
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Haskell.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Haskell.definitions_) {
    definitions.push(Blockly.Haskell.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Haskell.definitions_;
  delete Blockly.Haskell.functionNames_;
  Blockly.Haskell.variableDB_.reset();
  // ↓  ブロックが離れているとき、どれだけ改行するか
  return definitions.join('\n\n') + '\n' + code;    // 2017/07/13 \nを2個消去 
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 行の終わりを示す
 */
Blockly.Haskell.scrubNakedValue = function(line) {
  return line + '\n';     // 2017/07/13 セミコロン(;)を消去
};

/**
 * Encode a string as a properly escaped Haskell string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Haskell string.
 * @private
 */
Blockly.Haskell.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Haskell from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Haskell code created for this block.
 * @return {string} Haskell code with comments and subsequent blocks added.
 * @private
 */
Blockly.Haskell.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Haskell.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        /* 18/01/17 ['procedures_defreturn']のパターンマッチングで邪魔なため
        commentCode += '{-\n' +
                       Blockly.Haskell.prefixLines(comment + '\n', ' ') +
                       ' -}\n';*/                                 // 17/12/05 コメントアウトのコードをhaskell用に変更
      } else {
        commentCode += Blockly.Haskell.prefixLines(comment + '\n', '-- ');  // 17/12/05 ↑と同様
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Haskell.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Haskell.prefixLines(comment, '-- '); // 17/12/05 ↑と同様
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Haskell.blockToCode(nextBlock);
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
Blockly.Haskell.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Haskell.ORDER_NONE;
  if (Blockly.Haskell.ONE_BASED_INDEXING) {
    delta--;
  }
  var defaultAtIndex = Blockly.Haskell.ONE_BASED_INDEXING ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Haskell.valueToCode(block, atId,
        Blockly.Haskell.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Haskell.valueToCode(block, atId,
        Blockly.Haskell.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Haskell.valueToCode(block, atId,
        Blockly.Haskell.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Haskell.valueToCode(block, atId, order) ||
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
      var innerOrder = Blockly.Haskell.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Haskell.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Haskell.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};

/**
 * Generate code representing the statement with separator
 * @param {!Blockly.Block} block The block containing the input.
 * @param {string} name The name of the input.
 * @param {string} sep The separator.
 * @return {string} Generated code or '' if no blocks are connected.
 */
Blockly.Haskell.statementToCodeWithSeparator = function(block, name, sep) {
  var targetBlock = block.getInputTargetBlock(name);
  var code = this.blockToCodeWithSeparator(targetBlock, sep);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  if (typeof code != 'string') {
    throw TypeError('Expecting code from statement block: ' +
        (targetBlock && targetBlock.type));
  }
//   if (code) {
//     code = this.prefixLines(/** @type {string} */ (code), this.INDENT);
//   }
  return code;
};

/**
 * Generate code for the specified block (and attached blocks).
 * @param {Blockly.Block} block The block to generate code for.
 * @param {string} separator The separator.
 * @return {string} For statement blocks, the generated code.
 */
Blockly.Haskell.blockToCodeWithSeparator = function(block, separator) {
  if (!block) {
    return '';
  }
  if (block.disabled) {
    // Skip past this block if it is disabled.
    return this.blockToCodeWithSeparator(block.getNextBlock(), separator);
  }

  var func = this[block.type];
  if (typeof func != 'function') {
    throw Error('Language "' + this.name_ + '" does not know how to generate ' +
        ' code for block type "' + block.type + '".');
  }
  // First argument to func.call is the value of 'this' in the generator.
  // Prior to 24 September 2013 'this' was the only way to access the block.
  // The current prefered method of accessing the block is through the second
  // argument to func.call, which becomes the first parameter to the generator.
  var code = func.call(block, block);
  if (Array.isArray(code)) {
    // Value blocks return tuples of code and operator order.
//    if (!block.outputConnection) {
      throw TypeError('Expecting string from statement block: ' + block.type);
//    }
//    return [this.scrub_(block, code[0], opt_thisOnly), code[1]];
  } else if (typeof code == 'string') {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    if (this.STATEMENT_PREFIX) {
      code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') + code;
    }
    return this.scrubWithSeparator(block, code, separator);
  } else if (code === null) {
    // Block has handled code generation itself.
    return '';
  } else {
    throw SyntaxError('Invalid code generated: ' + code);
  }
};


/**
 * Common tasks for generating Haskell from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Haskell code created for this block.
 * @param {string} separator The separator.
 * @return {string} Haskell code with comments and subsequent blocks added.
 * @private
 */
Blockly.Haskell.scrubWithSeparator = function(block, code, separator) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Haskell.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        /* 18/01/17 ['procedures_defreturn']のパターンマッチングで邪魔なため
        commentCode += '{-\n' +
                       Blockly.Haskell.prefixLines(comment + '\n', ' ') +
                       ' -}\n';*/                                 // 17/12/05 コメントアウトのコードをHaskell用に変更
      } else {
        commentCode += Blockly.Haskell.prefixLines(comment + '\n', '-- ');  // 17/12/05 ↑と同様
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Haskell.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Haskell.prefixLines(comment, '-- '); // 17/12/05 ↑と同様
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Haskell.blockToCodeWithSeparator(nextBlock, separator);
  return commentCode + code + (nextBlock ? (separator + nextCode) : "");
};

