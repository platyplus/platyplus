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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRxCollection = void 0;
const console_1 = require("../console");
const contents_1 = require("../contents");
const metadata_1 = require("../metadata");
const helpers_1 = require("./helpers");
const observables_1 = require("./observables");
const compare = (a, b) => {
    return a || b ? (!a ? 1 : !b ? -1 : a - b) : 0;
};
const collectionProperties = (collection) => {
    const schema = collection.schema;
    const excludedProperties = [
        '_rev',
        '_attachments',
        'updated_at',
        'created_at',
        'label',
        ...collection.metadata.relationships
            .filter(({ rel_type }) => rel_type === 'array')
            .map(({ rel_name }) => `${rel_name}_aggregate`),
        ...schema.finalFields.map(field => field)
    ];
    const configuredProperties = collection.metadata.propertiesConfig.reduce((aggr, config) => ((aggr[config.property_name] = config.order), aggr), {});
    return new Map(Object.entries(schema.jsonSchema.properties)
        .filter(([name]) => !excludedProperties.includes(name))
        .sort(([keyA], [keyB]) => compare(configuredProperties[keyA], configuredProperties[keyB]) ||
        keyA.localeCompare(keyB)));
};
const createRxCollection = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    if (collection.options.metadata) {
        collection.role = collection.options.role;
        collection.metadata = collection.options.metadata;
        collection.properties = collectionProperties(collection);
        console_1.info(`create RxCollection ${collection.name}`);
        contents_1.createHooks(collection);
        observables_1.contents.next(Object.assign(Object.assign({}, helpers_1.hasuraCollections(collection.database)), { [collection.name]: collection }));
        yield contents_1.createContentReplicator(collection, collection.options.role);
    }
    else if (collection.options.isMetadata) {
        yield metadata_1.createMetadataReplicator(collection, collection.options.role);
    }
});
exports.createRxCollection = createRxCollection;
//# sourceMappingURL=collection-hooks.js.map