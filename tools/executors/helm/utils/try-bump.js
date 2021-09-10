"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports._manualBump = exports._semverBump = exports.tryBump = void 0;
var devkit_1 = require("@nrwl/devkit");
var conventionalRecommendedBump = require("conventional-recommended-bump");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var semver = require("semver");
var util_1 = require("util");
var get_last_version_1 = require("./get-last-version");
var git_1 = require("./git");
/**
 * Return new version or null if nothing changed.
 */
function tryBump(_a) {
    var preset = _a.preset, projectRoot = _a.projectRoot, tagPrefix = _a.tagPrefix, _b = _a.releaseType, releaseType = _b === void 0 ? null : _b, _c = _a.preid, preid = _c === void 0 ? null : _c;
    var initialVersion = '0.0.0';
    var lastVersion$ = get_last_version_1.getLastVersion({ tagPrefix: tagPrefix }).pipe(operators_1.catchError(function () {
        devkit_1.logger.warn("\uD83D\uDFE0 No previous version tag found, fallback to version 0.0.0.\nNew version will be calculated based on all changes since first commit.\nIf your project is already versioned, please tag the latest release commit with " + tagPrefix + "x.y.z and run this command again.");
        return rxjs_1.of(initialVersion);
    }), operators_1.shareReplay({
        refCount: true,
        bufferSize: 1
    }));
    var lastVersionGitRef$ = lastVersion$.pipe(
    /** If lastVersion equals 0.0.0 it means no tag exist,
     * then get the first commit ref to compute the initial version. */
    operators_1.switchMap(function (lastVersion) {
        return rxjs_1.iif(function () { return lastVersion === initialVersion; }, git_1.getFirstCommitRef(), rxjs_1.of("" + tagPrefix + lastVersion));
    }));
    var commits$ = lastVersionGitRef$.pipe(operators_1.switchMap(function (lastVersionGitRef) {
        return git_1.getCommits({
            projectRoot: projectRoot,
            since: lastVersionGitRef
        });
    }));
    return rxjs_1.forkJoin([lastVersion$, commits$]).pipe(operators_1.switchMap(function (_a) {
        var lastVersion = _a[0], commits = _a[1];
        /* If release type is manually specified,
         * we just release even if there are no changes. */
        if (releaseType !== null) {
            return _manualBump({ since: lastVersion, releaseType: releaseType, preid: preid });
        }
        /* No commits since last release so don't bump. */
        if (commits.length === 0) {
            return rxjs_1.of(null);
        }
        return _semverBump({
            since: lastVersion,
            preset: preset,
            projectRoot: projectRoot,
            tagPrefix: tagPrefix
        });
    }));
}
exports.tryBump = tryBump;
function _semverBump(_a) {
    var _this = this;
    var since = _a.since, preset = _a.preset, projectRoot = _a.projectRoot, tagPrefix = _a.tagPrefix;
    return rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
        var recommended, releaseType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.promisify(conventionalRecommendedBump)({
                        path: projectRoot,
                        preset: preset,
                        tagPrefix: tagPrefix
                    })];
                case 1:
                    recommended = _a.sent();
                    releaseType = recommended.releaseType;
                    return [2 /*return*/, semver.inc(since, releaseType)];
            }
        });
    }); });
}
exports._semverBump = _semverBump;
function _manualBump(_a) {
    var since = _a.since, releaseType = _a.releaseType, preid = _a.preid;
    return rxjs_1.defer(function () {
        var hasPreid = ['premajor', 'preminor', 'prepatch', 'prerelease'].includes(releaseType) && preid !== null;
        var semverArgs = __spreadArray([
            since,
            releaseType
        ], (hasPreid ? [preid] : []));
        return rxjs_1.of(semver.inc.apply(semver, semverArgs));
    });
}
exports._manualBump = _manualBump;
