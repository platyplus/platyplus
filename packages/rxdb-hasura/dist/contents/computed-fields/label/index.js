"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.label = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const label = (doc, collection) => {
    var _a;
    const template = ((_a = collection.metadata.config) === null || _a === void 0 ? void 0 : _a.document_label) ||
        `{{${collection.schema.primaryPath}}}`;
    const compiledTemplate = handlebars_1.default.compile(template, { noEscape: true });
    return (compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id);
};
exports.label = label;
//# sourceMappingURL=index.js.map