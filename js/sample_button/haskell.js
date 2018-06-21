// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  if (select == 1 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="main_haskell" id="Q91XB9TVwe{jcju~Wy;m" x="53" y="71">
    <value name="DO0">
      <block type="do_haskell" id="F]TQ=dabYR#lFdC$/BQ|">
        <statement name="DO0">
          <block type="output_text" id="%_#)K!u6+q!ZG11VZpzu">
            <field name="TEXT">Hello World!</field>
          </block>
        </statement>
      </block>
    </value>
  </block>
</xml>`;
  loadBlocks(defaultXml);
  }

  if (select == 2 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defreturn" id="x/0Ec8ZKq^9g/Fgc-$|Q" x="54" y="51">
    <mutation statements="false">
      <arg name="x"></arg>
      <arg name="[Integer]"></arg>
      <arg name="[Integer]"></arg>
    </mutation>
    <field name="NAME">deleteOne</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <value name="ARG1">
      <block type="lists_create_with" id="Ngey7eBf,^FGBlKUd.]Y">
        <mutation items="0"></mutation>
      </block>
    </value>
    <value name="DELTA">
      <block type="lists_create_with" id="]6:)]KX*T;)^bP4n|%jD">
        <mutation items="0"></mutation>
      </block>
    </value>
    <next>
      <block type="procedures_defreturn" id="6Zy-FSJ%.U?KJ,;QH25">
        <mutation statements="false">
          <arg name="x"></arg>
          <arg name="[Integer]"></arg>
          <arg name="[Integer]"></arg>
        </mutation>
        <field name="NAME">deleteOne</field>
        <comment pinned="false" h="80" w="160">この関数の説明…</comment>
        <value name="ARG0">
          <block type="variables_get" id=";|Gl8;IV4AjDMjvO#=sX">
            <field name="VAR">n</field>
          </block>
        </value>
        <value name="ARG1">
          <block type="lists_container" id="2a4=i*)HI=:#wBlAQXpO">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="variables_get" id="?;L/hD;;cDx#X2EBOcxB">
                <field name="VAR">x</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="variables_get" id="YZqQFZ!fg^z)+*psm7@9">
                <field name="VAR">xs</field>
              </block>
            </value>
          </block>
        </value>
        <value name="DELTA">
          <block type="controls_if_haskell" id="?j%,H;P?T3;Dv]Xz]cn~">
            <value name="IF">
              <block type="logic_compare" id="~?{)eZH9PW8D@d!5dUrk">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get" id="uElcQ=a{9w5nT~)e4qq+">
                    <field name="VAR">n</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get" id="4]!csc=$.a.$l.r_/@V4">
                    <field name="VAR">x</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="DO">
              <block type="variables_get" id="Eu+#d-umigJVj@GOq:7d">
                <field name="VAR">xs</field>
              </block>
            </value>
            <value name="ELSE">
              <block type="lists_container" id="SP:ETWv%Jn9PhPgJz7F%">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="variables_get" id="mWD#aP2O3L?$6AN1t7+P">
                    <field name="VAR">x</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="procedures_call2" id="r%QYuIT6-kQH:#g58{hO">
                    <mutation name="deleteOne">
                      <arg name="x"></arg>
                      <arg name="[Integer]"></arg>
                      <arg name="[Integer]"></arg>
                    </mutation>
                    <value name="ARG0">
                      <block type="variables_get" id="Gy6N1-!lvO.gAm@mP1TC">
                        <field name="VAR">n</field>
                      </block>
                    </value>
                    <value name="ARG1">
                      <block type="variables_get" id="wa5;{C*n:_:;,qT}msC(">
                        <field name="VAR">xs</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>`;
    loadBlocks(defaultXml);
  }
  
    if (select == 3 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defreturn" id="7%,)j)zv-gOerwzT8p*k" x="161" y="61">
    <mutation statements="false">
      <arg name="Integer"></arg>
      <arg name="[(Integer, Integer)]"></arg>
    </mutation>
    <field name="NAME">foo</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <value name="ARG0">
      <block type="variables_get" id="2Y+oG/+P6Fg3Ykr0QmG">
        <field name="VAR">n</field>
      </block>
    </value>
    <value name="DELTA">
      <block type="inner_table" id="c+?4QfeR#DS-LUN1Yl.y">
        <mutation items="0"></mutation>
        <value name="ADD0">
          <block type="lists_group" id="8%WketDZ.@$;T,vSJyD=">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="variables_get" id="7Cl114qQ%Gn?+N!XjH*">
                <field name="VAR">x</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="variables_get" id="g4^?*xuox;@U}!qS:8@]">
                <field name="VAR">y</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="ADD">
          <block type="bondage" id="$f{q@#[7bvQKk5q15/Vj">
            <field name="VAR">x</field>
            <value name="VALUE">
              <block type="lists_range" id="z-5WL3eC$1|g6w?lTyJc">
                <value name="ADD1">
                  <block type="math_number" id="N?h#5Mo!*j~q^U4h]n[,">
                    <field name="NUM">0</field>
                  </block>
                </value>
                <value name="ADD2">
                  <block type="variables_get" id="Mk|!7a:YLDS$}~IaZvQy">
                    <field name="VAR">n</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="bondage" id="%z^T*pPqLG1yc,v$_clq">
                <field name="VAR">y</field>
                <value name="VALUE">
                  <block type="lists_range" id="+mCg}y8tG/0C?IE/dka@">
                    <value name="ADD1">
                      <block type="variables_get" id="@*/o#n[w0Qg|eqw$)OwR">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="ADD2">
                      <block type="variables_get" id="8nr1.MZ^!%lG7pi7@5Q">
                        <field name="VAR">n</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </value>
  </block>
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
  localStorage.setItem('BlocksStatus_Haskell', defaultXml);  // 18/06/12 
};
