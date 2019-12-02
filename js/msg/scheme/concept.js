// This file was automatically generated.  Do not modify.
'use strict';

goog.provide('Blockly.Msg.pro');

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
Blockly.Msg.lists_container_head = "リスト表示:";
Blockly.Msg.lists_container_middle = "";
Blockly.Msg.lists_connection_head = "リスト連結:";
Blockly.Msg.lists_connection_middle = "";
Blockly.Msg.lists_create_with_head = "リスト作成:";
Blockly.Msg.lists_create_with_empty = "空リスト";
Blockly.Msg.lists_create_with_middle = "";
Blockly.Msg.lists_create_with_end = "";

Blockly.Msg.lists_group_head = "リストの組: ";
Blockly.Msg.lists_group_middle = "と";
Blockly.Msg.lists_group_end = "";
Blockly.Msg.lists_range_head = "リストの範囲: ";
Blockly.Msg.lists_range_middle = "から";
Blockly.Msg.lists_range_end = "";
Blockly.Msg.lists_element_head = "リスト";
Blockly.Msg.lists_element_middle = "から";
Blockly.Msg.lists_element_end = "番目の要素を取り出す";
Blockly.Msg.lists_length = "%1の長さ";
Blockly.Msg.lists_isEmpty = "%1が空";
// 変数

// 関数

// 標準関数

  /// 入出力処理
  Blockly.Msg.putStr_hs = "文字列出力";
  Blockly.Msg.putStrLn_hs = "文字列(改行)出力";

  /// リスト処理
  Blockly.Msg.length_hs = "リスト%1の長さ";
  Blockly.Msg.lines_hs = "文字列%1⇒リスト";
  Blockly.Msg.unlines_hs = "リスト%1⇒文字列";
  Blockly.Msg.take_hs = "%1個の要素をリスト%2から取り出す";
  Blockly.Msg.reverse_hs = "リスト%1の逆順";
  Blockly.Msg.words_hs = "文字列%1⇒単語リスト";

  Blockly.Msg.length = "リストの長さ";
  Blockly.Msg.lines = "文字列⇒リスト";
  Blockly.Msg.unlines = "リスト⇒文字列";
  Blockly.Msg.take = "要素をリストから取り出す";
  Blockly.Msg.reverse = "リストの逆順";
  Blockly.Msg.words = "文字列⇒単語リスト";
  Blockly.Msg.concat = "リストを一重減らす";
  Blockly.Msg.replicate = "複製関数";
  /// 高階関数処理
  Blockly.Msg.map = "リストに関数適用";
  Blockly.Msg.concatMap = "リストに関数適用してまとめる";

  /// パターンマッチ処理


// 出力
Blockly.Msg.output_text = "出力(文字列)";
Blockly.Msg.output_var = "出力(変数)";
Blockly.Msg.output_var2 = "出力(変数)";
Blockly.Msg.output_string = "テキスト出力";
