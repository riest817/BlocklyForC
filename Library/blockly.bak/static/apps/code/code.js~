/**
 * Blockly Apps: Code
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code application.
 * @author fraser@google.com (Neil Fraser)
 */

// Supported languages.
BlocklyApps.LANGUAGES = ['en', 'de', 'hu', 'vi', 'zh-tw'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');




/**
 * Create a namespace for the application.
 */
var Code = {};


Code.MAX_LEVEL = 10;
Code.LEVEL = BlocklyApps.getNumberParamFromUrl('level', 1, Code.MAX_LEVEL);
Code.MAX_BLOCKS = [undefined, // Level 0.
    Infinity, Infinity, 2, 5, 5, 5, 5, 10, 7, 10][Code.LEVEL];

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'xml'];

Code.selected = 'blocks';

//capacity
//Blockly.maxBlocks = 10;

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */



Code.tabClick = function(id) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BlocklyApps.getMsg('Code_badXml').replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }


  // Deselect all tabs and hide all panes.
  for (var x in Code.TABS_) {
    var name = Code.TABS_[x];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + Code.selected).style.visibility =
      'visible';
  Code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    var code = Blockly.JavaScript.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_python') {
    code = Blockly.Python.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'py');
      content.innerHTML = code;
    }
  }
};



/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.isRtl();
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('content_blocks'),
      {path: '../../',
       rtl: rtl,
       maxBlocks: 10,
       toolbox: toolbox});

  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = BlocklyApps.getBBox_(container);
    for (var x in Code.TABS_) {
      var el = document.getElementById('content_' + Code.TABS_[x]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.Toolbox.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  Code.tabClick('tab_' + Code.selected);
  Blockly.fireUiEvent(window, 'resize');

  BlocklyApps.bindClick('trashButton',
      function() {Code.discard(); Code.renderContent();});
  BlocklyApps.bindClick('runButton', Code.runJS);

  if (Code.LEVEL == 1 ) {
    var defaultXml =
    '<xml>' +
    '<block type="quiz_start_main" x="0" y="0">' +
      '<statement name="DO">' +
        '<block type="quiz_declaration_n">' +
          '<next>' +
            '<block type="quiz_declaration1_def">' +
              '<next>' +
                '<block type="quiz_process_a">' +
                  '<next>' +
                    '<block type="quiz3_for">' +
                      '<statement name="DO">' +
                        '<block type="quiz_frame">' +
                          '<statement name="DO">' +
                            '<block type="quiz_printf2_pre"></block>' +
                          '</statement>' +
                        '</block>' +
                      '</statement>' +
                    '</block>' +
                  '</next>' +
                '</block>' +
              '</next>' +
            '</block>' +
          '</next>' +
        '</block>' +
      '</statement>' +
    '</block>' +
  '</xml>';
  BlocklyApps.loadBlocks(defaultXml);
  }

  if (Code.LEVEL == 2 ) {
    var defaultXml =
      '<xml>' +
    '<block type="quiz_start_main" x="0" y="0">' +
      '<statement name="DO">' +
        '<block type="quiz_declaration1_def">' +
          '<next>' +
            '<block type="quiz_process_a">' +
              '<next>' +
                '<block type="quiz1_for">' +
                  '<title name="option">&gt; 5</title>' +
                  '<statement name="DO">' +
                    '<block type="quiz_frame">' +
                      '<statement name="DO">' +
                        '<block type="quiz_printf_i"></block>' +
                      '</statement>' +
                    '</block>' +
                  '</statement>' +
                '</block>' +
              '</next>' +
            '</block>' +
          '</next>' +
        '</block>' +
      '</statement>' +
    '</block>' +
      '</xml>';
  BlocklyApps.loadBlocks(defaultXml);
}
    function onchange() {
      document.getElementById('capacity').innerHTML = Blockly.mainWorkspace.remainingCapacity();
    }

    Blockly.addChangeListener(onchange);
  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};


if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Code.init);
}

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function() {

//Code.congratulations();
    
//      document.getElementById('capacity').innerHTML = Blockly.mainWorkspace.remainingCapacity();
alert(Blockly.mainWorkspace.remainingCapacity());
 var c0de = Blockly.JavaScript.workspaceToCode();
 //var judg = '#include  <stdio.h>\n\n' + 
             'int main(void)\n' +
             '{\n' +
             '  for ( i = 0; i > 5; i++ ) {\n' +
             '  }\n' + 
             '  return 0;\n' +
             '}\n';
  //window.alert(c0de);  
  //window.alert(judg);

  var ans = Code.decision(Code.LEVEL);
  //window.alert(ans);
  if ( c0de == ans ){
  Code.congratulations();  
  } else {
    Code.feild();
  }
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw BlocklyApps.getMsg('Code_timeout');
    }
  };
  var code = Blockly.JavaScript.workspaceToCode();
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
   // eval(code);      
  } catch (e) {
    alert(BlocklyApps.getMsg('Code_badCode').replace('%1', e));
  }
};


