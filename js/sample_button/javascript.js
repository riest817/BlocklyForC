// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  Code.workspace.clear();   // 18/06/13
  window.location.reload(true); // 18/06/13
  if (select == 1 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defnoreturn" id="2Xf$039I(kA_Yl+rALG2" x="45" y="26">
    <mutation>
      <arg name="x"></arg>
    </mutation>
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="controls_repeat_ext" id="rSdjF55tW:Xyv,FFUiFl">
        <value name="TIMES">
          <shadow type="math_number" id="/e]:$4C^f.SJ]aOn2SC|">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <statement name="DO">
          <block type="output_auto" id="m?{.r:T+[,N9Sr:6]z#1">
            <field name="TEXT">Hello World</field>
          </block>
        </statement>
      </block>
    </statement>
  </block>
</xml>`;
  loadBlocks(defaultXml);
  }

  if (select == 2 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
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
  <block type="procedures_defreturn" id="}kFHYHwBVz[[#^jcmiJm" x="0" y="0">
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">九九</comment>
    <statement name="STACK">
      <block type="controls_for" id="O7r9?bPV[jz6EYVjKY(w">
        <field name="VAR">i</field>
        <value name="FROM">
          <shadow type="math_number" id="Lj[fR}1^!Tr|UjF2A?Pd">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number" id="_x(724*w]g^Ss*E7wCZ">
            <field name="NUM">9</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number" id="mSpSDoazLG-EAztplZQ">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <statement name="DO">
          <block type="controls_for" id="-{rZsPAV@1X+6BH;hL|:">
            <field name="VAR">j</field>
            <value name="FROM">
              <shadow type="math_number" id="]kvP52miMQ-**zs~dABL">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="TO">
              <shadow type="math_number" id="yPd0IlpvT(HHV~H#-xa">
                <field name="NUM">9</field>
              </shadow>
            </value>
            <value name="BY">
              <shadow type="math_number" id="nuruiMXvl#gibEZ!*@I">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <statement name="DO">
              <block type="output_auto" id="YVyeZRQXzWzATLQep,FL">
                <field name="TEXT">%3d</field>
                <value name="ADD0">
                  <block type="var_arithmetic" id="T=YHN^Jk|SRwVF|RqX]">
                    <field name="OP">MULTIPLY</field>
                    <value name="A">
                      <block type="variables_get" id="u#hICkkyA]6K=9I*.x)">
                        <field name="VAR">i</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get" id="loD-q]s+o6(L.Z__cFJQ">
                        <field name="VAR">j</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </statement>
    <value name="RETURN">
      <block type="math_number" id="x%!?|*E7P1Y0$X=y88$9">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
</xml>`;
// ソケット付きの入力フォームの保存
  localStorage.setItem('YVyeZRQXzWzATLQep,FL', "%3d"); 
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
  localStorage.setItem('BlocksStatus_JavaScript', defaultXml);  // 18/06/12 
};
