/**
19/06/06 新バージョンに修正
 */
'use strict';

/* common2.js の記述を上書き、common2.js にも必要 */
/** ↓　言語切り替えを↓*/
Code.LANGUAGE_NAME['grammar'] = 'Haskell表記';

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['Blocks', 'Haskell', 'Result', 'Xml'];
Code.selected = 'Blocks';

/**
 * Populate the currently selected pane with content generated from the blocks.
 */

var compilerUrl = "http://platy.eng.kagawa-u.ac.jp/WappenWeb/HasteCompiler?ajax=true";

Code.renderContent = function() {
  var content = document.getElementById('content' + Code.selected);
  // Initialize the pane.
  if (content.id == 'contentXml') {
    var xmlTextarea = document.getElementById('contentXml');
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'contentHaskell') {
    var code = Blockly.Haskell.workspaceToCode(Code.workspace);
    content.textContent = code;
    // if (typeof PR.prettyPrintOne == 'function') {
    //   code = content.textContent;
    //   code = PR.prettyPrintOne(code, 'js');
    //   content.innerHTML = code;
    // }
  }　else if (content.id == 'contentResult') {
    var source = Blockly.Haskell.workspaceToCode(Code.workspace);
    let name   = "Main.hs";
    let file   = new File([source], name);
    var formData = new FormData();
    formData.append(name, file);
    document.getElementById("wl_ajax_loader").style.display = 'block';
    $.ajax({
      url: compilerUrl
      , type: "POST"
      , processData: false
      , contentType: false
      , headers: { 'X-Requested-With': 'XMLHttpRequest' } // CORS ではデフォルトではつかない
      , data: formData
    }).done(function (data) {
      var hinit = document.getElementById("extra-inputs").value;
      data = hasteHack(hinit, data);
      var global = window;
      eval(data + "\n" + "hasteMain();");
      document.getElementById("wl_ajax_loader").style.display = 'none';
    }).fail(function (msg) {
      var original = msg.responseJSON.message;
      // remove a message mysterious for learners
      original = original.replace(/hastec: \w+(\.\w*)?: removeLink: does not exist \(No such file or directory\)/, "")
      $document.getElementById("result").value = original;
      document.getElementById("wl_ajax_loader").style.display = 'none';
    });
  }
};

window.addEventListener("load", function () {
  document.getElementById("clearButton").addEventListener("click", function () {
    document.getElementById("result").value = "";
  })
});

// 18/05/24 追加
function languageMenu() {
  /*
//  console.log("languageMenu");
  var xmlDom  = Blockly.Xml.workspaceToDom(Code.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  localStorage.setItem('BlocksStatus_Haskell', xmlText); 
  */
  /*
  var BlocksStatus = localStorage.getItem('BlocksStatus', xmlText); 
  xmlDom = Blockly.Xml.textToDom(BlocksStatus);
  Blockly.Xml.domToWorkspace(xmlDom, workspace);
  console.log(BlocksStatus);
  */
}

// Load the Code demo's language strings.
//document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="js/msg/haskell/' + Code.LANG + '.js"></script>\n');
