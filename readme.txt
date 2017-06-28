c.html にブロックを追加するときに書き換えるところ


・myCBlocks.js に新しいブロックの定義:（約212行目から）
    Blockly.Blocks['〜'] = { 〜 }
  を追加する。

・myCBlocks.js に新しいブロックが生成する C 言語のソース:（約518行目から）
    Blockly.C['〜'] = function(block) {
        〜
    }
  を追加する。

・c.html の
    <xml id="toolbox" style="display: none"> 〜 </xml>  （約115行目から）
  に新しいブロックに対応する <block 〜> 〜 </block> を追加する。 
 
