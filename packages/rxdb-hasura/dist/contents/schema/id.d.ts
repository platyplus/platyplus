import { ColumnFragment } from '../../generated';
import { Metadata } from '../../types';
export declare const getId: (table: Metadata) => string;
declare type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export declare const isIdColumn: (column: ArrayElement<Metadata['columns']> | ColumnFragment) => boolean;
export {};
