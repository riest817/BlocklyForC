/**
19/05/28 blockly_uncompressed.js の自分の追加した部分をこちらに移動
*/
'use strict';
        // 2017/12/05 追加 /////////////////////////////////////////////////////////////////////////////
        Blockly.Generator.prototype.statementToCode_0indent     = function (a, b) {
            var c = a.getInputTargetBlock(b),
                d = this.blockToCode(c);
            goog
                .asserts
                .assertString(d, 'Expecting code from statement block "%s".', c && c.type);
            d && (d = this.prefixLines(d, ""));
            return d
        };
        // 2017/12/05 追加ここまで ///////////////////////////////////////////////////////////////////////
        