"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyType = void 0;
const propertyType = (document, propertyName) => {
    const property = document.collection.schema.jsonSchema.properties[propertyName];
    if (!property.type)
        throw Error(`No type in prop: ${JSON.stringify(property)}`);
    let type;
    if (Array.isArray(property.type)) {
        const res = property.type.filter(v => v !== 'null');
        if (res.length === 1)
            type = res[0];
        else
            throw Error(`Composite types are not allowed: ${JSON.stringify(property)}`);
    }
    else {
        type = property.type;
    }
    if (property.ref) {
        if (type === 'array')
            return 'collection';
        else
            return 'document';
    }
    return property.format || type;
};
exports.propertyType = propertyType;
//# sourceMappingURL=property-type.js.map