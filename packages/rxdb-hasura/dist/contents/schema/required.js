"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredProperties = void 0;
const requiredProperties = (table) => {
    console.warn('TODO requiredProperties');
    return table.columns
        .filter(column => !column.is_nullable)
        .map(column => column.column_name);
};
exports.requiredProperties = requiredProperties;
//# sourceMappingURL=required.js.map