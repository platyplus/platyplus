import { ContentsCollection } from './types';
export declare const httpUrlToWebSockeUrl: (url: string) => string;
export declare const webSocketUrlToHttpUrl: (url: string) => string;
export declare type FieldMapItem = FieldMap | true;
export interface FieldMap {
    [key: string]: FieldMapItem;
}
export declare const rxdbJsonataPaths: (expression: string, collection: ContentsCollection) => FieldMap;
export declare const objectSchemaToGraphqlFields: (schema: FieldMapItem, path?: string) => string;
declare type HasuraClaims = {
    [key: string]: string | string[] | undefined;
    'x-hasura-allowed-roles': string[];
    'x-hasura-default-role': string;
};
export declare const hasuraClaims: (token: string) => HasuraClaims;
export declare const createHeaders: (role: string, token?: string | undefined) => Record<string, string>;
export {};
