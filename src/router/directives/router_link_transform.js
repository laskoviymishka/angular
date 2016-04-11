'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var compiler_1 = require('angular2/compiler');
var ast_1 = require('angular2/src/core/change_detection/parser/ast');
var exceptions_1 = require('angular2/src/facade/exceptions');
var core_1 = require('angular2/core');
var parser_1 = require('angular2/src/core/change_detection/parser/parser');
/**
 * e.g., './User', 'Modal' in ./User[Modal(param: value)]
 */
var FixedPart = (function () {
    function FixedPart(value) {
        this.value = value;
    }
    return FixedPart;
})();
/**
 * The square bracket
 */
var AuxiliaryStart = (function () {
    function AuxiliaryStart() {
    }
    return AuxiliaryStart;
})();
/**
 * The square bracket
 */
var AuxiliaryEnd = (function () {
    function AuxiliaryEnd() {
    }
    return AuxiliaryEnd;
})();
/**
 * e.g., param:value in ./User[Modal(param: value)]
 */
var Params = (function () {
    function Params(ast) {
        this.ast = ast;
    }
    return Params;
})();
var RouterLinkLexer = (function () {
    function RouterLinkLexer(parser, exp) {
        this.parser = parser;
        this.exp = exp;
        this.index = 0;
    }
    RouterLinkLexer.prototype.tokenize = function () {
        var tokens = [];
        while (this.index < this.exp.length) {
            tokens.push(this._parseToken());
        }
        return tokens;
    };
    RouterLinkLexer.prototype._parseToken = function () {
        var c = this.exp[this.index];
        if (c == '[') {
            this.index++;
            return new AuxiliaryStart();
        }
        else if (c == ']') {
            this.index++;
            return new AuxiliaryEnd();
        }
        else if (c == '(') {
            return this._parseParams();
        }
        else if (c == '/' && this.index !== 0) {
            this.index++;
            return this._parseFixedPart();
        }
        else {
            return this._parseFixedPart();
        }
    };
    RouterLinkLexer.prototype._parseParams = function () {
        var start = this.index;
        for (; this.index < this.exp.length; ++this.index) {
            var c = this.exp[this.index];
            if (c == ')') {
                var paramsContent = this.exp.substring(start + 1, this.index);
                this.index++;
                return new Params(this.parser.parseBinding("{" + paramsContent + "}", null).ast);
            }
        }
        throw new exceptions_1.BaseException("Cannot find ')'");
    };
    RouterLinkLexer.prototype._parseFixedPart = function () {
        var start = this.index;
        var sawNonSlash = false;
        for (; this.index < this.exp.length; ++this.index) {
            var c = this.exp[this.index];
            if (c == '(' || c == '[' || c == ']' || (c == '/' && sawNonSlash)) {
                break;
            }
            if (c != '.' && c != '/') {
                sawNonSlash = true;
            }
        }
        var fixed = this.exp.substring(start, this.index);
        if (start === this.index || !sawNonSlash || fixed.startsWith('//')) {
            throw new exceptions_1.BaseException("Invalid router link");
        }
        return new FixedPart(fixed);
    };
    return RouterLinkLexer;
})();
var RouterLinkAstGenerator = (function () {
    function RouterLinkAstGenerator(tokens) {
        this.tokens = tokens;
        this.index = 0;
    }
    RouterLinkAstGenerator.prototype.generate = function () { return this._genAuxiliary(); };
    RouterLinkAstGenerator.prototype._genAuxiliary = function () {
        var arr = [];
        for (; this.index < this.tokens.length; this.index++) {
            var r = this.tokens[this.index];
            if (r instanceof FixedPart) {
                arr.push(new ast_1.LiteralPrimitive(r.value));
            }
            else if (r instanceof Params) {
                arr.push(r.ast);
            }
            else if (r instanceof AuxiliaryEnd) {
                break;
            }
            else if (r instanceof AuxiliaryStart) {
                this.index++;
                arr.push(this._genAuxiliary());
            }
        }
        return new ast_1.LiteralArray(arr);
    };
    return RouterLinkAstGenerator;
})();
var RouterLinkAstTransformer = (function (_super) {
    __extends(RouterLinkAstTransformer, _super);
    function RouterLinkAstTransformer(parser) {
        _super.call(this);
        this.parser = parser;
    }
    RouterLinkAstTransformer.prototype.visitQuote = function (ast) {
        if (ast.prefix == "route") {
            return parseRouterLinkExpression(this.parser, ast.uninterpretedExpression);
        }
        else {
            return _super.prototype.visitQuote.call(this, ast);
        }
    };
    return RouterLinkAstTransformer;
})(ast_1.AstTransformer);
function parseRouterLinkExpression(parser, exp) {
    var tokens = new RouterLinkLexer(parser, exp.trim()).tokenize();
    return new RouterLinkAstGenerator(tokens).generate();
}
exports.parseRouterLinkExpression = parseRouterLinkExpression;
/**
 * A compiler plugin that implements the router link DSL.
 */
