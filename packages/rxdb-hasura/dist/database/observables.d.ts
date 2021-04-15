import { BehaviorSubject } from 'rxjs';
export declare const jwt: BehaviorSubject<string | undefined>;
export declare const authStatus: BehaviorSubject<boolean>;
export declare const contents: BehaviorSubject<Record<string, import("rxdb").RxCollection<import("../types").Contents, import("../types").ContentsDocumentMethods, import("../types").ContentsCollectionPrototype>>>;
