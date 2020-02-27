/**
2017/12/05 コメントアウトのコード 変更
 */
'use strict';

goog.provide('Blockly.Scheme');

goog.require('Blockly.Generator');


/**
 * Scheme code generator.
 * @type {!Blockly.Generator};
 */
Blockly.Scheme = new Blockly.Generator('Scheme');

Blockly.Scheme.INDENT = '';  // 19/06/06

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Scheme.addReservedWords(
    'Blockly,' +  
    'lambda,let,let*,define,cons,null,set!,cond,begin,call/cc,if,else,#t,#f,and,or,do' +
    '');

Blockly.Scheme.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Scheme.ORDER_NONE = 99;            // (...)
/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Scheme.ORDER_OVERRIDES = [
 ];

/**
 * Allow for switching between one and zero based indexing for lists and text,
 * one based by default.
 リストとテキストの1と0の間のインデックス付けを切り替えることができます。
 デフォルトでは1です。
 */
Blockly.Scheme.ONE_BASED_INDEXING = true;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Scheme.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Scheme.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Scheme.functionNames_ = Object.create(null);

  if (!Blockly.Scheme.variableDB_) {
    Blockly.Scheme.variableDB_ =
        new Blockly.Names(Blockly.Scheme.RESERVED_WORDS_);
  } else {
    Blockly.Scheme.variableDB_.reset();
  }
  Blockly.Scheme.variableDB_.setVariableMap(workspace.getVariableMap());
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
    defvars.push(Blockly.Scheme.variableDB_.getName(variables[i].getId(),
        Blockly.Variables.NAME_TYPE));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.Scheme.definitions_['variables'] = '';
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Scheme.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Scheme.definitions_) {
    definitions.push(Blockly.Scheme.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Scheme.definitions_;
  delete Blockly.Scheme.functionNames_;
  Blockly.Scheme.variableDB_.reset();
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
Blockly.Scheme.scrubNakedValue = function(line) {
  return line + '\n';     // 2017/07/13 セミコロン(;)を消去
};

/**
 * Encode a string as a properly escaped Scheme string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Scheme string.
 * @private
 */
Blockly.Scheme.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\"/g, '\\\"');
  return '"' + string + '"';
};

/**
 * Common tasks for generating Scheme from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Scheme code created for this block.
 * @return {string} Scheme code with comments and subsequent blocks added.
 * @private
 */
Blockly.Scheme.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Scheme.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
          commentCode += Blockly.Scheme.prefixLines(comment + '\n', '; ') 
                       
      } else {
        commentCode += Blockly.Scheme.prefixLines(comment + '\n', '; ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Scheme.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Scheme.prefixLines(comment, '; ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Scheme.blockToCode(nextBlock);
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
Blockly.Scheme.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Scheme.ORDER_NONE;
  if (Blockly.Scheme.ONE_BASED_INDEXING) {
    delta--;
  }
  var defaultAtIndex = Blockly.Scheme.ONE_BASED_INDEXING ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Scheme.valueToCode(block, atId,
        Blockly.Scheme.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Scheme.valueToCode(block, atId,
        Blockly.Scheme.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Scheme.valueToCode(block, atId,
        Blockly.Scheme.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Scheme.valueToCode(block, atId, order) ||
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
      var innerOrder = Blockly.Scheme.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Scheme.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Scheme.ORDER_UNARY_NEGATION;
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
Blockly.Scheme.statementToCodeWithSeparator = function(block, name, sep) {
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
Blockly.Scheme.blockToCodeWithSeparator = function(block, separator) {
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
