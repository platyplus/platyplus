export declare type MetadataReplicatorOptions = {
    url: string;
    batchSize?: number;
    token?: string;
};
import { MetadataCollection } from '../types';
export declare const createMetadataReplicator: (metadata: MetadataCollection, role: string) => Promise<void>;
