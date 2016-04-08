'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parse_util_1 = require('angular2/src/compiler/parse_util');
var html_ast_1 = require('angular2/src/compiler/html_ast');
var lang_1 = require('angular2/src/facade/lang');
var message_1 = require('./message');
exports.I18N_ATTR = "i18n";
exports.I18N_ATTR_PREFIX = "i18n-";
/**
 * An i18n error.
 */
var I18nError = (function (_super) {
    __extends(I18nError, _super);
    function I18nError(span, msg) {
        _super.call(this, span, msg);
    }
    return I18nError;
})(parse_util_1.ParseError);
exports.I18nError = I18nError;
// Man, this is so ugly!
function partition(nodes, errors) {
    var res = [];
    for (var i = 0; i < nodes.length; ++i) {
        var n = nodes[i];
        var temp = [];
        if (_isOpeningComment(n)) {
            var i18n = n.value.substring(5).trim();
            i++;
            while (!_isClosingComment(nodes[i])) {
                temp.push(nodes[i++]);
                if (i === nodes.length) {
                    errors.push(new I18nError(n.sourceSpan, "Missing closing 'i18n' comment."));
                    break;
                }
            }
            res.push(new Part(null, null, temp, i18n, true));
        }
        else if (n instanceof html_ast_1.HtmlElementAst) {
            var i18n = _findI18nAttr(n);
            res.push(new Part(n, null, n.children, lang_1.isPresent(i18n) ? i18n.value : null, lang_1.isPresent(i18n)));
        }
        else if (n instanceof html_ast_1.HtmlTextAst) {
            res.push(new Part(null, n, null, null, false));
        }
    }
    return res;
}
exports.partition = partition;
var Part = (function () {
    function Part(rootElement, rootTextNode, children, i18n, hasI18n) {
        this.rootElement = rootElement;
        this.rootTextNode = rootTextNode;
        this.children = children;
        this.i18n = i18n;
        this.hasI18n = hasI18n;
    }
    Object.defineProperty(Part.prototype, "sourceSpan", {
        get: function () {
            if (lang_1.isPresent(this.rootElement))
                return this.rootElement.sourceSpan;
            else if (lang_1.isPresent(this.rootTextNode))
                return this.rootTextNode.sourceSpan;
            else
                return this.children[0].sourceSpan;
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.createMessage = function (parser) {
        return new message_1.Message(stringifyNodes(this.children, parser), meaning(this.i18n), description(this.i18n));
    };
    return Part;
})();
exports.Part = Part;
function _isOpeningComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value.startsWith("i18n:");
}
function _isClosingComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value == "/i18n";
}
function _findI18nAttr(p) {
    var i18n = p.attrs.filter(function (a) { return a.name == exports.I18N_ATTR; });
    return i18n.length == 0 ? null : i18n[0];
}
function meaning(i18n) {
    if (lang_1.isBlank(i18n) || i18n == "")
        return null;
    return i18n.split("|")[0];
}
exports.meaning = meaning;
function description(i18n) {
    if (lang_1.isBlank(i18n) || i18n == "")
        return null;
    var parts = i18n.split("|");
    return parts.length > 1 ? parts[1] : null;
}
exports.description = description;
function messageFromAttribute(parser, p, attr) {
    var expectedName = attr.name.substring(5);
    var matching = p.attrs.filter(function (a) { return a.name == expectedName; });
    if (matching.length > 0) {
        var value = removeInterpolation(matching[0].value, matching[0].sourceSpan, parser);
        return new message_1.Message(value, meaning(attr.value), description(attr.value));
    }
    else {
        throw new I18nError(p.sourceSpan, "Missing attribute '" + expectedName + "'.");
    }
}
exports.messageFromAttribute = messageFromAttribute;
function removeInterpolation(value, source, parser) {
    try {
        var parsed = parser.splitInterpolation(value, source.toString());
        if (lang_1.isPresent(parsed)) {
            var res = "";
            for (var i = 0; i < parsed.strings.length; ++i) {
                res += parsed.strings[i];
                if (i != parsed.strings.length - 1) {
                    res += "<ph name=\"" + i + "\"/>";
                }
            }
            return res;
        }
        else {
            return value;
        }
    }
    catch (e) {
        return value;
    }
}
exports.removeInterpolation = removeInterpolation;
function stringifyNodes(nodes, parser) {
    var visitor = new _StringifyVisitor(parser);
    return html_ast_1.htmlVisitAll(visitor, nodes).join("");
}
exports.stringifyNodes = stringifyNodes;
var _StringifyVisitor = (function () {
    function _StringifyVisitor(_parser) {
        this._parser = _parser;
        this._index = 0;
    }
    _StringifyVisitor.prototype.visitElement = function (ast, context) {
        var name = this._index++;
        var children = this._join(html_ast_1.htmlVisitAll(this, ast.children), "");
        return "<ph name=\"e" + name + "\">" + children + "</ph>";
    };
    _StringifyVisitor.prototype.visitAttr = function (ast, context) { return null; };
    _StringifyVisitor.prototype.visitText = function (ast, context) {
        var index = this._index++;
        var noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser);
        if (noInterpolation != ast.value) {
            return "<ph name=\"t" + index + "\">" + noInterpolation + "</ph>";
        }
        else {
            return ast.value;
        }
    };
    _StringifyVisitor.prototype.visitComment = function (ast, context) { return ""; };
    _StringifyVisitor.prototype._join = function (strs, str) {
        return strs.filter(function (s) { return s.length > 0; }).join(str);
    };
    return _StringifyVisitor;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1LZmI1YzhUMi50bXAvYW5ndWxhcjIvc3JjL2kxOG4vc2hhcmVkLnRzIl0sIm5hbWVzIjpbIkkxOG5FcnJvciIsIkkxOG5FcnJvci5jb25zdHJ1Y3RvciIsInBhcnRpdGlvbiIsIlBhcnQiLCJQYXJ0LmNvbnN0cnVjdG9yIiwiUGFydC5zb3VyY2VTcGFuIiwiUGFydC5jcmVhdGVNZXNzYWdlIiwiX2lzT3BlbmluZ0NvbW1lbnQiLCJfaXNDbG9zaW5nQ29tbWVudCIsIl9maW5kSTE4bkF0dHIiLCJtZWFuaW5nIiwiZGVzY3JpcHRpb24iLCJtZXNzYWdlRnJvbUF0dHJpYnV0ZSIsInJlbW92ZUludGVycG9sYXRpb24iLCJzdHJpbmdpZnlOb2RlcyIsIl9TdHJpbmdpZnlWaXNpdG9yIiwiX1N0cmluZ2lmeVZpc2l0b3IuY29uc3RydWN0b3IiLCJfU3RyaW5naWZ5VmlzaXRvci52aXNpdEVsZW1lbnQiLCJfU3RyaW5naWZ5VmlzaXRvci52aXNpdEF0dHIiLCJfU3RyaW5naWZ5VmlzaXRvci52aXNpdFRleHQiLCJfU3RyaW5naWZ5VmlzaXRvci52aXNpdENvbW1lbnQiLCJfU3RyaW5naWZ5VmlzaXRvci5fam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMEMsa0NBQWtDLENBQUMsQ0FBQTtBQUM3RSx5QkFRTyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3hDLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVELHdCQUFzQixXQUFXLENBQUMsQ0FBQTtBQUdyQixpQkFBUyxHQUFHLE1BQU0sQ0FBQztBQUNuQix3QkFBZ0IsR0FBRyxPQUFPLENBQUM7QUFFeEM7O0dBRUc7QUFDSDtJQUErQkEsNkJBQVVBO0lBQ3ZDQSxtQkFBWUEsSUFBcUJBLEVBQUVBLEdBQVdBO1FBQUlDLGtCQUFNQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFD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QSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNuRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsSUFBSUEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakNBLE1BQU1BLENBQUNBLGlCQUFjQSxLQUFLQSxXQUFLQSxlQUFlQSxVQUFPQSxDQUFDQTtRQUN4REEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDbkJBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURKLHdDQUFZQSxHQUFaQSxVQUFhQSxHQUFtQkEsRUFBRUEsT0FBWUEsSUFBU0ssTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFM0RMLGlDQUFLQSxHQUFiQSxVQUFjQSxJQUFjQSxFQUFFQSxHQUFXQTtRQUN2Q00sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQUEsQ0FBQ0EsSUFBSUEsT0FBQUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsRUFBWkEsQ0FBWUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDbERBLENBQUNBO0lBQ0hOLHdCQUFDQTtBQUFEQSxDQUFDQSxBQTNCRCxJQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCBQYXJzZUVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvcGFyc2VfdXRpbCc7XG5pbXBvcnQge1xuICBIdG1sQXN0LFxuICBIdG1sQXN0VmlzaXRvcixcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxBdHRyQXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbENvbW1lbnRBc3QsXG4gIGh0bWxWaXNpdEFsbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9hc3QnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XG5pbXBvcnQge1BhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvcGFyc2VyJztcblxuZXhwb3J0IGNvbnN0IEkxOE5fQVRUUiA9IFwiaTE4blwiO1xuZXhwb3J0IGNvbnN0IEkxOE5fQVRUUl9QUkVGSVggPSBcImkxOG4tXCI7XG5cbi8qKlxuICogQW4gaTE4biBlcnJvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEkxOG5FcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1zZzogc3RyaW5nKSB7IHN1cGVyKHNwYW4sIG1zZyk7IH1cbn1cblxuXG4vLyBNYW4sIHRoaXMgaXMgc28gdWdseSFcbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb24obm9kZXM6IEh0bWxBc3RbXSwgZXJyb3JzOiBQYXJzZUVycm9yW10pOiBQYXJ0W10ge1xuICBsZXQgcmVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgIGxldCBuID0gbm9kZXNbaV07XG4gICAgbGV0IHRlbXAgPSBbXTtcbiAgICBpZiAoX2lzT3BlbmluZ0NvbW1lbnQobikpIHtcbiAgICAgIGxldCBpMThuID0gKDxIdG1sQ29tbWVudEFzdD5uKS52YWx1ZS5zdWJzdHJpbmcoNSkudHJpbSgpO1xuICAgICAgaSsrO1xuICAgICAgd2hpbGUgKCFfaXNDbG9zaW5nQ29tbWVudChub2Rlc1tpXSkpIHtcbiAgICAgICAgdGVtcC5wdXNoKG5vZGVzW2krK10pO1xuICAgICAgICBpZiAoaSA9PT0gbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2gobmV3IEkxOG5FcnJvcihuLnNvdXJjZVNwYW4sIFwiTWlzc2luZyBjbG9zaW5nICdpMThuJyBjb21tZW50LlwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG5ldyBQYXJ0KG51bGwsIG51bGwsIHRlbXAsIGkxOG4sIHRydWUpKTtcblxuICAgIH0gZWxzZSBpZiAobiBpbnN0YW5jZW9mIEh0bWxFbGVtZW50QXN0KSB7XG4gICAgICBsZXQgaTE4biA9IF9maW5kSTE4bkF0dHIobik7XG4gICAgICByZXMucHVzaChuZXcgUGFydChuLCBudWxsLCBuLmNoaWxkcmVuLCBpc1ByZXNlbnQoaTE4bikgPyBpMThuLnZhbHVlIDogbnVsbCwgaXNQcmVzZW50KGkxOG4pKSk7XG4gICAgfSBlbHNlIGlmIChuIGluc3RhbmNlb2YgSHRtbFRleHRBc3QpIHtcbiAgICAgIHJlcy5wdXNoKG5ldyBQYXJ0KG51bGwsIG4sIG51bGwsIG51bGwsIGZhbHNlKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcm9vdEVsZW1lbnQ6IEh0bWxFbGVtZW50QXN0LCBwdWJsaWMgcm9vdFRleHROb2RlOiBIdG1sVGV4dEFzdCxcbiAgICAgICAgICAgICAgcHVibGljIGNoaWxkcmVuOiBIdG1sQXN0W10sIHB1YmxpYyBpMThuOiBzdHJpbmcsIHB1YmxpYyBoYXNJMThuOiBib29sZWFuKSB7fVxuXG4gIGdldCBzb3VyY2VTcGFuKCk6IFBhcnNlU291cmNlU3BhbiB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvb3RFbGVtZW50KSlcbiAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50LnNvdXJjZVNwYW47XG4gICAgZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMucm9vdFRleHROb2RlKSlcbiAgICAgIHJldHVybiB0aGlzLnJvb3RUZXh0Tm9kZS5zb3VyY2VTcGFuO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnNvdXJjZVNwYW47XG4gIH1cblxuICBjcmVhdGVNZXNzYWdlKHBhcnNlcjogUGFyc2VyKTogTWVzc2FnZSB7XG4gICAgcmV0dXJuIG5ldyBNZXNzYWdlKHN0cmluZ2lmeU5vZGVzKHRoaXMuY2hpbGRyZW4sIHBhcnNlciksIG1lYW5pbmcodGhpcy5pMThuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24odGhpcy5pMThuKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2lzT3BlbmluZ0NvbW1lbnQobjogSHRtbEFzdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbiBpbnN0YW5jZW9mIEh0bWxDb21tZW50QXN0ICYmIGlzUHJlc2VudChuLnZhbHVlKSAmJiBuLnZhbHVlLnN0YXJ0c1dpdGgoXCJpMThuOlwiKTtcbn1cblxuZnVuY3Rpb24gX2lzQ2xvc2luZ0NvbW1lbnQobjogSHRtbEFzdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbiBpbnN0YW5jZW9mIEh0bWxDb21tZW50QXN0ICYmIGlzUHJlc2VudChuLnZhbHVlKSAmJiBuLnZhbHVlID09IFwiL2kxOG5cIjtcbn1cblxuZnVuY3Rpb24gX2ZpbmRJMThuQXR0cihwOiBIdG1sRWxlbWVudEFzdCk6IEh0bWxBdHRyQXN0IHtcbiAgbGV0IGkxOG4gPSBwLmF0dHJzLmZpbHRlcihhID0+IGEubmFtZSA9PSBJMThOX0FUVFIpO1xuICByZXR1cm4gaTE4bi5sZW5ndGggPT0gMCA/IG51bGwgOiBpMThuWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVhbmluZyhpMThuOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhpMThuKSB8fCBpMThuID09IFwiXCIpIHJldHVybiBudWxsO1xuICByZXR1cm4gaTE4bi5zcGxpdChcInxcIilbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmlwdGlvbihpMThuOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhpMThuKSB8fCBpMThuID09IFwiXCIpIHJldHVybiBudWxsO1xuICBsZXQgcGFydHMgPSBpMThuLnNwbGl0KFwifFwiKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlRnJvbUF0dHJpYnV0ZShwYXJzZXI6IFBhcnNlciwgcDogSHRtbEVsZW1lbnRBc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cjogSHRtbEF0dHJBc3QpOiBNZXNzYWdlIHtcbiAgbGV0IGV4cGVjdGVkTmFtZSA9IGF0dHIubmFtZS5zdWJzdHJpbmcoNSk7XG4gIGxldCBtYXRjaGluZyA9IHAuYXR0cnMuZmlsdGVyKGEgPT4gYS5uYW1lID09IGV4cGVjdGVkTmFtZSk7XG5cbiAgaWYgKG1hdGNoaW5nLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsdWUgPSByZW1vdmVJbnRlcnBvbGF0aW9uKG1hdGNoaW5nWzBdLnZhbHVlLCBtYXRjaGluZ1swXS5zb3VyY2VTcGFuLCBwYXJzZXIpO1xuICAgIHJldHVybiBuZXcgTWVzc2FnZSh2YWx1ZSwgbWVhbmluZyhhdHRyLnZhbHVlKSwgZGVzY3JpcHRpb24oYXR0ci52YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBJMThuRXJyb3IocC5zb3VyY2VTcGFuLCBgTWlzc2luZyBhdHRyaWJ1dGUgJyR7ZXhwZWN0ZWROYW1lfScuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUludGVycG9sYXRpb24odmFsdWU6IHN0cmluZywgc291cmNlOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXI6IFBhcnNlcik6IHN0cmluZyB7XG4gIHRyeSB7XG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlci5zcGxpdEludGVycG9sYXRpb24odmFsdWUsIHNvdXJjZS50b1N0cmluZygpKTtcbiAgICBpZiAoaXNQcmVzZW50KHBhcnNlZCkpIHtcbiAgICAgIGxldCByZXMgPSBcIlwiO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWQuc3RyaW5ncy5sZW5ndGg7ICsraSkge1xuICAgICAgICByZXMgKz0gcGFyc2VkLnN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpICE9IHBhcnNlZC5zdHJpbmdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXMgKz0gYDxwaCBuYW1lPVwiJHtpfVwiLz5gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlOb2Rlcyhub2RlczogSHRtbEFzdFtdLCBwYXJzZXI6IFBhcnNlcik6IHN0cmluZyB7XG4gIGxldCB2aXNpdG9yID0gbmV3IF9TdHJpbmdpZnlWaXNpdG9yKHBhcnNlcik7XG4gIHJldHVybiBodG1sVmlzaXRBbGwodmlzaXRvciwgbm9kZXMpLmpvaW4oXCJcIik7XG59XG5cbmNsYXNzIF9TdHJpbmdpZnlWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBwcml2YXRlIF9pbmRleDogbnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXIpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogSHRtbEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IG5hbWUgPSB0aGlzLl9pbmRleCsrO1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2pvaW4oaHRtbFZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbiksIFwiXCIpO1xuICAgIHJldHVybiBgPHBoIG5hbWU9XCJlJHtuYW1lfVwiPiR7Y2hpbGRyZW59PC9waD5gO1xuICB9XG5cbiAgdmlzaXRBdHRyKGFzdDogSHRtbEF0dHJBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRUZXh0KGFzdDogSHRtbFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5faW5kZXgrKztcbiAgICBsZXQgbm9JbnRlcnBvbGF0aW9uID0gcmVtb3ZlSW50ZXJwb2xhdGlvbihhc3QudmFsdWUsIGFzdC5zb3VyY2VTcGFuLCB0aGlzLl9wYXJzZXIpO1xuICAgIGlmIChub0ludGVycG9sYXRpb24gIT0gYXN0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gYDxwaCBuYW1lPVwidCR7aW5kZXh9XCI+JHtub0ludGVycG9sYXRpb259PC9waD5gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXN0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0Q29tbWVudChhc3Q6IEh0bWxDb21tZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gXCJcIjsgfVxuXG4gIHByaXZhdGUgX2pvaW4oc3Ryczogc3RyaW5nW10sIHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3Rycy5maWx0ZXIocyA9PiBzLmxlbmd0aCA+IDApLmpvaW4oc3RyKTtcbiAgfVxufVxuIl19