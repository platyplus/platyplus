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
exports.createMetadataReplicator = void 0;
const printer_1 = require("graphql/language/printer");
const console_1 = require("../console");
const contents_1 = require("../contents");
const utils_1 = require("../utils");
const metadata_graphql_1 = __importDefault(require("./metadata.graphql"));
const query = printer_1.print(metadata_graphql_1.default);
const noopQuery = '{metadata_table(where:{_and:[{table_schema: {_eq: "noop"}},{table_schema: {_neq: "noop"}}]}) {table_name}}';
const createMetadataReplicatorOptions = (db, role) => {
    return {
        url: db.options.url,
        headers: utils_1.createHeaders(role, db.jwt$.getValue()),
        pull: {
            queryBuilder: doc => ({
                query: doc ? noopQuery : query,
                variables: {}
            })
        },
        live: true,
        liveInterval: 1000 * 60 * 10,
        deletedFlag: 'deleted'
    };
};
const createMetadataReplicator = (metadata, role) => __awaiter(void 0, void 0, void 0, function* () {
    const db = metadata.database;
    let state;
    let metaSubscription;
    let jwtSubscription;
    let errorSubscription;
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        state = metadata.syncGraphQL(createMetadataReplicatorOptions(db, role));
        metaSubscription = metadata.$.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
            if (event.operation === 'INSERT' || event.operation === 'UPDATE') {
                const collectionName = `${role}_${contents_1.metadataName(event.documentData)}`;
                yield metadata.database.addCollections({
                    [collectionName]: contents_1.contentsCollectionCreator(event.documentData, role)
                });
            }
        }));
        errorSubscription = state.error$.subscribe(data => {
            console_1.warn('metadata sync error', data);
        });
        jwtSubscription = db.jwt$.subscribe((token) => {
            console_1.debug('Replicator (metadata): set token');
            state === null || state === void 0 ? void 0 : state.setHeaders(utils_1.createHeaders(role, token));
        });
        yield state.awaitInitialReplication();
    });
    const stop = () => __awaiter(void 0, void 0, void 0, function* () {
        yield (state === null || state === void 0 ? void 0 : state.cancel());
        metaSubscription === null || metaSubscription === void 0 ? void 0 : metaSubscription.unsubscribe();
        jwtSubscription === null || jwtSubscription === void 0 ? void 0 : jwtSubscription.unsubscribe();
        errorSubscription === null || errorSubscription === void 0 ? void 0 : errorSubscription.unsubscribe();
    });
    db.authStatus$.subscribe((status) => __awaiter(void 0, void 0, void 0, function* () {
        console_1.debug('[metadata] auth status change', status);
        if (status)
            yield start();
        else
            yield stop();
    }));
    metadata.replicator = { start, stop };
});
exports.createMetadataReplicator = createMetadataReplicator;
//# sourceMappingURL=replicator.js.map