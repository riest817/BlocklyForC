﻿/**
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.logic');

goog.require('Blockly.Blocks');


Blockly.Blocks['controls_if'] = {
  // If/elseif/else condition.
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(210);
    this.appendValueInput('IF0')
        //.setCheck('Boolean')
        .setCheck('Number')
        .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    /*this.setTooltip(function() {
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
    });*/
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return '条件式が成立する場合、中のブロックの式を実行します。';
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return '条件式が成立する場合は最初の式を実行し、成立しない場合は次の式を実行します。';
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return '条件式が成立する場合は最初の式を実行し、成立しない場合、次の条件式を参照します。';
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return '条件式が成立する場合は最初の式を実行し、成立しない場合、次の条件式を参照します。';
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
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
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
    for (var x = 1; x <= this.elseifCount_; x++) {
      this.appendValueInput('IF' + x)
          //.setCheck('Boolean')
          .setCheck('Number')
          .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + x)
          .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = new Blockly.Block(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = new Blockly.Block(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var x = this.elseifCount_; x > 0; x--) {
      this.removeInput('IF' + x);
      this.removeInput('DO' + x);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              //.setCheck('Boolean')
              .setCheck('Number')
              .appendTitle(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendTitle(Blockly.Msg.CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendTitle(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + x);
          var inputDo = this.getInput('DO' + x);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          x++;
          break;
        case 'controls_if_else':
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
  }
};

Blockly.Blocks['controls_if_if'] = {
  // If condition.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_elseif'] = {
  // Else-If condition.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_else'] = {
  // Else condition.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['logic_compare'] = {
  // Comparison operator.
  init: function() {
    if (Blockly.RTL) {
      var OPERATORS = [
        ['=', 'EQ'],
        ['\u2260', 'NEQ'],
        ['>', 'LT'],
        ['\u2265', 'LTE'],
        ['<', 'GT'],
        ['\u2264', 'GTE']
      ];
    } else {
      var OPERATORS = [
        ['=', 'EQ'],
        ['\u2260', 'NEQ'],
        ['<', 'LT'],
        ['\u2264', 'LTE'],
        ['>', 'GT'],
        ['\u2265', 'GTE']
      ];
    }
    this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
    this.setColour(210);
    //this.setOutput(true, 'Boolean');
    this.setOutput(true, 'Number');
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      var TOOLTIPS = {
        EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
        LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
        GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['logic_operation'] = {
  // Logical operations: 'and', 'or'.
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
         [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']];
    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
    this.setColour(210);
    //this.setOutput(true, 'Boolean');
    this.setOutput(true, 'Number');
    this.appendValueInput('A')
        //.setCheck('Boolean');
        .setCheck('Number');
    this.appendValueInput('B')
        //.setCheck('Boolean')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      var TOOLTIPS = {
        AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
        OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
      };
      return thisBlock.TOOLTIPS[op];
    });
  }
};


Blockly.Blocks['logic_negate'] = {
  // Negation.
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);
    this.setColour(210);
    //this.setOutput(true, 'Boolean');
    this.setOutput(true, 'Number');
    //this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
    //                    ['BOOL', 'Boolean', Blockly.ALIGN_RIGHT],
    //                    Blockly.ALIGN_RIGHT)
    this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
                        ['BOOL', 'Number', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT)
    this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.Blocks['logic_boolean'] = {
  // Boolean data type: true and false.
  init: function() {
    var BOOLEANS =
        [[Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
         [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']];
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(210);
    //this.setOutput(true, 'Boolean');
    this.setOutput(true, 'Number');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['logic_null'] = {
  // Null data type.
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);
    this.setColour(210);
    this.setOutput(true);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.LOGIC_NULL);
    this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
  }
};

Blockly.Blocks['logic_ternary'] = {
  // Ternary operator.
  init: function() {
    this.setHelpUrl(Blockly.Msg.LOGIC_TERNARY_HELPURL);
    this.setColour(210);
    this.appendValueInput('IF')
        //.setCheck('Boolean')
        .setCheck('Number')
        //.appendTitle(Blockly.Msg.LOGIC_TERNARY_CONDITION);
        .appendTitle('if');
    this.appendValueInput('THEN')
        //.appendTitle(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);
        .appendTitle('then');
    this.appendValueInput('ELSE')
        //.appendTitle(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);
        .appendTitle('else');
    this.setOutput(true);
    //this.setTooltip(Blockly.Msg.LOGIC_TERNARY_TOOLTIP);
    this.setTooltip('最初の条件式が成立する場合は2番目の式を、成立しない場合は3番目の式を実行します。');
  }
};

Blockly.Blocks['controls_switch'] = {
  // If/elseif/else condition.
  init: function() {
    this.setHelpUrl('');
    this.setColour(210);
    this.appendValueInput('SW')
        //.setCheck('Boolean')
        .setCheck('Number')
        .appendTitle('switch');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_switch_case']));
    this.caseCount_ = 3;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('case', this.caseCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    this.caseCount_ = parseInt(xmlElement.getAttribute('case'), 10);
    for (var x = 1; x <= this.caseCount_; x++) {
      this.appendValueInput('CASE' + x)
          .setCheck('Number')
          .appendTitle('case');
      this.appendStatementInput('DO' + x)
          .appendTitle('do');
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'controls_switch_switch');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.caseCount_; x++) {
      var caseBlock = new Blockly.Block(workspace, 'controls_switch_case');
      caseBlock.initSvg();
      connection.connect(caseBlock.previousConnection);
      connection = caseBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    for (var x = this.caseCount_; x > 0; x--) {
        this.removeInput('CASE' + x);
        this.removeInput('DO' + x);
    }
    this.caseCount_ = 0;
    // Rebuild the block's inputs.
    var caseBlock = containerBlock.getInputTargetBlock('STACK');
    while (caseBlock) {
      this.caseCount_++;
      var caseInput = this.appendValueInput('CASE' + this.caseCount_)
          .setCheck('Number')
          .appendTitle('case');
      var doInput = this.appendStatementInput('DO' + this.caseCount_);
      doInput.appendTitle('do');
      // Reconnect any child blocks.
      if (caseBlock.valueConnection_) {
        caseInput.connection.connect(caseBlock.valueConnection_);
      }
      if (caseBlock.statementConnection_) {
        doInput.connection.connect(caseBlock.statementConnection_);
      }
      caseBlock = caseBlock.nextConnection &&
          caseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var caseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (caseBlock) {
      var input = this.getInput('CASE' + x);
      caseBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      caseBlock = caseBlock.nextConnection &&
          caseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['controls_switch_switch'] = {
  // If condition.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle('switch');
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case'] = {
  // Else-If condition.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle('case');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

