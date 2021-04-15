import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types';
import { ContentsCollection, Metadata } from '../../types';
export declare const createComputedFieldsProperties: (table: Metadata) => Record<string, TopLevelProperty | PrimaryProperty>;
export declare const computedFields: (collection: ContentsCollection) => string[];
