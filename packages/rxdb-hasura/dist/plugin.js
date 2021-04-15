"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxHasuraPlugin = void 0;
const database_1 = require("./database");
exports.RxHasuraPlugin = {
    name: 'hasura-plugin',
    rxdb: true,
    prototypes: {
        RxDatabase: database_1.RxDatabase
    },
    hooks: {
        createRxCollection: database_1.createRxCollection
    }
};
//# sourceMappingURL=plugin.js.map