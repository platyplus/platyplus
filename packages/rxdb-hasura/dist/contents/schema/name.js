"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataName = void 0;
const metadataName = (data) => data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`;
exports.metadataName = metadataName;
//# sourceMappingURL=name.js.map