var RouterLinkTransform = (function () {
    function RouterLinkTransform(parser) {
        this.astTransformer = new RouterLinkAstTransformer(parser);
    }
    RouterLinkTransform.prototype.visitNgContent = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitEmbeddedTemplate = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitElement = function (ast, context) {
        var _this = this;
        var updatedChildren = ast.children.map(function (c) { return c.visit(_this, context); });
        var updatedInputs = ast.inputs.map(function (c) { return c.visit(_this, context); });
        var updatedDirectives = ast.directives.map(function (c) { return c.visit(_this, context); });
        return new compiler_1.ElementAst(ast.name, ast.attrs, updatedInputs, ast.outputs, ast.exportAsVars, updatedDirectives, updatedChildren, ast.ngContentIndex, ast.sourceSpan);
    };
    RouterLinkTransform.prototype.visitVariable = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitEvent = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitElementProperty = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitAttr = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitBoundText = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitText = function (ast, context) { return ast; };
    RouterLinkTransform.prototype.visitDirective = function (ast, context) {
        var _this = this;
        var updatedInputs = ast.inputs.map(function (c) { return c.visit(_this, context); });
        return new compiler_1.DirectiveAst(ast.directive, updatedInputs, ast.hostProperties, ast.hostEvents, ast.exportAsVars, ast.sourceSpan);
    };
    RouterLinkTransform.prototype.visitDirectiveProperty = function (ast, context) {
        var transformedValue = ast.value.visit(this.astTransformer);
        return new compiler_1.BoundDirectivePropertyAst(ast.directiveName, ast.templateName, transformedValue, ast.sourceSpan);
    };
    RouterLinkTransform = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [parser_1.Parser])
    ], RouterLinkTransform);
    return RouterLinkTransform;
})();
exports.RouterLinkTransform = RouterLinkTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfdHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1kak9WV1Nyai50bXAvYW5ndWxhcjIvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6WyJGaXhlZFBhcnQiLCJGaXhlZFBhcnQuY29uc3RydWN0b3IiLCJBdXhpbGlhcnlTdGFydCIsIkF1eGlsaWFyeVN0YXJ0LmNvbnN0cnVjdG9yIiwiQXV4aWxpYXJ5RW5kIiwiQXV4aWxpYXJ5RW5kLmNvbnN0cnVjdG9yIiwiUGFyYW1zIiwiUGFyYW1zLmNvbnN0cnVjdG9yIiwiUm91dGVyTGlua0xleGVyIiwiUm91dGVyTGlua0xleGVyLmNvbnN0cnVjdG9yIiwiUm91dGVyTGlua0xleGVyLnRva2VuaXplIiwiUm91dGVyTGlua0xleGVyLl9wYXJzZVRva2VuIiwiUm91dGVyTGlua0xleGVyLl9wYXJzZVBhcmFtcyIsIlJvdXRlckxpbmtMZXhlci5fcGFyc2VGaXhlZFBhcnQiLCJSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yIiwiUm91dGVyTGlua0FzdEdlbmVyYXRvci5jb25zdHJ1Y3RvciIsIlJvdXRlckxpbmtBc3RHZW5lcmF0b3IuZ2VuZXJhdGUiLCJSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yLl9nZW5BdXhpbGlhcnkiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIuY29uc3RydWN0b3IiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIudmlzaXRRdW90ZSIsInBhcnNlUm91dGVyTGlua0V4cHJlc3Npb24iLCJSb3V0ZXJMaW5rVHJhbnNmb3JtIiwiUm91dGVyTGlua1RyYW5zZm9ybS5jb25zdHJ1Y3RvciIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXROZ0NvbnRlbnQiLCJSb3V0ZXJMaW5rVHJhbnNmb3JtLnZpc2l0RW1iZWRkZWRUZW1wbGF0ZSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRFbGVtZW50IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdFZhcmlhYmxlIiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEV2ZW50IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEVsZW1lbnRQcm9wZXJ0eSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRBdHRyIiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEJvdW5kVGV4dCIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRUZXh0IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdERpcmVjdGl2ZSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXREaXJlY3RpdmVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5QkFNTyxtQkFBbUIsQ0FBQyxDQUFBO0FBQzNCLG9CQVFPLCtDQUErQyxDQUFDLENBQUE7QUFDdkQsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFDN0QscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHVCQUFxQixrREFBa0QsQ0FBQyxDQUFBO0FBRXhFOztHQUVHO0FBQ0g7SUFDRUEsbUJBQW1CQSxLQUFhQTtRQUFiQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFRQTtJQUFHQSxDQUFDQTtJQUN0Q0QsZ0JBQUNBO0FBQURBLENBQUNBLEFBRkQsSUFFQztBQUVEOztHQUVHO0FBQ0g7SUFDRUU7SUFBZUMsQ0FBQ0E7SUFDbEJELHFCQUFDQTtBQUFEQSxDQUFDQSxBQUZELElBRUM7QUFFRDs7R0FFRztBQUNIO0lBQ0VFO0lBQWVDLENBQUNBO0lBQ2xCRCxtQkFBQ0E7QUFBREEsQ0FBQ0EsQUFGRCxJQUVDO0FBRUQ7O0dBRUc7QUFDSDtJQUNFRSxnQkFBbUJBLEdBQVFBO1FBQVJDLFFBQUdBLEdBQUhBLEdBQUdBLENBQUtBO0lBQUdBLENBQUNBO0lBQ2pDRCxhQUFDQTtBQUFEQSxDQUFDQSxBQUZELElBRUM7QUFFRDtJQUdFRSx5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LENBQUNBLEFBekNELElBeUNDO0FBeENZLDJCQUFtQixzQkF3Qy9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIEVsZW1lbnRBc3QsXG4gIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsXG4gIERpcmVjdGl2ZUFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3Rcbn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtcbiAgQXN0VHJhbnNmb3JtZXIsXG4gIFF1b3RlLFxuICBBU1QsXG4gIEVtcHR5RXhwcixcbiAgTGl0ZXJhbEFycmF5LFxuICBMaXRlcmFsUHJpbWl0aXZlLFxuICBBU1RXaXRoU291cmNlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGFyc2VyL2FzdCc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGFyc2VyL3BhcnNlcic7XG5cbi8qKlxuICogZS5nLiwgJy4vVXNlcicsICdNb2RhbCcgaW4gLi9Vc2VyW01vZGFsKHBhcmFtOiB2YWx1ZSldXG4gKi9cbmNsYXNzIEZpeGVkUGFydCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7fVxufVxuXG4vKipcbiAqIFRoZSBzcXVhcmUgYnJhY2tldFxuICovXG5jbGFzcyBBdXhpbGlhcnlTdGFydCB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuLyoqXG4gKiBUaGUgc3F1YXJlIGJyYWNrZXRcbiAqL1xuY2xhc3MgQXV4aWxpYXJ5RW5kIHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuXG4vKipcbiAqIGUuZy4sIHBhcmFtOnZhbHVlIGluIC4vVXNlcltNb2RhbChwYXJhbTogdmFsdWUpXVxuICovXG5jbGFzcyBQYXJhbXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXN0OiBBU1QpIHt9XG59XG5cbmNsYXNzIFJvdXRlckxpbmtMZXhlciB7XG4gIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyc2VyOiBQYXJzZXIsIHByaXZhdGUgZXhwOiBzdHJpbmcpIHt9XG5cbiAgdG9rZW5pemUoKTogQXJyYXk8Rml4ZWRQYXJ0IHwgQXV4aWxpYXJ5U3RhcnQgfCBBdXhpbGlhcnlFbmQgfCBQYXJhbXM+IHtcbiAgICBsZXQgdG9rZW5zID0gW107XG4gICAgd2hpbGUgKHRoaXMuaW5kZXggPCB0aGlzLmV4cC5sZW5ndGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHRoaXMuX3BhcnNlVG9rZW4oKSk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRva2VuKCkge1xuICAgIGxldCBjID0gdGhpcy5leHBbdGhpcy5pbmRleF07XG4gICAgaWYgKGMgPT0gJ1snKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICByZXR1cm4gbmV3IEF1eGlsaWFyeVN0YXJ0KCk7XG5cbiAgICB9IGVsc2UgaWYgKGMgPT0gJ10nKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICByZXR1cm4gbmV3IEF1eGlsaWFyeUVuZCgpO1xuXG4gICAgfSBlbHNlIGlmIChjID09ICcoJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlUGFyYW1zKCk7XG5cbiAgICB9IGVsc2UgaWYgKGMgPT0gJy8nICYmIHRoaXMuaW5kZXggIT09IDApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHJldHVybiB0aGlzLl9wYXJzZUZpeGVkUGFydCgpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJzZUZpeGVkUGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUGFyYW1zKCkge1xuICAgIGxldCBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgZm9yICg7IHRoaXMuaW5kZXggPCB0aGlzLmV4cC5sZW5ndGg7ICsrdGhpcy5pbmRleCkge1xuICAgICAgbGV0IGMgPSB0aGlzLmV4cFt0aGlzLmluZGV4XTtcbiAgICAgIGlmIChjID09ICcpJykge1xuICAgICAgICBsZXQgcGFyYW1zQ29udGVudCA9IHRoaXMuZXhwLnN1YnN0cmluZyhzdGFydCArIDEsIHRoaXMuaW5kZXgpO1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIHJldHVybiBuZXcgUGFyYW1zKHRoaXMucGFyc2VyLnBhcnNlQmluZGluZyhgeyR7cGFyYW1zQ29udGVudH19YCwgbnVsbCkuYXN0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJDYW5ub3QgZmluZCAnKSdcIik7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUZpeGVkUGFydCgpIHtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIGxldCBzYXdOb25TbGFzaCA9IGZhbHNlO1xuXG5cbiAgICBmb3IgKDsgdGhpcy5pbmRleCA8IHRoaXMuZXhwLmxlbmd0aDsgKyt0aGlzLmluZGV4KSB7XG4gICAgICBsZXQgYyA9IHRoaXMuZXhwW3RoaXMuaW5kZXhdO1xuXG4gICAgICBpZiAoYyA9PSAnKCcgfHwgYyA9PSAnWycgfHwgYyA9PSAnXScgfHwgKGMgPT0gJy8nICYmIHNhd05vblNsYXNoKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGMgIT0gJy4nICYmIGMgIT0gJy8nKSB7XG4gICAgICAgIHNhd05vblNsYXNoID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZml4ZWQgPSB0aGlzLmV4cC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuXG4gICAgaWYgKHN0YXJ0ID09PSB0aGlzLmluZGV4IHx8ICFzYXdOb25TbGFzaCB8fCBmaXhlZC5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkludmFsaWQgcm91dGVyIGxpbmtcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGaXhlZFBhcnQoZml4ZWQpO1xuICB9XG59XG5cbmNsYXNzIFJvdXRlckxpbmtBc3RHZW5lcmF0b3Ige1xuICBpbmRleDogbnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b2tlbnM6IGFueVtdKSB7fVxuXG4gIGdlbmVyYXRlKCk6IEFTVCB7IHJldHVybiB0aGlzLl9nZW5BdXhpbGlhcnkoKTsgfVxuXG4gIHByaXZhdGUgX2dlbkF1eGlsaWFyeSgpOiBBU1Qge1xuICAgIGxldCBhcnIgPSBbXTtcbiAgICBmb3IgKDsgdGhpcy5pbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgdGhpcy5pbmRleCsrKSB7XG4gICAgICBsZXQgciA9IHRoaXMudG9rZW5zW3RoaXMuaW5kZXhdO1xuXG4gICAgICBpZiAociBpbnN0YW5jZW9mIEZpeGVkUGFydCkge1xuICAgICAgICBhcnIucHVzaChuZXcgTGl0ZXJhbFByaW1pdGl2ZShyLnZhbHVlKSk7XG5cbiAgICAgIH0gZWxzZSBpZiAociBpbnN0YW5jZW9mIFBhcmFtcykge1xuICAgICAgICBhcnIucHVzaChyLmFzdCk7XG5cbiAgICAgIH0gZWxzZSBpZiAociBpbnN0YW5jZW9mIEF1eGlsaWFyeUVuZCkge1xuICAgICAgICBicmVhaztcblxuICAgICAgfSBlbHNlIGlmIChyIGluc3RhbmNlb2YgQXV4aWxpYXJ5U3RhcnQpIHtcbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICBhcnIucHVzaCh0aGlzLl9nZW5BdXhpbGlhcnkoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsQXJyYXkoYXJyKTtcbiAgfVxufVxuXG5jbGFzcyBSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIgZXh0ZW5kcyBBc3RUcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyc2VyOiBQYXJzZXIpIHsgc3VwZXIoKTsgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSk6IEFTVCB7XG4gICAgaWYgKGFzdC5wcmVmaXggPT0gXCJyb3V0ZVwiKSB7XG4gICAgICByZXR1cm4gcGFyc2VSb3V0ZXJMaW5rRXhwcmVzc2lvbih0aGlzLnBhcnNlciwgYXN0LnVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLnZpc2l0UXVvdGUoYXN0KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUm91dGVyTGlua0V4cHJlc3Npb24ocGFyc2VyOiBQYXJzZXIsIGV4cDogc3RyaW5nKTogQVNUIHtcbiAgbGV0IHRva2VucyA9IG5ldyBSb3V0ZXJMaW5rTGV4ZXIocGFyc2VyLCBleHAudHJpbSgpKS50b2tlbml6ZSgpO1xuICByZXR1cm4gbmV3IFJvdXRlckxpbmtBc3RHZW5lcmF0b3IodG9rZW5zKS5nZW5lcmF0ZSgpO1xufVxuXG4vKipcbiAqIEEgY29tcGlsZXIgcGx1Z2luIHRoYXQgaW1wbGVtZW50cyB0aGUgcm91dGVyIGxpbmsgRFNMLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGVyTGlua1RyYW5zZm9ybSBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHByaXZhdGUgYXN0VHJhbnNmb3JtZXI7XG5cbiAgY29uc3RydWN0b3IocGFyc2VyOiBQYXJzZXIpIHsgdGhpcy5hc3RUcmFuc2Zvcm1lciA9IG5ldyBSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIocGFyc2VyKTsgfVxuXG4gIHZpc2l0TmdDb250ZW50KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgdXBkYXRlZENoaWxkcmVuID0gYXN0LmNoaWxkcmVuLm1hcChjID0+IGMudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIGxldCB1cGRhdGVkSW5wdXRzID0gYXN0LmlucHV0cy5tYXAoYyA9PiBjLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICBsZXQgdXBkYXRlZERpcmVjdGl2ZXMgPSBhc3QuZGlyZWN0aXZlcy5tYXAoYyA9PiBjLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRBc3QoYXN0Lm5hbWUsIGFzdC5hdHRycywgdXBkYXRlZElucHV0cywgYXN0Lm91dHB1dHMsIGFzdC5leHBvcnRBc1ZhcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWREaXJlY3RpdmVzLCB1cGRhdGVkQ2hpbGRyZW4sIGFzdC5uZ0NvbnRlbnRJbmRleCwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRWYXJpYWJsZShhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RXZlbnQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0QXR0cihhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0Qm91bmRUZXh0KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRUZXh0KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHVwZGF0ZWRJbnB1dHMgPSBhc3QuaW5wdXRzLm1hcChjID0+IGMudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIHJldHVybiBuZXcgRGlyZWN0aXZlQXN0KGFzdC5kaXJlY3RpdmUsIHVwZGF0ZWRJbnB1dHMsIGFzdC5ob3N0UHJvcGVydGllcywgYXN0Lmhvc3RFdmVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LmV4cG9ydEFzVmFycywgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eShhc3Q6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHRyYW5zZm9ybWVkVmFsdWUgPSBhc3QudmFsdWUudmlzaXQodGhpcy5hc3RUcmFuc2Zvcm1lcik7XG4gICAgcmV0dXJuIG5ldyBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0KGFzdC5kaXJlY3RpdmVOYW1lLCBhc3QudGVtcGxhdGVOYW1lLCB0cmFuc2Zvcm1lZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Quc291cmNlU3Bhbik7XG4gIH1cbn0iXX0=