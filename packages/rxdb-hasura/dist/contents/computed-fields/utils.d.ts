import { RxCollectionHookCallback } from 'rxdb';
import { Contents, ContentsCollection, ContentsDocument, ContentsDocumentMethods, JsonSchemaPropertyType } from '../../types';
declare type ComputedProperty = {
    name: string;
    transformation?: string;
    template?: string;
    type: JsonSchemaPropertyType;
};
export declare const compute: (doc: ContentsDocument | Contents, property: ComputedProperty, collection?: import("rxdb").RxCollection<Contents, ContentsDocumentMethods, import("../../types").ContentsCollectionPrototype> | undefined) => Promise<any>;
export declare const addComputedFieldsFromCollection: (data: Contents, collection: ContentsCollection) => Promise<void>;
export declare const addComputedFieldsFromDoc: RxCollectionHookCallback<Contents, ContentsDocumentMethods>;
export declare const addComputedFieldsFromLoadedData: (data: Contents, collection: ContentsCollection) => Contents;
export {};
