Blockly.SchemeFunctions = {};
Blockly.SCHEME_FUNCTION_CATEGORY_NAME = 'SCHEME_FUNCTION';
Blockly.SchemeFunctions.NAME_TYPE = Blockly.SCHEME_FUNCTION_CATEGORY_NAME;

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.SchemeFunctions.nameComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Find all user-created name definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Blockly.SchemeFunctions.allSchemeFunctions = function(root) {
  var blocks = root.getAllBlocks(false);
  var reNames = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getProcedureDef) {
      var tuple = blocks[i].getProcedureDef();
      if (tuple[0] == "") continue;
      if (tuple && !reNames.find(elm => elm[0] == tuple[0])) {
          reNames.push(tuple);
      }
    }
  }
  reNames.sort(Blockly.SchemeFunctions.nameComparator_);
  return reNames;
};

/**
 * Construct the blocks required by the flyout for the function category.
 * @param {!Blockly.Workspace} workspace The workspace containing functions.
 * @return {!Array.<!Element>} Array of XML block elements.
 */

Blockly.SchemeFunctions.flyoutCategory = function(workspace) {
  var xmlList = [];

  //       <block type="procedures_lambda"></block>
  if (Blockly.Blocks['procedures_lambda']) {
    var block = Blockly.Xml.utils.createElement('block');
    block.setAttribute('type', 'procedures_lambda');
    block.setAttribute('gap', 16);

    // var returnField = Blockly.Xml.utils.createElement('value');
    // returnField.setAttribute('name', 'ADD0');
    // var shadow = Blockly.Xml.utils.createElement('block');
    // shadow.setAttribute('type', 'scheme_implicit_begin');
    // shadow.setAttribute('inline', 'true');
    var mutation = Blockly.Xml.utils.createElement('mutation');
    mutation.setAttribute('items', '1');
    block.appendChild(mutation);
    // shadow.appendChild(mutation);
    // returnField.appendChild(shadow);
    // block.appendChild(returnField);

    xmlList.push(block);
  }

  if (Blockly.Blocks['procedures_defreturn']) {
    // <block type="re_name_def" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.Xml.utils.createElement('block');
    block.setAttribute('type', 'procedures_defreturn');
    block.setAttribute('gap', 16);
    var nameField = Blockly.Xml.utils.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.Xml.utils.createTextNode("function_name"));
    block.appendChild(nameField);
    // var returnField = Blockly.Xml.utils.createElement('value');
    // returnField.setAttribute('name', 'RETURN');
    // var shadow = Blockly.Xml.utils.createElement('block');
    // shadow.setAttribute('type', 'scheme_implicit_begin');
    // shadow.setAttribute('inline', 'true');
    var mutation = Blockly.Xml.utils.createElement('mutation');
    mutation.setAttribute('items', '1');
    block.appendChild(mutation);
    // shadow.appendChild(mutation);
    // returnField.appendChild(shadow);
    // block.appendChild(returnField);

    xmlList.push(block);
  }

  if (Blockly.Blocks['procedures_callreturn']) {
    // <block type="re_name_def" gap="16">
    //     <field name="NAME">do something</field>
    // </block>
    var block = Blockly.Xml.utils.createElement('block');
    block.setAttribute('type', 'procedures_callreturn');
    block.setAttribute('inline', 'true');
    var nameField = Blockly.Xml.utils.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.Xml.utils.createTextNode("function_name"));
    block.appendChild(nameField);
    xmlList.push(block);
  }
  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
  }

  function populateNames(nameList) {
    for (var i = 0; i < nameList.length; i++) {
      var name = nameList[i][0];
      var args = nameList[i][1];
      // <block type="?" gap="16">
      // </block>
      var block = Blockly.Xml.utils.createElement('block');
      block.setAttribute('type','procedures_callreturn');
      block.setAttribute('inline', 'true');
      block.setAttribute('gap', 16);

      var nameField = Blockly.Xml.utils.createElement('field');
      nameField.setAttribute('name', 'NAME');
      nameField.appendChild(Blockly.Xml.utils.createTextNode(name));
      block.appendChild(nameField);

      var mutation = Blockly.Xml.utils.createElement('mutation');
      block.appendChild(mutation);
      for (var j = 0; j < args.length; j++) {
        var arg = Blockly.Xml.utils.createElement('arg');
        arg.setAttribute('name', args[j]);
        mutation.appendChild(arg);
      }

      xmlList.push(block);
    }
  }

  var tuple = Blockly.SchemeFunctions.allSchemeFunctions(workspace);
  // populateNames(tuple, 'procedures_callreturn');
  populateNames(tuple);
  return xmlList;
};

Blockly.SchemeFunctions.init = function(workspace)  {
  if (Blockly.SchemeFunctions && Blockly.SchemeFunctions.flyoutCategory) {
    workspace.registerToolboxCategoryCallback(Blockly.SCHEME_FUNCTION_CATEGORY_NAME,
        Blockly.SchemeFunctions.flyoutCategory);
  } 
}

// 登録順に呼び出される。
window.addEventListener('load', function() { Blockly.SchemeFunctions.init(Code.workspace); });


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategoryBlocks = function(workspace) {
  var variableModelList = workspace.getVariablesOfType('');

  var xmlList = [];
  if (variableModelList.length > 0) {
    // New variables are added to the end of the variableModelList.
    var mostRecentVariableFieldXmlString =
      Blockly.Variables.generateVariableFieldXmlString(
          variableModelList[variableModelList.length - 1]);
    if (Blockly.Blocks['variables_set']) {
      var gap = Blockly.Blocks['math_change'] ? 8 : 24;
      var blockText = '<xml>' +
          '<block type="variables_set" inline="true" gap="' + gap + '">' +
          mostRecentVariableFieldXmlString +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['scheme_variables_decl']) {
      var gap = Blockly.Blocks['math_change'] ? 8 : 24;
      var blockText = '<xml>' +
          '<block type="scheme_variables_decl" inline="true" gap="' + gap + '">' +
          mostRecentVariableFieldXmlString +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
    if (Blockly.Blocks['scheme_variables_define']) {
      var gap = Blockly.Blocks['math_change'] ? 8 : 24;
      var blockText = '<xml>' +
          '<block type="scheme_variables_define" inline="true" gap="' + gap + '">' +
          mostRecentVariableFieldXmlString +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
/*
    if (Blockly.Blocks['math_change']) {
      var gap = Blockly.Blocks['variables_get'] ? 20 : 8;
      var blockText = '<xml>' +
          '<block type="math_change" gap="' + gap + '">' +
          mostRecentVariableFieldXmlString +
          '<value name="DELTA">' +
          '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>' +
          '</block>' +
          '</xml>';
      var block = Blockly.Xml.textToDom(blockText).firstChild;
      xmlList.push(block);
    }
*/
    if (Blockly.Blocks['variables_get']) {
      variableModelList.sort(Blockly.VariableModel.compareByName);
      for (var i = 0, variable; variable = variableModelList[i]; i++) {
        var blockText = '<xml>' +
            '<block type="variables_get" gap="8">' +
            Blockly.Variables.generateVariableFieldXmlString(variable) +
            '</block>' +
            '</xml>';
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
      }
    }
  }
  return xmlList;
};




