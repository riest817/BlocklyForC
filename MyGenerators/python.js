/**
 19/09/03 新規 
 */
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');


/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Python = new Blockly.Generator('Python');

Blockly.Python.INDENT = '  ';  // 19/06/06

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
    'Blockly,' +  
    'auto,break,case,char,const,continue,default,do,double,else,enum,extern,for,goto,if,int,long,register,return,short,signe,sizeof,static,switch,typedef,union,unsigned,void,volatile,while');

/**
 * Order of operation ENUMs.
 */
Blockly.Python.ORDER_ATOMIPython = 0;           // 0 "" ...
Blockly.Python.ORDER_MEMBER = 1.2;         // . -> []
Blockly.Python.ORDER_FUNPythonTION_PythonALL = 2;    // ()
Blockly.Python.ORDER_INPythonREMENT = 3;        // ++
Blockly.Python.ORDER_DEPythonREMENT = 3;        // --
Blockly.Python.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.Python.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.Python.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.Python.ORDER_LOGIPythonAL_NOT = 4.4;    // !
Blockly.Python.ORDER_VOID = 4.6;           // void
Blockly.Python.ORDER_DIVISION = 5.1;       // /
Blockly.Python.ORDER_MULTIPLIPythonATION = 5.2; // *
Blockly.Python.ORDER_MODULUS = 5.3;        // %
Blockly.Python.ORDER_SUBTRAPythonTION = 6.1;    // -
Blockly.Python.ORDER_ADDITION = 6.2;       // +
Blockly.Python.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.Python.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.Python.ORDER_EQUALITY = 9;         // == != === !==
Blockly.Python.ORDER_BITWISE_AND = 10;     // &
Blockly.Python.ORDER_BITWISE_XOR = 11;     // ^
Blockly.Python.ORDER_BITWISE_OR = 12;      // |
Blockly.Python.ORDER_LOGIPythonAL_AND = 13;     // &&
Blockly.Python.ORDER_LOGIPythonAL_OR = 14;      // ||
Blockly.Python.ORDER_PythonONDITIONAL = 15;     // ?:
Blockly.Python.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.Python.ORDER_PythonOMMA = 17;           // ,
Blockly.Python.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Python.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Python.ORDER_FUNPythonTION_PythonALL, Blockly.Python.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Python.ORDER_FUNPythonTION_PythonALL, Blockly.Python.ORDER_FUNPythonTION_PythonALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_FUNPythonTION_PythonALL],
  // !(!foo) -> !!foo
  [Blockly.Python.ORDER_LOGIPythonAL_NOT, Blockly.Python.ORDER_LOGIPythonAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Python.ORDER_MULTIPLIPythonATION, Blockly.Python.ORDER_MULTIPLIPythonATION],
  // a + (b + c) -> a + b + c
  [Blockly.Python.ORDER_ADDITION, Blockly.Python.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Python.ORDER_LOGIPythonAL_AND, Blockly.Python.ORDER_LOGIPythonAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Python.ORDER_LOGIPythonAL_OR, Blockly.Python.ORDER_LOGIPythonAL_OR]
];

/**
 * リストとテキストの1と0の間のインデックス付けを切り替えることができます。
 * デフォルトでは1つです。
 */
Blockly.Python.ONE_BASED_INDEXING = true;

/**
 * 変数名のデータベースを初期化する。
 * @param {！Blockly.Workspace} workspaceコードを生成するためのワークスペース。
 */
Blockly.Python.init = function(workspace) {
  // コードの前に印刷される定義の辞書を作成します。
  Blockly.Python.definitions_ = Object.create(null);
  // 定義に必要な関数名をマッピングするディクショナリを作成する_
  //（ユーザー関数との衝突を避けるために）実際の関数名に変換します。
  Blockly.Python.functionNames_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  if (variables.length) {
    for (var i = 0; i < variables.length; i++) {
      defvars[i] = Blockly.Python.variableDB_.getName(variables[i],
          Blockly.Variables.NAME_TYPE);
    }
    Blockly.Python.definitions_['variables'] = 'int ' + defvars.join(', ') + '';  //2017/02/05  コメントアウト解除
  }
  //Blockly.Python.definitions_['header_container_c'];  // 2017/11/15  追加
};

/**
 * 生成されたコードの前に変数定義を追加します。
 * @param {string}コード生成されたコード。
 * @return {string}完了したコード。
 */
Blockly.Python.finish = function(code) {
 // 定義辞書をリストに変換します。
  var definitions = [];
  for (var name in Blockly.Python.definitions_) {
    definitions.push(Blockly.Python.definitions_[name]);
  }
 // 一時的なデータを整理します。
  delete Blockly.Python.definitions_;
  delete Blockly.Python.functionNames_;
  Blockly.Python.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
  * 裸の値は、接続されていない出力を持つトップレベルのブロックです
  * 何でも。 これを法的にするには、後続のセミコロンが必要です。
  * @param {string} line生成されたコードの行。
  * @return {string}コードの合法的な行。
 */
Blockly.Python.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
  * 適切にエスケープされたPython文字列として文字列をエンコードします。
  * 引用符。
  * @param {string} stringエンコードするテキスト。
  * @return {string} Python文字列です。
  * @private
 */
Blockly.Python.quote_ = function(string) {
  // Googleのスタイルガイドで推奨されているのでgoog.string.quoteを使用できません
  // JS文字列リテラルは一重引用符を使用します。
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
  * ブロックからPythonを生成するための共通タスク。
  * 指定されたブロックと接続された値ブロックのコメントを処理します。
  * このブロックに続くすべての文を呼び出します。
  * @param {！Blockly.Block}ブロック現在のブロック。
  * @param {string} codeこのブロック用に作成されたPythonコード。
  * @return {string}コメントと後続のブロックが追加されたPythonコード。
  * @private
 */
Blockly.Python.scrub_ = function(block, code) {
  var commentCode = '';
  // インラインでないブロックのコメントのみを収集します。
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // このブロックのコメントを収集します。
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Python.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // 関数コメントにコメントブロックを使用する.
        commentCode += '/**\n' +
                       Blockly.Python.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.Python.prefixLines(comment + '\n', '// ');
      }
    }
    //すべての値引数のコメントを収集します。
    //ネストしたステートメントのコメントを収集しない。
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
  * プロパティを取得し、インデックス作成を考慮しながら値を調整します。
  * @param {！Blockly.Block} blockブロックです。
  * @param {string} atId取得する要素のプロパティID。
  * @param {number =} opt_delta追加する値。
  * @param {boolean =} opt_negate値を否定するかどうかを指定します。
  * @param {number =} opt_orderこの値に作用する最も高い順位。
  * @return {文字列|数値}
 */
Blockly.Python.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Python.ORDER_NONE;
  if (Blockly.Python.ONE_BASED_INDEXING) {
    delta--;
  }
  var defaultAtIndex = Blockly.Python.ONE_BASED_INDEXING ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Python.valueToCode(block, atId,
        Blockly.Python.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Python.valueToCode(block, atId,
        Blockly.Python.ORDER_SUBTRAPythonTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Python.valueToCode(block, atId,
        Blockly.Python.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Python.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // インデックスが裸の数値の場合は、今すぐ調整します。
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // インデックスが動的な場合は、コードで調整します。
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Python.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Python.ORDER_SUBTRAPythonTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Python.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
