/*
19/06/11 flex.js を参考に新規作成
*/

//<<<<<<< HEAD
//=======
function sample(select) {
  var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
  if (!q) return;
//  workspace.clear();
  Code.workspace.clear();   // 18/05/16
  //window.location.reload(true); // 18/05/16

  if (select == 1 ) {
    var defaultXml =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="fact_definition2" id="%RDxctQVjYp;$4Y:Qk5d" x="38" y="63">
    <mutation items="2"></mutation>
    <field name="TEXT">count</field>
    <value name="ADD0">
      <block type="math_number" id="h:Jv4U+3hl:^pmn^H9!">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="ADD1">
      <block type="lists_empty" id="{v:2YUy0eL@(kS(Fs+O"></block>
    </value>
    <next>
      <block type="rule_connection" id=";-o4WSm5sLB!fBez}gR[">
        <mutation items="2"></mutation>
        <value name="HEAD0">
          <block type="rule_single" id="V+hP@ICbV{|LasUYOd">
            <mutation items="2"></mutation>
            <field name="TEXT">count</field>
            <value name="ADD0">
              <block type="term_name2" id="+Zc/Yy^{T,!G{~d2VQy*">
                <field name="TEXT">Count</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="lists" id="*@]GAp|et?dzVXJHP.">
                <value name="ADD1">
                  <block type="term_name2" id="MDwZTF.v%OXsqt3AzM]J">
                    <field name="TEXT">Head</field>
                  </block>
                </value>
                <value name="ADD2">
                  <block type="term_name2" id="wR%*!w:*gEdZ[tqM,,KY">
                    <field name="TEXT">Tail</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <value name="ADD0">
          <block type="rule_single" id="W1U+=Iq}E_gs+,q8zwm">
            <mutation items="2"></mutation>
            <field name="TEXT">count</field>
            <value name="ADD0">
              <block type="term_name2" id="jsMqJfe;0XpXPGU^%vfg">
                <field name="TEXT">TailCount</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="term_name2" id="s)UGJ,JP}TeAEIu:X$2">
                <field name="TEXT">Tail</field>
              </block>
            </value>
          </block>
        </value>
        <value name="ADD1">
          <block type="is_block" id="h,kA@U/_?,~($S_0L_7.">
            <value name="ADD1">
              <block type="term_name2" id="d}k5gDTAS/w2klGmfub">
                <field name="TEXT">Count</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="var_arithmetic" id="{H72j*UNb:7cB30A*oXh">
                <field name="OP">ADD</field>
                <value name="A">
                  <block type="term_name2" id="EUF7hbWo+ox9j(MVpB^1">
                    <field name="TEXT">TailCount</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number" id="?dguk9R,TW!1+b6l8P|[">
                    <field name="NUM">1</field>
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

  if (select == 2 ) {
    var defaultXml =
    ``;
  loadBlocks(defaultXml);
  }

      if (select == 0 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }     

  
  if (select == 3 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }
  

  if (select == 5 ) {
    var defaultXml =
    ``;
    loadBlocks(defaultXml);
  }  
  
}

//>>>>>>> origin
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
  localStorage.setItem('BlocksStatus_Prolog', defaultXml);  // 18/06/12 
}


window.addEventListener("load", () => {
  let samples = document.getElementById("samples");
  samples.addEventListener("change", () => {
    var name = samples.value.split(/\s+/)[0];
    if (name == "") return;
    var q = window.confirm("編集したブロックを捨てて、サンプルブロックを表示します。よろしいですか？");
    if (!q) return;
    fetch("Samples/prolog/" + name + ".xml")
      .then(response => {
        response.text().then(text => {
          let xmlDom = Blockly.Xml.textToDom(text);
          if (xmlDom) {
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
          }
        });
      });
  });
  var names = [
    ""
    , "tokugawa"
    , "append"
  ];
  for (let nm of names) {
    let node = document.createElement("option");
    node.innerText = nm;
    samples.appendChild(node);
  }

  // samples.dispatchEvent(new Event("change"));
})
