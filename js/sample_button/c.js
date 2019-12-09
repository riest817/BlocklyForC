// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  //workspace.clear();
  Code.workspace.clear();   // 18/05/16
  //window.location.reload(true); // 18/05/16

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
  <block type="procedures_defreturn" id="X%!9aWizGb)!pG.tt+6z" x="35" y="104">
    <mutation>
      <arg name="num"></arg>
    </mutation>
    <field name="NAME">prime_number</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="variables_set" id="DN5?;pSH+tE:#Q}a1-@C">
        <field name="VAR">i</field>
        <value name="VALUE">
          <block type="math_number" id="K3:1(kkykLNw4cF_Js0d">
            <field name="NUM">2</field>
          </block>
        </value>
        <next>
          <block type="controls_whileUntil" id="I.}j^@fp:TEj7(mN%S=i">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
              <block type="logic_compare" id="LBi^pdJG8k(p@U?.0z|#">
                <field name="OP">LT</field>
                <value name="A">
                  <block type="variables_get" id="I6Rw8NLk[QHRvp}Ju(6">
                    <field name="VAR">j</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get" id="Ed%q_Va+{=4|ChF7a[/l">
                    <field name="VAR">num</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO">
              <block type="procedures_ifreturn" id="w.M4mJT6rOoaGpoD+TCs">
                <mutation value="1"></mutation>
                <value name="CONDITION">
                  <block type="logic_compare" id="rdSUNHArkKi7-Gye)u|(">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="var_arithmetic" id="?/+9;W5YXFJ,z=IS=J,S">
                        <field name="OP">REMAINDER</field>
                        <value name="A">
                          <block type="variables_get" id="JQ{sCd+c)7,Ot$4%H?b">
                            <field name="VAR">num</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="variables_get" id="q:7@IuX!8Gc642v1bBS">
                            <field name="VAR">j</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number" id="2Pr=0Mc|NpT9v8ncy_%h">
                        <field name="NUM">0</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="VALUE">
                  <block type="math_number" id="sBc.c;pBVOUj,e?{Qnq]">
                    <field name="NUM">1</field>
                  </block>
                </value>
                <next>
                  <block type="variables_set" id="s3*Dn2ePax!Qk18{CKs=">
                    <field name="VAR">j</field>
                    <value name="VALUE">
                      <block type="var_arithmetic" id="e{mwnpV4-8u7a;y3E{*}">
                        <field name="OP">ADD</field>
                        <value name="A">
                          <block type="variables_get" id="Q(ZZ6lp_LsoJ1_gI_b%S">
                            <field name="VAR">j</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number" id="L^MKY}wp4}rO{MLaI8a">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="math_number" id="!-]#^)hL:ui/eAD-=:xQ">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  <block type="procedures_defreturn" id="Wy63r1l#nc5{TTXS(q?r" x="41" y="358">
    <field name="NAME">main</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <statement name="STACK">
      <block type="variables_set" id="|=bu?eAKnum~3aEu{J~s">
        <field name="VAR">i</field>
        <value name="VALUE">
          <block type="math_number" id="9lLKqdv9fcX~o.;7|~Xu">
            <field name="NUM">2</field>
          </block>
        </value>
        <next>
          <block type="controls_whileUntil" id="yZR[#$FHrrq~a6PmZ2f]">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
              <block type="logic_compare" id="TVd6iH7%BnHfi|9wQRhs">
                <field name="OP">LT</field>
                <value name="A">
                  <block type="variables_get" id="*~!ec6(5wX03@k{=Q6q?">
                    <field name="VAR">i</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number" id="|t$(,{cX%c-sPQ*~43{X">
                    <field name="NUM">1000</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO">
              <block type="variables_set" id="157$LuE2ynJO6Dum~f/e">
                <field name="VAR">flag</field>
                <value name="VALUE">
                  <block type="math_number" id="f3EA9]ji*tl]SD03|^-B">
                    <field name="NUM">0</field>
                  </block>
                </value>
                <next>
                  <block type="variables_set" id="alx/;fB3Ik8Kw(#kTJtt">
                    <field name="VAR">flag</field>
                    <value name="VALUE">
                      <block type="procedures_callreturn" id=":h2md%P@Tp1t%N3Av0i">
                        <mutation name="prime_number">
                          <arg name="num"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="variables_get" id="vC$9^e!)oL*M:W!=[M1">
                            <field name="VAR">i</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="controls_if" id="O2grA:Y^cU{/$QCeZHg,">
                        <value name="IF0">
                          <block type="logic_compare" id="%sxRFb}~3^)-cB)3nVq">
                            <field name="OP">EQ</field>
                            <value name="A">
                              <block type="variables_get" id="GQn=uAj9^6zLly#Nf5tm">
                                <field name="VAR">flag</field>
                              </block>
                            </value>
                            <value name="B">
                              <block type="math_number" id="5,G86)XR@o%.:nENbJ4q">
                                <field name="NUM">0</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <statement name="DO0">
                          <block type="output_auto" id="uYldTpJED8Ia:02!Egq">
                            <field name="TEXT">%d  </field>
                          </block>
                        </statement>
                        <next>
                          <block type="variables_set" id="d{ciF)Sl)R@r?8@ZJ5FS">
                            <field name="VAR">i</field>
                            <value name="VALUE">
                              <block type="var_arithmetic" id="iH8Z^Dh00u|nB%Oy5Q{x">
                                <field name="OP">ADD</field>
                                <value name="A">
                                  <block type="variables_get" id="Sru[lVwY/U[m2M!3UPV?">
                                    <field name="VAR">i</field>
                                  </block>
                                </value>
                                <value name="B">
                                  <block type="math_number" id="dJ;)[=-^9?x)#oBgp~?">
                                    <field name="NUM">1</field>
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
            </statement>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="math_number" id="e#S.d*--DLP?.5]RMeRB">
        <field name="NUM">0</field>
      </block>
    </value>
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
  localStorage.setItem('BlocksStatus_C', defaultXml);  // 18/06/12 
};

