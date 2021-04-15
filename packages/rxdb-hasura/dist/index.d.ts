import { Database } from './types';
export { RxHasuraPlugin } from './plugin';
export * from './contents';
export * from './types';
export * from './helpers';
export * from './utils';
export declare const createRxHasura: (name: string, url: string, password?: string | undefined) => Promise<Database>;
