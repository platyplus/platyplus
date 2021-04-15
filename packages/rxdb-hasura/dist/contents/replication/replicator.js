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
exports.createContentReplicator = void 0;
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const console_1 = require("../../console");
const utils_1 = require("../../utils");
const pull_1 = require("./pull");
const push_1 = require("./push");
const subscribe_1 = require("./subscribe");
const DEFAULT_BATCH_SIZE = 5;
const createContentReplicator = (collection, role) => __awaiter(void 0, void 0, void 0, function* () {
    const url = collection.database.options.url;
    const db = collection.database;
    let state;
    let wsSubscription;
    let jwtSubscription;
    const setupGraphQLReplication = () => __awaiter(void 0, void 0, void 0, function* () {
        const replicationState = collection.syncGraphQL({
            url,
            headers: utils_1.createHeaders(role, db.jwt$.getValue()),
            push: {
                batchSize: DEFAULT_BATCH_SIZE,
                queryBuilder: push_1.pushQueryBuilder(collection),
                modifier: push_1.pushModifier(collection)
            },
            pull: {
                queryBuilder: pull_1.pullQueryBuilder(collection, DEFAULT_BATCH_SIZE),
                modifier: pull_1.pullModifier(collection)
            },
            live: true,
            liveInterval: 1000 * 60 * 10,
            deletedFlag: 'deleted',
            waitForLeadership: true
        });
        replicationState.error$.subscribe(err => {
            console_1.error(`replication error on ${collection.name}`);
            console_1.errorDir(err);
        });
        jwtSubscription = db.jwt$.subscribe((token) => {
            console_1.debug(`Replicator (${collection.name}): set token`);
            replicationState.setHeaders(utils_1.createHeaders(role, token));
            wsSubscription === null || wsSubscription === void 0 ? void 0 : wsSubscription.close();
            wsSubscription = setupGraphQLSubscription();
        });
        return replicationState;
    });
    const setupGraphQLSubscription = () => {
        const wsUrl = utils_1.httpUrlToWebSockeUrl(url);
        const headers = utils_1.createHeaders(role, db.jwt$.getValue());
        const wsClient = new subscriptions_transport_ws_1.SubscriptionClient(wsUrl, {
            reconnect: true,
            connectionParams: {
                headers
            },
            timeout: 1000 * 60,
            reconnectionAttempts: 10000,
            inactivityTimeout: 10 * 1000,
            lazy: true
        });
        const ret = wsClient.request({
            query: subscribe_1.subscriptionQuery(collection)
        });
        ret.subscribe({
            next: data => {
                console_1.info(`subscription on ${collection.name} emitted`, data);
                state === null || state === void 0 ? void 0 : state.run();
            },
            error: error => {
                console_1.warn(`subscription ${collection.name} error`, error);
            }
        });
        return wsClient;
    };
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        state = yield setupGraphQLReplication();
    });
    const stop = () => __awaiter(void 0, void 0, void 0, function* () {
        yield (state === null || state === void 0 ? void 0 : state.cancel());
        jwtSubscription === null || jwtSubscription === void 0 ? void 0 : jwtSubscription.unsubscribe();
        wsSubscription === null || wsSubscription === void 0 ? void 0 : wsSubscription.close();
    });
    db.authStatus$.subscribe((status) => __awaiter(void 0, void 0, void 0, function* () {
        console_1.debug('[contents] auth status change', status);
        if (status)
            yield start();
        else
            yield stop();
    }));
    collection.replicator = { start, stop };
});
exports.createContentReplicator = createContentReplicator;
//# sourceMappingURL=replicator.js.map