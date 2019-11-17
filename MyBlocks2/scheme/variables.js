Blockly.Msg["VARIABLES_SET"] = "(set %1 %2)";
Blockly.Msg["VARIABLES_DECL"] = "(%1 %2)";
Blockly.Msg["VARIABLES_DEFILE"] = "(define %1 %2)";

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
            "output": true,
            "style": "variable_blocks",
            "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
            "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
            "extensions": ["contextMenu_variableSetterGetter"]
          });
    }
};

Blockly.Blocks['scheme_variables_decl'] = {
    init: function() {
        this.jsonInit( {
            "message0": "%{BKY_VARIABLES_DECL}",
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
    }
};

Blockly.Blocks['scheme_variables_define'] = {
    init: function() {
        this.jsonInit( {
            "message0": "%{BKY_VARIABLES_DEFILE}",
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
    }
};