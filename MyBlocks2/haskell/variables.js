Blockly.Msg["VARIABLES_SET"] = "%1 = %2";


Blockly.Blocks['variables_set'] = {
    init: function() {
        this.jsonInit( {
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
              {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
              },
              {
                "type": "input_value",
                "name": "VALUE"
              }
            ],
            "previousStatement": "DECL",
            "nextStatement": "DECL",
            "style": "variable_blocks",
            "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
            "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
            "extensions": ["contextMenu_variableSetterGetter"]
          });

        // this.appendDummyInput()
        //     .appendField(new Blockly.FieldVariable(Blockly.Msg["VARIABLES_DEFAULT_NAME"]), "VAR");
        // this.appendValueInput('VALUE').appendField(' = ');
        // this.setPreviousStatement(true, "DECL");
        // this.setNextStatement(true, "DECL");
        // this.setInputsInline(true);
        // this.setOutput(false);
        // this.setColour(Blockly.Msg["VARIABLES_HUE"]);
        // this.setTooltip(Blockly.Msg["VARIABLES_SET_TOOLTIP"]);
        // this.setHelpUrl(Blockly.Msg["VARIABLES_SET_HELPURL"]);
        // this.setStyle("variable_blocks");
        // this.setExtensions(["contextMenu_variableSetterGetter"]);
    }
};
