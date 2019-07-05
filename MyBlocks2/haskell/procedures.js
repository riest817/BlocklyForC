/**
2017/12/05 procedures.js 新規作成
17/12/12 ['procedures_call'] 追加
17/12/21 ['procedures_defreturn'] パターンマッチングの形に変更
18/02/01 ['procedures_call2'] 作成
18/02/01  関数呼び出しを['procedures_call']から['procedures_call2']に変更
18/12/19 ['procedures_defreturn_statement'] 作成
19/01/09 ['procedures_defreturn_where'] ['procedures_defreturn_statement_where'] 作成
19/01/15 ['procedures_single'] 作成
 */
goog.provide('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks');
/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Msg["PROCEDURES_HUE"] = 290;

Blockly.Blocks['procedures_defreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.appendValueInput('DELTA')
        .appendField("式 ===> ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setStatements_(false);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    

  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};

// 18/12/19
Blockly.Blocks['procedures_defreturn_statement'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.appendStatementInput('DELTA')
        .appendField("文");  
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setStatements_(false);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    //this.arguments_.length = this.arguments_.length - 1;
    //this.statementConnection_ = null;
    statement_f = true;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    
  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};
// 18/12/19 ここまで

// 18/01/09
Blockly.Blocks['procedures_defreturn_where'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.appendValueInput('DELTA')
        .appendField("式 ===> ");
    this.appendStatementInput('WHERE')
        .appendField("where"); 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setStatements_(false);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    

  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};

Blockly.Blocks['procedures_defreturn_statement_where'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.appendStatementInput('DELTA')
        .appendField("文");  
    this.appendStatementInput('WHERE')
        .appendField("where"); 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setStatements_(false);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    //this.arguments_.length = this.arguments_.length - 1;
    //this.statementConnection_ = null;
    statement_f = true;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    
  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};
// 19/01/09 ここまで

Blockly.Blocks['procedures_mutatorcontainer'] = {
  /**
   * Mutator block for procedure container.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("結合");
    this.appendStatementInput('STACK');
    //this.appendStatementInput('RETURN');
    this.appendDummyInput('STATEMENT_INPUT')
        .appendField("")
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("この関数への引数の追加、削除、順番の変更");
    this.contextMenu = false;
  }
};

Blockly.Blocks['procedures_mutatorarg'] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        //.appendField("引数")
        .appendField('引数', 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数への引数の追加");
    this.contextMenu = false;
  },
  /**
   * Obtain a valid name for the procedure.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Beyond this, all names are legal.
   * @param {string} newVar User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified.
   * @private
   * @this Blockly.Block
   */
  validator_: function(newVar) {
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
  }
};

Blockly.Blocks['procedures_callreturn'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(new Blockly.FieldTextInput(''), 'NAME');
    this.setOutput(true);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    // Tooltip is set in domToMutation.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    //this.arguments_.length = this.arguments_.length - 1;
  },
  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_:
      Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  //updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {  
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) { 
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    
    if (statement_f) {
      this.jsonInit({
        "message0": "式 ===> %1",
        "args0": [
          {
            "type": "input_value",
            "name": "DELTA",
            //"check": "Number"   // 17/12/12 コメントアウト
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": Blockly.Blocks.procedures.HUE,
        "helpUrl": Blockly.Msg.MATH_CHANGE_HELPURL
      });
      statement_f = false;
    }
    
  },
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
  onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
  customContextMenu:
      Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
  defType_: 'procedures_defreturn'
};


/////(17/12/12  追加)//////////////////////////////////////////////////////////////////////////////

Blockly.Blocks['procedures_call'] = {

  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(this.id, 'NAME');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    // Tooltip is set in renameProcedure.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      this.setTooltip(
          (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
           Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
          .replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function(paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }
    if (goog.array.equals(this.arguments_, paramNames)) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkIds_ = paramIds;
      } else {
        this.quarkIds_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
            paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours_();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT);
            //.appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        this.getField('ARGNAME' + i).setValue(newName);
      }
    }
  },
  /**
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (event.type == Blockly.Events.CREATE &&
        event.ids.indexOf(this.id) != -1) {
      // Look for the case where a procedure call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && (def.type != this.defType_ ||
          JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
        /**
         * Create matching definition block.
         * <xml>
         *   <block type="procedures_defreturn" x="10" y="20">
         *     <mutation name="test">
         *       <arg name="x"></arg>
         *     </mutation>
         *     <field name="NAME">test</field>
         *   </block>
         * </xml>
         */
        var xml = goog.dom.createDom('xml');
        var block = goog.dom.createDom('block');
        block.setAttribute('type', this.defType_);
        var xy = this.getRelativeToSurfaceXY();
        var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        var y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        var mutation = this.mutationToDom();
        block.appendChild(mutation);
        var field = goog.dom.createDom('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(document.createTextNode(this.getProcedureCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  },
  //defType_: 'procedures_defnoreturn'
};

Blockly.Blocks['procedures_create_join_container'] = {
  /**
   * Mutator block for container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.appendDummyInput()
        .appendField("結合");
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['procedures_create_join_item'] = {
  /**
   * Mutator block for add items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.appendDummyInput()
        .appendField("引数");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("関数へ引数を追加");
    this.contextMenu = false;
  }
};

/////(17/12/12  追加ここまで )//////////////////////////////////////////////////////////////////////////

Blockly.Blocks['procedures_call2'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField("関数")
        .appendField('', 'NAME');
    this.setOutput(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    //this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    // Tooltip is set in domToMutation.
    this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },

  updateShape_: function() {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length-1) {
        if (!this.getField('WITH')) {
          topRow.appendField(""/*Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS*/, 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },

  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_:
      Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  //updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
  onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
  customContextMenu:
      Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
  defType_: 'procedures_defreturn',
  decompose: Blockly.Blocks['procedures_defreturn'].decompose    // ← 問題あり
};

// 19/01/15
Blockly.Blocks['procedures_single'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */

  init: function() {
    this.appendDummyInput()
        .appendField("関数名")
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('', 'PARAMS');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
    }
    this.setColour(Blockly.Msg["PROCEDURES_HUE"]);
    this.setTooltip("関数によるパターンマッチングを行います。");
    this.setHelpUrl();
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  //updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  updateParams_    : function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      this.arguments_[i] = '引数' + (i+1);  // 18/11/29 追加
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField("対象：", 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
    

  },
  //mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  mutationToDom    : function (a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var d = document.createElement("arg");
            d.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
  //domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  domToMutation    : function (a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) 
            "arg" == c
                .nodeName
                .toLowerCase() && this
                .arguments_
                .push(c.getAttribute("name"));
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
  //decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  decompose        : function (a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN")
            ? b.setFieldValue(
                this.hasStatements_
                    ? "TRUE"
                    : "FALSE",
                "STATEMENTS"
            )
            : b
                .getInput("STATEMENT_INPUT")
                .setVisible(!1);
        for (
            var c = b.getInput("STACK").connection,
            d     = 0;
            d < this.arguments_.length;
            d++
        ) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly
            .Procedures
            .mutateCallers(this);
        return b
    },
  //compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  compose          : function (a) {
        this.arguments_ = [];
        this.paramIds_  = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) 
            this
                .arguments_
                .push(b.getFieldValue("NAME")),
            this
                .paramIds_
                .push(b.id),
            b = b.nextConnection && b
                .nextConnection
                .targetBlock();
        this.updateParams_();
        Blockly
            .Procedures
            .mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a)) 
            if (a) 
                //this.setStatements_(!0),
                Blockly
                    .Mutator
                    .reconnect(this.statementConnection_, this, "STACK"),
                this.statementConnection_ = null;
            else {
                a = this
                    .getInput("STACK")
                    .connection;
                if (this.statementConnection_ = a.targetConnection) 
                    a = a.targetBlock(),
                    a.unplug(),
                    a.bumpNeighbours_();
                this.setStatements_(!1)
            }
        },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  //getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  //renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  //callType_: 'procedures_callreturn'
  callType_: 'procedures_call2'
};
// 19/01/15 ここまで