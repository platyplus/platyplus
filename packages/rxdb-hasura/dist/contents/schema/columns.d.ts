import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types';
import { ColumnFragment } from '../../generated';
import { Metadata } from '../../types';
export declare const graphQLColumnType: (column?: ColumnFragment | undefined) => 'uuid' | 'String';
export declare const createColumnProperties: (table: Metadata) => Record<string, TopLevelProperty | PrimaryProperty>;