/**
 * code == Correct answer??
 */
Code.decision = function(page) {

 var answer;

 switch (page) {
   case 1:
     break;
   case 2:
     answer = "#include  <stdio.h>\n" +
              "\nint main(void)\n{\n" +
              "  int i;\n" +
              "  int num;\n" +
              "  int sum;\n" +
              "  int tmp;\n" +
              "  int arr[5] = {0};\n\n" +
              "  //----------------\n" +
              "  //  ProcessA\n" +
              "  //----------------\n" +
              "  for ( i = 0; i < 5; i++ ) {\n" +
              "      printf(\"%d\", i);\n  }\n" +
              "  return 0;\n}\n";
     break;
 }

 return answer;
}


Code.congratulations = function() {
  var content = document.getElementById('dialogDone');
  var buttonDiv = document.getElementById('dialogDoneButtons');
  buttonDiv.textContent = '';
  var style = {
    width: '40%',
    left: '30%',
    top: '5em'
  };

    var text = BlocklyApps.getMsg('Code_nextLevel')
        .replace('%1', Code.LEVEL + 1);                   //window open : Congratulations! Are you ready to proceed to level %1?  template.soyにて変更
    var cancel = document.createElement('button');
    cancel.appendChild(
        document.createTextNode(BlocklyApps.getMsg('dialogCancel')));
    cancel.addEventListener('click', BlocklyApps.hideDialog, true);
    cancel.addEventListener('touchend', BlocklyApps.hideDialog, true);
    buttonDiv.appendChild(cancel);

    var ok = document.createElement('button');
    ok.className = 'secondary';
    ok.appendChild(document.createTextNode(BlocklyApps.getMsg('dialogOk')));
    ok.addEventListener('click', Code.nextLevel, true);
    ok.addEventListener('touchend', Code.nextLevel, true);
    buttonDiv.appendChild(ok);

    BlocklyApps.showDialog(content, null, false, true, style,
        function() {
          document.body.removeEventListener('keydown',
              Code.congratulationsKeyDown_, true);
          });
    document.body.addEventListener('keydown',
        Code.congratulationsKeyDown_, true);
        
    document.getElementById('dialogDoneText').textContent = text;
};


/**
 * If the user preses enter, escape, or space, hide the dialog.
 * Enter and space move to the next level, escape does not.
 * @param {!Event} e Keyboard event.
 * @private
 */
Code.congratulationsKeyDown_ = function(e) {
  if (e.keyCode == 13 ||
      e.keyCode == 27 ||
      e.keyCode == 32) {
    BlocklyApps.hideDialog(true);
    e.stopPropagation();
    e.preventDefault();
    if (e.keyCode != 27) {
      Code.nextLevel();
    }
  }
};

/**
 * Go to the next level.
 */
Code.nextLevel = function() {
  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname +
      '?lang=' + BlocklyApps.LANG + '&level=' + (Code.LEVEL + 1) +
      '&skin=' + Code.SKIN_ID;
};


Code.feild = function() {
  var content = document.getElementById('dialogDone');
  var buttonDiv = document.getElementById('dialogDoneButtons');
  buttonDiv.textContent = '';
  var style = {
    width: '40%',
    left: '30%',
    top: '5em'
  };

    var text = "sorry";                   //window
    var cancel = document.createElement('button');
    cancel.appendChild(
        document.createTextNode(BlocklyApps.getMsg('dialogCancel')));
    cancel.addEventListener('click', BlocklyApps.hideDialog, true);
    cancel.addEventListener('touchend', BlocklyApps.hideDialog, true);
    buttonDiv.appendChild(cancel);


    BlocklyApps.showDialog(content, null, false, true, style,
        function() {
          document.body.removeEventListener('keydown',
              Code.congratulationsKeyDown_, true);
          });
    document.body.addEventListener('keydown',
        Code.congratulationsKeyDown_, true);
        
    document.getElementById('dialogDoneText').textContent = text;
};


/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('Code_discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};

