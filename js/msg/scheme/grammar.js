// This file was automatically generated.  Do not modify.
/*
19/01/30 新規作成
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

// 制御

// 数

// リスト
Blockly.Msg.lists_container_head = "";
Blockly.Msg.lists_container_middle = ":";
Blockly.Msg.lists_connection_head = "";
Blockly.Msg.lists_connection_middle = "++";
Blockly.Msg.lists_create_with_head = "[";
Blockly.Msg.lists_create_with_empty = "[ ]";
Blockly.Msg.lists_create_with_middle = ",";
Blockly.Msg.lists_create_with_end = "]";

Blockly.Msg.lists_group_head = "(";
Blockly.Msg.lists_group_middle = ",";
Blockly.Msg.lists_group_end = ")";
Blockly.Msg.lists_range_head = "[";
Blockly.Msg.lists_range_middle = "..";
Blockly.Msg.lists_range_end = "]";
Blockly.Msg.lists_element_head = "";
Blockly.Msg.lists_element_middle = " !! ";
Blockly.Msg.lists_element_end = "";
Blockly.Msg.lists_length = "length%1";
Blockly.Msg.lists_isEmpty = "null%1";
// 変数

// 関数

// 標準関数

  /// 入出力処理
  Blockly.Msg.putStr_hs = "putStr";
  Blockly.Msg.putStrLn_hs = "putStrLn";

  /// リスト処理
  Blockly.Msg.length_hs = "length%1";
  Blockly.Msg.lines_hs = "lines%1";
  Blockly.Msg.unlines_hs = "unlines%1";
  Blockly.Msg.take_hs = "take%1%2";
  Blockly.Msg.reverse_hs = "reverse%1";
  Blockly.Msg.words_hs = "words%1";

  Blockly.Msg.length = "length";
  Blockly.Msg.lines = "lines";
  Blockly.Msg.unlines = "unlines";
  Blockly.Msg.take = "take";
  Blockly.Msg.reverse = "reverse";
  Blockly.Msg.words = "words";
  Blockly.Msg.concat = "concat";
  Blockly.Msg.replicate = "replicate";
  /// 高階関数処理
  Blockly.Msg.map = "map";
  Blockly.Msg.concatMap = "concatMap";
  /// パターンマッチ処理


// 出力
Blockly.Msg.output_text = "print";
Blockly.Msg.output_var = "print";
Blockly.Msg.output_var2 = "print";
Blockly.Msg.output_string = "";
