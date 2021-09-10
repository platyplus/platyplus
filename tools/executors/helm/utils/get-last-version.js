"use strict";
exports.__esModule = true;
exports.getLastVersion = void 0;
var gitSemverTags = require("git-semver-tags");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var semver = require("semver");
var util_1 = require("util");
function getLastVersion(_a) {
    var tagPrefix = _a.tagPrefix;
    return rxjs_1.from(util_1.promisify(gitSemverTags)({ tagPrefix: tagPrefix })).pipe(operators_1.switchMap(function (tags) {
        var versions = tags.map(function (tag) { return tag.substring(tagPrefix.length); });
        var version = versions.sort(semver.rcompare)[0];
        if (version == null) {
            return rxjs_1.throwError(new Error('No semver tag found'));
        }
        var tag = "" + tagPrefix + version;
        return rxjs_1.of(tag.substring(tagPrefix.length));
    }));
}
exports.getLastVersion = getLastVersion;
