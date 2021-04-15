"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionPermissionMethods = void 0;
exports.collectionPermissionMethods = {
    canInsert(fieldName) {
        var _a;
        if (this.metadata.view)
            return false;
        if (this.role === 'admin')
            return true;
        if (fieldName) {
            const property = this.schema.jsonSchema.properties[fieldName];
            if (property === null || property === void 0 ? void 0 : property.ref) {
                const relationship = this.metadata.relationships.find(({ rel_name }) => rel_name === fieldName);
                if ((relationship === null || relationship === void 0 ? void 0 : relationship.rel_type) === 'object') {
                    return relationship.mapping
                        .map(m => { var _a; return (_a = m.column) === null || _a === void 0 ? void 0 : _a.column_name; })
                        .every(column => column && this.canInsert(column));
                }
                else {
                    const refCollectionName = this.schema.jsonSchema.properties[relationship === null || relationship === void 0 ? void 0 : relationship.rel_name].ref;
                    const refCollection = this.database[refCollectionName];
                    return !!(relationship === null || relationship === void 0 ? void 0 : relationship.mapping.every(m => refCollection === null || refCollection === void 0 ? void 0 : refCollection.canUpdate(m.remote_column_name)));
                }
            }
            else {
                const column = this.metadata.columns.find(col => col.column_name === fieldName);
                return !!(column === null || column === void 0 ? void 0 : column.canInsert.length);
            }
        }
        else {
            return !!((_a = this.metadata.canInsert_aggregate.aggregate) === null || _a === void 0 ? void 0 : _a.count);
        }
    },
    canUpdate(fieldName) {
        var _a;
        if (this.metadata.view)
            return false;
        if (this.role === 'admin')
            return true;
        if (fieldName) {
            const property = this.schema.jsonSchema.properties[fieldName];
            if (property === null || property === void 0 ? void 0 : property.ref) {
                const relationship = this.metadata.relationships.find(({ rel_name }) => rel_name === fieldName);
                if ((relationship === null || relationship === void 0 ? void 0 : relationship.rel_type) === 'object') {
                    return relationship.mapping
                        .map(m => { var _a; return (_a = m.column) === null || _a === void 0 ? void 0 : _a.column_name; })
                        .every(column => column && this.canUpdate(column));
                }
                else {
                    const refCollection = this.database.collections[this.schema.jsonSchema.properties[relationship === null || relationship === void 0 ? void 0 : relationship.rel_name]
                        .ref];
                    return !!(relationship === null || relationship === void 0 ? void 0 : relationship.mapping.every(m => refCollection.canUpdate(m.remote_column_name)));
                }
            }
            else {
                const column = this.metadata.columns.find(col => col.column_name === fieldName);
                return !!(column === null || column === void 0 ? void 0 : column.canUpdate.length);
            }
        }
        else {
            return !!((_a = this.metadata.canUpdate_aggregate.aggregate) === null || _a === void 0 ? void 0 : _a.count);
        }
    }
};
//# sourceMappingURL=permissions.js.map