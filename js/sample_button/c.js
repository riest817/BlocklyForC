// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  if (select == 1 ) {
    var defaultXml =
    '<xml>' +
      '<block type="procedures_defnoreturn" x="10" y="10">' +
        '<field name="NAME">main</field>' +
        '<comment pinned="false" h="80" w="160">サンプル1</comment>' +
        '<statement name="STACK">' +
          '<block type="output_text">' +
            '<field name="TEXT">Hello World!</field>' +
          '</block>' +
        '</statement>' +
      '</block>' +
    '</xml>';
  loadBlocks(defaultXml);
  }

  if (select == 2 ) {
    var defaultXml =
    `<xml>
    <block type="output_text" x="0" y="0">
    <field name="TEXT">aaaa</field>
    </block>
    </xml>`;
    loadBlocks(defaultXml);
  }
  
    if (select == 3 ) {
    var defaultXml =
    '<xml>'+
    '<block type="procedures_defreturn" x="10" y="10">'+
    '<mutation>'+
    '<arg name="num">'+
    '</arg>'+
    '</mutation>'+
    '<field name="NAME">main</field>'+
    '<comment pinned="false" h="80" w="160">sample3</comment>'+
    '<statement name="STACK">'+
    '<block type="controls_if">'+
    '<mutation elseif="1" else="1"></mutation>'+
    '<value name="IF0">'+
    '<block type="logic_compare">'+
            '<field name="OP">EQ</field>'+
            '<value name="A">'+
              '<block type="variables_get">'+
                '<field name="VAR">num</field>'+
              '</block>'+
            '</value>'+
            '<value name="B">'+
              '<block type="math_number">'+
                '<field name="NUM">0</field>'+
              '</block>'+
            '</value>'+
          '</block>'+
        '</value>'+
        '<statement name="DO0">'+
          '<block type="output_text">'+
            '<field name="TEXT">Good morinig！</field>'+
          '</block>'+
        '</statement>'+
        '<value name="IF1">'+
          '<block type="logic_compare">'+
            '<field name="OP">EQ</field>'+
            '<value name="A">'+
              '<block type="variables_get">'+
                '<field name="VAR">num</field>'+
              '</block>'+
            '</value>'+
            '<value name="B">'+
              '<block type="math_number">'+
                '<field name="NUM">1</field>'+
              '</block>'+
            '</value>'+
          '</block>'+
        '</value>'+
        '<statement name="DO1">'+
          '<block type="output_text">'+
            '<field name="TEXT">Hello</field>'+
          '</block>'+
        '</statement>'+
        '<statement name="ELSE">'+
          '<block type="output_text">'+
            '<field name="TEXT">Good evening</field>'+
          '</block>'+
        '</statement>'+
      '</block>'+
    '</statement>'+
    '<value name="RETURN">'+
      '<block type="math_number">'+
        '<field name="NUM">0</field>'+
      '</block>'+
    '</value>'+
  '</block>';
    loadBlocks(defaultXml);
  }     
}

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
};
