var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Typewriter_instances, _Typewriter_queue, _Typewriter_addToQueue;
export default class Typewriter {
    constructor(parent, { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}) {
        _Typewriter_instances.add(this);
        _Typewriter_queue.set(this, []);
        this.element = document.createElement('div');
        parent.append(this.element);
        this.loop = loop;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
    }
    typeString(string) {
        __classPrivateFieldGet(this, _Typewriter_instances, "m", _Typewriter_addToQueue).call(this, (resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.element.append(string[i]);
                i++;
                if (i >= string.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, this.typingSpeed);
        });
        return this;
    }
    pauseFor(duration) {
        __classPrivateFieldGet(this, _Typewriter_instances, "m", _Typewriter_addToQueue).call(this, (resolve) => {
            setTimeout(resolve, duration);
        });
        return this;
    }
    deleteChars(amount) {
        __classPrivateFieldGet(this, _Typewriter_instances, "m", _Typewriter_addToQueue).call(this, (resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(0, this.element.innerText.length - 1);
                i++;
                if (i >= amount) {
                    clearInterval(interval);
                    resolve();
                }
            }, this.deletingSpeed);
        });
        return this;
    }
    deleteAll(deletingSpeed = this.deletingSpeed) {
        __classPrivateFieldGet(this, _Typewriter_instances, "m", _Typewriter_addToQueue).call(this, (resolve) => {
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(0, this.element.innerText.length - 1);
                if (this.element.innerText.length === 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, deletingSpeed);
        });
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let cb = __classPrivateFieldGet(this, _Typewriter_queue, "f").shift();
            while (cb !== undefined) {
                yield cb();
                if (this.loop)
                    __classPrivateFieldGet(this, _Typewriter_instances, "m", _Typewriter_addToQueue).call(this, cb);
                cb = __classPrivateFieldGet(this, _Typewriter_queue, "f").shift();
            }
            // for (let cb of this.#queue) {
            //   if (this.loop) this.#addToQueue(cb)
            //   await cb()
            // }
            return this;
        });
    }
}
_Typewriter_queue = new WeakMap(), _Typewriter_instances = new WeakSet(), _Typewriter_addToQueue = function _Typewriter_addToQueue(cb) {
    __classPrivateFieldGet(this, _Typewriter_queue, "f").push(() => new Promise(cb));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZXdyaXRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIiwic291cmNlcyI6WyJUeXBld3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7SUFPN0IsWUFBWSxNQUFtQixFQUFFLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxXQUFXLEdBQUcsRUFBRSxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFOztRQU41Riw0QkFBK0IsRUFBRSxFQUFBO1FBTy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWM7UUFDdkIsdUJBQUEsSUFBSSxxREFBWSxNQUFoQixJQUFJLEVBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFVCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDOUIsQ0FBQyxFQUFFLENBQUE7Z0JBRUgsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUN2QixPQUFPLEVBQUUsQ0FBQTtpQkFDVjtZQUNILENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxD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