/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
export { Router } from './src/router/router';
export { RouterOutlet } from './src/router/directives/router_outlet';
export { RouterLink } from './src/router/directives/router_link';
export { RouteParams, RouteData } from './src/router/instruction';
export { PlatformLocation } from './src/router/location/platform_location';
export { RouteRegistry, ROUTER_PRIMARY_COMPONENT } from './src/router/route_registry';
export { LocationStrategy, APP_BASE_HREF } from './src/router/location/location_strategy';
export { HashLocationStrategy } from './src/router/location/hash_location_strategy';
export { PathLocationStrategy } from './src/router/location/path_location_strategy';
export { Location } from './src/router/location/location';
export * from './src/router/route_config/route_config_decorator';
export * from './src/router/route_definition';
export { CanActivate } from './src/router/lifecycle/lifecycle_annotations';
export { Instruction, ComponentInstruction } from './src/router/instruction';
export { OpaqueToken } from 'angular2/core';
export { ROUTER_PROVIDERS_COMMON } from 'angular2/src/router/router_providers_common';
export { ROUTER_PROVIDERS, ROUTER_BINDINGS } from 'angular2/src/router/router_providers';
import { RouterOutlet } from './src/router/directives/router_outlet';
import { RouterLink } from './src/router/directives/router_link';
import { CONST_EXPR } from './src/facade/lang';
/**
 * A list of directives. To use the router directives like {@link RouterOutlet} and
 * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
 * component.
 *
 * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
 *
 * ```
 * import {Component} from 'angular2/core';
 * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *    // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
export const ROUTER_DIRECTIVES = CONST_EXPR([RouterOutlet, RouterLink]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1RRWNuUXBMdC50bXAvYW5ndWxhcjIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxTQUFRLE1BQU0sUUFBTyxxQkFBcUIsQ0FBQztBQUMzQyxTQUFRLFlBQVksUUFBTyx1Q0FBdUMsQ0FBQztBQUNuRSxTQUFRLFVBQVUsUUFBTyxxQ0FBcUMsQ0FBQztBQUMvRCxTQUFRLFdBQVcsRUFBRSxTQUFTLFFBQU8sMEJBQTBCLENBQUM7QUFDaEUsU0FBUSxnQkFBZ0IsUUFBTyx5Q0FBeUMsQ0FBQztBQUN6RSxTQUFRLGFBQWEsRUFBRSx3QkFBd0IsUUFBTyw2QkFBNkIsQ0FBQztBQUNwRixTQUFRLGdCQUFnQixFQUFFLGFBQWEsUUFBTyx5Q0FBeUMsQ0FBQztBQUN4RixTQUFRLG9CQUFvQixRQUFPLDhDQUE4QyxDQUFDO0FBQ2xGLFNBQVEsb0JBQW9CLFFBQU8sOENBQThDLENBQUM7QUFDbEYsU0FBUSxRQUFRLFFBQU8sZ0NBQWdDLENBQUM7QUFDeEQsY0FBYyxrREFBa0QsQ0FBQztBQUNqRSxjQUFjLCtCQUErQixDQUFDO0FBRTlDLFNBQVEsV0FBVyxRQUFPLDhDQUE4QyxDQUFDO0FBQ3pFLFNBQVEsV0FBVyxFQUFFLG9CQUFvQixRQUFPLDBCQUEwQixDQUFDO0FBQzNFLFNBQVEsV0FBVyxRQUFPLGVBQWUsQ0FBQztBQUMxQyxTQUFRLHVCQUF1QixRQUFPLDZDQUE2QyxDQUFDO0FBQ3BGLFNBQVEsZ0JBQWdCLEVBQUUsZUFBZSxRQUFPLHNDQUFzQyxDQUFDO09BRWhGLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDO09BQzNELEVBQUMsVUFBVSxFQUFDLE1BQU0scUNBQXFDO09BQ3ZELEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxhQUFhLGlCQUFpQixHQUFVLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIE1hcHMgYXBwbGljYXRpb24gVVJMcyBpbnRvIGFwcGxpY2F0aW9uIHN0YXRlcywgdG8gc3VwcG9ydCBkZWVwLWxpbmtpbmcgYW5kIG5hdmlnYXRpb24uXG4gKi9cblxuZXhwb3J0IHtSb3V0ZXJ9IGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZXInO1xuZXhwb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuZXhwb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGluayc7XG5leHBvcnQge1JvdXRlUGFyYW1zLCBSb3V0ZURhdGF9IGZyb20gJy4vc3JjL3JvdXRlci9pbnN0cnVjdGlvbic7XG5leHBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5leHBvcnQge1JvdXRlUmVnaXN0cnksIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVH0gZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlX3JlZ2lzdHJ5JztcbmV4cG9ydCB7TG9jYXRpb25TdHJhdGVneSwgQVBQX0JBU0VfSFJFRn0gZnJvbSAnLi9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5JztcbmV4cG9ydCB7SGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbi9oYXNoX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmV4cG9ydCB7UGF0aExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbi9wYXRoX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmV4cG9ydCB7TG9jYXRpb259IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlX2RlZmluaXRpb24nO1xuZXhwb3J0IHtPbkFjdGl2YXRlLCBPbkRlYWN0aXZhdGUsIE9uUmV1c2UsIENhbkRlYWN0aXZhdGUsIENhblJldXNlfSBmcm9tICcuL3NyYy9yb3V0ZXIvaW50ZXJmYWNlcyc7XG5leHBvcnQge0NhbkFjdGl2YXRlfSBmcm9tICcuL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9ucyc7XG5leHBvcnQge0luc3RydWN0aW9uLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi9zcmMvcm91dGVyL2luc3RydWN0aW9uJztcbmV4cG9ydCB7T3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuZXhwb3J0IHtST1VURVJfUFJPVklERVJTX0NPTU1PTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzX2NvbW1vbic7XG5leHBvcnQge1JPVVRFUl9QUk9WSURFUlMsIFJPVVRFUl9CSU5ESU5HU30gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGluayc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJy4vc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIGxpc3Qgb2YgZGlyZWN0aXZlcy4gVG8gdXNlIHRoZSByb3V0ZXIgZGlyZWN0aXZlcyBsaWtlIHtAbGluayBSb3V0ZXJPdXRsZXR9IGFuZFxuICoge0BsaW5rIFJvdXRlckxpbmt9LCBhZGQgdGhpcyB0byB5b3VyIGBkaXJlY3RpdmVzYCBhcnJheSBpbiB0aGUge0BsaW5rIFZpZXd9IGRlY29yYXRvciBvZiB5b3VyXG4gKiBjb21wb25lbnQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2lSVVA4QjVPVWJ4Q1dRM0FjSURtKSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlMsIFJvdXRlQ29uZmlnfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAgLy8gLi4uXG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1JPVVRFUl9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVM6IGFueVtdID0gQ09OU1RfRVhQUihbUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rXSk7XG4iXX0=