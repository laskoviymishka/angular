'use strict';var lang_1 = require('angular2/src/facade/lang');
var DIRECTIVE_LIFECYCLE = "directiveLifecycle";
var BINDING = "native";
var DIRECTIVE = "directive";
var ELEMENT_PROPERTY = "elementProperty";
var ELEMENT_ATTRIBUTE = "elementAttribute";
var ELEMENT_CLASS = "elementClass";
var ELEMENT_STYLE = "elementStyle";
var TEXT_NODE = "textNode";
var EVENT = "event";
var HOST_EVENT = "hostEvent";
var BindingTarget = (function () {
    function BindingTarget(mode, elementIndex, name, unit, debug) {
        this.mode = mode;
        this.elementIndex = elementIndex;
        this.name = name;
        this.unit = unit;
        this.debug = debug;
    }
    BindingTarget.prototype.isDirective = function () { return this.mode === DIRECTIVE; };
    BindingTarget.prototype.isElementProperty = function () { return this.mode === ELEMENT_PROPERTY; };
    BindingTarget.prototype.isElementAttribute = function () { return this.mode === ELEMENT_ATTRIBUTE; };
    BindingTarget.prototype.isElementClass = function () { return this.mode === ELEMENT_CLASS; };
    BindingTarget.prototype.isElementStyle = function () { return this.mode === ELEMENT_STYLE; };
    BindingTarget.prototype.isTextNode = function () { return this.mode === TEXT_NODE; };
    return BindingTarget;
})();
exports.BindingTarget = BindingTarget;
var BindingRecord = (function () {
    function BindingRecord(mode, target, implicitReceiver, ast, setter, lifecycleEvent, directiveRecord) {
        this.mode = mode;
        this.target = target;
        this.implicitReceiver = implicitReceiver;
        this.ast = ast;
        this.setter = setter;
        this.lifecycleEvent = lifecycleEvent;
        this.directiveRecord = directiveRecord;
    }
    BindingRecord.prototype.isDirectiveLifecycle = function () { return this.mode === DIRECTIVE_LIFECYCLE; };
    BindingRecord.prototype.callOnChanges = function () {
        return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.callOnChanges;
    };
    BindingRecord.prototype.isDefaultChangeDetection = function () {
        return lang_1.isBlank(this.directiveRecord) || this.directiveRecord.isDefaultChangeDetection();
    };
    BindingRecord.createDirectiveDoCheck = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "DoCheck", directiveRecord);
    };
    BindingRecord.createDirectiveOnInit = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnInit", directiveRecord);
    };
    BindingRecord.createDirectiveOnChanges = function (directiveRecord) {
        return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnChanges", directiveRecord);
    };
    BindingRecord.createForDirective = function (ast, propertyName, setter, directiveRecord) {
        var elementIndex = directiveRecord.directiveIndex.elementIndex;
        var t = new BindingTarget(DIRECTIVE, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(DIRECTIVE, t, 0, ast, setter, null, directiveRecord);
    };
    BindingRecord.createForElementProperty = function (ast, elementIndex, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementAttribute = function (ast, elementIndex, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementClass = function (ast, elementIndex, className) {
        var t = new BindingTarget(ELEMENT_CLASS, elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementStyle = function (ast, elementIndex, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostProperty = function (directiveIndex, ast, propertyName) {
        var t = new BindingTarget(ELEMENT_PROPERTY, directiveIndex.elementIndex, propertyName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostAttribute = function (directiveIndex, ast, attributeName) {
        var t = new BindingTarget(ELEMENT_ATTRIBUTE, directiveIndex.elementIndex, attributeName, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostClass = function (directiveIndex, ast, className) {
        var t = new BindingTarget(ELEMENT_CLASS, directiveIndex.elementIndex, className, null, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostStyle = function (directiveIndex, ast, styleName, unit) {
        var t = new BindingTarget(ELEMENT_STYLE, directiveIndex.elementIndex, styleName, unit, ast.toString());
        return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForTextNode = function (ast, elementIndex) {
        var t = new BindingTarget(TEXT_NODE, elementIndex, null, null, ast.toString());
        return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForEvent = function (ast, eventName, elementIndex) {
        var t = new BindingTarget(EVENT, elementIndex, eventName, null, ast.toString());
        return new BindingRecord(EVENT, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostEvent = function (ast, eventName, directiveRecord) {
        var directiveIndex = directiveRecord.directiveIndex;
        var t = new BindingTarget(HOST_EVENT, directiveIndex.elementIndex, eventName, null, ast.toString());
        return new BindingRecord(HOST_EVENT, t, directiveIndex, ast, null, null, directiveRecord);
    };
    return BindingRecord;
})();
exports.BindingRecord = BindingRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ19yZWNvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUtmYjVjOFQyLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2JpbmRpbmdfcmVjb3JkLnRzIl0sIm5hbWVzIjpbIkJpbmRpbmdUYXJnZXQiLCJCaW5kaW5nVGFyZ2V0LmNvbnN0cnVjdG9yIiwiQmluZGluZ1RhcmdldC5pc0RpcmVjdGl2ZSIsIkJpbmRpbmdUYXJnZXQuaXNFbGVtZW50UHJvcGVydHkiLCJCaW5kaW5nVGFyZ2V0LmlzRWxlbWVudEF0dHJpYnV0ZSIsIkJpbmRpbmdUYXJnZXQuaXNFbGVtZW50Q2xhc3MiLCJCaW5kaW5nVGFyZ2V0LmlzRWxlbWVudFN0eWxlIiwiQmluZGluZ1RhcmdldC5pc1RleHROb2RlIiwiQmluZGluZ1JlY29yZCIsIkJpbmRpbmdSZWNvcmQuY29uc3RydWN0b3IiLCJCaW5kaW5nUmVjb3JkLmlzRGlyZWN0aXZlTGlmZWN5Y2xlIiwiQmluZGluZ1JlY29yZC5jYWxsT25DaGFuZ2VzIiwiQmluZGluZ1JlY29yZC5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24iLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZURpcmVjdGl2ZURvQ2hlY2siLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZURpcmVjdGl2ZU9uSW5pdCIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlT25DaGFuZ2VzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JEaXJlY3RpdmUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckVsZW1lbnRQcm9wZXJ0eSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudEF0dHJpYnV0ZSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudENsYXNzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFbGVtZW50U3R5bGUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvckhvc3RQcm9wZXJ0eSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEF0dHJpYnV0ZSIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdENsYXNzIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0U3R5bGUiLCJCaW5kaW5nUmVjb3JkLmNyZWF0ZUZvclRleHROb2RlIiwiQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFdmVudCIsIkJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEV2ZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQUs1RCxJQUFNLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDO0FBQ2pELElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUV6QixJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBQzdDLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQztBQUNyQyxJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUM7QUFDckMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzdCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUN0QixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUM7QUFFL0I7SUFDRUEsdUJBQW1CQSxJQUFZQSxFQUFTQSxZQUFvQkEsRUFBU0EsSUFBWUEsRUFDOURBLElBQVlBLEVBQVNBLEtBQWFBO1FBRGxDQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFRQTtRQUFTQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBUUE7UUFBU0EsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBUUE7UUFDOURBLFNBQUlBLEdBQUpBLElBQUlBLENBQVFBO1FBQVNBLFVBQUtBLEdBQUxBLEtBQUtBLENBQVFBO0lBQUdBLENBQUNBO0lBRXpERCxtQ0FBV0EsR0FBWEEsY0FBeUJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEtBQUtBLFNBQVNBLENBQUNB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LEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0lBQy9EQSxDQUFDQTtJQUVNbEIsZ0NBQWtCQSxHQUF6QkEsVUFBMEJBLEdBQVFBLEVBQUVBLFNBQWlCQSxFQUMzQkEsZUFBZ0NBO1FBQ3hEbUIsSUFBSUEsY0FBY0EsR0FBR0EsZUFBZUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDcERBLElBQUlBLENBQUNBLEdBQ0RBLElBQUlBLGFBQWFBLENBQUNBLFVBQVVBLEVBQUVBLGNBQWNBLENBQUNBLFlBQVlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLENBQUNBO1FBQ2hHQSxNQUFNQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxjQUFjQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxlQUFlQSxDQUFDQSxDQUFDQTtJQUM1RkEsQ0FBQ0E7SUFDSG5CLG9CQUFDQTtBQUFEQSxDQUFDQSxBQWpIRCxJQWlIQztBQWpIWSxxQkFBYSxnQkFpSHpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U2V0dGVyRm59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vdHlwZXMnO1xuaW1wb3J0IHtBU1R9IGZyb20gJy4vcGFyc2VyL2FzdCc7XG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4LCBEaXJlY3RpdmVSZWNvcmR9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5cbmNvbnN0IERJUkVDVElWRV9MSUZFQ1lDTEUgPSBcImRpcmVjdGl2ZUxpZmVjeWNsZVwiO1xuY29uc3QgQklORElORyA9IFwibmF0aXZlXCI7XG5cbmNvbnN0IERJUkVDVElWRSA9IFwiZGlyZWN0aXZlXCI7XG5jb25zdCBFTEVNRU5UX1BST1BFUlRZID0gXCJlbGVtZW50UHJvcGVydHlcIjtcbmNvbnN0IEVMRU1FTlRfQVRUUklCVVRFID0gXCJlbGVtZW50QXR0cmlidXRlXCI7XG5jb25zdCBFTEVNRU5UX0NMQVNTID0gXCJlbGVtZW50Q2xhc3NcIjtcbmNvbnN0IEVMRU1FTlRfU1RZTEUgPSBcImVsZW1lbnRTdHlsZVwiO1xuY29uc3QgVEVYVF9OT0RFID0gXCJ0ZXh0Tm9kZVwiO1xuY29uc3QgRVZFTlQgPSBcImV2ZW50XCI7XG5jb25zdCBIT1NUX0VWRU5UID0gXCJob3N0RXZlbnRcIjtcblxuZXhwb3J0IGNsYXNzIEJpbmRpbmdUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZTogc3RyaW5nLCBwdWJsaWMgZWxlbWVudEluZGV4OiBudW1iZXIsIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyB1bml0OiBzdHJpbmcsIHB1YmxpYyBkZWJ1Zzogc3RyaW5nKSB7fVxuXG4gIGlzRGlyZWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBESVJFQ1RJVkU7IH1cblxuICBpc0VsZW1lbnRQcm9wZXJ0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9QUk9QRVJUWTsgfVxuXG4gIGlzRWxlbWVudEF0dHJpYnV0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9BVFRSSUJVVEU7IH1cblxuICBpc0VsZW1lbnRDbGFzcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRUxFTUVOVF9DTEFTUzsgfVxuXG4gIGlzRWxlbWVudFN0eWxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tb2RlID09PSBFTEVNRU5UX1NUWUxFOyB9XG5cbiAgaXNUZXh0Tm9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gVEVYVF9OT0RFOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUmVjb3JkIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZGU6IHN0cmluZywgcHVibGljIHRhcmdldDogQmluZGluZ1RhcmdldCwgcHVibGljIGltcGxpY2l0UmVjZWl2ZXI6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIGFzdDogQVNULCBwdWJsaWMgc2V0dGVyOiBTZXR0ZXJGbiwgcHVibGljIGxpZmVjeWNsZUV2ZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCkge31cblxuICBpc0RpcmVjdGl2ZUxpZmVjeWNsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gRElSRUNUSVZFX0xJRkVDWUNMRTsgfVxuXG4gIGNhbGxPbkNoYW5nZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmRpcmVjdGl2ZVJlY29yZCkgJiYgdGhpcy5kaXJlY3RpdmVSZWNvcmQuY2FsbE9uQ2hhbmdlcztcbiAgfVxuXG4gIGlzRGVmYXVsdENoYW5nZURldGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCbGFuayh0aGlzLmRpcmVjdGl2ZVJlY29yZCkgfHwgdGhpcy5kaXJlY3RpdmVSZWNvcmQuaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRGlyZWN0aXZlRG9DaGVjayhkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkVfTElGRUNZQ0xFLCBudWxsLCAwLCBudWxsLCBudWxsLCBcIkRvQ2hlY2tcIiwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVEaXJlY3RpdmVPbkluaXQoZGlyZWN0aXZlUmVjb3JkOiBEaXJlY3RpdmVSZWNvcmQpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoRElSRUNUSVZFX0xJRkVDWUNMRSwgbnVsbCwgMCwgbnVsbCwgbnVsbCwgXCJPbkluaXRcIiwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVEaXJlY3RpdmVPbkNoYW5nZXMoZGlyZWN0aXZlUmVjb3JkOiBEaXJlY3RpdmVSZWNvcmQpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoRElSRUNUSVZFX0xJRkVDWUNMRSwgbnVsbCwgMCwgbnVsbCwgbnVsbCwgXCJPbkNoYW5nZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxuXG5cblxuICBzdGF0aWMgY3JlYXRlRm9yRGlyZWN0aXZlKGFzdDogQVNULCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgc2V0dGVyOiBTZXR0ZXJGbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVSZWNvcmQ6IERpcmVjdGl2ZVJlY29yZCk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciBlbGVtZW50SW5kZXggPSBkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4O1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRElSRUNUSVZFLCBlbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChESVJFQ1RJVkUsIHQsIDAsIGFzdCwgc2V0dGVyLCBudWxsLCBkaXJlY3RpdmVSZWNvcmQpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50UHJvcGVydHkoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX1BST1BFUlRZLCBlbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChCSU5ESU5HLCB0LCAwLCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckVsZW1lbnRBdHRyaWJ1dGUoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfQVRUUklCVVRFLCBlbGVtZW50SW5kZXgsIGF0dHJpYnV0ZU5hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50Q2xhc3MoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLCBjbGFzc05hbWU6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9DTEFTUywgZWxlbWVudEluZGV4LCBjbGFzc05hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JFbGVtZW50U3R5bGUoYXN0OiBBU1QsIGVsZW1lbnRJbmRleDogbnVtYmVyLCBzdHlsZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfU1RZTEUsIGVsZW1lbnRJbmRleCwgc3R5bGVOYW1lLCB1bml0LCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIDAsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvckhvc3RQcm9wZXJ0eShkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX1BST1BFUlRZLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIHByb3BlcnR5TmFtZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdEF0dHJpYnV0ZShkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVMRU1FTlRfQVRUUklCVVRFLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIGF0dHJpYnV0ZU5hbWUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIGRpcmVjdGl2ZUluZGV4LCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZvckhvc3RDbGFzcyhkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc3RyaW5nKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIHQgPSBuZXcgQmluZGluZ1RhcmdldChFTEVNRU5UX0NMQVNTLCBkaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIGNsYXNzTmFtZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoQklORElORywgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRm9ySG9zdFN0eWxlKGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCwgYXN0OiBBU1QsIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IHN0cmluZyk6IEJpbmRpbmdSZWNvcmQge1xuICAgIHZhciB0ID0gbmV3IEJpbmRpbmdUYXJnZXQoRUxFTUVOVF9TVFlMRSwgZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4LCBzdHlsZU5hbWUsIHVuaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIGRpcmVjdGl2ZUluZGV4LCBhc3QsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBjcmVhdGVGb3JUZXh0Tm9kZShhc3Q6IEFTVCwgZWxlbWVudEluZGV4OiBudW1iZXIpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KFRFWFRfTk9ERSwgZWxlbWVudEluZGV4LCBudWxsLCBudWxsLCBhc3QudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUmVjb3JkKEJJTkRJTkcsIHQsIDAsIGFzdCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG5cbiAgc3RhdGljIGNyZWF0ZUZvckV2ZW50KGFzdDogQVNULCBldmVudE5hbWU6IHN0cmluZywgZWxlbWVudEluZGV4OiBudW1iZXIpOiBCaW5kaW5nUmVjb3JkIHtcbiAgICB2YXIgdCA9IG5ldyBCaW5kaW5nVGFyZ2V0KEVWRU5ULCBlbGVtZW50SW5kZXgsIGV2ZW50TmFtZSwgbnVsbCwgYXN0LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBuZXcgQmluZGluZ1JlY29yZChFVkVOVCwgdCwgMCwgYXN0LCBudWxsLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JIb3N0RXZlbnQoYXN0OiBBU1QsIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogQmluZGluZ1JlY29yZCB7XG4gICAgdmFyIGRpcmVjdGl2ZUluZGV4ID0gZGlyZWN0aXZlUmVjb3JkLmRpcmVjdGl2ZUluZGV4O1xuICAgIHZhciB0ID1cbiAgICAgICAgbmV3IEJpbmRpbmdUYXJnZXQoSE9TVF9FVkVOVCwgZGlyZWN0aXZlSW5kZXguZWxlbWVudEluZGV4LCBldmVudE5hbWUsIG51bGwsIGFzdC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gbmV3IEJpbmRpbmdSZWNvcmQoSE9TVF9FVkVOVCwgdCwgZGlyZWN0aXZlSW5kZXgsIGFzdCwgbnVsbCwgbnVsbCwgZGlyZWN0aXZlUmVjb3JkKTtcbiAgfVxufVxuIl19