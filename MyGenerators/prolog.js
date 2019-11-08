/**
19/06/11  flex.js を参考に新規作成
 */
'use strict';

goog.provide('Blockly.Prolog');

goog.require('Blockly.Generator');


/**
 * Prolog code generator.
 * @type {!Blockly.Generator} */
Blockly.Prolog = new Blockly.Generator('Prolog');

Blockly.Prolog.INDENT = '';

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Prolog.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    // 
    'is,true,fail,Yes,No,not,catch,throw' +
    // https://developer.mozilla.org/en/Prolog/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/Prolog/Reference/Operators/Operator_Precedence
 */
Blockly.Prolog.ORDER_ATOMIC = 0;           // 0 "" ...
//Blockly.Prolog.ORDER_NEW = 1.1;            // new
//Blockly.Prolog.ORDER_MEMBER = 1.2;         // . []
Blockly.Prolog.ORDER_FUNCTION_CALL = 2;    // ()
//Blockly.Prolog.ORDER_INCREMENT = 3;        // ++
//Blockly.Prolog.ORDER_DECREMENT = 3;        // --
//Blockly.Prolog.ORDER_REPEAT    = 4;        // * + ?
//Blockly.Prolog.ORDER_BITWISE_NOT = 4.1;    // ~
//Blockly.Prolog.ORDER_UNARY_PLUS = 4.2;     // +
//Blockly.Prolog.ORDER_UNARY_NEGATION = 4.3; // -
//Blockly.Prolog.ORDER_LOGICAL_NOT = 4.4;    // !
//Blockly.Prolog.ORDER_TYPEOF = 4.5;         // typeof
//Blockly.Prolog.ORDER_VOID = 4.6;           // void
//Blockly.Prolog.ORDER_DELETE = 4.7;         // delete
//Blockly.Prolog.ORDER_SEQUENCE = 5;          // 
//Blockly.Prolog.ORDER_DIVISION = 5.1;       // /
//Blockly.Prolog.ORDER_MULTIPLICATION = 5.2; // *
//Blockly.Prolog.ORDER_MODULUS = 5.3;        // %
//Blockly.Prolog.ORDER_SELECT = 6;             // | 
//Blockly.Prolog.ORDER_SUBTRACTION = 6.1;    // -
//Blockly.Prolog.ORDER_ADDITION = 6.2;       // +
//Blockly.Prolog.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
//Blockly.Prolog.ORDER_RELATIONAL = 8;       // < <= > >=
//Blockly.Prolog.ORDER_IN = 8;               // in
//Blockly.Prolog.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.Prolog.ORDER_EQUALITY = 9;         // == != === !==
//Blockly.Prolog.ORDER_BITWISE_AND = 10;     // &
//Blockly.Prolog.ORDER_BITWISE_XOR = 11;     // ^
//Blockly.Prolog.ORDER_BITWISE_OR = 12;      // |
//Blockly.Prolog.ORDER_LOGICAL_AND = 13;     // &&
//Blockly.Prolog.ORDER_LOGICAL_OR = 14;      // ||
//Blockly.Prolog.ORDER_CONDITIONAL = 15;     // ?:
//Blockly.Prolog.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.Prolog.ORDER_COMMA = 17;           // ,
Blockly.Prolog.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Prolog.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Prolog.ORDER_FUNCTION_CALL, Blockly.Prolog.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Prolog.ORDER_FUNCTION_CALL, Blockly.Prolog.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Prolog.ORDER_MEMBER, Blockly.Prolog.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Prolog.ORDER_MEMBER, Blockly.Prolog.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.Prolog.ORDER_LOGICAL_NOT, Blockly.Prolog.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Prolog.ORDER_MULTIPLICATION, Blockly.Prolog.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.Prolog.ORDER_ADDITION, Blockly.Prolog.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Prolog.ORDER_LOGICAL_AND, Blockly.Prolog.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Prolog.ORDER_LOGICAL_OR, Blockly.Prolog.ORDER_LOGICAL_OR]
];

/**
 * Allow for switching between one and zero based indexing for lists and text,
 * one based by default.
 */
