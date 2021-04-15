"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemDocumentComponent = exports.systemCollectionComponent = void 0;
const param_case_1 = require("param-case");
const systemCollectionComponent = ({ metadata }) => {
    if (metadata.table_schema === 'metadata') {
        return 'metadata-' + param_case_1.paramCase(metadata.table_name);
    }
};
exports.systemCollectionComponent = systemCollectionComponent;
const systemDocumentComponent = (document) => {
    const { metadata } = document.collection;
    if (metadata.table_schema === 'metadata') {
        return 'metadata-' + param_case_1.paramCase(metadata.table_name);
    }
};
exports.systemDocumentComponent = systemDocumentComponent;
//# sourceMappingURL=system.js.map