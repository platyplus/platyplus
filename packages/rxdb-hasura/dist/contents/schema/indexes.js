"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexes = void 0;
const property_1 = require("./property");
const indexes = (table) => {
    const postgresIndexes = table.indexes
        .filter(({ columns }) => columns.every(({ column_name }) => {
        const column = table.columns.find(c => c.column_name === column_name);
        const type = column && property_1.propertyJsonType(column);
        return (typeof type === 'string' &&
            ['string', 'number', 'integer'].includes(type));
    }))
        .map(({ columns }) => columns.map(({ column_name }) => column_name));
    return [...postgresIndexes, 'label'];
};
exports.indexes = indexes;
//# sourceMappingURL=indexes.js.map