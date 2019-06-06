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
Code.TABS_ = ['Blocks', 'Haskell', 'Xml'];
Code.selected = 'Blocks';

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
 
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
    if (typeof PR.prettyPrintOne == 'function') {
      code = content.textContent;
      code = PR.prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  }
};

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
