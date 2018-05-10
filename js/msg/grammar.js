// This file was automatically generated.  Do not modify.
/*
18/05/08 Flexの正規表現に対応
*/
'use strict';

goog.provide('Blockly.Msg.code');

goog.require('Blockly.Msg');

var MSG = {
  title: "コード",
  blocks: "ブロック",
  linkTooltip: "ブロックの状態を保存してリンクを取得します。",
  runTooltip: "ブロックで作成したプログラムを実行します。",
  badCode: "プログラムのエラー:\n%1",
  timeout: "命令の実行回数が制限値を超えました。",
  trashTooltip: "すべてのブロックを消します。",
  catLogic: "論理",
  catLoops: "繰り返し",
  catMath: "数学",
  catText: "テキスト",
  catLists: "リスト",
  catColour: "色",
  catVariables: "変数",
  catFunctions: "関数",
  listVariable: "リスト",
  textVariable: "テキスト",
  httpRequestError: "ネットワーク接続のエラーです。",
  linkAlert: "ブロックの状態をこのリンクで共有できます:\n\n%1",
  hashError: "すみません。「%1」という名前のプログラムは保存されていません。",
  xmlError: "保存されたファイルを読み込めませんでした。別のバージョンのブロックリーで作成された可能性があります。",
  badXml: "XML のエラーです:\n%1\n\nXML の変更をやめるには「OK」、編集を続けるには「キャンセル」を選んでください。"
};

/** @export */ Blockly.Msg.ADD_COMMENT = "コメントを追加";
/** @export */ Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = "Can't delete the variable '%1' because it's part of the definition of the function '%2'";  // untranslated
/** @export */ Blockly.Msg.CHANGE_VALUE_TITLE = "値を変える：";

// 正規表現
Blockly.Msg.RE_text0 = "";
Blockly.Msg.RE_text = "";
Blockly.Msg.RE_any_one_left = "[";
Blockly.Msg.RE_any_one_right = "]";
Blockly.Msg.RE_not_any_one_left = "[^";
Blockly.Msg.RE_not_any_one_right = "]";
Blockly.Msg.RE_from_to_left = "[";
Blockly.Msg.RE_from_to_middle = "-";
Blockly.Msg.RE_from_to_right = "]";
Blockly.Msg.RE_anything = ".";
Blockly.Msg.RE_new_line = "\\n";
Blockly.Msg.RE_tab = "\\t";
Blockly.Msg.RE_repetition_0up = "*";
Blockly.Msg.RE_repetition_1up = "+";
Blockly.Msg.RE_repetition_0or1 = "?";
// 関数
Blockly.Msg.yylex = "int main (void) { return yylex(); }";
Blockly.Msg.printf_left = "printf(\"";
Blockly.Msg.printf_right = "\");";
Blockly.Msg.putchar_left = "putchar(\'";
Blockly.Msg.putchar_right = "\');";
Blockly.Msg.echo = "ECHO;";

/** @export */ Blockly.Msg.MATH_HUE = "230";
/** @export */ Blockly.Msg.LOOPS_HUE = "120";
/** @export */ Blockly.Msg.LISTS_HUE = "260";
/** @export */ Blockly.Msg.LOGIC_HUE = "210";
/** @export */ Blockly.Msg.VARIABLES_HUE = "330";
/** @export */ Blockly.Msg.TEXTS_HUE = "160";
/** @export */ Blockly.Msg.PROCEDURES_HUE = "290";
/** @export */ Blockly.Msg.COLOUR_HUE = "20";