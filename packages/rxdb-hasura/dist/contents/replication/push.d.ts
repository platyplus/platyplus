import { RxGraphQLReplicationQueryBuilder } from 'rxdb';
import { ContentsCollection, Modifier } from '../../types';
export declare const pushQueryBuilder: (collection: ContentsCollection) => RxGraphQLReplicationQueryBuilder;
export declare const pushModifier: (collection: ContentsCollection) => Modifier;
