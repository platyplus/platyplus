"use strict";
exports.__esModule = true;
exports.readJsonFile = void 0;
var fs_1 = require("fs");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var util_1 = require("util");
function readJsonFile(filePath) {
    return rxjs_1.defer(function () { return util_1.promisify(fs_1.readFile)(filePath, 'utf-8'); }).pipe(operators_1.map(function (data) { return JSON.parse(data); }));
}
exports.readJsonFile = readJsonFile;
