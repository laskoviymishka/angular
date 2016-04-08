'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/prod_mode'));
__export(require('./src/core/di'));
__export(require('./src/facade/facade'));
var lang_1 = require('angular2/src/facade/lang');
exports.enableProdMode = lang_1.enableProdMode;
var application_ref_1 = require('./src/core/application_ref');
exports.platform = application_ref_1.platform;
exports.createNgZone = application_ref_1.createNgZone;
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
var application_tokens_1 = require('./src/core/application_tokens');
exports.APP_ID = application_tokens_1.APP_ID;
exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/linker'));
var debug_node_1 = require('./src/core/debug/debug_node');
exports.DebugElement = debug_node_1.DebugElement;
exports.DebugNode = debug_node_1.DebugNode;
exports.asNativeElements = debug_node_1.asNativeElements;
__export(require('./src/core/testability/testability'));
__export(require('./src/core/change_detection'));
__export(require('./src/core/platform_directives_and_pipes'));
__export(require('./src/core/platform_common_providers'));
__export(require('./src/core/application_common_providers'));
__export(require('./src/core/reflection/reflection'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtS2ZiNWM4VDIudG1wL2FuZ3VsYXIyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7R0FJRztBQUNILGlCQUFjLHFCQUFxQixDQUFDLEVBQUE7QUFDcEMsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQUNoQyxpQkFBYyxzQkFBc0IsQ0FBQyxFQUFBO0FBQ3JDLGlCQUFjLGVBQWUsQ0FBQyxFQUFBO0FBQzlCLGlCQUFjLHFCQUFxQixDQUFDLEVBQUE7QUFDcEMscUJBQTZCLDBCQUEwQixDQUFDO0FBQWhELCtDQUFnRDtBQUN4RCxnQ0FBa0UsNEJBQTRCLENBQUM7QUFBdkYsOENBQVE7QUFBRSxzREFBWTtBQUFFLG9EQUFXO0FBQUUsMERBQWtEO0FBQy9GLG1DQU1PLCtCQUErQixDQUFDO0FBTHJDLDZDQUFNO0FBQ04sMkRBQWE7QUFDYiwrREFBZTtBQUNmLGlFQUFnQjtBQUNoQix5RUFDcUM7QUFDdkMsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQUNoQyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLGlCQUFjLG1CQUFtQixDQUFDLEVBQUE7QUFDbEMsMkJBQXdELDZCQUE2QixDQUFDO0FBQTlFLGlEQUFZO0FBQUUsMkNBQVM7QUFBRSx5REFBcUQ7QUFDdEYsaUJBQWMsb0NBQW9DLENBQUMsRUFBQTtBQUNuRCxpQkFBYyw2QkFBNkIsQ0FBQyxFQUFBO0FBQzVDLGlCQUFjLDBDQUEwQyxDQUFDLEVBQUE7QUFDekQsaUJBQWMsc0NBQXNDLENBQUMsRUFBQTtBQUNyRCxpQkFBYyx5Q0FBeUMsQ0FBQyxFQUFBO0FBQ3hELGlCQUFjLGtDQUFrQyxDQUFDLEVBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogU3RhcnRpbmcgcG9pbnQgdG8gaW1wb3J0IGFsbCBwdWJsaWMgY29yZSBBUElzLlxuICovXG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvdXRpbCc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3Byb2RfbW9kZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2RpJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2ZhY2FkZS9mYWNhZGUnO1xuZXhwb3J0IHtlbmFibGVQcm9kTW9kZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmV4cG9ydCB7cGxhdGZvcm0sIGNyZWF0ZU5nWm9uZSwgUGxhdGZvcm1SZWYsIEFwcGxpY2F0aW9uUmVmfSBmcm9tICcuL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3JlZic7XG5leHBvcnQge1xuICBBUFBfSUQsXG4gIEFQUF9DT01QT05FTlQsXG4gIEFQUF9JTklUSUFMSVpFUixcbiAgUEFDS0FHRV9ST09UX1VSTCxcbiAgUExBVEZPUk1fSU5JVElBTElaRVJcbn0gZnJvbSAnLi9zcmMvY29yZS9hcHBsaWNhdGlvbl90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS96b25lJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcmVuZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvbGlua2VyJztcbmV4cG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z05vZGUsIGFzTmF0aXZlRWxlbWVudHN9IGZyb20gJy4vc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuIl19