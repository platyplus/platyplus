"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getFirstCommitRef = exports.tryPushToGitRemote = exports.getCommits = void 0;
var gitRawCommits = require("git-raw-commits");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var exec_async_1 = require("./exec-async");
/**
 * Return the list of commits since `since` commit.
 */
function getCommits(_a) {
    var projectRoot = _a.projectRoot, since = _a.since;
    return new rxjs_1.Observable(function (observer) {
        gitRawCommits({
            from: since,
            path: projectRoot
        })
            .on('data', function (data) { return observer.next(data); })
            .on('error', function (error) { return observer.error(error); })
            .on('close', function () { return observer.complete(); })
            .on('finish', function () { return observer.complete(); });
    }).pipe(operators_1.scan(function (commits, commit) { return __spreadArray(__spreadArray([], commits), [commit]); }, []), operators_1.startWith([]), operators_1.last());
}
exports.getCommits = getCommits;
function tryPushToGitRemote(_a) {
    var remote = _a.remote, branch = _a.branch, noVerify = _a.noVerify;
    return rxjs_1.defer(function () {
        if (remote == null || branch == null) {
            return rxjs_1.throwError(new Error('Missing Git options --remote or --branch, see: https://github.com/jscutlery/semver#configure'));
        }
        var gitPushOptions = __spreadArray([
            '--follow-tags'
        ], (noVerify ? ['--no-verify'] : []));
        return exec_async_1.execAsync('git', __spreadArray(__spreadArray([
            'push'
        ], gitPushOptions), [
            '--atomic',
            remote,
            branch
        ])).pipe(operators_1.catchError(function (error) {
            if (/atomic/.test(error.stderr) ||
                (process.env.GIT_REDIRECT_STDERR === '2>&1' &&
                    /atomic/.test(error.stdout))) {
                console.warn('git push --atomic failed, attempting non-atomic push');
                return exec_async_1.execAsync('git', __spreadArray(__spreadArray(['push'], gitPushOptions), [remote, branch]));
            }
            return rxjs_1.throwError(error);
        }));
    });
}
exports.tryPushToGitRemote = tryPushToGitRemote;
function getFirstCommitRef() {
    return exec_async_1.execAsync('git', ['rev-list', '--max-parents=0', 'HEAD']).pipe(
    /**                                 Remove line breaks. */
    operators_1.switchMap(function (_a) {
        var stdout = _a.stdout;
        return rxjs_1.of(stdout.replace(/\r?\n|\r/, ''));
    }));
}
exports.getFirstCommitRef = getFirstCommitRef;
