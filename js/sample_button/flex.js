// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  workspace.clear();
  Code.workspace.clear();   // 18/05/16
  window.location.reload(true); // 18/05/16

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
  
  if (select == 3 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="first_flex" id="gmZv+)E_uN3;~J7v{ps." x="91" y="19">
    <statement name="DO1">
      <block type="regular_expression_connection" id="V~$q#AR9j_?bj;h2!3eL">
        <value name="IF">
          <block type="RE_connection_mutator" id="Ao7XWc($;n+ng;.JcS?i">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="RE_sequence" id="BzEBrgG|7k(IDYyAl,Py">
                <field name="MODE">"</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="RE_repetition" id="4}tJl!^#^2,JQLO90)4U">
                <field name="MODE">*</field>
                <value name="A">
                  <block type="RE_connection_or" id="1*~!}munvs.O~*!O?t]Q">
                    <value name="A">
                      <block type="RE_text0" id="+,@dP!_X==nV~pJ06m9*">
                        <field name="TEXT">w</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="RE_connection" id=",XUA%dnhI*5,xKi7JBGz">
                        <value name="A">
                          <block type="RE_sequence" id="%lZ(ELO^uLrh6}LdMbp]">
                            <field name="MODE">\\</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="RE_any_one_mutator" id="za-zUHBq}bn78lK=L(LZ">
                            <mutation items="3"></mutation>
                            <value name="ADD0">
                              <block type="RE_text0" id="y#{dNtP8[0@NQI75vZ_T">
                                <field name="TEXT">"</field>
                              </block>
                            </value>
                            <value name="ADD1">
                              <block type="RE_sequence" id="sXP!}e/a.Z!17l%}1#(+">
                                <field name="MODE">\\</field>
                              </block>
                            </value>
                            <value name="ADD2">
                              <block type="RE_text0" id="Jk@Bq3P5XQ:bEVkrY5E]">
                                <field name="TEXT">w</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="ADD2">
              <block type="RE_sequence" id="C~l*3=W|GMjmFbY(%:ib">
                <field name="MODE">"</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="putchar" id="#-cb:i(wly6Fl:ceX{%L">
            <field name="TEXT">&lt;b&gt;</field>
            <next>
              <block type="echo" id="8E(BRfY_u4mQsPW=S3Yc">
                <next>
                  <block type="putchar" id="XS/=Xc2A;m(T+9YsBt:0">
                    <field name="TEXT">&lt;/b&gt;</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="regular_expression_connection" id="NGiDSMrri4-VeldClE:n">
            <value name="IF">
              <block type="RE_text" id="q:;-k9S^SaRpH_.ymU6:">
                <field name="TEXT">.</field>
              </block>
            </value>
            <statement name="DO">
              <block type="echo" id="X4o~1vzFCU=8oLOa@]4p">
                <next>
                  <block type="exit" id="L?P@*cMDFv+EC}W?A~m1">
                    <field name="MODE">1</field>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="regular_expression_connection" id="3D+7aa6kusI8/u/pQ~XW">
                <value name="IF">
                  <block type="RE_connection_or" id="];|g8rP#Q)K3MUBB4j]?">
                    <value name="A">
                      <block type="RE_anything" id=")SZn)JM6flNx:s7RPk9n"></block>
                    </value>
                    <value name="B">
                      <block type="RE_sequence" id="6d{MMv2CNsKDIO-_3FM">
                        <field name="MODE">n</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO">
                  <block type="echo" id="WccvD%CdLuu%_A|Yn{a"></block>
                </statement>
              </block>
            </next>
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
  
    if (select == 2 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="first_flex" id="gmZv+)E_uN3;~J7v{ps." x="91" y="19">
    <statement name="DO1">
      <block type="regular_expression_connection" id="V~$q#AR9j_?bj;h2!3eL">
        <value name="IF">
          <block type="RE_connection_mutator" id="Ao7XWc($;n+ng;.JcS?i">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="RE_sequence" id="BzEBrgG|7k(IDYyAl,Py">
                <field name="MODE">"</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="RE_repetition" id="4}tJl!^#^2,JQLO90)4U">
                <field name="MODE">*</field>
                <value name="A">
                  <block type="RE_not_any_one_mutator" id="MtJ+zKEXD].ReULRPrk">
                    <mutation items="3"></mutation>
                    <value name="ADD0">
                      <block type="RE_text0" id="VwbH82SX0xTfxM|2QB0Z">
                        <field name="TEXT">"</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="RE_sequence" id="U]y{3ACW0a!dAu7fg,OR">
                        <field name="MODE">\\</field>
                      </block>
                    </value>
                    <value name="ADD2">
                      <block type="RE_sequence" id="j*|KoKTjixNm6Tp%h">
                        <field name="MODE">n</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="ADD2">
              <block type="RE_sequence" id="C~l*3=W|GMjmFbY(%:ib">
                <field name="MODE">"</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="putchar" id="#-cb:i(wly6Fl:ceX{%L">
            <field name="TEXT">&lt;b&gt;</field>
            <next>
              <block type="echo" id="8E(BRfY_u4mQsPW=S3Yc">
                <next>
                  <block type="putchar" id="XS/=Xc2A;m(T+9YsBt:0">
                    <field name="TEXT">&lt;/b&gt;</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="regular_expression_connection" id="NGiDSMrri4-VeldClE:n">
            <value name="IF">
              <block type="RE_text" id="q:;-k9S^SaRpH_.ymU6:">
                <field name="TEXT">.</field>
              </block>
            </value>
            <statement name="DO">
              <block type="echo" id="X4o~1vzFCU=8oLOa@]4p">
                <next>
                  <block type="exit" id="L?P@*cMDFv+EC}W?A~m1">
                    <field name="MODE">1</field>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="regular_expression_connection" id="3D+7aa6kusI8/u/pQ~XW">
                <value name="IF">
                  <block type="RE_connection_or" id="];|g8rP#Q)K3MUBB4j]?">
                    <value name="A">
                      <block type="RE_anything" id=")SZn)JM6flNx:s7RPk9n"></block>
                    </value>
                    <value name="B">
                      <block type="RE_sequence" id="6d{MMv2CNsKDIO-_3FM">
                        <field name="MODE">n</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO">
                  <block type="echo" id="WccvD%CdLuu%_A|Yn{a"></block>
                </statement>
              </block>
            </next>
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

  if (select == 4 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="first_flex" id="gmZv+)E_uN3;~J7v{ps." x="91" y="19">
    <statement name="DO1">
      <block type="regular_expression_connection" id="V~$q#AR9j_?bj;h2!3eL">
        <value name="IF">
          <block type="RE_connection_mutator" id="Ao7XWc($;n+ng;.JcS?i">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="RE_sequence" id="BzEBrgG|7k(IDYyAl,Py">
                <field name="MODE">"</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="RE_repetition" id="4}tJl!^#^2,JQLO90)4U">
                <field name="MODE">*</field>
                <value name="A">
                  <block type="RE_connection_or" id="-)VrWTwAx4i=9,a)viWk">
                    <value name="A">
                      <block type="RE_not_any_one_mutator" id="K[XJec_/(yJsN]N%:]Xn">
                        <mutation items="3"></mutation>
                        <value name="ADD0">
                          <block type="RE_text0" id="[|]Qprw:*CM,J*rJxCn}">
                            <field name="TEXT">"</field>
                          </block>
                        </value>
                        <value name="ADD1">
                          <block type="RE_sequence" id="D85)#-@(4|X3~n|_Qc=2">
                            <field name="MODE">\\</field>
                          </block>
                        </value>
                        <value name="ADD2">
                          <block type="RE_sequence" id="?)%|ay/{?p/4EHt_O~h">
                            <field name="MODE">n</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="B">
                      <block type="RE_connection" id="aOz+6hWE^p|K!-1Mu.s=">
                        <value name="A">
                          <block type="RE_sequence" id="lFcFC.FMGAtgtoHEcckt">
                            <field name="MODE">\\</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="RE_anything" id="hj([%oDDC]U+m}t33BZ$"></block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="ADD2">
              <block type="RE_sequence" id="C~l*3=W|GMjmFbY(%:ib">
                <field name="MODE">"</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="putchar" id="#-cb:i(wly6Fl:ceX{%L">
            <field name="TEXT">&lt;b&gt;</field>
            <next>
              <block type="echo" id="8E(BRfY_u4mQsPW=S3Yc">
                <next>
                  <block type="putchar" id="XS/=Xc2A;m(T+9YsBt:0">
                    <field name="TEXT">&lt;/b&gt;</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="regular_expression_connection" id="NGiDSMrri4-VeldClE:n">
            <value name="IF">
              <block type="RE_text" id="q:;-k9S^SaRpH_.ymU6:">
                <field name="TEXT">.</field>
              </block>
            </value>
            <statement name="DO">
              <block type="echo" id="X4o~1vzFCU=8oLOa@]4p">
                <next>
                  <block type="exit" id="L?P@*cMDFv+EC}W?A~m1">
                    <field name="MODE">1</field>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="regular_expression_connection" id="3D+7aa6kusI8/u/pQ~XW">
                <value name="IF">
                  <block type="RE_connection_or" id="];|g8rP#Q)K3MUBB4j]?">
                    <value name="A">
                      <block type="RE_anything" id=")SZn)JM6flNx:s7RPk9n"></block>
                    </value>
                    <value name="B">
                      <block type="RE_sequence" id="6d{MMv2CNsKDIO-_3FM">
                        <field name="MODE">n</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO">
                  <block type="echo" id="WccvD%CdLuu%_A|Yn{a"></block>
                </statement>
              </block>
            </next>
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

  if (select == 5 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }      
}

function loadBlocks(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefoxは、sessionStorageにアクセスするときにSecurityErrorをスローすることがあります。
    // Firefoxを再起動するとこれが修正されるため、バグのように見えます。
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // 言語切り替えは、リロード中にブロックを保存します。
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // エディタをデフォルトの開始ブロックでロードします。
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // 保存されたブロックを別のスレッドに復元する
    // 初期化は失敗したロードの影響を受けません。
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
  localStorage.setItem('BlocksStatus_Flex', defaultXml);  // 18/06/12 
};
