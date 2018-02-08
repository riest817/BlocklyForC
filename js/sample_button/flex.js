// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  if (select == 1 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="first_flex" id="SG:Mn|5h/A?r2e!lv3j" x="44" y="54">
    <statement name="DO1">
      <block type="regular_expression_connection" id="OsV-gp/_bOkJIa:E@[Dh">
        <value name="IF">
          <block type="RE_connection" id="3*pT1U{WH!-?}-sE$A*L">
            <value name="A">
              <block type="RE_any_one" id="rgk$JY%*Vb:b}G?Da%N">
                <field name="TEXT">hH</field>
              </block>
            </value>
            <value name="B">
              <block type="RE_text0" id="$a1INH(%|DjF|wNjYg%.">
                <field name="TEXT">ello</field>
              </block>
            </value>
          </block>
        </value>
        <value name="THEN">
          <block type="output_dropdown" id="9KB{LYL]}X!c+LL9WcV/">
            <field name="TYPE">printf</field>
            <field name="TEXT">Bon Jour</field>
          </block>
        </value>
        <next>
          <block type="regular_expression_connection" id=".7khUv=vh2Q377vY!#C=">
            <value name="IF">
              <block type="RE_anything" id="?iMMA;lBx9WbvJy+To^h"></block>
            </value>
            <value name="THEN">
              <block type="echo" id="x^qHlk/xX7cN#APkK]j~"></block>
            </value>
          </block>
        </next>
      </block>
    </statement>
    <statement name="DO2">
      <block type="yylex" id="UpHGLmuvDxh64unoq"></block>
    </statement>
  </block>
</xml>`;
  loadBlocks(defaultXml);
  }

  if (select == 2 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="first_flex" id="gmZv+)E_uN3;~J7v{ps." x="58" y="44">
    <statement name="DO1">
      <block type="regular_expression_connection" id="V~$q#AR9j_?bj;h2!3eL">
        <value name="IF">
          <block type="RE_connection" id="321wL#pi5suX/pkMf$DN">
            <value name="A">
              <block type="RE_any_one" id=")j%89p-P.7.aX1dq8AA~">
                <field name="TEXT">aA</field>
              </block>
            </value>
            <value name="B">
              <block type="RE_text" id="msR{K0sl0+FZV@$[2Krr">
                <field name="TEXT">loha</field>
              </block>
            </value>
          </block>
        </value>
        <value name="THEN">
          <block type="printf" id="5+%(uaRcqQzWC]L:~U%">
            <field name="TEXT">printf("namaste");</field>
          </block>
        </value>
        <next>
          <block type="regular_expression_connection" id="NGiDSMrri4-VeldClE:n">
            <value name="IF">
              <block type="RE_connection_or" id="yv=qBtz[0;|iXC}3k^:b">
                <value name="A">
                  <block type="RE_text" id="S+=-JWe|304P@vpBxw)M">
                    <field name="TEXT">.</field>
                  </block>
                </value>
                <value name="B">
                  <block type="RE_text" id="UB~^AMbF9dY/1Tf;O)w@">
                    <field name="TEXT">\n</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="THEN">
              <block type="printf" id="k|=e2H7nHU[$|~uY~oH_">
                <field name="TEXT">ECHO;</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
    <statement name="DO2">
      <block type="yylex" id="nUBsOLjn_Q:lg/y9tHY"></block>
    </statement>
  </block>
</xml>`;
    loadBlocks(defaultXml);
  }
  
    if (select == 3 ) {
    var defaultXml =
    `<xml>
    </xml>`;
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
