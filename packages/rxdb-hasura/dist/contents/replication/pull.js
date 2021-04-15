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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullModifier = exports.pullQueryBuilder = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const console_1 = require("../../console");
const utils_1 = require("../../utils");
const label_1 = require("../computed-fields/label");
const utils_2 = require("../computed-fields/utils");
const schema_1 = require("../schema");
const id_1 = require("../schema/id");
const pullQueryBuilder = (collection, batchSize) => {
    const table = collection.metadata;
    const title = schema_1.metadataName(table);
    const idKey = id_1.getId(collection.metadata);
    const arrayRelationships = table.relationships
        .filter(rel => rel.rel_type === 'array')
        .map(relationship => relationship.rel_name);
    const foreignKeyColumns = table.relationships.reduce((aggr, curr) => {
        aggr.push(...curr.mapping.reduce((mAggr, mCurr) => {
            var _a, _b;
            if (((_a = mCurr.column) === null || _a === void 0 ? void 0 : _a.column_name) !== idKey)
                mAggr.push((_b = mCurr.column) === null || _b === void 0 ? void 0 : _b.column_name);
            return mAggr;
        }, []));
        return aggr;
    }, []);
    const columns = (collection.role === 'admin'
        ? table.columns
        : table.columns.filter(column => column.canSelect.length))
        .filter(column => !foreignKeyColumns.includes(column.column_name));
    const objectRelationshipFields = schema_1.filteredRelationships(table)
        .filter(rel => rel.rel_type === 'object')
        .map(relationship => ({
        [relationship.rel_name]: relationship.mapping
            .map(item => item.remote_column_name)
            .reduce((aggr, curr) => ((aggr[curr] = true), aggr), { updated_at: true })
    }));
    const arrayRelationshipFields = schema_1.filteredRelationships(table)
        .filter(rel => rel.rel_type === 'array')
        .map(relationship => ({
        [relationship.rel_name]: relationship.mapping
            .map(item => { var _a; return (_a = item.column) === null || _a === void 0 ? void 0 : _a.column_name; })
            .reduce((aggr, curr) => ((aggr[curr] = true), aggr), {}),
        [`${relationship.rel_name}_aggregate`]: {
            aggregate: { max: { updated_at: true } }
        }
    }));
    const fieldsObject = deepmerge_1.default.all([
        columns.reduce((aggr, curr) => ((aggr[curr.column_name] = true), aggr), {}),
        ...arrayRelationshipFields,
        ...objectRelationshipFields,
        ...table.computedProperties
            .filter(prop => prop.transformation)
            .map(prop => utils_1.rxdbJsonataPaths(prop.transformation, collection))
    ]);
    const orConditions = [
        '{ updated_at: { _gt: $updatedAt } }',
        `{ updated_at: { _eq: $updatedAt }, ${idKey}: { _gt: $id } }`,
        ...arrayRelationships.map(rel => `{ _and: [
      {${rel}: { updated_at: { _gt: $updated_at_${rel} } } }
      {id: { _eq: $id } }
    ]}`)
    ];
    const idColumn = collection.metadata.columns.find(({ column_name }) => column_name === idKey);
    const variableDeclarations = [
        [idKey, schema_1.graphQLColumnType(idColumn)],
        ['updatedAt', 'timestamptz'],
        ...arrayRelationships.map(rel => [`updated_at_${rel}`, 'timestamptz'])
    ]
        .map(([name, type]) => `$${name}: ${type}`)
        .join(', ');
    const orderBy = [
        ['updated_at', 'asc'],
        [idKey, 'asc']
    ];
    const strOrderBy = orderBy
        .map(([field, order]) => `${field}: ${order}`)
        .join(',');
    const query = `query query${title} (${variableDeclarations}){
      ${title} (
            where: {
                 _or: [${orConditions}]
              },
            limit: ${batchSize},
            order_by: {${strOrderBy}}
      )${utils_1.objectSchemaToGraphqlFields(fieldsObject)}
  }`;
    return doc => {
        const res = {
            query,
            variables: arrayRelationships.reduce((variables, rel) => {
                var _a, _b, _c;
                return ((variables[`updated_at_${rel}`] =
                    ((_c = (_b = (_a = doc === null || doc === void 0 ? void 0 : doc[`${arrayRelationships}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.max) === null || _c === void 0 ? void 0 : _c.updated_at) || new Date(0).toISOString()),
                    variables);
            }, {
                updatedAt: (doc === null || doc === void 0 ? void 0 : doc.updated_at) || new Date(0).toISOString(),
                id: (doc === null || doc === void 0 ? void 0 : doc[idKey]) || '00000000-0000-0000-0000-000000000000'
            })
        };
        return res;
    };
};
exports.pullQueryBuilder = pullQueryBuilder;
const pullModifier = (collection) => {
    const cleansedRelationships = schema_1.filteredRelationships(collection.metadata).map(({ rel_type, rel_name, mapping }) => {
        var _a;
        return ({
            multiple: rel_type === 'array',
            name: rel_name,
            key: (rel_type === 'array'
                ? (_a = mapping[0].column) === null || _a === void 0 ? void 0 : _a.column_name : mapping[0].remote_column_name)
        });
    });
    return (data) => __awaiter(void 0, void 0, void 0, function* () {
        console_1.debug('pullModifier: in', collection.name, Object.assign({}, data));
        data.label = label_1.label(data, collection) || '';
        data = utils_2.addComputedFieldsFromLoadedData(data, collection);
        for (const { name, key, multiple } of cleansedRelationships) {
            if (multiple) {
                data[name] = data[name].map(item => item[key]);
            }
            else {
                if (data[name])
                    data[name] = data[name][key];
            }
        }
        console_1.debug('pullModifier: out', collection.name, Object.assign({}, data));
        return data;
    });
};
exports.pullModifier = pullModifier;
//# sourceMappingURL=pull.js.map