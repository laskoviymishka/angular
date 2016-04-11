import { isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map, MapWrapper, Set, SetWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { ReflectorReader } from './reflector_reader';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export class ReflectionInfo {
    constructor(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector extends ReflectorReader {
    constructor(reflectionCapabilities) {
        super();
        /** @internal */
        this._injectableInfo = new Map();
        /** @internal */
        this._getters = new Map();
        /** @internal */
        this._setters = new Map();
        /** @internal */
        this._methods = new Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage() { this._usedKeys = new Set(); }
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys() {
        if (this._usedKeys == null) {
            throw new BaseException('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(key => !SetWrapper.has(this._usedKeys, key));
    }
    registerFunction(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    }
    registerType(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    }
    registerGetters(getters) { _mergeMaps(this._getters, getters); }
    registerSetters(setters) { _mergeMaps(this._setters, setters); }
    registerMethods(methods) { _mergeMaps(this._methods, methods); }
    factory(type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    }
    parameters(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    }
    annotations(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    }
    propMetadata(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    }
    interfaces(type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    }
    getter(name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    }
    setter(name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    }
    method(name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    }
    /** @internal */
    _getReflectionInfo(typeOrFunc) {
        if (isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    }
    /** @internal */
    _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
}
function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1RRWNuUXBMdC50bXAvYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOlsiUmVmbGVjdGlvbkluZm8iLCJSZWZsZWN0aW9uSW5mby5jb25zdHJ1Y3RvciIsIlJlZmxlY3RvciIsIlJlZmxlY3Rvci5jb25zdHJ1Y3RvciIsIlJlZmxlY3Rvci5pc1JlZmxlY3Rpb25FbmFibGVkIiwiUmVmbGVjdG9yLnRyYWNrVXNhZ2UiLCJSZWZsZWN0b3IubGlzdFVudXNlZEtleXMiLCJSZWZsZWN0b3IucmVnaXN0ZXJGdW5jdGlvbiIsIlJlZmxlY3Rvci5yZWdpc3RlclR5cGUiLCJSZWZsZWN0b3IucmVnaXN0ZXJHZXR0ZXJzIiwiUmVmbGVjdG9yLnJlZ2lzdGVyU2V0dGVycyIsIlJlZmxlY3Rvci5yZWdpc3Rlck1ldGhvZHMiLCJSZWZsZWN0b3IuZmFjdG9yeSIsIlJlZmxlY3Rvci5wYXJhbWV0ZXJzIiwiUmVmbGVjdG9yLmFubm90YXRpb25zIiwiUmVmbGVjdG9yLnByb3BNZXRhZGF0YSIsIlJlZmxlY3Rvci5pbnRlcmZhY2VzIiwiUmVmbGVjdG9yLmdldHRlciIsIlJlZmxlY3Rvci5zZXR0ZXIiLCJSZWZsZWN0b3IubWV0aG9kIiwiUmVmbGVjdG9yLl9nZXRSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5fY29udGFpbnNSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5pbXBvcnRVcmkiLCJfbWVyZ2VNYXBzIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFPLFNBQVMsRUFBWSxNQUFNLDBCQUEwQjtPQUM1RCxFQUFDLGFBQWEsRUFBbUIsTUFBTSxnQ0FBZ0M7T0FDdkUsRUFFTCxHQUFHLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2pCLE1BQU0sZ0NBQWdDO09BRWhD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QU9BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLENBQVdBLEVBQUVBLENBQVNBLEtBQUtBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQ2pGQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgTWFwLFxuICBNYXBXcmFwcGVyLFxuICBTZXQsXG4gIFNldFdyYXBwZXIsXG4gIFN0cmluZ01hcFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U2V0dGVyRm4sIEdldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnLi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7UGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuL3BsYXRmb3JtX3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmV4cG9ydCB7U2V0dGVyRm4sIEdldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5leHBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5cbi8qKlxuICogUmVmbGVjdGl2ZSBpbmZvcm1hdGlvbiBhYm91dCBhIHN5bWJvbCwgaW5jbHVkaW5nIGFubm90YXRpb25zLCBpbnRlcmZhY2VzLCBhbmQgb3RoZXIgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aW9uSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhbm5vdGF0aW9ucz86IGFueVtdLCBwdWJsaWMgcGFyYW1ldGVycz86IGFueVtdW10sIHB1YmxpYyBmYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnRlcmZhY2VzPzogYW55W10sIHB1YmxpYyBwcm9wTWV0YWRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55W119KSB7fVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byByZWZsZWN0aW9uIGRhdGEgYWJvdXQgc3ltYm9scy4gVXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXJcbiAqIHRvIHBvd2VyIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGFuZCBjb21waWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3RvciBleHRlbmRzIFJlZmxlY3RvclJlYWRlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luamVjdGFibGVJbmZvID0gbmV3IE1hcDxhbnksIFJlZmxlY3Rpb25JbmZvPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9nZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIEdldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIFNldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9tZXRob2RzID0gbmV3IE1hcDxzdHJpbmcsIE1ldGhvZEZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF91c2VkS2V5czogU2V0PGFueT47XG4gIHJlZmxlY3Rpb25DYXBhYmlsaXRpZXM6IFBsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllcztcblxuICBjb25zdHJ1Y3RvcihyZWZsZWN0aW9uQ2FwYWJpbGl0aWVzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3VzZWRLZXlzID0gbnVsbDtcbiAgICB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzO1xuICB9XG5cbiAgaXNSZWZsZWN0aW9uRW5hYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pc1JlZmxlY3Rpb25FbmFibGVkKCk7IH1cblxuICAvKipcbiAgICogQ2F1c2VzIGB0aGlzYCByZWZsZWN0b3IgdG8gdHJhY2sga2V5cyB1c2VkIHRvIGFjY2Vzc1xuICAgKiB7QGxpbmsgUmVmbGVjdGlvbkluZm99IG9iamVjdHMuXG4gICAqL1xuICB0cmFja1VzYWdlKCk6IHZvaWQgeyB0aGlzLl91c2VkS2V5cyA9IG5ldyBTZXQoKTsgfVxuXG4gIC8qKlxuICAgKiBMaXN0cyB0eXBlcyBmb3Igd2hpY2ggcmVmbGVjdGlvbiBpbmZvcm1hdGlvbiB3YXMgbm90IHJlcXVlc3RlZCBzaW5jZVxuICAgKiB7QGxpbmsgI3RyYWNrVXNhZ2V9IHdhcyBjYWxsZWQuIFRoaXMgbGlzdCBjb3VsZCBsYXRlciBiZSBhdWRpdGVkIGFzXG4gICAqIHBvdGVudGlhbCBkZWFkIGNvZGUuXG4gICAqL1xuICBsaXN0VW51c2VkS2V5cygpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX3VzZWRLZXlzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdVc2FnZSB0cmFja2luZyBpcyBkaXNhYmxlZCcpO1xuICAgIH1cbiAgICB2YXIgYWxsVHlwZXMgPSBNYXBXcmFwcGVyLmtleXModGhpcy5faW5qZWN0YWJsZUluZm8pO1xuICAgIHJldHVybiBhbGxUeXBlcy5maWx0ZXIoa2V5ID0+ICFTZXRXcmFwcGVyLmhhcyh0aGlzLl91c2VkS2V5cywga2V5KSk7XG4gIH1cblxuICByZWdpc3RlckZ1bmN0aW9uKGZ1bmM6IEZ1bmN0aW9uLCBmdW5jSW5mbzogUmVmbGVjdGlvbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLl9pbmplY3RhYmxlSW5mby5zZXQoZnVuYywgZnVuY0luZm8pO1xuICB9XG5cbiAgcmVnaXN0ZXJUeXBlKHR5cGU6IFR5cGUsIHR5cGVJbmZvOiBSZWZsZWN0aW9uSW5mbyk6IHZvaWQge1xuICAgIHRoaXMuX2luamVjdGFibGVJbmZvLnNldCh0eXBlLCB0eXBlSW5mbyk7XG4gIH1cblxuICByZWdpc3RlckdldHRlcnMoZ2V0dGVyczoge1trZXk6IHN0cmluZ106IEdldHRlckZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX2dldHRlcnMsIGdldHRlcnMpOyB9XG5cbiAgcmVnaXN0ZXJTZXR0ZXJzKHNldHRlcnM6IHtba2V5OiBzdHJpbmddOiBTZXR0ZXJGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9zZXR0ZXJzLCBzZXR0ZXJzKTsgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzOiB7W2tleTogc3RyaW5nXTogTWV0aG9kRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fbWV0aG9kcywgbWV0aG9kcyk7IH1cblxuICBmYWN0b3J5KHR5cGU6IFR5cGUpOiBGdW5jdGlvbiB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5zUmVmbGVjdGlvbkluZm8odHlwZSkpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlKS5mYWN0b3J5O1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5mYWN0b3J5KHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmFtZXRlcnModHlwZU9yRnVuYzogLypUeXBlKi8gYW55KTogYW55W11bXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLnBhcmFtZXRlcnM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgfVxuXG4gIGFubm90YXRpb25zKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGVPckZ1bmMpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYykuYW5ub3RhdGlvbnM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5hbm5vdGF0aW9ucyh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBwcm9wTWV0YWRhdGEodHlwZU9yRnVuYzogLypUeXBlKi8gYW55KToge1trZXk6IHN0cmluZ106IGFueVtdfSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLnByb3BNZXRhZGF0YTtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnByb3BNZXRhZGF0YSh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBpbnRlcmZhY2VzKHR5cGU6IFR5cGUpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGUpLmludGVyZmFjZXM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pbnRlcmZhY2VzKHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGdldHRlcihuYW1lOiBzdHJpbmcpOiBHZXR0ZXJGbiB7XG4gICAgaWYgKHRoaXMuX2dldHRlcnMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0dGVycy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZ2V0dGVyKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldHRlcihuYW1lOiBzdHJpbmcpOiBTZXR0ZXJGbiB7XG4gICAgaWYgKHRoaXMuX3NldHRlcnMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0dGVycy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuc2V0dGVyKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIG1ldGhvZChuYW1lOiBzdHJpbmcpOiBNZXRob2RGbiB7XG4gICAgaWYgKHRoaXMuX21ldGhvZHMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMubWV0aG9kKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmM6IGFueSk6IFJlZmxlY3Rpb25JbmZvIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3VzZWRLZXlzKSkge1xuICAgICAgdGhpcy5fdXNlZEtleXMuYWRkKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW5qZWN0YWJsZUluZm8uZ2V0KHR5cGVPckZ1bmMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udGFpbnNSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jOiBhbnkpIHsgcmV0dXJuIHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKTsgfVxuXG4gIGltcG9ydFVyaSh0eXBlOiBUeXBlKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pbXBvcnRVcmkodHlwZSk7IH1cbn1cblxuZnVuY3Rpb24gX21lcmdlTWFwcyh0YXJnZXQ6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiwgY29uZmlnOiB7W2tleTogc3RyaW5nXTogRnVuY3Rpb259KTogdm9pZCB7XG4gIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChjb25maWcsICh2OiBGdW5jdGlvbiwgazogc3RyaW5nKSA9PiB0YXJnZXQuc2V0KGssIHYpKTtcbn1cbiJdfQ==