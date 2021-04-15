import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types';
import { Metadata } from '../..';
export declare const filteredRelationships: (table: Metadata) => Metadata['relationships'];
export declare const createRelationshipProperties: (table: Metadata, role: string) => Record<string, TopLevelProperty | PrimaryProperty>;
