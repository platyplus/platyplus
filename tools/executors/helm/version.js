"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports._generateProjectChangelogs = void 0;
var devkit_1 = require("@nrwl/devkit");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var standardVersion = require("standard-version");
var changelog_1 = require("./utils/changelog");
var tag_template_1 = require("./utils/tag-template");
var try_bump_1 = require("./utils/try-bump");
var workspace_1 = require("./utils/workspace");
var save_version_1 = require("./utils/save-version");
/**
 * Generate project's changelogs and return an array containing their path.
 * Skip generation if --skip-project-changelog enabled and return an empty array.
 */
function _generateProjectChangelogs(_a) {
    var projectRoots = _a.projectRoots, workspaceRoot = _a.workspaceRoot, options = __rest(_a, ["projectRoots", "workspaceRoot"]);
    if (options.skipProjectChangelog) {
        return rxjs_1.of([]);
    }
    return rxjs_1.forkJoin(projectRoots
        /* Don't update the workspace's changelog as it will be
         * dealt with by `standardVersion`. */
        .filter(function (projectRoot) { return projectRoot !== workspaceRoot; })
        .map(function (projectRoot) {
        return changelog_1.updateChangelog({
            dryRun: options.dryRun,
            preset: options.preset,
            projectRoot: projectRoot,
            newVersion: options.newVersion
        });
    }));
}
exports._generateProjectChangelogs = _generateProjectChangelogs;
function versionProject(_a) {
    var dryRun = _a.dryRun, projectRoot = _a.projectRoot, newVersion = _a.newVersion, noVerify = _a.noVerify, preset = _a.preset, tagPrefix = _a.tagPrefix, _b = _a.changelogHeader, changelogHeader = _b === void 0 ? changelog_1.defaultHeader : _b;
    return standardVersion({
        bumpFiles: [path_1.resolve(projectRoot, 'package.json')],
        /* Make sure that we commit the manually generated changelogs that
         * we staged. */
        commitAll: true,
        dryRun: dryRun,
        header: changelogHeader,
        infile: changelog_1.getChangelogPath(projectRoot),
        /* Control version to avoid different results between the value
         * returned by `tryBump` and the one computed by standard-version. */
        releaseAs: newVersion,
        silent: false,
        noVerify: noVerify,
        packageFiles: [path_1.resolve(projectRoot, 'package.json')],
        path: projectRoot,
        preset: preset,
        tagPrefix: tagPrefix,
        skip: {
            changelog: false
        }
    });
}
function version(_a, context) {
    var dryRun = _a.dryRun, noVerify = _a.noVerify, version = _a.version, preid = _a.preid, versionTagPrefix = _a.versionTagPrefix;
    var preset = 'angular';
    var tagPrefix = versionTagPrefix !== undefined
        ? tag_template_1.resolveTagTemplate(versionTagPrefix, {
            target: context.projectName,
            projectName: context.projectName
        })
        : context.projectName + "@";
    var projectRoot = workspace_1.getProjectRoot(context);
    var newVersion$ = try_bump_1.tryBump({
        preset: preset,
        projectRoot: projectRoot,
        tagPrefix: tagPrefix,
        releaseType: version,
        preid: preid
    });
    var action$ = newVersion$.pipe(operators_1.switchMap(function (newVersion) {
        if (newVersion == null) {
            devkit_1.logger.info('⏹ Nothing changed since last release.');
            return rxjs_1.of(undefined);
        }
        var options = {
            dryRun: dryRun,
            newVersion: newVersion,
            noVerify: noVerify,
            preset: preset,
            projectRoot: projectRoot,
            tagPrefix: tagPrefix
        };
        var runStandardVersion$ = rxjs_1.defer(function () { return versionProject(options); });
        var saveVersion$ = rxjs_1.defer(function () {
            return save_version_1.saveVersion({ newVersion: newVersion, projectRoot: projectRoot, dryRun: dryRun });
        });
        return rxjs_1.concat(runStandardVersion$, saveVersion$);
    }));
    return action$
        .pipe(operators_1.mapTo({ success: true }), operators_1.catchError(function (error) {
        var _a;
        devkit_1.logger.error((_a = error.stack) !== null && _a !== void 0 ? _a : error.toString());
        return rxjs_1.of({ success: false });
    }))
        .toPromise();
}
exports["default"] = version;
