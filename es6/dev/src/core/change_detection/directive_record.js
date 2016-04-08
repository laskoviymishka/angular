import { normalizeBool } from 'angular2/src/facade/lang';
import { isDefaultChangeDetectionStrategy } from './constants';
export class DirectiveIndex {
    constructor(elementIndex, directiveIndex) {
        this.elementIndex = elementIndex;
        this.directiveIndex = directiveIndex;
    }
    get name() { return `${this.elementIndex}_${this.directiveIndex}`; }
}
export class DirectiveRecord {
    constructor({ directiveIndex, callAfterContentInit, callAfterContentChecked, callAfterViewInit, callAfterViewChecked, callOnChanges, callDoCheck, callOnInit, callOnDestroy, changeDetection, outputs } = {}) {
        this.directiveIndex = directiveIndex;
        this.callAfterContentInit = normalizeBool(callAfterContentInit);
        this.callAfterContentChecked = normalizeBool(callAfterContentChecked);
        this.callOnChanges = normalizeBool(callOnChanges);
        this.callAfterViewInit = normalizeBool(callAfterViewInit);
        this.callAfterViewChecked = normalizeBool(callAfterViewChecked);
        this.callDoCheck = normalizeBool(callDoCheck);
        this.callOnInit = normalizeBool(callOnInit);
        this.callOnDestroy = normalizeBool(callOnDestroy);
        this.changeDetection = changeDetection;
        this.outputs = outputs;
    }
    isDefaultChangeDetection() {
        return isDefaultChangeDetectionStrategy(this.changeDetection);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3JlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUENPVWNvN0UudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlyZWN0aXZlX3JlY29yZC50cyJdLCJuYW1lcyI6WyJEaXJlY3RpdmVJbmRleCIsIkRpcmVjdGl2ZUluZGV4LmNvbnN0cnVjdG9yIiwiRGlyZWN0aXZlSW5kZXgubmFtZSIsIkRpcmVjdGl2ZVJlY29yZCIsIkRpcmVjdGl2ZVJlY29yZC5jb25zdHJ1Y3RvciIsIkRpcmVjdGl2ZVJlY29yZC5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24iXSwibWFwcGluZ3MiOiJPQUFPLEVBQWdCLGFBQWEsRUFBVSxNQUFNLDBCQUEwQjtPQUN2RSxFQUFDLGdDQUFnQyxFQUEwQixNQUFNLGFBQWE7QUFFckY7SUFDRUEsWUFBbUJBLFlBQW9CQSxFQUFTQSxjQUFzQkE7UUFBbkRDLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFRQTtRQUFTQSxtQkFBY0EsR0FBZEEsY0FBY0EsQ0FBUUE7SUFBR0EsQ0FBQ0E7SUFFMUVELElBQUlBLElBQUlBLEtBQUtFLE1BQU1BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0FBQ3RFRixDQUFDQTtBQUVEO0lBY0VHLFlBQVlBLEVBQUNBLGNBQWNBLEVBQUVBLG9CQUFvQkEsRUFBRUEsdUJBQXVCQSxFQUFFQSxpQkFBaUJBLEVBQ2hGQSxvQkFBb0JBLEVBQUVBLGFBQWFBLEVBQUVBLFdBQVdBLEVBQUVBLFVBQVVBLEVBQUVBLGFBQWFBLEVBQzNFQSxlQUFlQSxFQUFFQSxPQUFPQSxFQUFDQSxHQVlsQ0EsRUFBRUE7UUFDSkMsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsY0FBY0EsQ0FBQ0E7UUFDckNBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsYUFBYUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtRQUNoRUEsSUFBSUEsQ0FBQ0EsdUJBQXVCQSxHQUFHQSxhQUFhQSxDQUFDQSx1QkFBdUJBLENBQUNBLENBQUNBO1FBQ3RFQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNsREEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxhQUFhQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1FBQzFEQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLGFBQWFBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7UUFDaEVBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQzlDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxhQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLGVBQWVBLENBQUNBO1FBQ3ZDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFREQsd0JBQXdCQTtRQUN0QkUsTUFBTUEsQ0FBQ0EsZ0NBQWdDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtJQUNoRUEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RyaW5nV3JhcHBlciwgbm9ybWFsaXplQm9vbCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7aXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3RpdmVJbmRleCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50SW5kZXg6IG51bWJlciwgcHVibGljIGRpcmVjdGl2ZUluZGV4OiBudW1iZXIpIHt9XG5cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiBgJHt0aGlzLmVsZW1lbnRJbmRleH1fJHt0aGlzLmRpcmVjdGl2ZUluZGV4fWA7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERpcmVjdGl2ZVJlY29yZCB7XG4gIGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleDtcbiAgY2FsbEFmdGVyQ29udGVudEluaXQ6IGJvb2xlYW47XG4gIGNhbGxBZnRlckNvbnRlbnRDaGVja2VkOiBib29sZWFuO1xuICBjYWxsQWZ0ZXJWaWV3SW5pdDogYm9vbGVhbjtcbiAgY2FsbEFmdGVyVmlld0NoZWNrZWQ6IGJvb2xlYW47XG4gIGNhbGxPbkNoYW5nZXM6IGJvb2xlYW47XG4gIGNhbGxEb0NoZWNrOiBib29sZWFuO1xuICBjYWxsT25Jbml0OiBib29sZWFuO1xuICBjYWxsT25EZXN0cm95OiBib29sZWFuO1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICAvLyBhcnJheSBvZiBbZW1pdHRlciBwcm9wZXJ0eSBuYW1lLCBldmVudE5hbWVdXG4gIG91dHB1dHM6IHN0cmluZ1tdW107XG5cbiAgY29uc3RydWN0b3Ioe2RpcmVjdGl2ZUluZGV4LCBjYWxsQWZ0ZXJDb250ZW50SW5pdCwgY2FsbEFmdGVyQ29udGVudENoZWNrZWQsIGNhbGxBZnRlclZpZXdJbml0LFxuICAgICAgICAgICAgICAgY2FsbEFmdGVyVmlld0NoZWNrZWQsIGNhbGxPbkNoYW5nZXMsIGNhbGxEb0NoZWNrLCBjYWxsT25Jbml0LCBjYWxsT25EZXN0cm95LFxuICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uLCBvdXRwdXRzfToge1xuICAgIGRpcmVjdGl2ZUluZGV4PzogRGlyZWN0aXZlSW5kZXgsXG4gICAgY2FsbEFmdGVyQ29udGVudEluaXQ/OiBib29sZWFuLFxuICAgIGNhbGxBZnRlckNvbnRlbnRDaGVja2VkPzogYm9vbGVhbixcbiAgICBjYWxsQWZ0ZXJWaWV3SW5pdD86IGJvb2xlYW4sXG4gICAgY2FsbEFmdGVyVmlld0NoZWNrZWQ/OiBib29sZWFuLFxuICAgIGNhbGxPbkNoYW5nZXM/OiBib29sZWFuLFxuICAgIGNhbGxEb0NoZWNrPzogYm9vbGVhbixcbiAgICBjYWxsT25Jbml0PzogYm9vbGVhbixcbiAgICBjYWxsT25EZXN0cm95PzogYm9vbGVhbixcbiAgICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBvdXRwdXRzPzogc3RyaW5nW11bXVxuICB9ID0ge30pIHtcbiAgICB0aGlzLmRpcmVjdGl2ZUluZGV4ID0gZGlyZWN0aXZlSW5kZXg7XG4gICAgdGhpcy5jYWxsQWZ0ZXJDb250ZW50SW5pdCA9IG5vcm1hbGl6ZUJvb2woY2FsbEFmdGVyQ29udGVudEluaXQpO1xuICAgIHRoaXMuY2FsbEFmdGVyQ29udGVudENoZWNrZWQgPSBub3JtYWxpemVCb29sKGNhbGxBZnRlckNvbnRlbnRDaGVja2VkKTtcbiAgICB0aGlzLmNhbGxPbkNoYW5nZXMgPSBub3JtYWxpemVCb29sKGNhbGxPbkNoYW5nZXMpO1xuICAgIHRoaXMuY2FsbEFmdGVyVmlld0luaXQgPSBub3JtYWxpemVCb29sKGNhbGxBZnRlclZpZXdJbml0KTtcbiAgICB0aGlzLmNhbGxBZnRlclZpZXdDaGVja2VkID0gbm9ybWFsaXplQm9vbChjYWxsQWZ0ZXJWaWV3Q2hlY2tlZCk7XG4gICAgdGhpcy5jYWxsRG9DaGVjayA9IG5vcm1hbGl6ZUJvb2woY2FsbERvQ2hlY2spO1xuICAgIHRoaXMuY2FsbE9uSW5pdCA9IG5vcm1hbGl6ZUJvb2woY2FsbE9uSW5pdCk7XG4gICAgdGhpcy5jYWxsT25EZXN0cm95ID0gbm9ybWFsaXplQm9vbChjYWxsT25EZXN0cm95KTtcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbiA9IGNoYW5nZURldGVjdGlvbjtcbiAgICB0aGlzLm91dHB1dHMgPSBvdXRwdXRzO1xuICB9XG5cbiAgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSh0aGlzLmNoYW5nZURldGVjdGlvbik7XG4gIH1cbn1cbiJdfQ==