"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelationshipProperties = exports.filteredRelationships = void 0;
const _1 = require(".");
const property_1 = require("./property");
const filteredRelationships = (table) => table.relationships.filter(relationship => relationship.mapping.length === 1);
exports.filteredRelationships = filteredRelationships;
const createRelationshipProperties = (table, role) => {
    const result = {};
    exports.filteredRelationships(table).map(relationship => {
        const relName = relationship.rel_name;
        const mappingItem = relationship.mapping[0];
        const column = mappingItem.column;
        const refTable = mappingItem.remoteTable;
        const ref = `${role}_${_1.metadataName(refTable)}`;
        const type = property_1.propertyJsonType(column);
        if (relationship.rel_type === 'object') {
            result[relName] = {
                type: ['string', 'null'],
                ref
            };
        }
        else if (relationship.rel_type === 'array') {
            result[relName] = {
                type: 'array',
                ref,
                items: {
                    type
                }
            };
            result[`${relName}_aggregate`] = {
                type: 'object',
                properties: {
                    aggregate: {
                        type: 'object',
                        properties: {
                            max: {
                                type: 'object',
                                properties: { updated_at: { type: ['string', 'null'] } }
                            }
                        }
                    }
                }
            };
        }
    });
    return result;
};
exports.createRelationshipProperties = createRelationshipProperties;
//# sourceMappingURL=relationships.js.map