"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasuraCollections = void 0;
const hasuraCollections = (db) => Object.keys(db.collections)
    .filter(colName => db.collections[colName].options.metadata)
    .reduce((aggr, curr) => ((aggr[curr] = db.collections[curr]), aggr), {});
exports.hasuraCollections = hasuraCollections;
//# sourceMappingURL=helpers.js.map