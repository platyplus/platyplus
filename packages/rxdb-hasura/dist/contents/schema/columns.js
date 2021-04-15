"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColumnProperties = exports.graphQLColumnType = void 0;
const id_1 = require("./id");
const property_1 = require("./property");
const postgresJsonSchemaFormatMapping = {
    timestamptz: 'date-time',
    time: 'time',
    timetz: 'time',
    date: 'date'
};
const graphQLColumnType = (column) => {
    if ((column === null || column === void 0 ? void 0 : column.udt_name) === 'uuid')
        return 'uuid';
    else
        return 'String';
};
exports.graphQLColumnType = graphQLColumnType;
const propertyFormat = (udtType) => {
    return postgresJsonSchemaFormatMapping[udtType];
};
const createColumnProperties = (table) => {
    const result = {};
    const skipRelationships = table.relationships
        .filter(relationship => relationship.rel_type === 'object' && relationship.mapping.length === 1)
        .map(relationship => { var _a; return (_a = relationship.mapping[0].column) === null || _a === void 0 ? void 0 : _a.column_name; });
    table.columns
        .filter(column => !skipRelationships.includes(column.column_name) ||
        id_1.isIdColumn(column))
        .filter(column => column.column_name !== 'deleted')
        .map(column => {
        var _a;
        const sqlType = column.udt_name;
        const type = property_1.propertyJsonType(column);
        const customSchema = (_a = column.config) === null || _a === void 0 ? void 0 : _a.json_schema;
        const property = customSchema || {
            type
        };
        if (type === 'string' || type.includes('string')) {
            const format = propertyFormat(sqlType);
            if (format) {
                property.format = format;
            }
        }
        if (id_1.isIdColumn(column)) {
            ;
            property.primary = true;
        }
        result[column.column_name] = property;
    });
    return result;
};
exports.createColumnProperties = createColumnProperties;
//# sourceMappingURL=columns.js.map