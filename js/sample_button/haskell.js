// 2017/10/19 新規作成

function loadBlocks(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
  localStorage.setItem('BlocksStatus_Haskell', defaultXml);  // 18/06/12 
}

window.addEventListener("load", () => {
  let samples = document.getElementById("samples");
  samples.addEventListener("change", () => {
    // var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
    // if (!q) return;
    var name = samples.value.split(/\s+/)[0];
    fetch("Samples/haskell/" + name + ".xml")
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
    "chap2"
    , "queen"
    , "sample1"
    , "sample3"
    , "sample4"
    , "sample5"
    , "sample6"
    , "sample7"
  ];
  for (let nm of names) {
    let node = document.createElement("option");
    node.innerText = nm;
    samples.appendChild(node);
  }

  samples.dispatchEvent(new Event("change"));
});