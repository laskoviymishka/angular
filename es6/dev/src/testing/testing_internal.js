import { StringMapWrapper } from 'angular2/src/facade/collection';
import { global, isFunction, Math } from 'angular2/src/facade/lang';
import { provide } from 'angular2/core';
import { getTestInjector, FunctionWithParamTokens } from './test_injector';
import { browserDetection } from './utils';
export { inject } from './test_injector';
export { expect } from './matchers';
export var proxy = (t) => t;
var _global = (typeof window === 'undefined' ? global : window);
export var afterEach = _global.afterEach;
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
export class AsyncTestCompleter {
    constructor(_done) {
        this._done = _done;
    }
    done() { this._done(); }
}
var jsmBeforeEach = _global.beforeEach;
var jsmDescribe = _global.describe;
var jsmDDescribe = _global.fdescribe;
var jsmXDescribe = _global.xdescribe;
var jsmIt = _global.it;
var jsmIIt = _global.fit;
var jsmXIt = _global.xit;
var runnerStack = [];
var inIt = false;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
var globalTimeOut = browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
var testInjector = getTestInjector();
/**
 * Mechanism to run `beforeEach()` functions of Angular tests.
 *
 * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
 */
class BeforeEachRunner {
    constructor(_parent) {
        this._parent = _parent;
        this._fns = [];
    }
    beforeEach(fn) { this._fns.push(fn); }
    run() {
        if (this._parent)
            this._parent.run();
        this._fns.forEach((fn) => {
            return isFunction(fn) ? fn() :
                (testInjector.execute(fn));
        });
    }
}
// Reset the test providers before each test
jsmBeforeEach(() => { testInjector.reset(); });
function _describe(jsmFn, ...args) {
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn(...args);
    runnerStack.pop();
    return suite;
}
export function describe(...args) {
    return _describe(jsmDescribe, ...args);
}
export function ddescribe(...args) {
    return _describe(jsmDDescribe, ...args);
}
export function xdescribe(...args) {
    return _describe(jsmXDescribe, ...args);
}
export function beforeEach(fn) {
    if (runnerStack.length > 0) {
        // Inside a describe block, beforeEach() uses a BeforeEachRunner
        runnerStack[runnerStack.length - 1].beforeEach(fn);
    }
    else {
        // Top level beforeEach() are delegated to jasmine
        jsmBeforeEach(fn);
    }
}
/**
 * Allows overriding default providers defined in test_injector.js.
 *
 * The given function must return a list of DI providers.
 *
 * Example:
 *
 *   beforeEachProviders(() => [
 *     provide(Compiler, {useClass: MockCompiler}),
 *     provide(SomeToken, {useValue: myValue}),
 *   ]);
 */
export function beforeEachProviders(fn) {
    jsmBeforeEach(() => {
        var providers = fn();
        if (!providers)
            return;
        testInjector.addProviders(providers);
    });
}
/**
 * @deprecated
 */
