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
    `
    `;
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

  if (select == 4 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defreturn_statement_where" id="w@DU[ASOQ]ddVO6zd/$W" x="131" y="92">
    <mutation statements="false">
      <arg name="引数1"></arg>
    </mutation>
    <field name="NAME">foo</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="DELTA">
      <block type="controls_if_haskell" id="]{(#f|MdJL(iYJb8_47a">
        <mutation elseif="2"></mutation>
        <value name="IF0">
          <block type="logic_compare" id="@vb$16Odq)ZBc,sXjN3~">
            <field name="OP">GT</field>
            <value name="A">
              <block type="variables_get" id="T)K27!#)dU@(!JR$n$M">
                <field name="VAR">i</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="q@eVtwDjqKH(hIM:[JQb">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <value name="DO0">
          <block type="procedures_call2" id="#k_axJXvI7sj;D2a3g}*">
            <mutation name="square">
              <arg name="引数1"></arg>
            </mutation>
            <value name="ARG0">
              <block type="var_arithmetic" id="92eBI;llfhGTcly9zgd?">
                <field name="OP">ADD</field>
                <value name="A">
                  <block type="variables_get" id=".pMg4216BsM-DtoU195U">
                    <field name="VAR">i</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number" id="CF,}E,Xh*)%+R]c^!0UU">
                    <field name="NUM">1</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <value name="IF1">
          <block type="logic_compare" id="9DW@}JC](}1Q+hI8}/o%">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="variables_get" id="]JmX{yPZl#t+9x,L_et">
                <field name="VAR">i</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="N^Re7tOS,Y)UY{$R0jmF">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <value name="DO1">
          <block type="procedures_call2" id="UgOcMWcuhJLoS=BOquH1">
            <mutation name="square">
              <arg name="引数1"></arg>
            </mutation>
            <value name="ARG0">
              <block type="math_number" id="g#A(!hu7/LaFA#Pq^3=s">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <value name="IF2">
          <block type="logic_compare" id="|oodv9}5L_XiN)V9Zgdo">
            <field name="OP">LT</field>
            <value name="A">
              <block type="variables_get" id=",-(oi}VQ06Om|+;P1-D">
                <field name="VAR">i</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="9:nSM0R-tSZ=onEZE72">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <value name="DO2">
          <block type="procedures_call2" id="~|{#mdBc0%5}-PPxTZm">
            <mutation name="square">
              <arg name="引数1"></arg>
            </mutation>
            <value name="ARG0">
              <block type="var_arithmetic" id="Td*AZ0H.?5y*0xV^%#T!">
                <field name="OP">MINUS</field>
                <value name="A">
                  <block type="variables_get" id="7G8*#yaO!lNOx^N2F19}">
                    <field name="VAR">i</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number" id="-b|IT)9#Pjc(n]6$ptXm">
                    <field name="NUM">1</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
      </block>
    </statement>
    <statement name="WHERE">
      <block type="procedures_defreturn" id="|-mfHqn1!l|(hhU2EeH0">
        <mutation statements="false">
          <arg name="引数1"></arg>
        </mutation>
        <field name="NAME">square</field>
        <comment pinned="false" h="80" w="160">この関数の説明…</comment>
        <value name="DELTA">
          <block type="var_arithmetic" id="Gk#!pZSwU:(WGf%(nc{3">
            <field name="OP">MULTIPLY</field>
            <value name="A">
              <block type="variables_get" id="8Ual}Po.f-,NMF#Tdef!">
                <field name="VAR">n</field>
              </block>
            </value>
            <value name="B">
              <block type="variables_get" id="Xy^wj]6=jADa6jCHJ{S{">
                <field name="VAR">n</field>
              </block>
            </value>
          </block>
        </value>
        <value name="ARG0">
          <block type="variables_get" id="_P^Q?dH;-eA^e[]1oa;2">
            <field name="VAR">n</field>
          </block>
        </value>
      </block>
    </statement>
    <value name="ARG0">
      <block type="variables_get" id="@q:t+/B]kwK.+%,n?Z.j">
        <field name="VAR">i</field>
      </block>
    </value>
  </block>
  <block type="procedures_defreturn" id="(~.8+YAP=y]t74V35*/M" x="732" y="428">
    <mutation>
      <arg name="引数1"></arg>
    </mutation>
    <field name="NAME">square</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
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
