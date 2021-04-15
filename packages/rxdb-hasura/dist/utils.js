"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeaders = exports.hasuraClaims = exports.objectSchemaToGraphqlFields = exports.rxdbJsonataPaths = exports.webSocketUrlToHttpUrl = exports.httpUrlToWebSockeUrl = void 0;
const jsonata_schema_1 = require("@platyplus/jsonata-schema");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const httpUrlToWebSockeUrl = (url) => url.replace(/(http)(s)?:\/\//, 'ws$2://');
exports.httpUrlToWebSockeUrl = httpUrlToWebSockeUrl;
const webSocketUrlToHttpUrl = (url) => url.replace(/(ws)(s)?:\/\//, 'http$2://');
exports.webSocketUrlToHttpUrl = webSocketUrlToHttpUrl;
const generateRxdbJsonataPaths = (schema, collection) => {
    const subFields = Object.entries(schema).reduce((aggr, [key, value]) => {
        const ref = collection === null || collection === void 0 ? void 0 : collection.schema.jsonSchema.properties[key].ref;
        if (collection && ref) {
            if (value === true) {
                aggr[key] = { [collection.schema.primaryPath]: true, deleted: true };
            }
            else
                aggr[key] = generateRxdbJsonataPaths(value, collection === null || collection === void 0 ? void 0 : collection.database[ref]);
        }
        else
            aggr[key] = true;
        return aggr;
    }, {});
    return subFields;
};
const rxdbJsonataPaths = (expression, collection) => generateRxdbJsonataPaths(jsonata_schema_1.jsonataPaths(expression), collection);
exports.rxdbJsonataPaths = rxdbJsonataPaths;
const objectSchemaToGraphqlFields = (schema, path = '') => {
    if (typeof schema === 'object') {
        return `${path} { ${Object.entries(schema)
            .map(([key, value]) => {
            return exports.objectSchemaToGraphqlFields(value, key);
        })
            .join(', ')} }`;
    }
    else {
        return path;
    }
};
exports.objectSchemaToGraphqlFields = objectSchemaToGraphqlFields;
const hasuraClaims = (token) => jwt_decode_1.default(token)['https://hasura.io/jwt/claims'];
exports.hasuraClaims = hasuraClaims;
const createHeaders = (role, token) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        const hasura = exports.hasuraClaims(token);
        const allowedRoles = hasura['x-hasura-allowed-roles'];
        const defaultRole = hasura['x-hasura-default-role'];
        if (role !== defaultRole && allowedRoles.includes(role))
            headers['x-hasura-role'] = role;
    }
    return headers;
};
exports.createHeaders = createHeaders;
//# sourceMappingURL=utils.js.map