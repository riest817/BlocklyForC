//capacity 
    Blockly.inject(document.getElementById('content_area'),
        {path: '../../', maxBlocks: 10, toolbox: document.getElementById('toolbox')});
    Blockly.addChangeListener(onchange);

onchange = function() {
      document.getElementById('capacity').innerHTML = Blockly.mainWorkspace.remainingCapacity();
    };
