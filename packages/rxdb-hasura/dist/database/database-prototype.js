"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxDatabase = void 0;
const observables_1 = require("./observables");
const RxDatabase = (proto) => {
    Object.defineProperty(proto, 'contents$', {
        get: function () {
            return observables_1.contents;
        }
    });
    Object.defineProperty(proto, 'authStatus$', {
        get: function () {
            return observables_1.authStatus;
        }
    });
    proto.setAuthStatus = function (value, jwt) {
        this.authStatus$.next(value);
        this.jwt$.next(jwt);
    };
    proto.setJwt = function (value) {
        if (value !== this.jwt$.getValue())
            this.jwt$.next(value);
    };
    Object.defineProperty(proto, 'jwt$', {
        get: function () {
            return observables_1.jwt;
        }
    });
    Object.defineProperty(proto, 'contents', {
        get: function () {
            return observables_1.contents.getValue();
        }
    });
};
exports.RxDatabase = RxDatabase;
//# sourceMappingURL=database-prototype.js.map