"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castValue = void 0;
const contents_1 = require("../contents");
const isTextType = (type) => [
    'string',
    'date',
    'date-time',
    'time',
    'email',
    'document',
    'collection'
].includes(type);
const castValue = (document, propertyName, value) => {
    const type = contents_1.propertyType(document, propertyName);
    return typeof value === 'boolean' || isTextType(type)
        ? value
        : JSON.parse(value);
};
exports.castValue = castValue;
//# sourceMappingURL=index.js.map