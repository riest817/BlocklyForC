// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof codepage == 'undefined') { var codepage = {}; }


codepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Code_badXml">Error parsing XML:\\n%1\\n\\nSelect \'OK\' to abandon your changes or \'Cancel\' to further edit the XML.</span><span id="Code_badCode">Program error:\\n%1</span><span id="Code_timeout">Maximum execution iterations exceeded.</span><span id="Code_discard">Delete all %1 blocks?</span><span id="quiz1_for"></span></div>';
};


codepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return codepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><table width="100%" height="100%" left=500px ><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Code</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr><tr><td colspan=2><table width="100%"><tr id="tabRow" height="1em"><td id="tab_blocks" class="tabon" onclick="Code.tabClick(this.id)">Blocks</td><td class="tabmin">&nbsp;</td><td id="tab_javascript" class="taboff" onclick="Code.tabClick(this.id)">Code</td><td class="tabmin">&nbsp;</td><td id="tab_xml" class="taboff" onclick="Code.tabClick(this.id)">XML</td><td class="tabmax"><button id="trashButton" class="notext" title="Discard all blocks."><img src=\'../../media/1x1.gif\' class="trash icon21"></button> <button id="linkButton" class="notext" title="Save and link to blocks."><img src=\'../../media/1x1.gif\' class="link icon21"></button> <button id="runButton" class="notext primary" title="Run the program defined by the blocks in the workspace."><img src=\'../../media/1x1.gif\' class="run icon21"></button></td></tr></table></td></tr><tr><td height="99%" colspan=2 id="content_area">' + codepage.toolbox(null, null, opt_ijData) + '</td></tr></table><div id="content_blocks" class="content"></div><pre id="content_javascript" class="content"></pre><textarea id="content_xml" class="content" wrap="off"></textarea>' + apps.dialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


codepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Start"><block type="start_main"></block><block type="quiz_start_main"></block></category><category name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block><block type="controls_switch"></block></category><category name="Loops"><block type="quiz1_for"></block><block type="quiz2_while"></block><block type="quiz3_for"></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">0</title></block></value><value name="TO"><block type="math_number"><title name="NUM">9</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_dowhile"></block><block type="controls_flow_statements"></block></category><category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Text"><block type="text"></block><block type="quiz_printf2"></block><block type="quiz_printf2_pre"></block><block type="quiz_printf3_for"></block><block type="quiz_process_a"></block><block type="quiz_frame"></block></category><category name="Variables"><block type="variables_dec"></block><block type="variables_get"></block><block type="variables_set"></block><block type="quiz_declaration1_def"></block></category><category name="Paint"><block type="paint_stroke"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="paint_strokeweight"><value name="WEIGHT"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="paint_fill"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="paint_line"><value name="X1"><block type="math_number"><title name="NUM">100</title></block></value><value name="Y1"><block type="math_number"><title name="NUM">100</title></block></value><value name="X2"><block type="math_number"><title name="NUM">200</title></block></value><value name="Y2"><block type="math_number"><title name="NUM">200</title></block></value></block><block type="paint_rect"><value name="X1"><block type="math_number"><title name="NUM">100</title></block></value><value name="Y1"><block type="math_number"><title name="NUM">100</title></block></value><value name="W"><block type="math_number"><title name="NUM">100</title></block></value><value name="H"><block type="math_number"><title name="NUM">50</title></block></value></block><block type="paint_ellipse"><value name="X1"><block type="math_number"><title name="NUM">100</title></block></value><value name="Y1"><block type="math_number"><title name="NUM">100</title></block></value><value name="W"><block type="math_number"><title name="NUM">100</title></block></value><value name="H"><block type="math_number"><title name="NUM">50</title></block></value></block><block type="paint_triangle"><value name="X1"><block type="math_number"><title name="NUM">100</title></block></value><value name="Y1"><block type="math_number"><title name="NUM">100</title></block></value><value name="X2"><block type="math_number"><title name="NUM">200</title></block></value><value name="Y2"><block type="math_number"><title name="NUM">100</title></block></value><value name="X3"><block type="math_number"><title name="NUM">150</title></block></value><value name="Y3"><block type="math_number"><title name="NUM">200</title></block></value></block></category></xml>';
};


codepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return codepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><div id="blockly"></div>';
};
