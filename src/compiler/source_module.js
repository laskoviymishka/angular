'use strict';var lang_1 = require('angular2/src/facade/lang');
var MODULE_REGEXP = /#MODULE\[([^\]]*)\]/g;
function moduleRef(moduleUrl) {
    return "#MODULE[" + moduleUrl + "]";
}
exports.moduleRef = moduleRef;
/**
 * Represents generated source code with module references. Internal to the Angular compiler.
 */
var SourceModule = (function () {
    function SourceModule(moduleUrl, sourceWithModuleRefs) {
        this.moduleUrl = moduleUrl;
        this.sourceWithModuleRefs = sourceWithModuleRefs;
    }
    SourceModule.getSourceWithoutImports = function (sourceWithModuleRefs) {
        return lang_1.StringWrapper.replaceAllMapped(sourceWithModuleRefs, MODULE_REGEXP, function (match) { return ''; });
    };
    SourceModule.prototype.getSourceWithImports = function () {
        var _this = this;
        var moduleAliases = {};
        var imports = [];
        var newSource = lang_1.StringWrapper.replaceAllMapped(this.sourceWithModuleRefs, MODULE_REGEXP, function (match) {
            var moduleUrl = match[1];
            var alias = moduleAliases[moduleUrl];
            if (lang_1.isBlank(alias)) {
                if (moduleUrl == _this.moduleUrl) {
                    alias = '';
                }
                else {
                    alias = "import" + imports.length;
                    imports.push([moduleUrl, alias]);
                }
                moduleAliases[moduleUrl] = alias;
            }
            return alias.length > 0 ? alias + "." : '';
        });
        return new SourceWithImports(newSource, imports);
    };
    return SourceModule;
})();
exports.SourceModule = SourceModule;
var SourceExpression = (function () {
    function SourceExpression(declarations, expression) {
        this.declarations = declarations;
        this.expression = expression;
    }
    return SourceExpression;
})();
exports.SourceExpression = SourceExpression;
var SourceExpressions = (function () {
    function SourceExpressions(declarations, expressions) {
        this.declarations = declarations;
        this.expressions = expressions;
    }
    return SourceExpressions;
})();
exports.SourceExpressions = SourceExpressions;
/**
 * Represents generated source code with imports. Internal to the Angular compiler.
 */
