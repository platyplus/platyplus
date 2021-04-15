import { RxGraphQLReplicationQueryBuilder } from 'rxdb';
import { ContentsCollection, Modifier } from '../../types';
export declare const pullQueryBuilder: (collection: ContentsCollection, batchSize: number) => RxGraphQLReplicationQueryBuilder;
export declare const pullModifier: (collection: ContentsCollection) => Modifier;
