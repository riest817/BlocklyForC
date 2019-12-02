// for haste hack
var oldJsMkConWriter = /\r?\nfunction\s+jsMkConWriter\(op\)\s+\{\s*\r?\n(\s+.*\r?\n)*\}\s*\r?\n/;
function mkNewJsMkConWriter() {
    return `
function jsMkConWriter(op) {
    return function(str) {
        str = E(str);
//       $(".console").append(str);
         $("#result").val(function (i, v) {
            return v + str;
         });
    };
}

`;
}

var oldJsMkStdin = /\r?\nfunction\s+jsMkStdin\(\)\s+\{\s*\r?\n(\s+.*\r?\n)*\}\s*\r?\n/;

function mkNewJsMkStdin(init) {
    return `
function jsMkStdin() {
    return jsNewHandle(
        function() {this.buf = \`${init}\`;},
        function(len) {
//            while(this.buf.length < len) {
//                this.buf += prompt('[stdin]') + '\\n';
//            }
/* unfortunately, 'getContents' does not seem to work anyhow. */
            if (this.buf.length <= 0) return null;  // indicates EOF
            if (this.buf.length < len) {
                let ret = this.buf;
                this.buf = "";
                return ret;
            }
            let ret = this.buf.substr(0, len);
            this.buf = this.buf.substr(len);
            return ret;
        }
    );
}

`;
}

function hasteHack(hinit, data) {
    var newJsMkConWriter = mkNewJsMkConWriter();
    data = data.replace(oldJsMkConWriter, newJsMkConWriter);
    var newJsMkStdin = mkNewJsMkStdin(hinit);
    data = data.replace(oldJsMkStdin, newJsMkStdin);
    return data;
}
