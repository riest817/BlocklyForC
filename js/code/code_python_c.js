/**
19/05/29 香川先生修正(新バージョン)
 */
'use strict';

/* common2.js の記述を上書き、common2.js にも必要 */
/** ↓　言語切り替えを↓*/
Code.LANGUAGE_NAME['grammar'] = '文法表記';

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['Blocks', 'Python', 'C', 'Xml'];
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
  } else if (content.id == 'contentPython') {
    var code = Blockly.Python.workspaceToCode(Code.workspace);
    content.textContent = code;
    if (typeof PR.prettyPrintOne == 'function') {
      code = content.textContent;
      code = PR.prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  } else if (content.id == 'contentC') {
    var code = Blockly.C.workspaceToCode(Code.workspace);
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
  localStorage.setItem('BlocksStatus_C', xmlText); 
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
document.write('<script src="js/msg/c/' + Code.LANG + '.js"></script>\n');
