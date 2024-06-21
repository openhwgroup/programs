(function(mod) {
    if (typeof exports == 'object' && typeof module == 'object') // CommonJS
        mod(require('../../lib/codemirror'));
    else if (typeof define == 'function' && define.amd) // AMD
        define(['../../lib/codemirror'], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    'use strict';

    CodeMirror.registerHelper('fold', 'hdl', function(cm, start) {
        var line = start.line, lineText = cm.getLine(line);
        var tokenType;

        function findOpening(openCh) {
            for (var at = start.ch, pass = 0;;) {
                var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
                if (found == -1) {
                    if (pass == 1) break;
                    pass = 1;
                    at = lineText.length;
                    continue;
                }
                if (pass == 1 && found < start.ch) break;
                tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
                if (!/^(comment|string)/.test(tokenType)) return found + 1;
                at = found - 1;
            }
        }

        function toggleCase(s) {
            if (65 <= s[0] <= 90) {   // String is uppercase
            }
            else if (97 <= s[0] <= 122) {   // String is lowercase
                for (var i = 0; i<s.length; i++)
                    s[i] = String(s.charCodeAt(i) - 32);        // Toggle to uppercase
            }
            return s;
        }

        var tokenPairs = [

            // Verilog Folding Kewywords

            {start: 'begin',          end: 'end'},
            {start: 'module',         end: 'endmodule'},
            {start: 'case',           end: 'endcase'},
            {start: 'casex',          end: 'endcase'},
            {start: 'casez',          end: 'endcase'},
            {start: 'clocking',       end: 'endclocking'},
            {start: 'class',          end: 'endclass'},
            {start: 'config',         end: 'endconfig'},
            {start: 'function',       end: 'endfunction'},
            {start: 'generate',       end: 'endgenerate'},
            {start: 'covergroup',     end: 'endgroup'},
            {start: 'interface',      end: 'endinterface'},
            {start: 'package',        end: 'endpackage'},
            {start: 'primitive',      end: 'endprimitive'},
            {start: 'property',       end: 'endproperty'},
            {start: 'specify',        end: 'endspecify'},
            {start: 'sequence',       end: 'endsequence'},
            {start: 'randsequence',   end: 'endsequence'},
            {start: 'table',          end: 'endtable'},
            {start: 'task',           end: 'endtask'},

            {start: 'IF',             end: 'END IF'},
            {start: 'IF',             end: 'ELSIF'},
            {start: 'IF',             end: 'ELSE'},
            {start: 'ELSIF',          end: 'END IF'},
            {start: 'ELSIF',          end: 'ELSE'},
            {start: 'ELSE',           end: 'END IF'},

            {start: '(',      end: ')'},
            {start: '{',      end: '}'},

            // VHDL Folding Keywords

            {start: 'BEGIN',          end: 'END'},
            {start: 'ENTITY',         end: 'END'},
            {start: 'BLOCK',          end: 'END BLOCK'},
            {start: 'CASE',           end: 'END CASE'},
            {start: 'COMPONENT',      end: 'END COMPONENT'},
            // {start: "FOR",            end: "END FOR"},
            {start: 'FOR',            end: 'END LOOP'},
            {start: 'GENERATE',       end: 'END GENERATE'},

            {start: 'IF',             end: 'END IF'},
            {start: 'IF',             end: 'ELSIF'},
            {start: 'IF',             end: 'ELSE'},
            {start: 'ELSIF',          end: 'END IF'},
            {start: 'ELSIF',          end: 'ELSE'},
            {start: 'ELSE',           end: 'END IF'},

            {start: 'LOOP',           end: 'END LOOP'},
            {start: 'PROCESS',        end: 'END PROCESS'},
            {start: 'RECORD',         end: 'END RECORD'},
            {start: 'UNITS',          end: 'END UNITS'},

        ];

        var i = 0;

        var startToken = tokenPairs[i].start, endToken = tokenPairs[i].end, startCh = findOpening(startToken);
        while (startCh == null) {
            i++;
            if (i == tokenPairs.length) break;

            startToken = tokenPairs[i].start, endToken = tokenPairs[i].end;
            startCh = findOpening(startToken);

            // Test equivalent tokes in the opposite case

            if (startCh == null) {
                if (65 <= startToken[0] <= 90) {    // Token is UpperCase
                    startToken = startToken.toLowerCase();
                    endToken = endToken.toLowerCase();
                } else {     // Token is lowercase
                    startToken = startToken.toUpperCase();
                    endToken = endToken.toUpperCase();
                }
                startCh = findOpening(startToken);
            }
        }

        if (startCh == null) return;
        var count = 1, lastLine = cm.lastLine(), end, endCh;
        outer: for (var i = line; i <= lastLine; ++i) {
            var text = cm.getLine(i), pos = i == line ? startCh : 0;
            for (;;) {
                var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
                if (nextOpen < 0) nextOpen = text.length;
                if (nextClose < 0) nextClose = text.length;
                pos = Math.min(nextOpen, nextClose);
                if (pos == text.length) break;
                if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) {
                    if (pos == nextOpen) ++count;
                    else if (!--count) { end = i; endCh = pos; break outer; }
                }
                ++pos;
            }
        }
        if (end == null || line == end && endCh == startCh) return;
        return {from: CodeMirror.Pos(line, startCh),
            to: CodeMirror.Pos(end, endCh)};
    });

    CodeMirror.registerHelper('fold', 'import', function(cm, start) {
        function hasImport(line) {
            if (line < cm.firstLine() || line > cm.lastLine()) return null;
            var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
            if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
            if (start.type != 'keyword' || start.string != 'import') return null;
            // Now find closing semicolon, return its position
            for (var i = line, e = Math.min(cm.lastLine(), line + 10); i <= e; ++i) {
                var text = cm.getLine(i), semi = text.indexOf(';');
                if (semi != -1) return {startCh: start.end, end: CodeMirror.Pos(i, semi)};
            }
        }

        var startLine = start.line, has = hasImport(startLine), prev;
        if (!has || hasImport(startLine - 1) || ((prev = hasImport(startLine - 2)) && prev.end.line == startLine - 1))
            return null;
        for (var end = has.end;;) {
            var next = hasImport(end.line + 1);
            if (next == null) break;
            end = next.end;
        }
        return {from: cm.clipPos(CodeMirror.Pos(startLine, has.startCh + 1)), to: end};
    });

    CodeMirror.registerHelper('fold', 'include', function(cm, start) {
        function hasInclude(line) {
            if (line < cm.firstLine() || line > cm.lastLine()) return null;
            var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
            if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
            if (start.type == 'meta' && start.string.slice(0, 8) == '#include') return start.start + 8;
        }

        var startLine = start.line, has = hasInclude(startLine);
        if (has == null || hasInclude(startLine - 1) != null) return null;
        for (var end = startLine;;) {
            var next = hasInclude(end + 1);
            if (next == null) break;
            ++end;
        }
        return {from: CodeMirror.Pos(startLine, has + 1),
            to: cm.clipPos(CodeMirror.Pos(end))};
    });

});
