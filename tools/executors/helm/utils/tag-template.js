"use strict";
exports.__esModule = true;
exports.resolveTagTemplate = void 0;
function resolveTagTemplate(template, resolvingContext) {
    return Object.keys(resolvingContext).reduce(function (accumulator, contextParamKey) {
        return accumulator.replace(new RegExp("\\$\\{" + contextParamKey + "}", 'g'), resolvingContext[contextParamKey]);
    }, template);
}
exports.resolveTagTemplate = resolveTagTemplate;
