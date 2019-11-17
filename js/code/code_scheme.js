'use strict';

/* common2.js の記述を上書き、common2.js にも必要 */
/** ↓　言語切り替えを↓*/
Code.LANGUAGE_NAME['grammar'] = 'Scheme表記';

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['Blocks', 'Scheme', 'Result', 'Xml'];
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
  } else if (content.id == 'contentScheme') {
    var code = Blockly.Scheme.workspaceToCode(Code.workspace);
    content.textContent = code;
  } else if (content.id == 'contentResult') {
    var source = Blockly.Scheme.workspaceToCode(Code.workspace);
    let name   = "Main.scm";
 
  }
};

window.addEventListener("load", function () {
  document.getElementById("clearButton").addEventListener("click", function () {
    document.getElementById("result").value = "";
  })
});

function languageMenu() {

}

// Load the Code demo's language strings.
// document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="js/msg/scheme/' + Code.LANG + '.js"></script>\n');
