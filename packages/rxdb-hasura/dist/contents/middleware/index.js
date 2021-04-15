"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHooks = void 0;
const console_1 = require("../../console");
const computed_fields_1 = require("../computed-fields");
const relationships_1 = require("./relationships");
const createHooks = (collection) => {
    console_1.debug('Installing hooks');
    relationships_1.createRelationshipHooks(collection);
    computed_fields_1.createComputedFieldsHooks(collection);
};
exports.createHooks = createHooks;
//# sourceMappingURL=index.js.map