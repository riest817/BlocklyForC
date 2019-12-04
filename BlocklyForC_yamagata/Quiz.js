function ReturnQuestionNumber(questionNumber) {
  var questionData;

  //問題文をTABのQuizに表示
  switch (questionNumber) {
    case "0000" : questionData = "ほぼ全てのブロックが使えるページです。"; break;
    case "0001" : questionData = `このブロックのプログラムは多重ループを使用し縦横に*を並べて長方形を表示するプログラムです。
しかし、多重ループの変数が一部欠けています。これを解いて正しいプログラムに変えてください。`; break;
    case "0002" : questionData = `このブロックのプログラムは多重ループを使用し縦横に*を並べて長方形を表示するプログラムです。
しかし、多重ループの変数が一部欠けています。これを解いて正しいプログラムに変えてください。`; break;
    default     : questionData = "";
  }
  return questionData;
}

function ReturnQuestionAnswer(questionNumber) {
  var questionData;

  //現在のBlocklyのコードと答えを比較
  switch (questionNumber) {
    case "0000" : questionData = "ほぼ全てのブロックが使えるページです。"; break;
    case "0001" : questionData = `このブロックのプログラムは多重ループを使用し縦横に*を並べて長方形を表示するプログラムです。
しかし、多重ループの変数が一部欠けています。これを解いて正しいプログラムに変えてください。`; break;
    case "0002" : questionData = `このブロックのプログラムは多重ループを使用し縦横に*を並べて長方形を表示するプログラムです。
しかし、多重ループの変数が一部欠けています。これを解いて正しいプログラムに変えてください。`; break;
    default     : questionData = "";
  }

  return questionData;
}

