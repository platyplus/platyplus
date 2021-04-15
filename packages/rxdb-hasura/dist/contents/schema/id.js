"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdColumn = exports.getId = void 0;
const getId = (table) => { var _a; return ((_a = table.primaryKey) === null || _a === void 0 ? void 0 : _a.columns[0].column_name) || 'id'; };
exports.getId = getId;
const isIdColumn = (column) => !!('primaryKey' in column && column.primaryKey) || column.column_name === 'id';
exports.isIdColumn = isIdColumn;
//# sourceMappingURL=id.js.map