/**
19/06/11 code_flex.js を参考に新規作成
 */
'use strict';

/* common2.js の記述を上書き、common2.js にも必要 */
/** ↓　言語切り替えを↓*/
Code.LANGUAGE_NAME['grammar'] = 'Prolog表記';

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['Blocks', 'Prolog', 'Result', 'Xml'];
Code.selected = 'Blocks';

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
 
function cls() {
  document.getElementById("result").value = "";
}

function print(str) {
  document.getElementById("result").value += str;
}

var pat = /^\s*\?-(.*)\.\s*$/m;

Code.renderContent = function() {
  var content = document.getElementById('content' + Code.selected);
  // Initialize the pane.
  if (content.id == 'contentXml') {
    var xmlTextarea = document.getElementById('contentXml');
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'contentProlog') {
    var code = Blockly.Prolog.workspaceToCode(Code.workspace);
    content.textContent = code;
  } else if (content.id == 'contentResult') {
    var source = Blockly.Prolog.workspaceToCode(Code.workspace);
    var extra =  pat.exec(source)[1];
    source = source.replace(pat, '')
	           .replace(/:-\s*(\r?\n)/g, ':- ')
	           .replace(/,\s*(\r?\n)/g, ', ');
    console.log("source", source, "extra", extra);
    freeform(source, extra);
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
  localStorage.setItem('BlocksStatus_Prolog', xmlText); 
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
document.write('<script src="js/msg/prolog/' + Code.LANG + '.js"></script>\n');
