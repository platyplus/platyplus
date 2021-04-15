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
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentMethods = void 0;
__exportStar(require("./property-type"), exports);
const system_1 = require("../system");
const property_type_1 = require("./property-type");
exports.documentMethods = {
    canEdit(propertyName) {
        const collection = this.collection;
        return this._isTemporary
            ? collection.canInsert(propertyName)
            : collection.canUpdate(propertyName);
    },
    canSave: () => {
        return true;
    },
    canDelete() {
        return this.canEdit('deleted');
    },
    readComponent(propertyName) {
        const collection = this.collection;
        const config = collection.metadata.propertiesConfig.find(config => config.property_name === propertyName);
        return (config === null || config === void 0 ? void 0 : config.read_component) || property_type_1.propertyType(this, propertyName);
    },
    readComponentOptions(propertyName) {
        const collection = this.collection;
        const config = collection.metadata.propertiesConfig.find(config => config.property_name === propertyName);
        return config === null || config === void 0 ? void 0 : config.read_component_options;
    },
    componentName() {
        return system_1.systemDocumentComponent(this) || 'details';
    },
    editComponent(propertyName) {
        const collection = this.collection;
        const config = collection.metadata.propertiesConfig.find(config => config.property_name === propertyName);
        return (config === null || config === void 0 ? void 0 : config.edit_component) || property_type_1.propertyType(this, propertyName);
    },
    editComponentOptions(propertyName) {
        const collection = this.collection;
        const config = collection.metadata.propertiesConfig.find(config => config.property_name === propertyName);
        return config === null || config === void 0 ? void 0 : config.edit_component_options;
    }
};
//# sourceMappingURL=index.js.map