var SourceWithImports = (function () {
    function SourceWithImports(source, imports) {
        this.source = source;
        this.imports = imports;
    }
    return SourceWithImports;
})();
exports.SourceWithImports = SourceWithImports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtZGpPVldTcmoudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9zb3VyY2VfbW9kdWxlLnRzIl0sIm5hbWVzIjpbIm1vZHVsZVJlZiIsIlNvdXJjZU1vZHVsZSIsIlNvdXJjZU1vZHVsZS5jb25zdHJ1Y3RvciIsIlNvdXJjZU1vZHVsZS5nZXRTb3VyY2VXaXRob3V0SW1wb3J0cyIsIlNvdXJjZU1vZHVsZS5nZXRTb3VyY2VXaXRoSW1wb3J0cyIsIlNvdXJjZUV4cHJlc3Npb24iLCJTb3VyY2VFeHByZXNzaW9uLmNvbnN0cnVjdG9yIiwiU291cmNlRXhwcmVzc2lvbnMiLCJTb3VyY2VFeHByZXNzaW9ucy5jb25zdHJ1Y3RvciIsIlNvdXJjZVdpdGhJbXBvcnRzIiwiU291cmNlV2l0aEltcG9ydHMuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQywwQkFBMEIsQ0FBQyxDQUFBO0FBRWhFLElBQUksYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBRTNDLG1CQUEwQixTQUFTO0lBQ2pDQSxNQUFNQSxDQUFDQSxhQUFXQSxTQUFTQSxNQUFHQSxDQUFDQTtBQUNqQ0EsQ0FBQ0E7QUFGZSxpQkFBUyxZQUV4QixDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQUtFQyxzQkFBbUJBLFNBQWlCQSxFQUFTQSxvQkFBNEJBO1FBQXREQyxjQUFTQSxHQUFUQSxTQUFTQSxDQUFRQTtRQUFTQSx5QkFBb0JBLEdBQXBCQSxvQkFBb0JBLENBQVFBO0lBQUdBLENBQUNBO0lBSnRFRCxvQ0FBdUJBLEdBQTlCQSxVQUErQkEsb0JBQTRCQTtRQUN6REUsTUFBTUEsQ0FBQ0Esb0JBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxhQUFhQSxFQUFFQSxVQUFDQSxLQUFLQSxJQUFLQSxPQUFBQSxFQUFFQSxFQUFGQSxDQUFFQSxDQUFDQSxDQUFDQTtJQUM1RkEsQ0FBQ0E7SUFJREYsMkNBQW9CQSxHQUFwQkE7UUFBQUcsaUJBbUJDQTtRQWxCQ0EsSUFBSUEsYUFBYUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDdkJBLElBQUlBLE9BQU9BLEdBQWVBLEVBQUVBLENBQUNBO1FBQzdCQSxJQUFJQSxTQUFTQSxHQUNUQSxvQkFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLGFBQWFBLEVBQUVBLFVBQUNBLEtBQUtBO1lBQzdFQSxJQUFJQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsSUFBSUEsS0FBS0EsR0FBR0EsYUFBYUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLEVBQUVBLENBQUNBLENBQUNBLGNBQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsSUFBSUEsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDYkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNOQSxLQUFLQSxHQUFHQSxXQUFTQSxPQUFPQSxDQUFDQSxNQUFRQSxDQUFDQTtvQkFDbENBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQ0EsQ0FBQ0E7Z0JBQ0RBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ25DQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFNQSxLQUFLQSxNQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUEEsTUFBTUEsQ0FBQ0EsSUFBSUEsaUJBQWlCQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUNuREEsQ0FBQ0E7SUFDSEgsbUJBQUNBO0FBQURBLENBQUNBLEFBM0JELElBMkJDO0FBM0JZLG9CQUFZLGVBMkJ4QixDQUFBO0FBRUQ7SUFDRUksMEJBQW1CQSxZQUFzQkEsRUFBU0EsVUFBa0JBO1FBQWpEQyxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBVUE7UUFBU0EsZUFBVUEsR0FBVkEsVUFBVUEsQ0FBUUE7SUFBR0EsQ0FBQ0E7SUFDMUVELHVCQUFDQTtBQUFEQSxDQUFDQSxBQUZELElBRUM7QUFGWSx3QkFBZ0IsbUJBRTVCLENBQUE7QUFFRDtJQUNFRSwyQkFBbUJBLFlBQXNCQSxFQUFTQSxXQUFxQkE7UUFBcERDLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFVQTtRQUFTQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBVUE7SUFBR0EsQ0FBQ0E7SUFDN0VELHdCQUFDQTtBQUFEQSxDQUFDQSxBQUZELElBRUM7QUFGWSx5QkFBaUIsb0JBRTdCLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBQ0VFLDJCQUFtQkEsTUFBY0EsRUFBU0EsT0FBbUJBO1FBQTFDQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUFTQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFZQTtJQUFHQSxDQUFDQTtJQUNuRUQsd0JBQUNBO0FBQURBLENBQUNBLEFBRkQsSUFFQztBQUZZLHlCQUFpQixvQkFFN0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RyaW5nV3JhcHBlciwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxudmFyIE1PRFVMRV9SRUdFWFAgPSAvI01PRFVMRVxcWyhbXlxcXV0qKVxcXS9nO1xuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxlUmVmKG1vZHVsZVVybCk6IHN0cmluZyB7XG4gIHJldHVybiBgI01PRFVMRVske21vZHVsZVVybH1dYDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGdlbmVyYXRlZCBzb3VyY2UgY29kZSB3aXRoIG1vZHVsZSByZWZlcmVuY2VzLiBJbnRlcm5hbCB0byB0aGUgQW5ndWxhciBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNvdXJjZU1vZHVsZSB7XG4gIHN0YXRpYyBnZXRTb3VyY2VXaXRob3V0SW1wb3J0cyhzb3VyY2VXaXRoTW9kdWxlUmVmczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKHNvdXJjZVdpdGhNb2R1bGVSZWZzLCBNT0RVTEVfUkVHRVhQLCAobWF0Y2gpID0+ICcnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2R1bGVVcmw6IHN0cmluZywgcHVibGljIHNvdXJjZVdpdGhNb2R1bGVSZWZzOiBzdHJpbmcpIHt9XG5cbiAgZ2V0U291cmNlV2l0aEltcG9ydHMoKTogU291cmNlV2l0aEltcG9ydHMge1xuICAgIHZhciBtb2R1bGVBbGlhc2VzID0ge307XG4gICAgdmFyIGltcG9ydHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICB2YXIgbmV3U291cmNlID1cbiAgICAgICAgU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKHRoaXMuc291cmNlV2l0aE1vZHVsZVJlZnMsIE1PRFVMRV9SRUdFWFAsIChtYXRjaCkgPT4ge1xuICAgICAgICAgIHZhciBtb2R1bGVVcmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICB2YXIgYWxpYXMgPSBtb2R1bGVBbGlhc2VzW21vZHVsZVVybF07XG4gICAgICAgICAgaWYgKGlzQmxhbmsoYWxpYXMpKSB7XG4gICAgICAgICAgICBpZiAobW9kdWxlVXJsID09IHRoaXMubW9kdWxlVXJsKSB7XG4gICAgICAgICAgICAgIGFsaWFzID0gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbGlhcyA9IGBpbXBvcnQke2ltcG9ydHMubGVuZ3RofWA7XG4gICAgICAgICAgICAgIGltcG9ydHMucHVzaChbbW9kdWxlVXJsLCBhbGlhc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kdWxlQWxpYXNlc1ttb2R1bGVVcmxdID0gYWxpYXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhbGlhcy5sZW5ndGggPiAwID8gYCR7YWxpYXN9LmAgOiAnJztcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VXaXRoSW1wb3J0cyhuZXdTb3VyY2UsIGltcG9ydHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VFeHByZXNzaW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGRlY2xhcmF0aW9uczogc3RyaW5nW10sIHB1YmxpYyBleHByZXNzaW9uOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2VFeHByZXNzaW9ucyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWNsYXJhdGlvbnM6IHN0cmluZ1tdLCBwdWJsaWMgZXhwcmVzc2lvbnM6IHN0cmluZ1tdKSB7fVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgZ2VuZXJhdGVkIHNvdXJjZSBjb2RlIHdpdGggaW1wb3J0cy4gSW50ZXJuYWwgdG8gdGhlIEFuZ3VsYXIgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTb3VyY2VXaXRoSW1wb3J0cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IHN0cmluZywgcHVibGljIGltcG9ydHM6IHN0cmluZ1tdW10pIHt9XG59XG4iXX0=