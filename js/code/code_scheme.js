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
var cls, print;

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
    var code = Blockly.Scheme.workspaceToCode(Code.workspace);

    var outputField = document.getElementById("bs-console");
    cls = function () {
    	outputField.innerHTML = "";
    };

    print = function (str) {
      outputField.insertAdjacentHTML('beforeend', str.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"));
      outputField.insertAdjacentHTML('beforeend', "<br />");
    };

    var biwascheme = new BiwaScheme.Interpreter(function (e, state) {
      outputField.insertAdjacentHTML('beforeend', e.message.toString().replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"));
      outputField.insertAdjacentHTML('beforeend', "<br />");
    });
    var onError = function (e) {
      console.error(e);
    }
    var biwa = new BiwaScheme.Interpreter(onError)
    biwa.evaluate(code, function (result) {
      outputField.insertAdjacentHTML('beforeend', result.toString().replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"));
      outputField.insertAdjacentHTML('beforeend', "<br />");
    });
  }
};

window.addEventListener("load", function () {
  document.getElementById("clearButton").addEventListener("click", function () {
    document.getElementById("bs-console").innerHTML = "";
  })
});

function languageMenu() {

}

// Load the Code demo's language strings.
// document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="js/msg/scheme/' + Code.LANG + '.js"></script>\n');
