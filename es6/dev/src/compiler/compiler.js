import { RuntimeCompiler_ } from "./runtime_compiler";
export { TemplateCompiler } from './template_compiler';
export { CompileDirectiveMetadata, CompileTypeMetadata, CompileTemplateMetadata } from './directive_metadata';
export { SourceModule, SourceWithImports } from './source_module';
export { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from 'angular2/src/core/platform_directives_and_pipes';
export * from 'angular2/src/compiler/template_ast';
export { TEMPLATE_TRANSFORMS } from 'angular2/src/compiler/template_parser';
import { assertionsEnabled, CONST_EXPR } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { TemplateParser } from 'angular2/src/compiler/template_parser';
import { HtmlParser } from 'angular2/src/compiler/html_parser';
import { TemplateNormalizer } from 'angular2/src/compiler/template_normalizer';
import { RuntimeMetadataResolver } from 'angular2/src/compiler/runtime_metadata';
import { ChangeDetectionCompiler } from 'angular2/src/compiler/change_detector_compiler';
import { StyleCompiler } from 'angular2/src/compiler/style_compiler';
import { ViewCompiler } from 'angular2/src/compiler/view_compiler';
import { ProtoViewCompiler } from 'angular2/src/compiler/proto_view_compiler';
import { TemplateCompiler } from 'angular2/src/compiler/template_compiler';
import { ChangeDetectorGenConfig } from 'angular2/src/core/change_detection/change_detection';
import { Compiler } from 'angular2/src/core/linker/compiler';
import { RuntimeCompiler } from 'angular2/src/compiler/runtime_compiler';
import { ElementSchemaRegistry } from 'angular2/src/compiler/schema/element_schema_registry';
import { DomElementSchemaRegistry } from 'angular2/src/compiler/schema/dom_element_schema_registry';
import { UrlResolver, DEFAULT_PACKAGE_URL_PROVIDER } from 'angular2/src/compiler/url_resolver';
import { Parser, Lexer } from 'angular2/src/core/change_detection/change_detection';
function _createChangeDetectorGenConfig() {
    return new ChangeDetectorGenConfig(assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
export const COMPILER_PROVIDERS = CONST_EXPR([
    Lexer,
    Parser,
    HtmlParser,
    TemplateParser,
    TemplateNormalizer,
    RuntimeMetadataResolver,
    DEFAULT_PACKAGE_URL_PROVIDER,
    StyleCompiler,
    ProtoViewCompiler,
    ViewCompiler,
    ChangeDetectionCompiler,
    new Provider(ChangeDetectorGenConfig, { useFactory: _createChangeDetectorGenConfig, deps: [] }),
    TemplateCompiler,
    new Provider(RuntimeCompiler, { useClass: RuntimeCompiler_ }),
    new Provider(Compiler, { useExisting: RuntimeCompiler }),
    DomElementSchemaRegistry,
    new Provider(ElementSchemaRegistry, { useExisting: DomElementSchemaRegistry }),
    UrlResolver
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVFFY25RcEx0LnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOlsiX2NyZWF0ZUNoYW5nZURldGVjdG9yR2VuQ29uZmlnIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CO0FBQ25ELFNBQVEsZ0JBQWdCLFFBQU8scUJBQXFCLENBQUM7QUFDckQsU0FDRSx3QkFBd0IsRUFDeEIsbUJBQW1CLEVBQ25CLHVCQUF1QixRQUNsQixzQkFBc0IsQ0FBQztBQUM5QixTQUFRLFlBQVksRUFBRSxpQkFBaUIsUUFBTyxpQkFBaUIsQ0FBQztBQUNoRSxTQUFRLG1CQUFtQixFQUFFLGNBQWMsUUFBTyxpREFBaUQsQ0FBQztBQUNwRyxjQUFjLG9DQUFvQyxDQUFDO0FBQ25ELFNBQVEsbUJBQW1CLFFBQU8sdUNBQXVDLENBQUM7T0FDbkUsRUFBQyxpQkFBaUIsRUFBUSxVQUFVLEVBQUMsTUFBTSwwQkFBMEI7T0FDckUsRUFBVSxRQUFRLEVBQUMsTUFBTSxzQkFBc0I7T0FDL0MsRUFBQyxjQUFjLEVBQUMsTUFBTSx1Q0FBdUM7T0FDN0QsRUFBQyxVQUFVLEVBQUMsTUFBTSxtQ0FBbUM7T0FDckQsRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJDQUEyQztPQUNyRSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDO09BQ3ZFLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnREFBZ0Q7T0FDL0UsRUFBQyxhQUFhLEVBQUMsTUFBTSxzQ0FBc0M7T0FDM0QsRUFBQyxZQUFZLEVBQUMsTUFBTSxxQ0FBcUM7T0FDekQsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDJDQUEyQztPQUNwRSxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUNBQXlDO09BQ2pFLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxREFBcUQ7T0FDcEYsRUFBQyxRQUFRLEVBQUMsTUFBTSxtQ0FBbUM7T0FDbkQsRUFBQyxlQUFlLEVBQUMsTUFBTSx3Q0FBd0M7T0FDL0QsRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNEQUFzRDtPQUNuRixFQUFDLHdCQUF3QixFQUFDLE1BQU0sMERBQTBEO09BQzFGLEVBQUMsV0FBVyxFQUFFLDRCQUE0QixFQUFDLE1BQU0sb0NBQW9DO09BQ3JGLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLHFEQUFxRDtBQUVqRjtJQUNFQSxNQUFNQSxDQUFDQSxJQUFJQSx1QkFBdUJBLENBQUNBLGlCQUFpQkEsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7QUFDdkVBLENBQUNBO0FBRUQ7OztHQUdHO0FBQ0gsYUFBYSxrQkFBa0IsR0FBbUMsVUFBVSxDQUFDO0lBQzNFLEtBQUs7SUFDTCxNQUFNO0lBQ04sVUFBVTtJQUNWLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsSUFBSSxRQUFRLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxVQUFVLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBQzdGLGdCQUFnQjtJQUNoQixJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztJQUMzRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLENBQUM7SUFDdEQsd0JBQXdCO0lBQ3hCLElBQUksUUFBUSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsV0FBVyxFQUFFLHdCQUF3QixFQUFDLENBQUM7SUFDNUUsV0FBVztDQUNaLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UnVudGltZUNvbXBpbGVyX30gZnJvbSBcIi4vcnVudGltZV9jb21waWxlclwiO1xuZXhwb3J0IHtUZW1wbGF0ZUNvbXBpbGVyfSBmcm9tICcuL3RlbXBsYXRlX2NvbXBpbGVyJztcbmV4cG9ydCB7XG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbn0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuZXhwb3J0IHtTb3VyY2VNb2R1bGUsIFNvdXJjZVdpdGhJbXBvcnRzfSBmcm9tICcuL3NvdXJjZV9tb2R1bGUnO1xuZXhwb3J0IHtQTEFURk9STV9ESVJFQ1RJVkVTLCBQTEFURk9STV9QSVBFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcGxhdGZvcm1fZGlyZWN0aXZlc19hbmRfcGlwZXMnO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2FzdCc7XG5leHBvcnQge1RFTVBMQVRFX1RSQU5TRk9STVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHthc3NlcnRpb25zRW5hYmxlZCwgVHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VGVtcGxhdGVQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtUZW1wbGF0ZU5vcm1hbGl6ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9ub3JtYWxpemVyJztcbmltcG9ydCB7UnVudGltZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9jaGFuZ2VfZGV0ZWN0b3JfY29tcGlsZXInO1xuaW1wb3J0IHtTdHlsZUNvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyJztcbmltcG9ydCB7UHJvdG9WaWV3Q29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9wcm90b192aWV3X2NvbXBpbGVyJztcbmltcG9ydCB7VGVtcGxhdGVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2NvbXBpbGVyJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JHZW5Db25maWd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge0NvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcGlsZXInO1xuaW1wb3J0IHtSdW50aW1lQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyJztcbmltcG9ydCB7RWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2RvbV9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge1VybFJlc29sdmVyLCBERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7UGFyc2VyLCBMZXhlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcblxuZnVuY3Rpb24gX2NyZWF0ZUNoYW5nZURldGVjdG9yR2VuQ29uZmlnKCkge1xuICByZXR1cm4gbmV3IENoYW5nZURldGVjdG9yR2VuQ29uZmlnKGFzc2VydGlvbnNFbmFibGVkKCksIGZhbHNlLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBBIHNldCBvZiBwcm92aWRlcnMgdGhhdCBwcm92aWRlIGBSdW50aW1lQ29tcGlsZXJgIGFuZCBpdHMgZGVwZW5kZW5jaWVzIHRvIHVzZSBmb3JcbiAqIHRlbXBsYXRlIGNvbXBpbGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgQ09NUElMRVJfUFJPVklERVJTOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBDT05TVF9FWFBSKFtcbiAgTGV4ZXIsXG4gIFBhcnNlcixcbiAgSHRtbFBhcnNlcixcbiAgVGVtcGxhdGVQYXJzZXIsXG4gIFRlbXBsYXRlTm9ybWFsaXplcixcbiAgUnVudGltZU1ldGFkYXRhUmVzb2x2ZXIsXG4gIERFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVIsXG4gIFN0eWxlQ29tcGlsZXIsXG4gIFByb3RvVmlld0NvbXBpbGVyLFxuICBWaWV3Q29tcGlsZXIsXG4gIENoYW5nZURldGVjdGlvbkNvbXBpbGVyLFxuICBuZXcgUHJvdmlkZXIoQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsIHt1c2VGYWN0b3J5OiBfY3JlYXRlQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsIGRlcHM6IFtdfSksXG4gIFRlbXBsYXRlQ29tcGlsZXIsXG4gIG5ldyBQcm92aWRlcihSdW50aW1lQ29tcGlsZXIsIHt1c2VDbGFzczogUnVudGltZUNvbXBpbGVyX30pLFxuICBuZXcgUHJvdmlkZXIoQ29tcGlsZXIsIHt1c2VFeGlzdGluZzogUnVudGltZUNvbXBpbGVyfSksXG4gIERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSxcbiAgbmV3IFByb3ZpZGVyKEVsZW1lbnRTY2hlbWFSZWdpc3RyeSwge3VzZUV4aXN0aW5nOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9KSxcbiAgVXJsUmVzb2x2ZXJcbl0pO1xuIl19