/**
 2017/10/18 コメント一部日本語化
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
 * リストとテキストの1と0の間のインデックス付けを切り替えることができます。
 * デフォルトでは1つです。
 */
Blockly.C.ONE_BASED_INDEXING = true;

/**
 * 変数名のデータベースを初期化する。
 * @param {！Blockly.Workspace} workspaceコードを生成するためのワークスペース。
 */
Blockly.C.init = function(workspace) {
  // コードの前に印刷される定義の辞書を作成します。
  Blockly.C.definitions_ = Object.create(null);
  // 定義に必要な関数名をマッピングするディクショナリを作成する_
  //（ユーザー関数との衝突を避けるために）実際の関数名に変換します。
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
    //Blockly.C.definitions_['variables'] = 'int ' + defvars.join(', ') + ';';  2017/07/13  一旦、コメントアウト
  }
  //Blockly.C.definitions_['header_container_c'];  // 2017/11/15  追加
};

/**
 * 生成されたコードの前に変数定義を追加します。
 * @param {string}コード生成されたコード。
 * @return {string}完了したコード。
 */
Blockly.C.finish = function(code) {
 // 定義辞書をリストに変換します。
  var definitions = [];
  for (var name in Blockly.C.definitions_) {
    definitions.push(Blockly.C.definitions_[name]);
  }
 // 一時的なデータを整理します。
  delete Blockly.C.definitions_;
  delete Blockly.C.functionNames_;
  Blockly.C.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
  * 裸の値は、接続されていない出力を持つトップレベルのブロックです
  * 何でも。 これを法的にするには、後続のセミコロンが必要です。
  * @param {string} line生成されたコードの行。
  * @return {string}コードの合法的な行。
 */
Blockly.C.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
  * 適切にエスケープされたC文字列として文字列をエンコードします。
  * 引用符。
  * @param {string} stringエンコードするテキスト。
  * @return {string} C文字列です。
  * @private
 */
Blockly.C.quote_ = function(string) {
  // Googleのスタイルガイドで推奨されているのでgoog.string.quoteを使用できません
  // JS文字列リテラルは一重引用符を使用します。
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
  * ブロックからCを生成するための共通タスク。
  * 指定されたブロックと接続された値ブロックのコメントを処理します。
  * このブロックに続くすべての文を呼び出します。
  * @param {！Blockly.Block}ブロック現在のブロック。
  * @param {string} codeこのブロック用に作成されたCコード。
  * @return {string}コメントと後続のブロックが追加されたCコード。
  * @private
 */
Blockly.C.scrub_ = function(block, code) {
  var commentCode = '';
  // インラインでないブロックのコメントのみを収集します。
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // このブロックのコメントを収集します。
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.C.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // 関数コメントにコメントブロックを使用する.
        commentCode += '/**\n' +
                       Blockly.C.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.C.prefixLines(comment + '\n', '// ');
      }
    }
    //すべての値引数のコメントを収集します。
    //ネストしたステートメントのコメントを収集しない。
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
  * プロパティを取得し、インデックス作成を考慮しながら値を調整します。
  * @param {！Blockly.Block} blockブロックです。
  * @param {string} atId取得する要素のプロパティID。
  * @param {number =} opt_delta追加する値。
  * @param {boolean =} opt_negate値を否定するかどうかを指定します。
  * @param {number =} opt_orderこの値に作用する最も高い順位。
  * @return {文字列|数値}
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
    // インデックスが裸の数値の場合は、今すぐ調整します。
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // インデックスが動的な場合は、コードで調整します。
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
