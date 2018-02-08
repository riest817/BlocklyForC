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
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="include_stdio_c" id="DV@7Al7R%K#96VjI8Py?" x="9" y="3"></block>
  <block type="procedures_defreturn" id="9bLh)y(q15+.VsW](=nh" x="11" y="59">
    <mutation>
      <arg name="a"></arg>
      <arg name="b"></arg>
      <arg name="c"></arg>
    </mutation>
    <field name="NAME">max3</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="variables_set" id="jK}-;8a]c+W2cEuEKJ]A">
        <field name="VAR">max</field>
        <value name="VALUE">
          <block type="variables_get" id="$~w#3TW%qbcBpvz*voKm">
            <field name="VAR">a</field>
          </block>
        </value>
        <next>
          <block type="controls_if" id="hgiVasU.Cs8]GzLX%H*{">
            <value name="IF0">
              <block type="logic_compare" id="4,sA[%%OY,2GW*fNOw">
                <field name="OP">GT</field>
                <value name="A">
                  <block type="variables_get" id="F#Q;ef]9nxkvRmRR.W@R">
                    <field name="VAR">b</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get" id="|m?_$7H:d}n;RzO?4a37">
                    <field name="VAR">max</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="variables_set" id="TV^Qeut^2V{OGA$Zv?G~">
                <field name="VAR">max</field>
                <value name="VALUE">
                  <block type="variables_get" id="hHP#=n:n_mtpFjEMtG">
                    <field name="VAR">b</field>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="controls_if" id=":48p%mZJ6PU?7}}Jts7h">
                <value name="IF0">
                  <block type="logic_compare" id="*5j#3Xu|nrqg6;c@Q$#w">
                    <field name="OP">GT</field>
                    <value name="A">
                      <block type="variables_get" id="eRAiK.FR]yVHb||,}7Un">
                        <field name="VAR">c</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get" id="+M%G*kB*,qKi7_KkBDE%">
                        <field name="VAR">max</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="variables_set" id="CWxz42Qd0hjOrO0%VCl3">
                    <field name="VAR">max</field>
                    <value name="VALUE">
                      <block type="variables_get" id="@bhHWT/Uj7i+6kTu+5f">
                        <field name="VAR">c</field>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="variables_get" id="/!JhB}j%H=.D0y(2Q+w:">
        <field name="VAR">max</field>
      </block>
    </value>
  </block>
  <block type="procedures_defreturn" id="iFZ(l_9N[~S;%;4yLyX6" x="21" y="318">
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="output_auto" id="}dso%zjEgSP+~UGuBD_5">
        <field name="TEXT">3つの変数を入力してください。</field>
        <next>
          <block type="output_auto" id="I:/XX|#{,jGfn1R;d~~d">
            <field name="TEXT">整数a：</field>
            <next>
              <block type="input_auto" id="P}U3|T{nj@VRZ4+!#Q#9">
                <field name="TEXT">%d</field>
                <value name="ADD0">
                  <block type="variables_get" id="OI|Fl@{j__|M]?ZG1I8">
                    <field name="VAR">a</field>
                  </block>
                </value>
                <next>
                  <block type="output_auto" id="{i}=3+ue)W262a0GnQf(">
                    <field name="TEXT">整数b：</field>
                    <next>
                      <block type="input_auto" id="hI)0[{(PbIreB,WXlGs0">
                        <field name="TEXT">%d</field>
                        <value name="ADD0">
                          <block type="variables_get" id="EdXS~$s~AB!{{wbfzbYv">
                            <field name="VAR">b</field>
                          </block>
                        </value>
                        <next>
                          <block type="output_auto" id="g#mCJSiND$K_h/$CR/l">
                            <field name="TEXT">整数c：</field>
                            <next>
                              <block type="input_auto" id="4eO3l=$Uwkp@]/%GpjI,">
                                <field name="TEXT">%d</field>
                                <value name="ADD0">
                                  <block type="variables_get" id="5]%@4OSOF{JA;t}_OAx,">
                                    <field name="VAR">c</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="output_auto" id="67.yuT_^p!A-x$b@v1EY">
                                    <field name="TEXT">最大値は%dです。</field>
                                    <value name="ADD0">
                                      <block type="procedures_callreturn" id="6z,;,~$%Sq_zh@B|!{y|">
                                        <mutation name="max3">
                                          <arg name="a"></arg>
                                          <arg name="b"></arg>
                                          <arg name="c"></arg>
                                        </mutation>
                                        <value name="ARG0">
                                          <block type="variables_get" id="8O=2:8hU^|[n]J7/FPni">
                                            <field name="VAR">a</field>
                                          </block>
                                        </value>
                                        <value name="ARG1">
                                          <block type="variables_get" id="J3GV0MWjR$up0[JlLL/">
                                            <field name="VAR">b</field>
                                          </block>
                                        </value>
                                        <value name="ARG2">
                                          <block type="variables_get" id="uDd2J!!]tKNc6MD=c-)n">
                                            <field name="VAR">c</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="math_number" id="MHh]3fD6~{JxRJ=Je[r:">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
