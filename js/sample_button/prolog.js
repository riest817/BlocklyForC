﻿/*
19/06/11 flex.js を参考に新規作成
*/

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
//  workspace.clear();
  Code.workspace.clear();   // 18/05/16
  //window.location.reload(true); // 18/05/16

  if (select == 1 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }    

  if (select == 2 ) {
    var defaultXml =
    ``;
  loadBlocks(defaultXml);
  }

      if (select == 0 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }     

  
  if (select == 3 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }
  

  if (select == 5 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }  
  
}

function loadBlocks(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefoxは、sessionStorageにアクセスするときにSecurityErrorをスローすることがあります。
    // Firefoxを再起動するとこれが修正されるため、バグのように見えます。
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // 言語切り替えは、リロード中にブロックを保存します。
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // エディタをデフォルトの開始ブロックでロードします。
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // 保存されたブロックを別のスレッドに復元する
    // 初期化は失敗したロードの影響を受けません。
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
  localStorage.setItem('BlocksStatus_Flex', defaultXml);  // 18/06/12 
};