// 2017/10/19 新規作成

function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
  Code.workspace.clear(); // 19/06/06
  //window.location.reload(true); // 19/06/06
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
    if (select == 5 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="variables_set" id="63/mVPVa|T[~./d)[%" x="88" y="42">
    <field name="VAR">nums</field>
    <value name="VALUE">
      <block type="lists_range" id="pv^wM2#cUSf5U914$-Kq">
        <value name="ADD1">
          <block type="math_number" id="X@^6U16vD49}j]fl7+k1">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="ADD2">
          <block type="math_number" id="yth@f~5k4A~1D?+L,#{">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
    </value>
  </block>
  <block type="main_haskell" id="rH{5-FcW9-o4;@ENkGtu" x="98" y="145">
    <value name="DO0">
      <block type="do_haskell" id="3?Ba,*TtU(2|X{chKAP">
        <statement name="DO0">
          <block type="output_var" id="@wI6pc:afimJ?$d[%b">
            <value name="B">
              <block type="variables_get" id="NWtwZ|WFpfV(z*bPA,h">
                <field name="VAR">nums</field>
              </block>
            </value>
            <next>
              <block type="output_var" id="E@uDkp{d]+$vyV[aaC.M">
                <value name="B">
                  <block type="string" id="@dx{E2gmNis5qWY38lmE">
                    <field name="TEXT">の最初の3つは</field>
                  </block>
                </value>
                <next>
                  <block type="output_var" id="bA/f_$D4MByBTB3,Da(W">
                    <value name="B">
                      <block type="procedures_call2" id="{_W0GS{g~zoue3ma8s46">
                        <mutation name="myTake">
                          <arg name="引数1"></arg>
                          <arg name="引数2"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="math_number" id="EHJF.T+2S2Ey(J~KHuF">
                            <field name="NUM">3</field>
                          </block>
                        </value>
                        <value name="ARG1">
                          <block type="variables_get" id="5A*n]S^%k8.$N:@FAlgc">
                            <field name="VAR">nums</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </value>
  </block>
  <block type="procedures_defreturn" id="dL043h%O3mS8zQT%CnX{" x="106" y="301">
    <mutation statements="false">
      <arg name="引数1"></arg>
      <arg name="引数2"></arg>
    </mutation>
    <field name="NAME">myTake</field>
    <comment pinned="false" h="80" w="160">takeの再実装</comment>
    <value name="DELTA">
      <block type="lists_create_with_haskell" id="(2glhq-bdn0Qj1]FBgzR">
        <mutation items="0"></mutation>
      </block>
    </value>
    <value name="ARG0">
      <block type="math_number" id="_2JT#E|p$Tsb^z{T6}a8">
        <field name="NUM">0</field>
      </block>
    </value>
    <next>
      <block type="procedures_defreturn" id="J31RY@~iO9$?,y)eB|+G">
        <mutation statements="false">
          <arg name="引数1"></arg>
          <arg name="引数2"></arg>
        </mutation>
        <field name="NAME">myTake</field>
        <comment pinned="false" h="80" w="160">この関数の説明…</comment>
        <value name="DELTA">
          <block type="lists_create_with_haskell" id="_F@Y.QW.cbg4}:#An*mt">
            <mutation items="0"></mutation>
          </block>
        </value>
        <value name="ARG1">
          <block type="lists_create_with_haskell" id="3]mn0FMqhm1:na::6T-8">
            <mutation items="0"></mutation>
          </block>
        </value>
        <next>
          <block type="procedures_defreturn" id="PL)RimFu6oN%UD@4LxOM">
            <mutation statements="false">
              <arg name="引数1"></arg>
              <arg name="引数2"></arg>
            </mutation>
            <field name="NAME">myTake</field>
            <comment pinned="false" h="80" w="160">この関数の説明…</comment>
            <value name="DELTA">
              <block type="lists_container" id="7,DIVjL}[ixbzO)ryyc3">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="variables_get" id="9wwFmO?ss%bzkmJp0qYb">
                    <field name="VAR">x</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="procedures_call2" id="$wCooK-VV4|^,2?j@-l2">
                    <mutation name="myTake">
                      <arg name="引数1"></arg>
                      <arg name="引数2"></arg>
                    </mutation>
                    <value name="ARG0">
                      <block type="var_arithmetic" id="3J/=yY[AqhR;c:BC_7M">
                        <field name="OP">MINUS</field>
                        <value name="A">
                          <block type="variables_get" id="Jm15lt(x.3IeO]R{*p;P">
                            <field name="VAR">n</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number" id="T%{c^P#22yM]$(*h?5Hg">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="ARG1">
                      <block type="variables_get" id="2x(iF(BmKZ;#m]/Os50Q">
                        <field name="VAR">xs</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <value name="ARG0">
              <block type="variables_get" id="oU9-^^;Vi{n}hi{w}0B;">
                <field name="VAR">n</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="lists_container" id="Ky-F}=[dXcrMsyz/ZL3U">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="variables_get" id="h*S[GTw-7_f;?u1wMu9/">
                    <field name="VAR">x</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="variables_get" id="osnp;haAE0P=0u[d_+a;">
                    <field name="VAR">xs</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;
    loadBlocks(defaultXml);
  }    
      if (select == 6 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defreturn" id="G2mY#zFR+2-B5XG~yA[J" x="111" y="40">
    <mutation statements="false">
      <arg name="引数1"></arg>
      <arg name="引数2"></arg>
    </mutation>
    <field name="NAME">merge</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <value name="DELTA">
      <block type="variables_get" id="Aoq)MZnTuPZAKvl?sW%">
        <field name="VAR">ys</field>
      </block>
    </value>
    <value name="ARG0">
      <block type="lists_create_with_haskell" id="$MUnt/rQZcP~JrfbOW=">
        <mutation items="0"></mutation>
      </block>
    </value>
    <value name="ARG1">
      <block type="variables_get" id="rs7*AE@xJ,c]ZicJH%at">
        <field name="VAR">ys</field>
      </block>
    </value>
    <next>
      <block type="procedures_defreturn" id="pk9||+tcUr$=S~D)SV(">
        <mutation statements="false">
          <arg name="引数1"></arg>
          <arg name="引数2"></arg>
        </mutation>
        <field name="NAME">merge</field>
        <comment pinned="false" h="80" w="160">この関数の説明…</comment>
        <value name="DELTA">
          <block type="variables_get" id="~V|~v~fphuPmZ]_to7i~">
            <field name="VAR">xs</field>
          </block>
        </value>
        <value name="ARG0">
          <block type="variables_get" id="4*}0SDkN[_[s?@f7]J.z">
            <field name="VAR">xs</field>
          </block>
        </value>
        <value name="ARG1">
          <block type="lists_create_with_haskell" id="Kjf=vc_rx3i:}KI|}WKM">
            <mutation items="0"></mutation>
          </block>
        </value>
        <next>
          <block type="procedures_defreturn_statement" id="{HX}OckS_^mpl:[l!$,b">
            <mutation statements="false">
              <arg name="引数1"></arg>
              <arg name="引数2"></arg>
            </mutation>
            <field name="NAME">merge</field>
            <comment pinned="false" h="80" w="160">この関数の説明…</comment>
            <statement name="DELTA">
              <block type="controls_if_haskell" id="sj0^K;}53)+0Wi!u0zGk">
                <mutation elseif="2"></mutation>
                <value name="IF0">
                  <block type="logic_compare" id=".[RVG1?O|E9^3Cfk[3ao">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="variables_get" id="C2(qNBO98~$ar%QM9n)w">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get" id="Ut$aYZ7WoW1RW85s+z0C">
                        <field name="VAR">y</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="DO0">
                  <block type="lists_container" id="_29$#eutFY=[GS50zM">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="variables_get" id="tmUduNoYD%zLNAX5tP$f">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="procedures_call2" id="gL!f3!n^!FqJP,YPckr">
                        <mutation name="merge">
                          <arg name="引数1"></arg>
                          <arg name="引数2"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="variables_get" id="-M~kAN}gQBE-Y6;Vl;^">
                            <field name="VAR">xs</field>
                          </block>
                        </value>
                        <value name="ARG1">
                          <block type="variables_get" id="159_;+8T+b$_4v;[4cn1">
                            <field name="VAR">ys</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="IF1">
                  <block type="logic_compare" id="jmVmB}Artf)o[mS1kaYK">
                    <field name="OP">LT</field>
                    <value name="A">
                      <block type="variables_get" id=",cyDWu]OvDIxK4uobg_]">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get" id="yI,Vt9mYrnHs7)c}H_KY">
                        <field name="VAR">y</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="DO1">
                  <block type="lists_container" id="*jk@egT3V4st2xO+IQoG">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="variables_get" id="Lk||o:]p7;_^!0Iv1wQH">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="procedures_call2" id="/hJC$+fWJ7:Mm+^D;u^a">
                        <mutation name="merge">
                          <arg name="引数1"></arg>
                          <arg name="引数2"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="variables_get" id="Yu){M1E6AGFq|6bK#[RE">
                            <field name="VAR">xs</field>
                          </block>
                        </value>
                        <value name="ARG1">
                          <block type="lists_container" id="-A)Jcy)X)rvSyCOt9ZZ*">
                            <mutation items="2"></mutation>
                            <value name="ADD0">
                              <block type="variables_get" id="v9y(J7?nWEp.o6Tq0|Qj">
                                <field name="VAR">y</field>
                              </block>
                            </value>
                            <value name="ADD1">
                              <block type="variables_get" id="SDgfNx,DT[=Ww9~}$:?Q">
                                <field name="VAR">ys</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="IF2">
                  <block type="logic_compare" id="q;d/Zl;6lq*j{jmq%Z/[">
                    <field name="OP">GT</field>
                    <value name="A">
                      <block type="variables_get" id="1*.P/nyTvIi3e5vsBB?;">
                        <field name="VAR">x</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get" id="LINk~del=7N;oQM)=l_h">
                        <field name="VAR">y</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="DO2">
                  <block type="lists_container" id="x26q_B-tr[JOr=Nv3nY3">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="variables_get" id="jpf0x#F)ZKUl?BpZj)TZ">
                        <field name="VAR">y</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="procedures_call2" id="mey]6np%-9bc^$yqP^K">
                        <mutation name="merge">
                          <arg name="引数1"></arg>
                          <arg name="引数2"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="lists_container" id="U|{3{]9k0II4g;z9t@Pq">
                            <mutation items="2"></mutation>
                            <value name="ADD0">
                              <block type="variables_get" id="5ioM]A/YO.lK5Wl/SF@0">
                                <field name="VAR">x</field>
                              </block>
                            </value>
                            <value name="ADD1">
                              <block type="variables_get" id="ujwPq(2u+#t^f?JFH_B7">
                                <field name="VAR">xs</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="ARG1">
                          <block type="variables_get" id="sTuzG,fqp[qO1v8[(?$;">
                            <field name="VAR">ys</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </statement>
            <value name="ARG0">
              <block type="lists_container" id="_p%MIC6fy[xwx/aS3@#Y">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="variables_get" id="VobOOg/wC]D=Kt:-|T">
                    <field name="VAR">x</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="variables_get" id="XiyGL8k{ii7?LMWGG2c">
                    <field name="VAR">xs</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="ARG1">
              <block type="lists_container" id="^w%K?31(UH{(ef26|p,W">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="variables_get" id="{+VGToOSo4,GPX=fZ(6*">
                    <field name="VAR">y</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="variables_get" id="i]=xN0~Y%|Gqob-;h.h%">
                    <field name="VAR">ys</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;
    loadBlocks(defaultXml);
  }    
  
  if (select == 7 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="procedures_defreturn" id="a.%3C~p-xK5aE0T)hJ[m" x="206" y="92">
    <mutation statements="false">
      <arg name="引数1"></arg>
    </mutation>
    <field name="NAME">fromBin</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <value name="ARG0">
      <block type="variables_get" id="jr+D2.w8nh7GS=xX5@xG">
        <field name="VAR">xs</field>
      </block>
    </value>
  </block>
  <block type="procedures_defreturn" id="tY,o4x4-)2msGQ5sjY}}" x="193" y="212">
    <mutation statements="false">
      <arg name="引数1"></arg>
      <arg name="引数2"></arg>
    </mutation>
    <field name="NAME">auxBin</field>
    <comment pinned="false" h="80" w="160">この関数の説明…</comment>
    <value name="DELTA">
      <block type="variables_get" id="_wRAcWW_zGWO8e2L$g*U">
        <field name="VAR">n</field>
      </block>
    </value>
    <value name="ARG0">
      <block type="variables_get" id="MQAi{EI$0Iw9iYzuwA2i">
        <field name="VAR">n</field>
      </block>
    </value>
    <value name="ARG1">
      <block type="lists_create_with_haskell" id="s-cENm1|wn8?VvyJId8">
        <mutation items="0"></mutation>
      </block>
    </value>
    <next>
      <block type="procedures_defreturn" id="N!5YbP5BPgXpVNGLQ9$8">
        <mutation statements="false">
          <arg name="引数1"></arg>
          <arg name="引数2"></arg>
        </mutation>
        <field name="NAME">auxBin</field>
        <comment pinned="false" h="80" w="160">この関数の説明…</comment>
        <value name="DELTA">
          <block type="math_number" id="FsC!u:iBzZN)u2TRrGN,">
            <field name="NUM">0</field>
          </block>
        </value>
        <value name="ARG0">
          <block type="variables_get" id=",k*7q#EO3Bl0R75R!#OP">
            <field name="VAR">n</field>
          </block>
        </value>
        <value name="ARG1">
          <block type="lists_container" id="%n~b#6,E+q]QZ.{pKKAF">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="logic_boolean_haskell" id="eEd{u#/3(-Vty{#5k%.;">
                <field name="BOOL">TRUE</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="variables_get" id="nE2WFy]RMxamu4+Y{7-=">
                <field name="VAR">xs</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </next>
  </block>
  <block type="main_haskell" id="Q91XB9TVwe{jcju~Wy;m" x="217" y="553">
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
