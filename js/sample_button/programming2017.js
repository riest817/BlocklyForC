// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  if (select == 1 ) {
    var defaultXml =
  `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="header_container_c" x="22" y="5">
    <statement name="CONTAINER">
      <block type="include_stdio_c" id="dP!O-uK0vWixmd)x~kKq"></block>
    </statement>
  </block>
  <block type="procedures_defreturn" id="4.S#j;1^6m=u.@9Ln0tp" x="24" y="83">
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">こちらは、List11-1の例題プログラムです。</comment>
    <statement name="STACK">
      <block type="variables_new_c" id="#BC03|h=[zxW{^%DuG!E">
        <field name="TYPE">int</field>
        <field name="VAR">no</field>
        <next>
          <block type="output_auto" id="uHXp^Nv/oW#vEhm,W[GH">
            <field name="TEXT">整数を入力してください：</field>
            <next>
              <block type="input_dropdown" id="pKLg(G?c468!Q8vjObE^">
                <field name="TYPE">int</field>
                <value name="B">
                  <block type="variables_get" id="mN{tXZNpkTn|AYpS9-rK">
                    <field name="VAR">no</field>
                  </block>
                </value>
                <next>
                  <block type="output_auto" id="KD3wa}F*+jazpXP3JS">
                    <field name="TEXT">あなたは%dと入力しましたね。</field>
                    <value name="ADD0">
                      <block type="variables_get" id="u;^D[M}6OzMm-lw01ZnB">
                        <field name="VAR">no</field>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="math_number" id="l~jP1^UOY1U^P:QQ{_f4">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
</xml>`;
  // データの保存
  //document.cookie = "KD3wa}F*+jazpXP3JS=" + "あなたは%dと入力しましたね。";    // 2017/10/31 追加
  localStorage.setItem('KD3wa}F*+jazpXP3JS', "あなたは%dと入力しましたね。");    // 2017/11/14 追加
  loadBlocks(defaultXml);
  }

  if (select == 2 ) {
    var defaultXml =
    '<xml>' +
    '<block type="output_text" x="0" y="0">' +
    '<field name="TEXT">aaaa</field>' +
    '</block>' +
    '</xml>';
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
