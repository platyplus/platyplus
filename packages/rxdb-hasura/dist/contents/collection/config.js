"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionConfigMethods = void 0;
const schema_1 = require("../schema");
const system_1 = require("../system");
const config = (collection, property) => property
    ? collection.metadata.propertiesConfig.find(({ property_name }) => property_name === property)
    : collection.metadata.config;
exports.collectionConfigMethods = {
    title(property) {
        var _a;
        return (((_a = config(this, property)) === null || _a === void 0 ? void 0 : _a.title) || property || schema_1.metadataName(this.metadata));
    },
    documentTitle() {
        var _a;
        return ((_a = this.metadata.config) === null || _a === void 0 ? void 0 : _a.document_title) || this.title();
    },
    description(property) {
        var _a;
        return ((_a = config(this, property)) === null || _a === void 0 ? void 0 : _a.description) || '';
    },
    icon(property) {
        var _a;
        return ((_a = config(this, property)) === null || _a === void 0 ? void 0 : _a.icon) || '';
    },
    componentName() {
        var _a;
        return (((_a = this.metadata.config) === null || _a === void 0 ? void 0 : _a.component) ||
            system_1.systemCollectionComponent(this) ||
            'table');
    }
};
//# sourceMappingURL=config.js.map