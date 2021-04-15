"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComputedFieldsFromDoc = exports.addComputedFieldsFromCollection = exports.createComputedFieldsHooks = exports.computedFields = exports.createComputedFieldsProperties = void 0;
var schema_1 = require("./schema");
Object.defineProperty(exports, "createComputedFieldsProperties", { enumerable: true, get: function () { return schema_1.createComputedFieldsProperties; } });
Object.defineProperty(exports, "computedFields", { enumerable: true, get: function () { return schema_1.computedFields; } });
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "createComputedFieldsHooks", { enumerable: true, get: function () { return hooks_1.createComputedFieldsHooks; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "addComputedFieldsFromCollection", { enumerable: true, get: function () { return utils_1.addComputedFieldsFromCollection; } });
Object.defineProperty(exports, "addComputedFieldsFromDoc", { enumerable: true, get: function () { return utils_1.addComputedFieldsFromDoc; } });
//# sourceMappingURL=index.js.map