Blockly.Prolog.ONE_BASED_INDEXING = true;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Prolog.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Prolog.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Prolog.functionNames_ = Object.create(null);

  if (!Blockly.Prolog.variableDB_) {
    Blockly.Prolog.variableDB_ =
        new Blockly.Names(Blockly.Prolog.RESERVED_WORDS_);
  } else {
    Blockly.Prolog.variableDB_.reset();
  }

  Blockly.Prolog.variableDB_.setVariableMap(workspace.getVariableMap());

  // var defvars = [];
  // var variables = Blockly.Variables.allUsedVarModels(workspace);
  // if (variables.length) {
  //   for (var i = 0; i < variables.length; i++) {
  //     defvars[i] = Blockly.Prolog.variableDB_.getName(variables[i],
  //         Blockly.Variables.NAME_TYPE);
  //   }
  //   Blockly.Prolog.definitions_['variables'] =
  //       //'var ' + defvars.join(', ') + ';';  //  2017/07/11 コメントアウト
  //       ''; // 2017/07/11 追加
  // }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Prolog.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Prolog.definitions_) {
    definitions.push(Blockly.Prolog.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Prolog.definitions_;
  delete Blockly.Prolog.functionNames_;
  Blockly.Prolog.variableDB_.reset();
  // ↓  ブロックが離れているとき、どれだけ改行するか
  return definitions.join('\n\n') + '\n' + code;    // 2017/07/13 \nを2個消去 
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 行の終わりを示す
 */
Blockly.Prolog.scrubNakedValue = function(line) {
  return line + '\n';     // 2017/07/13 セミコロン(;)を消去
};

/**
 * Encode a string as a properly escaped Prolog string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Prolog string.
 * @private
 */
Blockly.Prolog.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Prolog from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Prolog code created for this block.
 * @return {string} Prolog code with comments and subsequent blocks added.
 * @private
 */
Blockly.Prolog.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Prolog.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                       Blockly.Prolog.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.Prolog.prefixLines(comment + '\n', '% ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Prolog.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Prolog.prefixLines(comment, '% ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Prolog.blockToCode(nextBlock);
  if (nextCode.length > 0) {
      return commentCode + code + ',' + nextCode;
  } else {
    return commentCode + code;
  }
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Prolog.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Prolog.ORDER_NONE;
  if (Blockly.Prolog.ONE_BASED_INDEXING) {
    delta--;
  }
  var defaultAtIndex = Blockly.Prolog.ONE_BASED_INDEXING ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Prolog.valueToCode(block, atId,
        Blockly.Prolog.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Prolog.valueToCode(block, atId,
        Blockly.Prolog.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Prolog.valueToCode(block, atId,
        Blockly.Prolog.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Prolog.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Prolog.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Prolog.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Prolog.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};

/**
 * Generate code representing the statement with separator
 * @param {!Blockly.Block} block The block containing the input.
 * @param {string} name The name of the input.
 * @param {string} sep The separator.
 * @return {string} Generated code or '' if no blocks are connected.
 */
Blockly.Prolog.statementToCodeWithSeparator = function(block, name, sep) {
  var targetBlock = block.getInputTargetBlock(name);
  var code = this.blockToCodeWithSeparator(targetBlock, sep);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  if (typeof code != 'string') {
    throw TypeError('Expecting code from statement block: ' +
        (targetBlock && targetBlock.type));
  }
//   if (code) {
//     code = this.prefixLines(/** @type {string} */ (code), this.INDENT);
//   }
  return code;
};

/**
 * Generate code for the specified block (and attached blocks).
 * @param {Blockly.Block} block The block to generate code for.
 * @param {string} separator The separator.
 * @return {string} For statement blocks, the generated code.
 */
Blockly.Prolog.blockToCodeWithSeparator = function(block, separator) {
  if (!block) {
    return '';
  }
  if (block.disabled) {
    // Skip past this block if it is disabled.
    return this.blockToCodeWithSeparator(block.getNextBlock(), separator);
  }

  var func = this[block.type];
  if (typeof func != 'function') {
    throw Error('Language "' + this.name_ + '" does not know how to generate ' +
        ' code for block type "' + block.type + '".');
  }
  // First argument to func.call is the value of 'this' in the generator.
  // Prior to 24 September 2013 'this' was the only way to access the block.
  // The current prefered method of accessing the block is through the second
  // argument to func.call, which becomes the first parameter to the generator.
  var code = func.call(block, block);
  if (Array.isArray(code)) {
    // Value blocks return tuples of code and operator order.
//    if (!block.outputConnection) {
      throw TypeError('Expecting string from statement block: ' + block.type);
//    }
//    return [this.scrub_(block, code[0], opt_thisOnly), code[1]];
  } else if (typeof code == 'string') {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    if (this.STATEMENT_PREFIX) {
      code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') + code;
    }
    return this.scrubWithSeparator(block, code, separator);
  } else if (code === null) {
    // Block has handled code generation itself.
    return '';
  } else {
    throw SyntaxError('Invalid code generated: ' + code);
  }
};


/**
 * Common tasks for generating Prolog from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Prolog code created for this block.
 * @param {string} separator The separator.
 * @return {string} Prolog code with comments and subsequent blocks added.
 * @private
 */
Blockly.Prolog.scrubWithSeparator = function(block, code, separator) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Prolog.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        // commentCode += '/*\n' +
        //                Blockly.Prolog.prefixLines(comment + '\n', ' ') +
        //                ' */\n';
      } else {
        commentCode += Blockly.Prolog.prefixLines(comment + '\n', '% ');  // 17/12/05 ↑と同様
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Prolog.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Prolog.prefixLines(comment, '% '); // 17/12/05 ↑と同様
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Prolog.blockToCodeWithSeparator(nextBlock, separator);
  if (nextBlock) {
    return commentCode + Blockly.Prolog.insertBeforeNewline(code, separator) + nextCode;
  }
  return commentCode + code;
};

Blockly.Prolog.insertBeforeNewline = function(code, separator) {
  let idx = code.lastIndexOf('\n');
  if (idx < 0) {
    return code + separator;
  }
  return code.substring(0, idx) + separator + code.substring(idx);
}