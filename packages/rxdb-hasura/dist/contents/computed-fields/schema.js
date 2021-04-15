"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computedFields = exports.createComputedFieldsProperties = void 0;
const createComputedFieldsProperties = (table) => (Object.assign({ label: {
        type: 'string'
    } }, table.computedProperties.reduce((aggr, curr) => ((aggr[curr.name] = {
    type: curr.nullable
        ? ['null', curr.type]
        : curr.type
}),
    aggr), {})));
exports.createComputedFieldsProperties = createComputedFieldsProperties;
const computedFields = (collection) => [
    'label',
    ...collection.metadata.computedProperties.map(prop => prop.name)
];
exports.computedFields = computedFields;
//# sourceMappingURL=schema.js.map