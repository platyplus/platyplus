import { Observable } from 'rxjs'

export declare module 'rxdb' {
  export declare class RxDocumentBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jmespath$: (expression: string | Observable<string>) => Observable<any> // TODO not any
  }
  export declare class RxQuery {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jmespath$: (expression: string | Observable<string>) => Observable<any> // TODO not any
  }
}
