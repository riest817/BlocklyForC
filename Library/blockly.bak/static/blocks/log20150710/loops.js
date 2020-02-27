/**
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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');


Blockly.Blocks['controls_repeat'] = {
  // Repeat n times (internal number).
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldTextInput('10',
            Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES')
        .appendTitle(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Blocks['controls_repeat_ext'] = {
  // Repeat n times (external number).
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
    this.setColour(120);
    this.interpolateMsg(Blockly.Msg.CONTROLS_REPEAT_TITLE,
                        ['TIMES', 'Number', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    /*this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);*/
    this.appendStatementInput('DO')
        .appendTitle('実行');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Blocks['controls_whileUntil'] = {
  // Do while/until loop.
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
         [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
    this.setColour(120);
    this.appendValueInput('BOOL')
        //.setCheck('Boolean')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('MODE');
      var TOOLTIPS = {
        //WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
        //UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
        WHILE: '条件式が成立する間、中のブロックの式を繰り返します。',
        UNTIL: '条件式が成立しない間、中のブロックの式を繰り返します。'
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['controls_for'] = {
  // For loop.
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_FOR_HELPURL);
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle("repeat for")
        .appendTitle(new Blockly.FieldVariable(null), 'VAR');
    this.interpolateMsg("from %1 to %2 by %3",
                        ['FROM', 'Number', Blockly.ALIGN_RIGHT],
                        ['TO', 'Number', Blockly.ALIGN_RIGHT],
                        ['BY', 'Number', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });*/
    this.setTooltip('変数をカウントしながら中のブロックの式を繰り返します。');
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getTitleValue('VAR');
    option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
    var xmlTitle = goog.dom.createDom('title', null, name);
    xmlTitle.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
    xmlBlock.setAttribute('type', 'variables_get');
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Blocks['controls_forEach'] = {
  // For each loop.
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_FOREACH_HELPURL);
    this.setColour(120);
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendTitle(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR')
        .appendTitle(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST);
    if (Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL) {
      this.appendDummyInput()
          .appendTitle(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL);
      this.setInputsInline(true);
    }
    this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['controls_for'].customContextMenu
};

Blockly.Blocks['controls_flow_statements'] = {
  // Flow statements: continue, break.
  init: function() {
    var OPERATORS =
        //[[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
        // [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];
        [['break', 'BREAK'],
         ['continue', 'CONTINUE']];
    this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'FLOW');
    this.setPreviousStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('FLOW');
      var TOOLTIPS = {
        BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
        CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
      };
      return thisBlock.TOOLTIPS[op];
    });
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a control statement?
    var block = this;
    do {
      if (block.type == 'controls_switch' ||
          block.type == 'controls_repeat' ||
          block.type == 'controls_repeat_ext' ||
          block.type == 'controls_forEach' ||
          block.type == 'controls_for' ||
          block.type == 'controls_whileUntil') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      //this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
      this.setWarningText('このブロックはfor文、while文、switch文の中だけで使ってください。');
    }
  }
};

Blockly.Blocks['controls_dowhile'] = {
  // Do while/until loop.
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
         [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
    this.setColour(120);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
    this.appendValueInput('BOOL')
        //.setCheck('Boolean')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('MODE');
      var TOOLTIPS = {
        WHILE: '中のブロックの式を実行し、条件式が成立する間はその式を繰り返します。',
        UNTIL: '中のブロックの式を実行し、条件式が成立しない間はその式を繰り返します。'
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['quiz1_for'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle("for ( i = 0; i")
        .appendTitle(new Blockly.FieldDropdown([["> 5", "> 5"], ["< 5", "< 5"], [">= 5", ">= 5"]]), "option")
        .appendTitle("; i++ ) {");
    this.appendStatementInput("DO")
        .appendTitle("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['quiz2_while'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle("while ( ")
        .appendTitle(new Blockly.FieldDropdown([["n", "n"], ["n > 0", "n > 0"], ["n < 0", " n < 0"]]), "option")
        .appendTitle(" ) {");
    this.appendStatementInput("DO")
        .appendTitle("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};