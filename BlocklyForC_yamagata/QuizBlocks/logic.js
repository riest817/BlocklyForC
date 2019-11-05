/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating C for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.C.logic');

goog.require('Blockly.C');

Blockly.Blocks['quiz3_if0'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] > 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] == 60 ) {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] < 60 ) {");
    this.appendStatementInput("DO3");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if0'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var branch3 = Blockly.C.statementToCode(block, 'DO3');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else if ( arr[i] == 60 ) {\n' + branch2 +
             '} else if ( arr[i] <  60 ) {\n' + branch3 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if1'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] < 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else if ( arr[i] <= 60 ) {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if1'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <  60 ) {\n' + branch1 +
             '} else if ( arr[i] <= 60 ) {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if2'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("if ( arr[i] <= 60 ) {");
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if2'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] <= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz3_if3'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField('if ( arr[i] >= 60 ) {');
    this.appendStatementInput("DO1");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("DO2");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.C['quiz3_if3'] = function(block) {
  var branch1 = Blockly.C.statementToCode(block, 'DO1');
  var branch2 = Blockly.C.statementToCode(block, 'DO2');
  var code = 'if ( arr[i] >= 60 ) {\n' + branch1 +
             '} else {\n' + branch2 + '}\n';
  return code;
};

Blockly.Blocks['quiz_if4'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if  ( n1 ")
        .appendField(new Blockly.FieldDropdown([[">", ">"], ["<", "<"], [">=", ">="], ["<=", "<="], ["==", "=="]]), "OPTION")
        .appendField(" n2 );");
    this.appendStatementInput("THEN");
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("ELSE");
    this.appendDummyInput()
        .appendField("}");
  }
};

Blockly.C['quiz_if4'] = function(block) {
  var dropdown_option = block.getFieldValue('OPTION');
  var statements_then = Blockly.C.statementToCode(block, 'THEN');
  var statements_else = Blockly.C.statementToCode(block, 'ELSE');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if ( n1 ' + dropdown_option + ' n2 ) {\n'
                + statements_then
           + '} else {\n'
                + statements_else
           + '}\n';
};


//以下はHaskellで使用するブロック


Blockly.Blocks['quiz_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", " = "], [" + ", " + "], [" - ", " - "], [" * ", " * "], [" / ", " / "], [" > "," > "], [" < "," < "], [" >= "," >= "], [" <= "," <= "], [" & "," & "], [" | "," | "], [" && "," && "], [" || "," || "], [" == ", " == "], [" += ", " += "], [" -= ", " -= "], ["*=", "*="], [" /= ", " /= "]]), "OP");
        this.appendDummyInput()
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_compare'] = function(block) {
  var value_var1 = Blockly.C.valueToCode(block, 'Var1', Blockly.C.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.C.valueToCode(block, 'Var2', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2 + ';\n';
  return code;
};

Blockly.Python['quiz_compare'] = function(block) {
  var value_var1 = Blockly.Python.valueToCode(block, 'Var1', Blockly.Python.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.Python.valueToCode(block, 'Var2', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2 + '\n';
  return code;
};

Blockly.Blocks['quiz_in_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", " = "], [" + ", " + "], [" - ", " - "], [" * ", " * "], [" / ", " / "], [" > "," > "], [" < "," < "], [" >= "," >= "], [" <= "," <= "], [" & "," & "], [" | "," | "], [" && "," && "], [" || "," || "], [" == ", " == "], [" += ", " += "], [" -= ", " -= "], ["*=", "*="], [" /= ", " /= "]]), "OP");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_in_compare'] = function(block) {
  var value_var1 = Blockly.C.valueToCode(block, 'Var1', Blockly.C.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.C.valueToCode(block, 'Var2', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2;
  return [code, 0];
};

Blockly.Python['quiz_in_compare'] = function(block) {
  var value_var1 = Blockly.Python.valueToCode(block, 'Var1', Blockly.Python.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.Python.valueToCode(block, 'Var2', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2;
  return [code, 0];
};

/*
Blockly.Blocks['quiz_in_compare'] = {
  init: function() {
    this.appendValueInput("Var1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("Var2")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([[" = ", "Just"], [" + ", "Add"], [" - ", "Sub"], [" * ", "Mul"], [" / ", "Mod"], [" == ", "Eq"], ["+=", "AddAssign"], ["-=", "SubAssign"], ["*=", "MulAssign"], ["/=", "ModAssign"]]), "OP");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_in_compare'] = function(block) {
  var value_var1 = Blockly.C.valueToCode(block, 'Var1', Blockly.C.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_var2 = Blockly.C.valueToCode(block, 'Var2', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_var1 + dropdown_op + value_var2 + ';\n';
  return [code, Blockly.C.ORDER_NONE];
};
*/

Blockly.Blocks['quiz_if'] = {
  init: function() {
    this.appendValueInput("EXPR")
        .appendField("if  ( ");
    this.appendDummyInput()
        .appendField(")  {");
    this.appendStatementInput("A");
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if'] = function(block) {
  var value_expr = Blockly.C.valueToCode(block, 'EXPRESSION', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var code = 'if (' + value_expr + ') {\n' +
             statements_a +
             '}\n';

  return code;
};

Blockly.Python['quiz_if'] = function(block) {
  var value_expr = Blockly.Python.valueToCode(block, 'EXPRESSION', Blockly.Python.ORDER_ATOMIC);
  var statements_a = Blockly.Python.statementToCode(block, 'A');
  var code = 'if ' + value_expr + ' :\n' + statements_a;

  return code;
};

Blockly.Blocks['quiz_if_else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if (");
    this.appendValueInput("EXPR")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} else {");
    this.appendStatementInput("B")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if_else'] = function(block) {
  var value_expr = Blockly.C.valueToCode(block, 'EXPR', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var statements_b = Blockly.C.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_expr + ') {\n' + statements_a + '\n} else {\n' + statements_b + '\n}\n';
  return code;
};

Blockly.Python['quiz_if_else'] = function(block) {
  var value_expr = Blockly.Python.valueToCode(block, 'EXPR', Blockly.Python.ORDER_ATOMIC);
  var statements_a = Blockly.Python.statementToCode(block, 'A');
  var statements_b = Blockly.Python.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if ' + value_expr + ':\n' + statements_a + '\nelse:\n' + statements_b + '\n';
  return code;
};

Blockly.Blocks['quiz_if_else_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if (");
    this.appendValueInput("EXPR1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("} else if (");
    this.appendValueInput("EXPR2")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("B")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['quiz_if_else_if'] = function(block) {
  var value_expr1 = Blockly.C.valueToCode(block, 'EXPR1', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  var value_expr2 = Blockly.C.valueToCode(block, 'EXPR2', Blockly.C.ORDER_ATOMIC);
  var statements_b = Blockly.C.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_expr1 + ') {\n' + statements_a + '\n} else if (' + value_expr2 + ') {\n' + statements_b + '\n}\n';
  return code;
};

Blockly.Python['quiz_if_else_if'] = function(block) {
  var value_expr1 = Blockly.Python.valueToCode(block, 'EXPR1', Blockly.Python.ORDER_ATOMIC);
  var statements_a = Blockly.Python.statementToCode(block, 'A');
  var value_expr2 = Blockly.Python.valueToCode(block, 'EXPR2', Blockly.Python.ORDER_ATOMIC);
  var statements_b = Blockly.Python.statementToCode(block, 'B');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if ' + value_expr1 + ':\n' + statements_a + '\nelif ' + value_expr2 + ':\n' + statements_b + '\n';  
  return code;
};

Blockly.Blocks['switch_base'] = {
  init: function() {
    this.appendValueInput("EXPR")
        .setCheck(null)
        .appendField("switch (");
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['switch_base'] = function(block) {
  var value_exp = Blockly.C.valueToCode(block, 'EXPR', Blockly.C.ORDER_ATOMIC);
  var statements_a = Blockly.C.statementToCode(block, 'A');
  // TODO: Assemble JavaScript into code variable.
  var code = 'switch (' + value_exp + ') {\n' + statements_a + '\n}\n';
  return code;
};

Blockly.Blocks['switch_case'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("case")
        .appendField(new Blockly.FieldTextInput("1"), "EXPR")
        .appendField(":");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['switch_case'] = function(block) {
  var text_exp = block.getFieldValue('EXPR');
  // TODO: Assemble JavaScript into code variable.
  var code = 'case ' + text_exp + ' :\n';
  return code;
};

Blockly.Blocks['switch_case2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("case")
        .appendField(new Blockly.FieldTextInput("0"), "EXPR")
        .appendField(":");
    this.appendStatementInput("A")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['switch_case2'] = function(block) {
  var text_expr = block.getFieldValue('EXPR');
  var statements_a = Blockly.C.statementToCode(block, 'A');
  // TODO: Assemble JavaScript into code variable.
  var code = 'case ' + text_expr + ' : ' + statements_a + '\n';
  return code;
};

Blockly.Blocks['switch_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break;");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['switch_break'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'break;\n';
  return code;
};

//breakの色赤色版
Blockly.Blocks['switch_break2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break;");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('');
  }
};

Blockly.C['switch_break2'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'break;\n';
  return code;
};

Blockly.Blocks['switch_default'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("default    :");
    this.appendStatementInput("A")
        .setCheck(null);
    this.setColour(210);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['switch_default'] = function(block) {
  var statements_a = Blockly.C.statementToCode(block, 'A');
  // TODO: Assemble JavaScript into code variable.
  var code = 'default : ' + statements_a + '\n';
  return code;
};

Blockly.Blocks['switch_continue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("continue;");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.C['switch_continue'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'continue;\n';
  return code;
};


Blockly.Blocks['controls_switch_case'] = {
  /**
   * Block for switch case/default condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput('CASE0')
        .appendField("case ")
        .appendField(new Blockly.FieldTextInput("0"), "EXPR0")
        .appendField(" :");
    this.appendStatementInput('DO0')
        .appendField();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_switch_case_in_case']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    /*this.setTooltip(function() {
      if (!thisBlock.caseCount_ && !thisBlock.defaultCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.caseCount_ && thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.caseCount_ && !thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.caseCount_ && thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });*/
    this.caseCount_ = 0;
    this.defCount_ = 0;
  },
  /**
   * Create XML to represent the number of case and defalut inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.caseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.caseCount_) {
      container.setAttribute('case', this.caseCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the case and default inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.caseCount_ = parseInt(xmlElement.getAttribute('case'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('controls_switch_case_first');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.caseCount_; i++) {
      var caseBlock = workspace.newBlock('controls_switch_case_in_case');
      caseBlock.initSvg();
      connection.connect(caseBlock.previousConnection);
      connection = caseBlock.nextConnection;
    }
    var statementBlock =  workspace.newBlock('controls_switch_case_in_stm');
    statementBlock.initSvg();
    connection.connect(statementBlock.previousConnection);
    connection = statementBlock.nextConnection;
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.caseCount_ = 0;
    var valueConnections = [null];
    var statementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_switch_case_in_case':
          this.caseCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
      //    statementConnection.push(clauseBlock.statementConnection_);
          break;
        case 'controls_switch_case_in_stm':
           statementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'compose: Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.caseCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'CASE' + i);
    }
      Blockly.Mutator.reconnect(statementConnection, this, 'DO0');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_switch_case_in_case':

          break;
        case 'controls_switch_case_in_stm':
          //var inputIf = this.getInput('CASE' + i);
          var inputDo = this.getInput('DO0');
        //  clauseBlock.valueConnection_ =
        //      inputIf && inputIf.connection.targetConnection;
         clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
  //        i++;
          break;
        default:
          throw 'saveConnections: Unknown block type.';
      }

      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    var i = 1;
    while (this.getInput('CASE' + i)) {
      this.removeInput('CASE' + i);
      i++;
    }
    this.removeInput('DO0');

    // Rebuild block.
    for (var i = 1; i <= this.caseCount_; i++) {
      this.appendDummyInput('CASE' + i)
          .appendField("       case ")
          .appendField(new Blockly.FieldTextInput(i), 'EXPR' + i)
          .appendField(" :");
      if ( i == this.caseCount_ ) {
          this.appendStatementInput('DO0')
              .appendField();
      }
    }
    if ( this.caseCount_ == 0 ) {
      this.appendStatementInput('DO0')
          .appendField();
    }
  }
};

Blockly.Blocks['controls_switch_case_first'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("case");
    this.setNextStatement(true);
    this.setTooltip();
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case_in_case'] = {
  /**
   * Mutator bolck for case condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("case");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case_in_stm'] = {
  /**
   * Mutator block for default condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("statement");
    this.setPreviousStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  }
};

Blockly.C['controls_switch_case'] = function(block) {
  // case/defalut condition.
  var n = 0;
  var argument = block.getFieldValue('EXPR' + n);
  var branch = Blockly.C.statementToCode(block, 'DO0');
  var code = 'case ' + argument + ' : ';
  for (n = 1; n <= block.caseCount_; n++) {
    code += '\n';
    argument = block.getFieldValue('EXPR' + n);
    code += 'case ' + argument + ' : ';
  }
  return code + branch + '\n';
};


Blockly.Blocks['controls_switch_case2'] = {
  /**
   * Block for switch case/default condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput('CASE0')
        .appendField("case ")
        .appendField(new Blockly.FieldTextInput("0"), "EXPR0")
        .appendField(" :");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_switch_case2_in_case',
                                         'controls_switch_case2_in_default']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    /*this.setTooltip(function() {
      if (!thisBlock.caseCount_ && !thisBlock.defaultCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.caseCount_ && thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.caseCount_ && !thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.caseCount_ && thisBlock.defCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });*/
    this.caseCount_ = 0;
    this.defCount_ = 0;
  },
  /**
   * Create XML to represent the number of case and defalut inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.caseCount_ && !this.defaultCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.caseCount_) {
      container.setAttribute('case', this.caseCount_);
    }
    if (this.defaultCount_) {
      container.setAttribute('default', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the case and default inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.caseCount_ = parseInt(xmlElement.getAttribute('case'), 10) || 0;
    this.defaultCount_ = parseInt(xmlElement.getAttribute('default'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('controls_switch_case2_first');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.caseCount_; i++) {
      var caseBlock = workspace.newBlock('controls_switch_case2_in_case');
      caseBlock.initSvg();
      connection.connect(caseBlock.previousConnection);
      connection = caseBlock.nextConnection;
    }
    if (this.defaultCount_) {
      var defaultBlock = workspace.newBlock('controls_switch_case2_in_default');
      defaultBlock.initSvg();
      connection.connect(defaultBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.caseCount_ = 0;
    this.defaultCount_ = 0;
    var valueConnections = [null];
    var caseConnection = null;
    var defaultConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_switch_case2_in_case':
          this.caseCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          caseConnection.push(clauseBlock.dummyConnection_);
          break;
        case 'controls_switch_case2_in_default':
          this.defaultCount_++;
          defaultConnection = clauseBlock.dummyConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.caseCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'CASE' + i);
    }
    Blockly.Mutator.reconnect(caseConnection, this, 'DO');
    Blockly.Mutator.reconnect(defaultConnection, this, 'DEFAULT');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_switch_case2_in_case':
          //var inputIf = this.getInput('CASE' + i);
          var inputDo = this.getInput('DO');
        //  clauseBlock.valueConnection_ =
        //      inputIf && inputIf.connection.targetConnection;
          clauseBlock.dummyConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        case 'controls_switch_case2_in_default':
          var inputDo = this.getInput('DEFAULT');
          clauseBlock.dummyConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('DEFAULT')) {
      this.removeInput('DEFALUTdummy');
      this.removeInput('DEFAULT');
    }
    var i = 1;
    while (this.getInput('CASE' + i)) {
      this.removeInput('CASE' + i);
      i++;
    }
    this.removeInput('DO');
    // Rebuild block.
    for (var i = 1; i <= this.caseCount_; i++) {
      this.appendDummyInput('CASE' + i)
          .appendField("       case ")
          .appendField(new Blockly.FieldTextInput(i), 'EXPR' + i)
          .appendField(" :");
    }
    if (this.defaultCount_) {
      this.appendDummyInput('DEFALUTdummy')
          .appendField('       default      :');
    }
    this.appendStatementInput('DO')
        .appendField();
  }
};

Blockly.Blocks['controls_switch_case2_first'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("case");
    this.setNextStatement(true);
    this.setTooltip();
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case2_in_case'] = {
  /**
   * Mutator bolck for case condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("case");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case2_in_default'] = {
  /**
   * Mutator block for default condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField("default");
    this.setPreviousStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  }
};

Blockly.C['controls_switch_case2'] = function(block) {
  // case/defalut condition.
  var n = 0;
  var argument = block.getFieldValue('EXPR' + n);
  var branch = Blockly.C.statementToCode(block, 'DO' + n);
  var code = 'case ' + argument + ' : ' + branch;
  for (n = 1; n <= block.caseCount_; n++) {
    argument = block.getFieldValue('EXPR' + n);
    branch = Blockly.C.statementToCode(block, 'DO' + n);
    code += 'case ' + argument + ' : ' + branch;
  }
  if (block.defaultCount_) {
    branch = Blockly.C.statementToCode(block, 'DEFAULT');
    code += ' default : ' + branch;
  }
  return code + '\n';
};


Blockly.Blocks['controls_if2'] = {
  /**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('IF0')
        .setCheck('Boolean')
        .appendField('if (');
    this.appendDummyInput('IF_STARTdummy0')
        .appendField(') {');
    this.appendStatementInput('DO0');
    this.appendDummyInput('ENDdummy')
        .appendField('}');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['controls_if2_elseif',
                                         'controls_if2_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('controls_if2_if');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('controls_if2_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('controls_if2_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if2_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'controls_if2_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if2_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if2_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
      this.removeInput('ELSEdummy1');
    }
      this.removeInput('ENDdummy');
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('IF_STARTdummy' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck('Boolean')
          .appendField('} else if (');
      this.appendDummyInput('IF_STARTdummy' + i)
          .appendField(') {');
      this.appendStatementInput('DO' + i);
    }
    if (this.elseCount_) {
      this.appendDummyInput('ELSEdummy1')
          .appendField('} else {');
      this.appendStatementInput('ELSE');
    }
      this.appendDummyInput('ENDdummy')
          .appendField('}');
  }
};

Blockly.Blocks['controls_if2_if'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if2_elseif'] = {
  /**
   * Mutator bolck for else-if condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if2_else'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.C['controls_if2'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.C.valueToCode(block, 'IF' + n,
      Blockly.C.ORDER_NONE) || 'false';
  var branch = Blockly.C.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.C.valueToCode(block, 'IF' + n,
        Blockly.C.ORDER_NONE) || 'false';
    branch = Blockly.C.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.C.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.Python['controls_if2'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'false';
  var branch = Blockly.Python.statementToCode(block, 'DO' + n);
  var code = 'if ' + argument + ':\n' + branch + '';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Python.valueToCode(block, 'IF' + n,
        Blockly.Python.ORDER_NONE) || 'false';
    branch = Blockly.Python.statementToCode(block, 'DO' + n);
    code += ' elif ' + argument + ':\n' + branch + '';
  }
  if (block.elseCount_) {
    branch = Blockly.Python.statementToCode(block, 'ELSE');
    code += ' else:\n' + branch + '';
  }
  return code + '\n';
};

Blockly.Blocks['cond'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendValueInput("B")
        .setCheck(null)
        .appendField("？");
    this.appendValueInput("C")
        .setCheck(null)
        .appendField("：");
    this.appendDummyInput()
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['cond'] = function(block) {
  var value_a = Blockly.C.valueToCode(block, 'A', Blockly.C.ORDER_ATOMIC);
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var value_c = Blockly.C.valueToCode(block, 'C', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_a + ' ? ' + value_b + ' : ' + value_c + ';\n';
  return code;
};

Blockly.Python['cond'] = function(block) {
  var value_a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC);
  var value_b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
  var value_c = Blockly.Python.valueToCode(block, 'C', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_a + ' if ' + value_b + ' else ' + value_c + '\n';
  return code;
};

Blockly.Blocks['in_cond'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendValueInput("B")
        .setCheck(null)
        .appendField("？");
    this.appendValueInput("C")
        .setCheck(null)
        .appendField("：");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.C['in_cond'] = function(block) {
  var value_a = Blockly.C.valueToCode(block, 'A', Blockly.C.ORDER_ATOMIC);
  var value_b = Blockly.C.valueToCode(block, 'B', Blockly.C.ORDER_ATOMIC);
  var value_c = Blockly.C.valueToCode(block, 'C', Blockly.C.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_a + ' ? ' + value_b + ' : ' + value_c + ' ';
  return [code, 0];
};

Blockly.Python['in_cond'] = function(block) {
  var value_a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC);
  var value_b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
  var value_c = Blockly.Python.valueToCode(block, 'C', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_a + ' if ' + value_b + ' else ' + value_c + '\n';
  return [code, 0];
};