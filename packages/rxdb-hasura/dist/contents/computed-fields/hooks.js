"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComputedFieldsHooks = void 0;
const utils_1 = require("./utils");
const createComputedFieldsHooks = (collection) => {
    collection.preInsert(data => utils_1.addComputedFieldsFromCollection(data, collection), false);
    collection.preSave(utils_1.addComputedFieldsFromDoc, false);
};
exports.createComputedFieldsHooks = createComputedFieldsHooks;
//# sourceMappingURL=hooks.js.map