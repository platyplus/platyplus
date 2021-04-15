"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentsCollectionCreator = void 0;
const collection_1 = require("../collection");
const document_1 = require("../document");
const schema_1 = require("../schema");
const contentsCollectionCreator = (metadata, role) => {
    return {
        schema: schema_1.toJsonSchema(metadata, role),
        statics: collection_1.collectionMethods,
        methods: document_1.documentMethods,
        options: { metadata, role }
    };
};
exports.contentsCollectionCreator = contentsCollectionCreator;
//# sourceMappingURL=index.js.map