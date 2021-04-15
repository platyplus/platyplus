"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJsonSchema = void 0;
const computed_fields_1 = require("../computed-fields");
const columns_1 = require("./columns");
const indexes_1 = require("./indexes");
const name_1 = require("./name");
const relationships_1 = require("./relationships");
const required_1 = require("./required");
const toJsonSchema = (table, role) => {
    var _a;
    const result = {
        type: 'object',
        title: ((_a = table.config) === null || _a === void 0 ? void 0 : _a.title) || name_1.metadataName(table),
        description: '',
        version: 0,
        properties: Object.assign(Object.assign(Object.assign({}, columns_1.createColumnProperties(table)), relationships_1.createRelationshipProperties(table, role)), computed_fields_1.createComputedFieldsProperties(table)),
        required: required_1.requiredProperties(table),
        indexes: indexes_1.indexes(table)
    };
    return result;
};
exports.toJsonSchema = toJsonSchema;
//# sourceMappingURL=creator.js.map