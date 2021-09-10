"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports._execAsync = exports.execAsync = void 0;
var child_process_1 = require("child_process");
var rxjs_1 = require("rxjs");
function execAsync(cmd, args) {
    return rxjs_1.defer(function () { return _execAsync(cmd, args); });
}
exports.execAsync = execAsync;
function _execAsync(cmd, args) {
    if (args === void 0) { args = []; }
    return new Promise(function (resolve, reject) {
        child_process_1.exec((cmd + " " + (args.length > 0 ? args.join(' ') : '')).trim(), { cwd: process.cwd() }, function (error, stdout, stderr) {
            if (error) {
                reject(__assign(__assign({}, error), { stdout: stdout, stderr: stderr }));
                return;
            }
            resolve({ stdout: stdout, stderr: stderr });
        });
    });
}
exports._execAsync = _execAsync;