export function beforeEachBindings(fn) {
    beforeEachProviders(fn);
}
function _it(jsmFn, name, testFn, testTimeOut) {
    var runner = runnerStack[runnerStack.length - 1];
    var timeOut = Math.max(globalTimeOut, testTimeOut);
    if (testFn instanceof FunctionWithParamTokens) {
        // The test case uses inject(). ie `it('test', inject([AsyncTestCompleter], (async) => { ...
        // }));`
        let testFnT = testFn;
        if (testFn.hasToken(AsyncTestCompleter)) {
            jsmFn(name, (done) => {
                var completerProvider = provide(AsyncTestCompleter, {
                    useFactory: () => {
                        // Mark the test as async when an AsyncTestCompleter is injected in an it()
                        if (!inIt)
                            throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                        return new AsyncTestCompleter(done);
                    }
                });
                testInjector.addProviders([completerProvider]);
                runner.run();
                inIt = true;
                testInjector.execute(testFnT);
                inIt = false;
            }, timeOut);
        }
        else {
            jsmFn(name, () => {
                runner.run();
                testInjector.execute(testFnT);
            }, timeOut);
        }
    }
    else {
        // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
        if (testFn.length === 0) {
            jsmFn(name, () => {
                runner.run();
                testFn();
            }, timeOut);
        }
        else {
            jsmFn(name, (done) => {
                runner.run();
                testFn(done);
            }, timeOut);
        }
    }
}
export function it(name, fn, timeOut = null) {
    return _it(jsmIt, name, fn, timeOut);
}
export function xit(name, fn, timeOut = null) {
    return _it(jsmXIt, name, fn, timeOut);
}
export function iit(name, fn, timeOut = null) {
    return _it(jsmIIt, name, fn, timeOut);
}
export class SpyObject {
    constructor(type = null) {
        if (type) {
            for (var prop in type.prototype) {
                var m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (e) {
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            }
        }
    }
    // Noop so that SpyObject has the same interface as in Dart
    noSuchMethod(args) { }
    spy(name) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    }
    prop(name, value) { this[name] = value; }
    static stub(object = null, config = null, overrides = null) {
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        var m = StringMapWrapper.merge(config, overrides);
        StringMapWrapper.forEach(m, (value, key) => { object.spy(key).andReturn(value); });
        return object;
    }
    /** @internal */
    _createGuinnessCompatibleSpy(name) {
        var newSpy = jasmine.createSpy(name);
        newSpy.andCallFake = newSpy.and.callFake;
        newSpy.andReturn = newSpy.and.returnValue;
        newSpy.reset = newSpy.calls.reset;
        // revisit return null here (previously needed for rtts_assert).
        newSpy.and.returnValue(null);
        return newSpy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19pbnRlcm5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUENPVWNvN0UudG1wL2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RpbmdfaW50ZXJuYWwudHMiXSwibmFtZXMiOlsiQXN5bmNUZXN0Q29tcGxldGVyIiwiQXN5bmNUZXN0Q29tcGxldGVyLmNvbnN0cnVjdG9yIiwiQXN5bmNUZXN0Q29tcGxldGVyLmRvbmUiLCJCZWZvcmVFYWNoUnVubmVyIiwiQmVmb3JlRWFjaFJ1bm5lci5jb25zdHJ1Y3RvciIsIkJlZm9yZUVhY2hSdW5uZXIuYmVmb3JlRWFjaCIsIkJlZm9yZUVhY2hSdW5uZXIucnVuIiwiX2Rlc2NyaWJlIiwiZGVzY3JpYmUiLCJkZGVzY3JpYmUiLCJ4ZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwiYmVmb3JlRWFjaFByb3ZpZGVycyIsImJlZm9yZUVhY2hCaW5kaW5ncyIsIl9pdCIsIml0IiwieGl0IiwiaWl0IiwiU3B5T2JqZWN0IiwiU3B5T2JqZWN0LmNvbnN0cnVjdG9yIiwiU3B5T2JqZWN0Lm5vU3VjaE1ldGhvZCIsIlNweU9iamVjdC5zcHkiLCJTcHlPYmplY3QucHJvcCIsIlNweU9iamVjdC5zdHViIiwiU3B5T2JqZWN0Ll9jcmVhdGVHdWlubmVzc0NvbXBhdGlibGVTcHkiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDeEQsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxNQUFNLDBCQUEwQjtPQUUxRCxFQUFDLE9BQU8sRUFBQyxNQUFNLGVBQWU7T0FFOUIsRUFBQyxlQUFlLEVBQUUsdUJBQXVCLEVBQVMsTUFBTSxpQkFBaUI7T0FDekUsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLFNBQVM7QUFHeEMsU0FBUSxNQUFNLFFBQU8saUJBQWlCLENBQUM7QUFFdkMsU0FBUSxNQUFNLFFBQW1CLFlBQVks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QSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuRkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDaEJBLENBQUNBO0lBRURMLGdCQUFnQkE7SUFDaEJBLDRCQUE0QkEsQ0FBQ0EsSUFBSUE7UUFDL0JNLElBQUlBLE1BQU1BLEdBQThCQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNoRUEsTUFBTUEsQ0FBQ0EsV0FBV0EsR0FBUUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDOUNBLE1BQU1BLENBQUNBLFNBQVNBLEdBQVFBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBO1FBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFRQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2Q0EsZ0VBQWdFQTtRQUNoRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO0lBQ2hCQSxDQUFDQTtBQUNITixDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnbG9iYWwsIGlzRnVuY3Rpb24sIE1hdGh9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7Z2V0VGVzdEluamVjdG9yLCBGdW5jdGlvbldpdGhQYXJhbVRva2VucywgaW5qZWN0fSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuaW1wb3J0IHticm93c2VyRGV0ZWN0aW9ufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuXG5leHBvcnQge2luamVjdH0gZnJvbSAnLi90ZXN0X2luamVjdG9yJztcblxuZXhwb3J0IHtleHBlY3QsIE5nTWF0Y2hlcnN9IGZyb20gJy4vbWF0Y2hlcnMnO1xuXG5leHBvcnQgdmFyIHByb3h5OiBDbGFzc0RlY29yYXRvciA9ICh0KSA9PiB0O1xuXG52YXIgX2dsb2JhbCA9IDxhbnk+KHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93KTtcblxuZXhwb3J0IHZhciBhZnRlckVhY2g6IEZ1bmN0aW9uID0gX2dsb2JhbC5hZnRlckVhY2g7XG5cbmV4cG9ydCB0eXBlIFN5bmNUZXN0Rm4gPSAoKSA9PiB2b2lkO1xudHlwZSBBc3luY1Rlc3RGbiA9IChkb25lOiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xudHlwZSBBbnlUZXN0Rm4gPSBTeW5jVGVzdEZuIHwgQXN5bmNUZXN0Rm47XG5cbi8qKlxuICogSW5qZWN0YWJsZSBjb21wbGV0ZXIgdGhhdCBhbGxvd3Mgc2lnbmFsaW5nIGNvbXBsZXRpb24gb2YgYW4gYXN5bmNocm9ub3VzIHRlc3QuIFVzZWQgaW50ZXJuYWxseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzeW5jVGVzdENvbXBsZXRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvbmU6IEZ1bmN0aW9uKSB7fVxuXG4gIGRvbmUoKTogdm9pZCB7IHRoaXMuX2RvbmUoKTsgfVxufVxuXG52YXIganNtQmVmb3JlRWFjaCA9IF9nbG9iYWwuYmVmb3JlRWFjaDtcbnZhciBqc21EZXNjcmliZSA9IF9nbG9iYWwuZGVzY3JpYmU7XG52YXIganNtRERlc2NyaWJlID0gX2dsb2JhbC5mZGVzY3JpYmU7XG52YXIganNtWERlc2NyaWJlID0gX2dsb2JhbC54ZGVzY3JpYmU7XG52YXIganNtSXQgPSBfZ2xvYmFsLml0O1xudmFyIGpzbUlJdCA9IF9nbG9iYWwuZml0O1xudmFyIGpzbVhJdCA9IF9nbG9iYWwueGl0O1xuXG52YXIgcnVubmVyU3RhY2sgPSBbXTtcbnZhciBpbkl0ID0gZmFsc2U7XG5qYXNtaW5lLkRFRkFVTFRfVElNRU9VVF9JTlRFUlZBTCA9IDUwMDtcbnZhciBnbG9iYWxUaW1lT3V0ID0gYnJvd3NlckRldGVjdGlvbi5pc1Nsb3cgPyAzMDAwIDogamFzbWluZS5ERUZBVUxUX1RJTUVPVVRfSU5URVJWQUw7XG5cbnZhciB0ZXN0SW5qZWN0b3IgPSBnZXRUZXN0SW5qZWN0b3IoKTtcblxuLyoqXG4gKiBNZWNoYW5pc20gdG8gcnVuIGBiZWZvcmVFYWNoKClgIGZ1bmN0aW9ucyBvZiBBbmd1bGFyIHRlc3RzLlxuICpcbiAqIE5vdGU6IEphc21pbmUgb3duIGBiZWZvcmVFYWNoYCBpcyB1c2VkIGJ5IHRoaXMgbGlicmFyeSB0byBoYW5kbGUgREkgcHJvdmlkZXJzLlxuICovXG5jbGFzcyBCZWZvcmVFYWNoUnVubmVyIHtcbiAgcHJpdmF0ZSBfZm5zOiBBcnJheTxGdW5jdGlvbldpdGhQYXJhbVRva2VucyB8IFN5bmNUZXN0Rm4+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyZW50OiBCZWZvcmVFYWNoUnVubmVyKSB7fVxuXG4gIGJlZm9yZUVhY2goZm46IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHwgU3luY1Rlc3RGbik6IHZvaWQgeyB0aGlzLl9mbnMucHVzaChmbik7IH1cblxuICBydW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhcmVudCkgdGhpcy5fcGFyZW50LnJ1bigpO1xuICAgIHRoaXMuX2Zucy5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm4pID8gKDxTeW5jVGVzdEZuPmZuKSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0ZXN0SW5qZWN0b3IuZXhlY3V0ZSg8RnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnM+Zm4pKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBSZXNldCB0aGUgdGVzdCBwcm92aWRlcnMgYmVmb3JlIGVhY2ggdGVzdFxuanNtQmVmb3JlRWFjaCgoKSA9PiB7IHRlc3RJbmplY3Rvci5yZXNldCgpOyB9KTtcblxuZnVuY3Rpb24gX2Rlc2NyaWJlKGpzbUZuLCAuLi5hcmdzKSB7XG4gIHZhciBwYXJlbnRSdW5uZXIgPSBydW5uZXJTdGFjay5sZW5ndGggPT09IDAgPyBudWxsIDogcnVubmVyU3RhY2tbcnVubmVyU3RhY2subGVuZ3RoIC0gMV07XG4gIHZhciBydW5uZXIgPSBuZXcgQmVmb3JlRWFjaFJ1bm5lcihwYXJlbnRSdW5uZXIpO1xuICBydW5uZXJTdGFjay5wdXNoKHJ1bm5lcik7XG4gIHZhciBzdWl0ZSA9IGpzbUZuKC4uLmFyZ3MpO1xuICBydW5uZXJTdGFjay5wb3AoKTtcbiAgcmV0dXJuIHN1aXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzY3JpYmUoLi4uYXJncyk6IHZvaWQge1xuICByZXR1cm4gX2Rlc2NyaWJlKGpzbURlc2NyaWJlLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRkZXNjcmliZSguLi5hcmdzKTogdm9pZCB7XG4gIHJldHVybiBfZGVzY3JpYmUoanNtRERlc2NyaWJlLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhkZXNjcmliZSguLi5hcmdzKTogdm9pZCB7XG4gIHJldHVybiBfZGVzY3JpYmUoanNtWERlc2NyaWJlLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZUVhY2goZm46IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHwgU3luY1Rlc3RGbik6IHZvaWQge1xuICBpZiAocnVubmVyU3RhY2subGVuZ3RoID4gMCkge1xuICAgIC8vIEluc2lkZSBhIGRlc2NyaWJlIGJsb2NrLCBiZWZvcmVFYWNoKCkgdXNlcyBhIEJlZm9yZUVhY2hSdW5uZXJcbiAgICBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXS5iZWZvcmVFYWNoKGZuKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUb3AgbGV2ZWwgYmVmb3JlRWFjaCgpIGFyZSBkZWxlZ2F0ZWQgdG8gamFzbWluZVxuICAgIGpzbUJlZm9yZUVhY2goPFN5bmNUZXN0Rm4+Zm4pO1xuICB9XG59XG5cbi8qKlxuICogQWxsb3dzIG92ZXJyaWRpbmcgZGVmYXVsdCBwcm92aWRlcnMgZGVmaW5lZCBpbiB0ZXN0X2luamVjdG9yLmpzLlxuICpcbiAqIFRoZSBnaXZlbiBmdW5jdGlvbiBtdXN0IHJldHVybiBhIGxpc3Qgb2YgREkgcHJvdmlkZXJzLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICBiZWZvcmVFYWNoUHJvdmlkZXJzKCgpID0+IFtcbiAqICAgICBwcm92aWRlKENvbXBpbGVyLCB7dXNlQ2xhc3M6IE1vY2tDb21waWxlcn0pLFxuICogICAgIHByb3ZpZGUoU29tZVRva2VuLCB7dXNlVmFsdWU6IG15VmFsdWV9KSxcbiAqICAgXSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVFYWNoUHJvdmlkZXJzKGZuKTogdm9pZCB7XG4gIGpzbUJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHZhciBwcm92aWRlcnMgPSBmbigpO1xuICAgIGlmICghcHJvdmlkZXJzKSByZXR1cm47XG4gICAgdGVzdEluamVjdG9yLmFkZFByb3ZpZGVycyhwcm92aWRlcnMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaEJpbmRpbmdzKGZuKTogdm9pZCB7XG4gIGJlZm9yZUVhY2hQcm92aWRlcnMoZm4pO1xufVxuXG5mdW5jdGlvbiBfaXQoanNtRm46IEZ1bmN0aW9uLCBuYW1lOiBzdHJpbmcsIHRlc3RGbjogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMgfCBBbnlUZXN0Rm4sXG4gICAgICAgICAgICAgdGVzdFRpbWVPdXQ6IG51bWJlcik6IHZvaWQge1xuICB2YXIgcnVubmVyID0gcnVubmVyU3RhY2tbcnVubmVyU3RhY2subGVuZ3RoIC0gMV07XG4gIHZhciB0aW1lT3V0ID0gTWF0aC5tYXgoZ2xvYmFsVGltZU91dCwgdGVzdFRpbWVPdXQpO1xuXG4gIGlmICh0ZXN0Rm4gaW5zdGFuY2VvZiBGdW5jdGlvbldpdGhQYXJhbVRva2Vucykge1xuICAgIC8vIFRoZSB0ZXN0IGNhc2UgdXNlcyBpbmplY3QoKS4gaWUgYGl0KCd0ZXN0JywgaW5qZWN0KFtBc3luY1Rlc3RDb21wbGV0ZXJdLCAoYXN5bmMpID0+IHsgLi4uXG4gICAgLy8gfSkpO2BcbiAgICBsZXQgdGVzdEZuVCA9IHRlc3RGbjtcblxuICAgIGlmICh0ZXN0Rm4uaGFzVG9rZW4oQXN5bmNUZXN0Q29tcGxldGVyKSkge1xuICAgICAganNtRm4obmFtZSwgKGRvbmUpID0+IHtcbiAgICAgICAgdmFyIGNvbXBsZXRlclByb3ZpZGVyID0gcHJvdmlkZShBc3luY1Rlc3RDb21wbGV0ZXIsIHtcbiAgICAgICAgICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBNYXJrIHRoZSB0ZXN0IGFzIGFzeW5jIHdoZW4gYW4gQXN5bmNUZXN0Q29tcGxldGVyIGlzIGluamVjdGVkIGluIGFuIGl0KClcbiAgICAgICAgICAgIGlmICghaW5JdCkgdGhyb3cgbmV3IEVycm9yKCdBc3luY1Rlc3RDb21wbGV0ZXIgY2FuIG9ubHkgYmUgaW5qZWN0ZWQgaW4gYW4gXCJpdCgpXCInKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXN5bmNUZXN0Q29tcGxldGVyKGRvbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGVzdEluamVjdG9yLmFkZFByb3ZpZGVycyhbY29tcGxldGVyUHJvdmlkZXJdKTtcbiAgICAgICAgcnVubmVyLnJ1bigpO1xuXG4gICAgICAgIGluSXQgPSB0cnVlO1xuICAgICAgICB0ZXN0SW5qZWN0b3IuZXhlY3V0ZSh0ZXN0Rm5UKTtcbiAgICAgICAgaW5JdCA9IGZhbHNlO1xuICAgICAgfSwgdGltZU91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpzbUZuKG5hbWUsICgpID0+IHtcbiAgICAgICAgcnVubmVyLnJ1bigpO1xuICAgICAgICB0ZXN0SW5qZWN0b3IuZXhlY3V0ZSh0ZXN0Rm5UKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIC8vIFRoZSB0ZXN0IGNhc2UgZG9lc24ndCB1c2UgaW5qZWN0KCkuIGllIGBpdCgndGVzdCcsIChkb25lKSA9PiB7IC4uLiB9KSk7YFxuXG4gICAgaWYgKCg8YW55PnRlc3RGbikubGVuZ3RoID09PSAwKSB7XG4gICAgICBqc21GbihuYW1lLCAoKSA9PiB7XG4gICAgICAgIHJ1bm5lci5ydW4oKTtcbiAgICAgICAgKDxTeW5jVGVzdEZuPnRlc3RGbikoKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBqc21GbihuYW1lLCAoZG9uZSkgPT4ge1xuICAgICAgICBydW5uZXIucnVuKCk7XG4gICAgICAgICg8QXN5bmNUZXN0Rm4+dGVzdEZuKShkb25lKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXQobmFtZSwgZm4sIHRpbWVPdXQgPSBudWxsKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21YSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21JSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEd1aW5lc3NDb21wYXRpYmxlU3B5IGV4dGVuZHMgamFzbWluZS5TcHkge1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5yZXR1cm5WYWx1ZSwgYWxsIGNhbGxzIHRvIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBhIHNwZWNpZmljXG4gICAqIHZhbHVlLiAqL1xuICBhbmRSZXR1cm4odmFsOiBhbnkpOiB2b2lkO1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5jYWxsRmFrZSwgYWxsIGNhbGxzIHRvIHRoZSBzcHkgd2lsbCBkZWxlZ2F0ZSB0byB0aGUgc3VwcGxpZWRcbiAgICogZnVuY3Rpb24uICovXG4gIGFuZENhbGxGYWtlKGZuOiBGdW5jdGlvbik6IEd1aW5lc3NDb21wYXRpYmxlU3B5O1xuICAvKiogcmVtb3ZlcyBhbGwgcmVjb3JkZWQgY2FsbHMgKi9cbiAgcmVzZXQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNweU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBudWxsKSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIG0gPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG0gPSB0eXBlLnByb3RvdHlwZVtwcm9wXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIEFzIHdlIGFyZSBjcmVhdGluZyBzcHlzIGZvciBhYnN0cmFjdCBjbGFzc2VzLFxuICAgICAgICAgIC8vIHRoZXNlIGNsYXNzZXMgbWlnaHQgaGF2ZSBnZXR0ZXJzIHRoYXQgdGhyb3cgd2hlbiB0aGV5IGFyZSBhY2Nlc3NlZC5cbiAgICAgICAgICAvLyBBcyB3ZSBhcmUgb25seSBhdXRvIGNyZWF0aW5nIHNweXMgZm9yIG1ldGhvZHMsIHRoaXNcbiAgICAgICAgICAvLyBzaG91bGQgbm90IG1hdHRlci5cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLnNweShwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBOb29wIHNvIHRoYXQgU3B5T2JqZWN0IGhhcyB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgaW4gRGFydFxuICBub1N1Y2hNZXRob2QoYXJncykge31cblxuICBzcHkobmFtZSkge1xuICAgIGlmICghdGhpc1tuYW1lXSkge1xuICAgICAgdGhpc1tuYW1lXSA9IHRoaXMuX2NyZWF0ZUd1aW5uZXNzQ29tcGF0aWJsZVNweShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbbmFtZV07XG4gIH1cblxuICBwcm9wKG5hbWUsIHZhbHVlKSB7IHRoaXNbbmFtZV0gPSB2YWx1ZTsgfVxuXG4gIHN0YXRpYyBzdHViKG9iamVjdCA9IG51bGwsIGNvbmZpZyA9IG51bGwsIG92ZXJyaWRlcyA9IG51bGwpIHtcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBTcHlPYmplY3QpKSB7XG4gICAgICBvdmVycmlkZXMgPSBjb25maWc7XG4gICAgICBjb25maWcgPSBvYmplY3Q7XG4gICAgICBvYmplY3QgPSBuZXcgU3B5T2JqZWN0KCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGNvbmZpZywgb3ZlcnJpZGVzKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobSwgKHZhbHVlLCBrZXkpID0+IHsgb2JqZWN0LnNweShrZXkpLmFuZFJldHVybih2YWx1ZSk7IH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jcmVhdGVHdWlubmVzc0NvbXBhdGlibGVTcHkobmFtZSk6IEd1aW5lc3NDb21wYXRpYmxlU3B5IHtcbiAgICB2YXIgbmV3U3B5OiBHdWluZXNzQ29tcGF0aWJsZVNweSA9IDxhbnk+amFzbWluZS5jcmVhdGVTcHkobmFtZSk7XG4gICAgbmV3U3B5LmFuZENhbGxGYWtlID0gPGFueT5uZXdTcHkuYW5kLmNhbGxGYWtlO1xuICAgIG5ld1NweS5hbmRSZXR1cm4gPSA8YW55Pm5ld1NweS5hbmQucmV0dXJuVmFsdWU7XG4gICAgbmV3U3B5LnJlc2V0ID0gPGFueT5uZXdTcHkuY2FsbHMucmVzZXQ7XG4gICAgLy8gcmV2aXNpdCByZXR1cm4gbnVsbCBoZXJlIChwcmV2aW91c2x5IG5lZWRlZCBmb3IgcnR0c19hc3NlcnQpLlxuICAgIG5ld1NweS5hbmQucmV0dXJuVmFsdWUobnVsbCk7XG4gICAgcmV0dXJuIG5ld1NweTtcbiAgfVxufVxuIl19