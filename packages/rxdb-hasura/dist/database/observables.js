"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contents = exports.authStatus = exports.jwt = void 0;
const rxjs_1 = require("rxjs");
exports.jwt = new rxjs_1.BehaviorSubject(undefined);
exports.authStatus = new rxjs_1.BehaviorSubject(false);
exports.contents = new rxjs_1.BehaviorSubject({});
//# sourceMappingURL=observables.js.map