"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelationshipHooks = void 0;
const documentLocks = {};
const postInsertRelationship = (collection) => (data, doc) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    for (const rel of collection.metadata.relationships) {
        const relName = rel.rel_name;
        if (!data[relName])
            return;
        const property = collection.schema.jsonSchema.properties[relName];
        const refCollection = collection.database.collections[property.ref];
        const mirrorRelation = (_a = Object.entries(refCollection.schema.jsonSchema.properties).find(([, value]) => {
            return value.ref === collection.name;
        })) === null || _a === void 0 ? void 0 : _a[0];
        if (!mirrorRelation)
            return;
        if (rel.rel_type === 'array') {
            const additions = (data[relName] || []);
            for (const addition of additions) {
                const refDoc = yield refCollection
                    .findOne(addition)
                    .exec();
                if (refDoc && !documentLocks[refDoc.primary])
                    yield refDoc.atomicPatch({
                        [mirrorRelation]: doc.primary
                    });
            }
        }
        else if (rel.rel_type === 'object') {
            const newValue = data[relName];
            const refDoc = yield refCollection
                .findOne(newValue)
                .exec();
            if (refDoc && !documentLocks[refDoc.primary])
                yield refDoc.atomicPatch({
                    [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
                });
        }
    }
});
const preSaveRelationship = (collection) => (data, doc) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    documentLocks[doc.primary] = true;
    for (const rel of collection.metadata.relationships) {
        const relName = rel.rel_name;
        if (!doc[relName] && !data[relName])
            return;
        const property = collection.schema.jsonSchema.properties[relName];
        const refCollection = collection.database.collections[property.ref];
        const mirrorRelation = (_b = Object.entries(refCollection.schema.jsonSchema.properties).find(([, value]) => {
            return value.ref === collection.name;
        })) === null || _b === void 0 ? void 0 : _b[0];
        if (!mirrorRelation)
            return;
        if (rel.rel_type === 'array') {
            const oldValue = (doc[relName] || []);
            const newValue = (data[relName] || []);
            const additions = newValue.filter(value => !oldValue.includes(value));
            for (const addition of additions) {
                const refDoc = yield refCollection
                    .findOne(addition)
                    .exec();
                if (refDoc && !documentLocks[refDoc.primary])
                    yield refDoc.atomicPatch({
                        [mirrorRelation]: doc.primary
                    });
            }
            const deletions = oldValue.filter(value => !newValue.includes(value));
            for (const deletion of deletions) {
                const refDoc = yield refCollection
                    .findOne(deletion)
                    .exec();
                if (refDoc && !documentLocks[refDoc.primary])
                    yield refDoc.atomicPatch({
                        [mirrorRelation]: null
                    });
            }
        }
        else if (rel.rel_type === 'object') {
            const oldValue = doc[relName];
            const newValue = data[relName];
            if (newValue !== oldValue) {
                if (oldValue) {
                    const refDoc = yield refCollection
                        .findOne(oldValue)
                        .exec();
                    if (refDoc && !documentLocks[refDoc.primary])
                        yield refDoc.atomicPatch({
                            [mirrorRelation]: refDoc.get(mirrorRelation).filter(key => key !== doc.primary)
                        });
                }
                if (newValue) {
                    const refDoc = yield refCollection
                        .findOne(newValue)
                        .exec();
                    if (refDoc && !documentLocks[refDoc.primary])
                        yield refDoc.atomicPatch({
                            [mirrorRelation]: [...refDoc.get(mirrorRelation), doc.primary]
                        });
                }
            }
        }
    }
    delete documentLocks[doc.primary];
});
const createRelationshipHooks = (collection) => {
    collection.postInsert(postInsertRelationship(collection), false);
    collection.preSave(preSaveRelationship(collection), false);
};
exports.createRelationshipHooks = createRelationshipHooks;
//# sourceMappingURL=relationships.js.map