</xml>`;
// ソケット付きの入力フォームの保存
  localStorage.setItem('P}U3|T{nj@VRZ4+!#Q#9', "%d"); 
  localStorage.setItem('hI)0[{(PbIreB,WXlGs0', "%d"); 
  localStorage.setItem('4eO3l=$Uwkp@]/%GpjI,', "%d"); 
  localStorage.setItem('67.yuT_^p!A-x$b@v1EY', "最大値は%dです。");
    loadBlocks(defaultXml);
  }
  
    if (select == 3 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="include_stdio_c" id="QfBu=ZEYMDO5Jt^CG0bt" x="9" y="3"></block>
  <block type="procedures_defnoreturn" id="NgG3s#eFPHvD,Vt1[?~y" x="23" y="44">
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="variables_set" id="Zg~:B*e%=,cnAuF}/kzr">
        <field name="VAR">year</field>
        <value name="VALUE">
          <block type="math_number" id="T^D1tk:bjOmhMxw^#s!">
            <field name="NUM">2018</field>
          </block>
        </value>
        <next>
          <block type="variables_set" id="DGRhE|htQ3,?qn:8Ic_}">
            <field name="VAR">month</field>
            <value name="VALUE">
              <block type="math_number" id=")oDP!$.f-7d6#ueNw4g_">
                <field name="NUM">2</field>
              </block>
            </value>
            <next>
              <block type="variables_set" id="A/joM~Nn;F0}d7d/?]9">
                <field name="VAR">date</field>
                <value name="VALUE">
                  <block type="math_number" id="AcCVAnes2iR]Pt7aS3eP">
                    <field name="NUM">15</field>
                  </block>
                </value>
                <next>
                  <block type="controls_whileUntil" id="NcEA@zEz{k7a#q4k^p_]">
                    <field name="MODE">WHILE</field>
                    <value name="BOOL">
                      <block type="logic_boolean" id="9Sdb@gI@SAj7s*$FTIXK">
                        <field name="BOOL">TRUE</field>
                      </block>
                    </value>
                    <statement name="DO">
                      <block type="output_auto" id="=Ymj0~#U4*XZ=hO^gUL">
                        <field name="TEXT">卒業論文の締切は%d年%d月%d日です。</field>
                        <next>
                          <block type="output_auto" id="#bpFQb5IBN_yo8Qy#Eqg">
                            <field name="TEXT">間に合いますか?(1:間に合う 2:間に合わない)</field>
                            <next>
                              <block type="input_auto" id="5v5L.T3,V_pAn|?!:yU3">
                                <field name="TEXT">%d</field>
                                <value name="ADD0">
                                  <block type="variables_get" id="CD;xx:^*dXVO7D0-18FI">
                                    <field name="VAR">answer</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="controls_if" id="a{Z,W1Z{U(5ULu;%xcom">
                                    <value name="IF0">
                                      <block type="logic_compare" id="fH?O#cKcO3(5{4Jy]fc">
                                        <field name="OP">EQ</field>
                                        <value name="A">
                                          <block type="variables_get" id="iS78+)2QV,5yU-b[Z5W2">
                                            <field name="VAR">answer</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="math_number" id="7TM+6m$q3Xe+UzW}enFH">
                                            <field name="NUM">1</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <statement name="DO0">
                                      <block type="controls_flow_statements" id="JH]y#U*O;?Qm5E*b]1:A">
                                        <field name="FLOW">BREAK</field>
                                      </block>
                                    </statement>
                                    <next>
                                      <block type="output_auto" id="J|(Vti/wV)ef?GCEgJkI">
                                        <field name="TEXT">もう一度聞きます。</field>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <next>
                      <block type="output_auto" id=",kEn*e}H(Yj3M4?vXqSF">
                        <field name="TEXT">そうです。間に合わせるのです。</field>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`;
// ソケット付きの入力フォームの保存
  localStorage.setItem('5v5L.T3,V_pAn|?!:yU3', "%d"); 
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
