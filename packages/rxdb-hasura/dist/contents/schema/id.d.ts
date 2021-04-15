import { ColumnFragment } from '../../generated';
import { Metadata } from '../../types';
import { ArrayElement } from '../../utils';
export declare const getId: (table: Metadata) => string;
export declare const isIdColumn: (column: ArrayElement<Metadata['columns']> | ColumnFragment) => boolean;
