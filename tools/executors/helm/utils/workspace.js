"use strict";
exports.__esModule = true;
exports._getWorkspaceDefinition = exports.getProjectRoot = void 0;
var path_1 = require("path");
var operators_1 = require("rxjs/operators");
var filesystem_1 = require("./filesystem");
function getProjectRoot(context) {
    return context.workspace.projects[context.projectName].root;
}
exports.getProjectRoot = getProjectRoot;
function _getWorkspaceDefinition(workspaceRoot) {
    return filesystem_1.readJsonFile(path_1.resolve(workspaceRoot, 'workspace.json')).pipe(operators_1.catchError(function () { return filesystem_1.readJsonFile(path_1.resolve(workspaceRoot, 'angular.json')); }));
}
exports._getWorkspaceDefinition = _getWorkspaceDefinition;
