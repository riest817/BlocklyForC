/**
18/04/17 google-blockly-dac5adf\demos\code よりコピー
 */

/**
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';
/* ===================================================================
2017/11/14 common2.js 新規作成
18/05/29 自作のlocalstorageに対応

 ///////////////   各言語の html ファイルの共通する関数群をこちらに移動

*/

var MSG = {
  title: "コード",
  blocks: "ブロック",
  linkTooltip: "ブロックの状態を保存してリンクを取得します。",
  runTooltip: "ブロックで作成したプログラムを実行します。",
  badCode: "プログラムのエラー:\n%1",
  timeout: "命令の実行回数が制限値を超えました。",
  trashTooltip: "すべてのブロックを消します。",
  catLogic: "論理",
  catLoops: "繰り返し",
  catMath: "数学",
  catText: "テキスト",
  catLists: "リスト",
  catColour: "色",
  catVariables: "変数",
  catFunctions: "関数",
  listVariable: "リスト",
  textVariable: "テキスト",
  httpRequestError: "ネットワーク接続のエラーです。",
  linkAlert: "ブロックの状態をこのリンクで共有できます:\n\n%1",
  hashError: "すみません。「%1」という名前のプログラムは保存されていません。",
  xmlError: "保存されたファイルを読み込めませんでした。別のバージョンのブロックリーで作成された可能性があります。",
  badXml: "XML のエラーです:\n%1\n\nXML の変更をやめるには「OK」、編集を続けるには「キャンセル」を選んでください。"
};

var Code = {};

/* プログラミング言語ごとのファイルで上書きする。ここにも必要 */
/** ↓　言語切り替えを↓*/
Code.LANGUAGE_NAME = {
  'grammar': '文法表記',
  'concept': '日本語表記'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
  var lang = Code.getStringParamFromUrl('lang', '');
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to grammar.
    lang = 'grammar';
  }
  return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/*
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  // This should be skipped for the index page, which has no blocks and does
  // not load Blockly.
  // MSIE 11 does not support sessionStorage on file:// URLs.

  if (typeof Blockly != 'undefined' && window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**

 */
Code.importPrettify = function() {
  var script = document.createElement('script');
  script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function(element) {

  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

Code.tabClick = function(clickedName) {
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
      Code.workspace.clear();
      try { Code.workspace.clear(); } catch(e) {} // 18/05/22 
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    }
  }

  if ($("#tabBlocks").hasClass('tabon')) {
    Code.workspace.setVisible(false);
  }

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    $('#tab' + name).removeClass('tabon');
    $('#tab' + name).addClass('taboff');
    $('#content' + name).css("visibility", 'hidden');
  }

  // Select the active tab.
  Code.selected = clickedName;
  $('#tab' + clickedName).removeClass('taboff');
  $('#tab' + clickedName).addClass('tabon');
  $('#content' + clickedName).css("visibility", 'visible');

  Code.renderContent();

  if (clickedName == 'Blocks') {
    Code.workspace.setVisible(true);
  }
  Blockly.svgResize(Code.workspace);
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  Code.initLanguage();
  var rtl = Code.isRtl();
  var container = document.getElementById('blocklyArea');
  var onresize = function(e) {
    var bBox = Code.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Code.workspace && Code.workspace.toolbox_.width) {
      document.getElementById('tabBlocks').style.minWidth =
          (Code.workspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of
  // through this for-loop.
  for (var messageKey in MSG) {
    if (goog.string.startsWith(messageKey, 'cat')) {
      Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
    }
  }

  // Construct the toolbox XML.
  var toolboxText = document.getElementById('toolbox').outerHTML;
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);

  Code.workspace = Blockly.inject('contentBlocks',
      {grid:
          {spacing: 25,
           length: 5,
           colour: '#ccc',
           snap: true},
       rtl: rtl,
       toolbox: toolboxXml,
       zoom:
           {controls: true,
            wheel: true}
      });

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
//  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  Code.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code.workspace);
  }

  Code.tabClick(Code.selected);

  //Code.bindClick('trashButton',function() {Code.discard(); Code.renderContent();});
  //Code.bindClick('runButton', Code.runJS);
  // Disable the link button if page isn't backed by App Engine storage.
  //var linkButton = document.getElementById('linkButton');
  /*
  if ('BlocklyStorage' in window) {
    BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
    BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
    BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
    BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
    //Code.bindClick(linkButton,function() {BlocklyStorage.link(Code.workspace);});
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }*/

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick('tab' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }
  onresize();
  Blockly.svgResize(Code.workspace);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(Code.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
  // Set the HTML's language and direction.
//  var rtl = Code.isRtl();
//  document.dir = rtl ? 'rtl' : 'ltr';
//  document.head.parentElement.setAttribute('lang', Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function(a, b) {
    // Sort based on first argument ('English', '???????', '???', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');

  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == Code.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.addEventListener('change', Code.changeLanguage, true)
  // Inject language strings.

};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {

  var count = Code.workspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
    Code.workspace.clear();
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
};

