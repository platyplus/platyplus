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
exports.addComputedFieldsFromLoadedData = exports.addComputedFieldsFromDoc = exports.addComputedFieldsFromCollection = exports.compute = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const jsonata_1 = __importDefault(require("jsonata"));
const rxdb_1 = require("rxdb");
const utils_1 = require("../../utils");
const label_1 = require("./label");
const evaluate = (data, property) => {
    const { transformation, template, type } = property;
    let result;
    try {
        if (transformation) {
            const formula = jsonata_1.default(transformation);
            result = formula.evaluate(data);
        }
        if (template) {
            const compiledTemplate = handlebars_1.default.compile(template, { noEscape: true });
            result = compiledTemplate(Object.assign(Object.assign({}, data), { transformation: result }), { allowProtoPropertiesByDefault: true });
        }
        const typeArray = typeof type === 'string' ? [type] : type;
        const resultType = typeof result;
        const isNullable = typeArray.includes('null');
        const nullResult = result === null || result === undefined;
        if (typeArray.includes('string')) {
            if (nullResult) {
                if (isNullable)
                    return null;
                else
                    return '';
            }
            if (typeof result === 'string')
                return result;
            else
                return JSON.stringify(result);
        }
        else if (typeArray.includes('array')) {
            if (nullResult && !isNullable)
                return [];
            if (!Array.isArray(result))
                throw Error('should be an array');
        }
        else if (typeArray.includes('object')) {
            if (nullResult && !isNullable)
                return {};
            if (resultType !== 'object')
                throw Error('should be an object');
        }
        else if (typeArray.includes('number')) {
            if (nullResult && !isNullable)
                return {};
            if (resultType !== 'number')
                throw Error('should be a number');
        }
        else if (typeArray.includes('boolean')) {
            if (nullResult && !isNullable)
                return false;
            if (resultType !== 'boolean')
                throw Error('should be a boolean');
        }
        return result;
    }
    catch (error) {
        console.warn('Error in computing', { data, property });
        console.warn(error);
    }
};
const recurseLoading = (doc, collection, fieldMap) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Object.entries(fieldMap).reduce((aggr, [key, value]) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const ref = (_a = collection.schema.jsonSchema.properties[key]) === null || _a === void 0 ? void 0 : _a.ref;
        if (ref) {
            const refCollection = collection.database[ref];
            if (Array.isArray(doc[key])) {
                aggr[key] = yield Promise.all(doc[key].map((id) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield recurseLoading(yield refCollection.findOne(id).exec(), refCollection, value);
                })));
            }
            else {
                aggr[key] = yield recurseLoading(yield refCollection.findOne(doc[key]).exec(), refCollection, value);
            }
        }
        else if (value) {
            ;
            (yield aggr)[key] = doc[key];
        }
        return aggr;
    }), {});
});
const expandRxDBData = (contents, collection, expression) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = utils_1.rxdbJsonataPaths(expression, collection);
    return removeDeleted(yield recurseLoading(contents, collection, paths));
});
const compute = (doc, property, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const col = rxdb_1.isRxDocument(doc) ? doc.collection : collection;
    const data = col && property.transformation
        ? yield expandRxDBData(doc, col, property.transformation)
        : doc;
    return evaluate(data, property);
});
exports.compute = compute;
const addComputedFieldsFromCollection = (data, collection) => __awaiter(void 0, void 0, void 0, function* () {
    for (const property of collection.metadata.computedProperties) {
        data[property.name] = exports.compute(data, property, collection);
    }
    data.label = label_1.label(data, collection) || '';
});
exports.addComputedFieldsFromCollection = addComputedFieldsFromCollection;
const addComputedFieldsFromDoc = (data, doc) => {
    exports.addComputedFieldsFromCollection(data, doc.collection);
};
exports.addComputedFieldsFromDoc = addComputedFieldsFromDoc;
const removeDeleted = (data) => {
    if (data !== null && typeof data === 'object') {
        if (data.deleted) {
            return null;
        }
        else {
            return Object.entries(data).reduce((aggr, [key, value]) => ((aggr[key] = Array.isArray(value)
                ? value.map(v => removeDeleted(v)).filter(v => v)
                : removeDeleted(value)),
                aggr), {});
        }
    }
    else
        return data;
};
const addComputedFieldsFromLoadedData = (data, collection) => {
    if (collection.metadata.computedProperties.length) {
        const filteredData = removeDeleted(data) || data;
        for (const property of collection.metadata.computedProperties) {
            filteredData[property.name] = evaluate(filteredData, property);
        }
        return filteredData;
    }
    else
        return data;
};
exports.addComputedFieldsFromLoadedData = addComputedFieldsFromLoadedData;
//# sourceMappingURL=utils.js.map