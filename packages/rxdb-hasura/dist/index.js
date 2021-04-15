"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.createRxHasura = exports.RxHasuraPlugin = void 0;
const rxdb_1 = require("rxdb");
const ajv_validate_1 = require("rxdb/plugins/ajv-validate");
const replication_graphql_1 = require("rxdb/plugins/replication-graphql");
const helpers_1 = require("./database/helpers");
const metadata_1 = require("./metadata");
const plugin_1 = require("./plugin");
var plugin_2 = require("./plugin");
Object.defineProperty(exports, "RxHasuraPlugin", { enumerable: true, get: function () { return plugin_2.RxHasuraPlugin; } });
__exportStar(require("./contents"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./helpers"), exports);
const utils_1 = require("./utils");
const createRxHasura = (name, url, password) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = {
        name,
        password,
        multiInstance: false,
        eventReduce: true,
        options: {
            url
        },
        adapter: process.env.NODE_ENV === 'development' ? 'memory' : 'idb'
    };
    rxdb_1.addRxPlugin(replication_graphql_1.RxDBReplicationGraphQLPlugin);
    rxdb_1.addRxPlugin(ajv_validate_1.RxDBAjvValidatePlugin);
    rxdb_1.addRxPlugin(plugin_1.RxHasuraPlugin);
    rxdb_1.addRxPlugin(require('rxdb/plugins/migration'));
    rxdb_1.addRxPlugin(require('rxdb/plugins/leader-election'));
    rxdb_1.addRxPlugin(require('rxdb/plugins/update'));
    rxdb_1.addRxPlugin(require('rxdb/plugins/watch-for-changes'));
    rxdb_1.addRxPlugin(require('rxdb/plugins/adapter-check'));
    rxdb_1.addRxPlugin(require('rxdb/plugins/query-builder'));
    if (process.env.NODE_ENV === 'development') {
        rxdb_1.addRxPlugin(require('pouchdb-adapter-memory'));
        rxdb_1.addRxPlugin(require('rxdb/plugins/dev-mode'));
    }
    else {
        rxdb_1.addRxPlugin(require('pouchdb-adapter-idb'));
    }
    const db = (yield rxdb_1.createRxDatabase(settings));
    db.jwt$.subscribe((jwt) => __awaiter(void 0, void 0, void 0, function* () {
        if (jwt) {
            const hasura = utils_1.hasuraClaims(jwt);
            for (const role of hasura['x-hasura-allowed-roles']) {
                if (!db[`${role}_metadata`]) {
                    yield db.addCollections({
                        [`${role}_metadata`]: {
                            options: { isMetadata: true, role },
                            schema: metadata_1.metadataSchema,
                            autoMigrate: true
                        }
                    });
                    db.contents$.next(helpers_1.hasuraCollections(db));
                }
            }
        }
    }));
    if (process.env.NODE_ENV === 'development') {
        ;
        window['db'] = db;
    }
    return db;
});
exports.createRxHasura = createRxHasura;
//# sourceMappingURL=index.js.map