window.addEventListener('load', Code.init);

$(function() {
/*
    workspace = Blockly.inject('contentBlocks',
       { toolbox: document.getElementById('toolbox'),
         zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
         grid: { spacing: 25, length: 3, colour: "#0f0", snap: true }
       });

    BlocklyStorage.backupOnUnload(workspace);
//    workspace.addChangeListener(Blockly.Events.disableOrphans);
*/
//    var clean = $.query.get("clean");
// 18/06/12
/*
    var title = document.getElementById('title').getAttribute('title'); 
    var xmlDom;
//    var xmlDom  = Blockly.Xml.workspaceToDom(Code.workspace);
//    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var BlocksStatus;
    if ( title == "C" ) { 
      BlocksStatus = localStorage.getItem('BlocksStatus_C'); 
    } else if ( title == "JavaScript" ) {
      BlocksStatus = localStorage.getItem('BlocksStatus_JavaScript'); 
    } else if ( title == "Haskell" ) {
      BlocksStatus = localStorage.getItem('BlocksStatus_Haskell'); 
    } else if ( title == "Flex" ) {
      BlocksStatus = localStorage.getItem('BlocksStatus_Flex'); 
    }
    if (BlocksStatus) {
      xmlDom = Blockly.Xml.textToDom(BlocksStatus);
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    } 
*/
// 18/06/12 追加ここまで
/*
// for clean & url querystring
    if (clean != null && (clean.toLowerCase() == "true" || clean.toLowerCase() == "yes")) {
        //Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);  18/05/29
    } else {
        window.setTimeout(function () {
//            BlocklyStorage.restoreBlocks(workspace);  // 18/05/29
              var url = window.location.href.split('#')[0];
              if ('localStorage' in window) {
                var memo = window.localStorage[url];
                if (memo) {
                    var xml = Blockly.Xml.textToDom(memo);
                    if (xml.hasChildNodes()) {
                        //  Blockly.Xml.domToWorkspace(xml, workspace); // 18/05/29
                        return;
                    }
                    // xml が空だったら続行する
                }
              }
              var xmlUrl = $.query.get("url");
              if (xmlUrl) {
                $.ajax({ url: xmlUrl, dataType: "text" }).done(function(data) {
                    var xml = Blockly.Xml.textToDom(data);
                    Blockly.Xml.domToWorkspace(xml, Code.workspace);
                });
              } else {
                //Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
              }
        }, 0);
    }
*/
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
           var xmlDom  = Blockly.Xml.workspaceToDom(Code.workspace);
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
//             workspace.clear();
             Code.workspace.clear();   // 18/05/16
             localStorage.clear();   // 2017/11/14
             Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
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
//              workspace.clear();
              Code.workspace.clear();   // 18/05/16
              localStorage.clear();   // 2017/11/14
              var xml = Blockly.Xml.textToDom(data);
              Blockly.Xml.domToWorkspace(xml, Code.workspace);
          });
        } else {
//           workspace.clear();
           Code.workspace.clear();  // 18/05/16
           localStorage.clear();   // 2017/11/14
           Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), Code.workspace);
        }
        console.log(xmlUrl);
        delete window.sessionStorage.loadOnceBlocks;
    });

//    onResize();
//    Blockly.svgResize(Code.workspace);

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

/*
    tabClick(selected);
    for (var i = 0; i < tabs.length; i++) {
       var name = tabs[i];
       $("#tab" + name).click(function(name_) { return function() { tabClick(name_); }; }(name));
    }
*/
});
