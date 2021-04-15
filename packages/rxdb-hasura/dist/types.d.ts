import { PrimaryProperty, RxCollection, RxDatabase, RxDocument } from 'rxdb';
import { TopLevelProperty } from 'rxdb/dist/types/types';
import { BehaviorSubject } from 'rxjs';
import { TableFragment as Metadata } from './generated';
export declare type ValuesOf<T extends unknown[]> = T[number];
export { ColumnFragment, CoreTableFragment } from './generated';
export { Metadata };
export declare type JsonSchemaFormat = 'date-time' | 'time' | 'date' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'uri';
export declare type JsonSchemaPropertyType = 'number' | 'object' | 'array' | 'string' | 'boolean' | 'null';
export declare type CustomTypes = 'collection' | 'document' | 'integer';
export declare type PropertyType = JsonSchemaFormat | JsonSchemaPropertyType | CustomTypes;
export declare type PropertyValue = string | number | boolean | null | Array<Contents> | Contents;
export declare type Contents = Record<string, any> & {
    id: string;
    updated_at?: string;
    label: string;
};
export declare type ContentsDocument = RxDocument<Contents, ContentsDocumentMethods>;
export declare type ContentsDocumentMethods = {
    canEdit: (propertyName?: string) => boolean;
    canSave: () => boolean;
    canDelete: () => boolean;
    readComponent: (propertyName: string) => string;
    readComponentOptions: (propertyName: string) => Record<string, unknown> | undefined | null;
    componentName: () => string;
    editComponent: (propertyName: string) => string;
    editComponentOptions: (propertyName: string) => Record<string, unknown> | undefined | null;
};
export declare type ContentsCollectionMethods = {
    title: (property?: string) => string;
    description: (property?: string) => string;
    documentTitle: () => string;
    icon: (property?: string) => string;
    componentName: () => string;
    canInsert: (propertyName?: string) => boolean;
    canUpdate: (propertyName?: string) => boolean;
};
export declare type ContentsCollectionPrototype = ContentsCollectionMethods & {
    role: string;
    metadata: Metadata;
    replicator: Replicator;
    properties: Map<string, TopLevelProperty | PrimaryProperty>;
};
export declare type ContentsCollection = RxCollection<Contents, ContentsDocumentMethods, ContentsCollectionPrototype>;
export declare type MetadataCollection = RxCollection<Metadata>;
export declare type Modifier = (doc: Contents) => Contents | null | Promise<Contents | null>;
export declare type Replicator = {
    start: () => Promise<void>;
    stop: () => Promise<void>;
};
declare type Roles = 'user' | 'me';
declare type MetadataCollections<T extends Roles> = Record<`${Roles | T}_metadata`, RxCollection<Metadata>>;
declare type ContentsColections = Record<string, ContentsCollection>;
export declare type DatabaseCollections<T extends Roles = Roles> = MetadataCollections<T> & ContentsColections;
export declare type Database<T extends Roles = Roles> = RxDatabase<DatabaseCollections<T>>;
export declare type DatabasePrototype = {
    readonly contents$: BehaviorSubject<Record<string, ContentsCollection>>;
    readonly setJwt: (value: string | undefined) => void;
    readonly jwt$: BehaviorSubject<string | undefined>;
    readonly setAuthStatus: (value: boolean, jwt?: string) => void;
    readonly authStatus$: BehaviorSubject<boolean>;
};
