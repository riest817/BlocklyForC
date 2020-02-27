Blockly.PrologFunctors = {};
Blockly.PROLOG_FUNCTOR_CATEGORY_NAME = 'PROLOG_FUNCTOR';
Blockly.PrologFunctors.NAME_TYPE = Blockly.PROLOG_FUNCTOR_CATEGORY_NAME;

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.PrologFunctors.nameComparator_ = function(ta, tb) {
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
Blockly.PrologFunctors.allPrologFunctors = function(root) {
  var blocks = root.getAllBlocks(false);
  var reNames = [];
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (block.type === 'functor_definition') {
      let name = block.getFieldValue('NAME');
      let idx = reNames.findIndex(([n,j]) => n == name);
      if (idx >= 0) continue;
      reNames.push([name, block.itemCount_]);
    }
  }
  reNames.sort(Blockly.PrologFunctors.nameComparator_);
  return reNames;
};

/**
 * Construct the blocks required by the flyout for the function category.
 * @param {!Blockly.Workspace} workspace The workspace containing functions.
 * @return {!Array.<!Element>} Array of XML block elements.
 */

Blockly.PrologFunctors.flyoutCategory = function(workspace) {
  var xmlList = [];

  if (Blockly.Blocks['functor_definition']) {
    var block = Blockly.Xml.utils.createElement('block');
    block.setAttribute('type', 'functor_definition');
    block.setAttribute('gap', 16);
    var nameField = Blockly.Xml.utils.createElement('field');
    nameField.setAttribute('name', 'NAME');
    nameField.appendChild(Blockly.Xml.utils.createTextNode("atom_name"));
    block.appendChild(nameField);
    xmlList.push(block);
  }

  if (xmlList.length) {
    // Add slightly larger gap between system blocks and user calls.
    xmlList[xmlList.length - 1].setAttribute('gap', 24);
  }

  function populateNames(nameList, templateName) {
    for (var i = 0; i < nameList.length; i++) {
      var name  = nameList[i][0];
      var items = nameList[i][1];
      // <block type="?" gap="16">
      // </block>
      var block = Blockly.Xml.utils.createElement('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);

      var nameField = Blockly.Xml.utils.createElement('field');
      nameField.setAttribute('name', 'NAME');
      nameField.appendChild(Blockly.Xml.utils.createTextNode(name));
      block.appendChild(nameField);

      var mutation = Blockly.Xml.utils.createElement('mutation');
      mutation.setAttribute('items', items)
      block.appendChild(mutation);

      xmlList.push(block);
    }
  }

  var tuple = Blockly.PrologFunctors.allPrologFunctors(workspace);
  populateNames(tuple, 'functor_definition');
  return xmlList;
};

Blockly.PrologFunctors.init = function(workspace)  {
  if (Blockly.PrologFunctors && Blockly.PrologFunctors.flyoutCategory) {
    workspace.registerToolboxCategoryCallback(Blockly.PROLOG_FUNCTOR_CATEGORY_NAME,
        Blockly.PrologFunctors.flyoutCategory);
  } 
}

// 登録順に呼び出される。
window.addEventListener('load', function() { Blockly.PrologFunctors.init(Code.workspace); });
