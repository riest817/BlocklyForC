/*
19/06/11 flex.js を参考に新規作成
*/

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
  localStorage.setItem('BlocksStatus_Prolog', defaultXml);  // 18/06/12 
}


window.addEventListener("load", () => {
  let samples = document.getElementById("samples");
  samples.addEventListener("change", () => {
    // var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
    // if (!q) return;
    var name = samples.value.split(/\s+/)[0];
    fetch("Samples/prolog/" + name + ".xml")
      .then(response => {
        response.text().then(text => {
          let xmlDom = Blockly.Xml.textToDom(text);
          if (xmlDom) {
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
          }
        });
      });
  });
  var names = [
    "tokugawa"
    , "append"
  ];
  for (let nm of names) {
    let node = document.createElement("option");
    node.innerText = nm;
    samples.appendChild(node);
  }

  samples.dispatchEvent(new Event("change"));
})
