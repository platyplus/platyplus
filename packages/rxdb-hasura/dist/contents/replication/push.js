"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushModifier = exports.pushQueryBuilder = void 0;
const stringify_object_1 = __importDefault(require("stringify-object"));
const console_1 = require("../../console");
const computed_fields_1 = require("../computed-fields");
const schema_1 = require("../schema");
const isNewDocument = (doc) => !doc.updated_at;
const pushQueryBuilder = (collection) => {
    const table = collection.metadata;
    const title = schema_1.metadataName(table);
    return (_a) => {
        var { _isNew } = _a, doc = __rest(_a, ["_isNew"]);
        console_1.debug('push query builder in', doc);
        const { id } = doc, updateDoc = __rest(doc, ["id"]);
        const query = _isNew
            ? `mutation { insert_${title}_one(object:${stringify_object_1.default(doc, {
                singleQuotes: false
            })}) { id } }`
            : `mutation { update_${title}(where: { id: { _eq: "${id}" } }, _set: ${stringify_object_1.default(updateDoc, { singleQuotes: false })}) { returning { id } } }`;
        console_1.debug('push query builder:', { query });
        return {
            query,
            variables: {}
        };
    };
};
exports.pushQueryBuilder = pushQueryBuilder;
const pushModifier = (collection) => {
    const table = collection.metadata;
    const objectRelationships = schema_1.filteredRelationships(table)
        .filter(({ rel_type }) => rel_type === 'object')
        .map(rel => {
        var _a;
        return {
            name: rel.rel_name,
            column: (_a = rel.mapping[0].column) === null || _a === void 0 ? void 0 : _a.column_name
        };
    });
    const excludeFields = [
        ...computed_fields_1.computedFields(collection),
        ...table.relationships
            .filter(({ rel_type }) => rel_type === 'array')
            .reduce((aggr, { rel_name }) => (aggr.push(rel_name, `${rel_name}_aggregate`), aggr), [])
    ];
    const forbiddenInsertColumns = collection.role === 'admin'
        ? []
        : table.columns
            .filter(column => !column.canInsert.length)
            .map(column => column.column_name);
    const forbiddenUpdateColumns = collection.role === 'admin'
        ? []
        : table.columns
            .filter(column => !column.canUpdate.length)
            .map(column => column.column_name);
    return (data) => __awaiter(void 0, void 0, void 0, function* () {
        console_1.debug('pushModifier: in:', data);
        const _isNew = isNewDocument(data);
        const id = data.id;
        for (const { name, column } of objectRelationships) {
            if (data[name] !== undefined) {
                data[column] = data[name];
                delete data[name];
            }
        }
        const excluded = [
            ...excludeFields,
            ...(isNewDocument(data) ? forbiddenInsertColumns : forbiddenUpdateColumns)
        ];
        for (const field of excluded)
            delete data[field];
        console_1.debug('pushModifier: out', Object.assign({}, data));
        return Object.assign(Object.assign({ _isNew }, data), { id });
    });
};
exports.pushModifier = pushModifier;
//# sourceMappingURL=push.js.map