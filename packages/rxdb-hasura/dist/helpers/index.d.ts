import { ContentsDocument, PropertyValue } from '../types';
export declare const castValue: <T extends PropertyValue>(document: ContentsDocument, propertyName: string, value: string | boolean) => T;
