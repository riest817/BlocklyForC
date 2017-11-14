/* ===================================================================
2017/11/14 common2.js 新規作成


 ///////////////   各言語の html ファイルの共通する関数群をこちらに移動

*/

function tabClick(clickedName) {
  // If the XML tab was open, save and render the content.
  if ($("#tabXml").hasClass('tabon')) {
    var xmlTextarea = $('#contentXml');
    var xmlText = xmlTextarea.val();
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q = window.confirm(MSG['badXml'].replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, workspace);
    }
  }

  if ($("#tabBlocks").hasClass('tabon')) {
    workspace.setVisible(false);
  }

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < tabs.length; i++) {
    var name = tabs[i];
    $('#tab' + name).removeClass('tabon');
    $('#tab' + name).addClass('taboff');
    $('#content' + name).css("visibility", 'hidden');
  }

  // Select the active tab.
  selected = clickedName;
  $('#tab' + clickedName).removeClass('taboff');
  $('#tab' + clickedName).addClass('tabon');
  $('#content' + clickedName).css("visibility", 'visible');

  renderContent(clickedName);

  if (clickedName == 'Blocks') {
    workspace.setVisible(true);
  }
  Blockly.svgResize(workspace);
}

$(function() {
    workspace = Blockly.inject('contentBlock',
       { toolbox: document.getElementById('toolbox'),
         zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }
       });

    BlocklyStorage.backupOnUnload(workspace);

//    workspace.addChangeListener(Blockly.Events.disableOrphans);

    var clean = $.query.get("clean");
    if (clean != null && (clean.toLowerCase() == "true" || clean.toLowerCase() == "yes")) {
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
    } else {
        window.setTimeout(function () {
//            BlocklyStorage.restoreBlocks(workspace);
              var url = window.location.href.split('#')[0];
              if ('localStorage' in window) {
                var memo = window.localStorage[url];
                if (memo) {
                    var xml = Blockly.Xml.textToDom(memo);
                    if (xml.hasChildNodes()) {
                        Blockly.Xml.domToWorkspace(xml, workspace);
                        return;
                    }
                    // xml が空だったら続行する
                }
              }
              var xmlUrl = $.query.get("url");
              if (xmlUrl) {
                $.ajax({ url: xmlUrl, dataType: "text" }).done(function(data) {
                    var xml = Blockly.Xml.textToDom(data);
                    Blockly.Xml.domToWorkspace(xml, workspace);
                });
              } else {
                Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
              }
        }, 0);
    }

    $("#intro").click(function() {
//      alert("intro");
      var tour = introJs();
      tour.setOption('tooltipPosition', 'auto');
      tour.start();
      return false;
    });

    $("#saveButton").click(function() {
       var xmlText;
       if ($('#tabXml').hasClass('tabon')) {
           xmlText = $('#contentXml').val();
       } else {
           var xmlDom  = Blockly.Xml.workspaceToDom(workspace);
           xmlText     = Blockly.Xml.domToPrettyText(xmlDom);
       }
       var blob    = new Blob([xmlText], { type: 'text/xml' });
       $("#saveButton").attr('href', window.URL.createObjectURL(blob));
    });

    $("#openButton").click(function() {
      $("#openButtonAux").click();
      return false;
    });

    $("#openButtonAux").change(function(evt) {
       var f = evt.target.files[0];
       var reader = new FileReader();

       reader.onload = function(e) {
         var xmlText = e.target.result;
         $("contentXml").val(xmlText);
         if (!$('#tabXml').hasClass('tabon')) {
           try {
             xmlDom = Blockly.Xml.textToDom(xmlText);
           } catch (e) {
             var q =
                 window.confirm(MSG['badXml'].replace('%1', e));
             if (!q) {
               // Leave the user on the XML tab.
               return;
             }
           }
           if (xmlDom) {
             workspace.clear();
             localStorage.clear();   // 2017/11/14
             Blockly.Xml.domToWorkspace(xmlDom, workspace);
           }
         }
       };
       reader.readAsText(f);

    });

    $("#resetButton").click(function () {
        var q = window.confirm("編集したプログラムを捨てて、最初の内容に戻します。よろしいですか？");
        if (!q) return;
        var xmlUrl = $.query.get("url");
        if (xmlUrl) {
          $.ajax({ url: xmlUrl, dataType: "text" }).done(function(data) {
              workspace.clear();
              localStorage.clear();   // 2017/11/14
              var xml = Blockly.Xml.textToDom(data);
              Blockly.Xml.domToWorkspace(xml, workspace);
          });
        } else {
           workspace.clear();
           localStorage.clear();   // 2017/11/14
           Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
        }
    });

    onResize();
    Blockly.svgResize(workspace);

    // 無理やりフォントを変更する。
    var cssNode = document.createElement('style');
    document.head.appendChild(cssNode);
    var text = ".blocklyText {"
             + "  cursor: default;"
             + "  fill: #fff;"
             + "  font-family: 'Segoe UI Symbol';"
             + "  font-size: 11pt;"
             + "}";
    var cssTextNode = document.createTextNode(text);
    cssNode.appendChild(cssTextNode);

    tabClick(selected);
    for (var i = 0; i < tabs.length; i++) {
       var name = tabs[i];
       $("#tab" + name).click(function(name_) { return function() { tabClick(name_); }; }(name));
    }
});