function conStr(str) {
  var str2;
  str2 = str;
  console.log("a!!!");
  str2.replace(/\\\a/g,'\a')
     .replace(/\\\\b/g,'\\b')
     .replace(/\\\\n/g,'\\n')
     .replace(/\\\\r/g,'\\r')
     .replace(/\\\\f/g,'\\f')
     .replace(/\\t/g,'\t')
     .replace(/\\\\v/g,'\\v')
     .replace(/\\\\/g,'\\')
     .replace(/\\?/g,'\?')
     .replace(/\\'/g,'\'')
     .replace(/\\"/g,'\"')
     .replace(/\\0/g,'\0')
  return str2;
}

function ReturnXML(param) {
  var arrXML = {
    0 : ` <xml id="toolbox" style="display: none">
    <category name="論理" colour="210">
<block type="quiz_start_main"></block>
<block type="quiz_if"></block>
<block type="quiz_if_else"></block>
<block type="quiz_if_else_if"></block>
<block type="quiz_compare"></block>
<block type="quiz_in_compare"></block>
<block type="quiz_foundation"></block>
<block type="switch_base"></block>
<block type="switch_case2"></block>
<block type="switch_break"></block>
<block type="switch_default"></block>
<block type="controls_switch_case"></block>
<block type="controls_if2"></block>
<block type="cond"></block>
<block type="in_cond"></block>
    </category>
    <category name="繰り返し" colour="120">
<block type="quiz1_for"></block>
<block type="quiz_for_simple"></block>
<block type="quiz_for_simple2"></block>
<block type="quiz2_while"></block>
<block type="quiz3_for"></block>
<block type="quiz_for"></block>
<block type="quiz_for2"></block>
<block type="quiz_while"></block>
<block type="do_while"></block>
    </category>
    <category name="計算" colour="230">
      <block type="math_number"></block>
      <block type="math_arithmetic">
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="文字列" colour="160">
<block type="text"></block>
<block type="quiz_print1"></block>
<block type="printf_join"></block>
<block type="printf_join2"></block>
<block type="printf_in_join2"></block>
<block type="quiz_scanf"></block>
<block type="quiz_scanf2"></block>
<block type="quiz_puts"></block>
<block type="quiz_in_puts"></block>
<block type="quiz_variable_foundation"></block>
<block type="scanf_join"></block>
<block type="output_auto"></block>
<block type="putchar"></block>
    </category>
    <sep></sep>
    <category name="変数1" colour="330">
  <block type="quiz_declaration1"></block>
  <block type="quiz_variable"></block>
  <block type="quiz_variable2"></block>
  <block type="quiz_variable_foundation"></block>
  <block type="prefix_syntax_first"></block>
  <block type="postfix_syntax_first"></block>
  <block type="prefix_syntax"></block>
  <block type="postfix_syntax"></block>
  <block type="quiz_cast"></block>
  <block type="unop"></block>
  <block type="in_unop"></block>
    </category>
    <category name="変数2" colour="330" custom="VARIABLE"></category>
  </xml>`/*,
    1 : `  <xml id="toolbox" style="display: none">
                     <category name="解答用ブロック" colour="210">
                     <block type="variables_get">
                       <field name="VAR">height</field>
                     </block>
                     <block type="variables_get">
                       <field name="VAR">width</field>
                     </block>
     </category>
    </xml>`,
    2: `  <xml id="toolbox" style="display: none">
                         <category name="解答用ブロック" colour="210">
                         <block type="variables_get">
                           <field name="VAR">height</field>
                         </block>
                         <block type="variables_get">
                           <field name="VAR">width</field>
                         </block>
         </category>
        </xml>`*/
  };
  return arrXML[param];
}

function ReturnStartBlocks(param) {
  var arrBlocks = {
    0 : ``/*,
    1 : `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="quiz_start_main">
        <statement name="DO">
          <block type="quiz_variable3">
            <field name="TYPE">int</field>
            <field name="VAR">i</field>
            <next>
              <block type="quiz_variable3">
                <field name="TYPE">int</field>
                <field name="VAR">j</field>
                <next>
                  <block type="quiz_variable3">
                    <field name="TYPE">int</field>
                    <field name="VAR">height</field>
                    <next>
                      <block type="quiz_variable3">
                        <field name="TYPE">int</field>
                        <field name="VAR">width</field>
                        <next>
                          <block type="printf_join2">
                            <mutation items="0"></mutation>
                            <field name="INPUT">高さ:</field>
                            <next>
                              <block type="scanf_join">
                                <mutation items="1"></mutation>
                                <field name="INPUT">%d</field>
                                <value name="ADD0">
                                  <block type="variables_get">
                                    <field name="VAR">height</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="printf_join2">
                                    <mutation items="0"></mutation>
                                    <field name="INPUT">横幅:</field>
                                    <next>
                                      <block type="printf_join2">
                                        <mutation items="1"></mutation>
                                        <field name="INPUT">%d\n</field>
                                        <value name="ADD0">
                                          <block type="variables_get">
                                            <field name="VAR">width</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="quiz_for">
                                            <value name="EXPR1">
                                              <block type="variables_get">
                                                <field name="VAR">i</field>
                                              </block>
                                            </value>
                                            <value name="EXPR2">

                                            </value>
                                            <value name="EXPR3">
    <block type="postfix_syntax">
                                                    <field name="VAR">i</field>
                                                    <field name="SYNTAX">++</field>
    </block>
                                            </value>
                                            <statement name="A">
                                              <block type="quiz_for">
                                                <value name="EXPR1">
                                                  <block type="variables_get">
                                                    <field name="VAR">j</field>
                                                  </block>
                                                </value>
                                                <value name="EXPR2">

                                                </value>
                                                <value name="EXPR3">
                                                  <block type="postfix_syntax">
                                                    <field name="VAR">j</field>
                                                    <field name="SYNTAX">++</field>
                                                  </block>
                                                </value>
                                                <statement name="A">
                                                  <block type="printf_join2">
                                                    <mutation items="0"></mutation>
                                                    <field name="INPUT">*</field>
                                                  </block>
                                                </statement>
                                                <next>
                                                  <block type="quiz_puts">
                                                    <field name="INPUT"></field>
                                                  </block>
                                                </next>
                                              </block>
                                            </statement>
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
            </next>
          </block>
        </statement>
      </block>
    </xml>
`,
    2 : `
    <xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="quiz_start_main">
    <statement name="DO">
      <block type="quiz_variable">
        <field name="TYPE">int</field>
        <field name="VAR">i</field>
        <next>
          <block type="quiz_variable">
            <field name="TYPE">int</field>
            <field name="VAR">j</field>
            <next>
              <block type="quiz_variable">
                <field name="TYPE">int</field>
                <field name="VAR">height</field>
                <next>
                  <block type="quiz_variable">
                    <field name="TYPE">int</field>
                    <field name="VAR">width</field>
                    <next>
                      <block type="printf_join2">
                        <mutation items="0"></mutation>
                        <field name="INPUT">高さ:</field>
                        <next>
                          <block type="scanf_join">
                            <mutation items="1"></mutation>
                            <field name="INPUT">%d</field>
                            <value name="ADD0">
                              <block type="variables_get">
                                <field name="VAR">height</field>
                              </block>
                            </value>
                            <next>
                              <block type="printf_join2">
                                <mutation items="0"></mutation>
                                <field name="INPUT">横幅:</field>
                                <next>
                                  <block type="printf_join2">
                                    <mutation items="1"></mutation>
                                    <field name="INPUT">%d\n</field>
                                    <value name="ADD0">
                                      <block type="variables_get">
                                        <field name="VAR">width</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="quiz_for_simple">
                                        <field name="VAR1">i</field>
                                        <field name="VAR2">i</field>
                                        <field name="OPERATOR1">==</field>
                                        <field name="VAR3">i</field>
                                        <field name="OPERATOR2">++</field>
                                        <value name="A">
                                          <block type="variables_get">
                                            <field name="VAR">i</field>
                                          </block>
                                        </value>
                                        <statement name="C">
                                          <block type="quiz_for_simple">
                                            <field name="VAR1">j</field>
                                            <field name="VAR2">j</field>
                                            <field name="OPERATOR1">==</field>
                                            <field name="VAR3">j</field>
                                            <field name="OPERATOR2">++</field>
                                            <value name="A">
                                              <block type="variables_get">
                                                <field name="VAR">j</field>
                                              </block>
                                            </value>
                                            <statement name="C">
                                              <block type="printf_join2">
                                                <mutation items="0"></mutation>
                                                <field name="INPUT">*</field>
                                              </block>
                                            </statement>
                                            <next>
                                              <block type="quiz_puts">
                                                <field name="INPUT"></field>
                                              </block>
                                            </next>
                                          </block>
                                        </statement>
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
        </next>
      </block>
    </statement>
  </block>
</xml>
`,
    3 : `
    `*/
};

return arrBlocks[param];
}
