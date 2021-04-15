"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemDocumentComponent = exports.systemCollectionComponent = void 0;
const lodash_kebabcase_1 = __importDefault(require("lodash.kebabcase"));
const systemCollectionComponent = ({ metadata }) => {
    if (metadata.table_schema === 'metadata') {
        return 'metadata-' + lodash_kebabcase_1.default(metadata.table_name);
    }
};
exports.systemCollectionComponent = systemCollectionComponent;
const systemDocumentComponent = (document) => {
    const { metadata } = document.collection;
    if (metadata.table_schema === 'metadata') {
        return 'metadata-' + lodash_kebabcase_1.default(metadata.table_name);
    }
};
exports.systemDocumentComponent = systemDocumentComponent;
//# sourceMappingURL=system.js.map