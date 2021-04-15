"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyJsonType = void 0;
const id_1 = require("./id");
const postgresJsonSchemaTypeMapping = {
    uuid: 'string',
    bool: 'boolean',
    timestamp: 'string',
    timestamptz: 'string',
    date: 'string',
    timetz: 'string',
    time: 'string',
    text: 'string',
    citext: 'string',
    varchar: 'string',
    jsonb: 'object',
    numeric: 'number',
    int4: 'integer',
    int8: 'integer',
    float4: 'number',
    name: 'string'
};
const propertyJsonType = (columnInfo) => {
    const udtType = columnInfo.udt_name;
    const isNullable = columnInfo.is_nullable === 'YES';
    if (!postgresJsonSchemaTypeMapping[udtType])
        throw Error(`PostgresSQL type "${udtType}" is not mapped to JSON Schema`);
    const result = (postgresJsonSchemaTypeMapping[udtType] ||
        udtType);
    return isNullable && !id_1.isIdColumn(columnInfo) ? [result, 'null'] : result;
};
exports.propertyJsonType = propertyJsonType;
//# sourceMappingURL=property.js.map