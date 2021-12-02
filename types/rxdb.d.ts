import { Observable } from 'rxjs'

declare module 'rxdb' {
  export interface RxDocumentBase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jmespath$: (
      expression: string | Observable<string>,
      options?: { systemFields?: boolean = false; deleted?: boolean = false }
    ) => Observable<any> // TODO not any
  }
  export interface RxQuery {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jmespath$: (
      expression: string | Observable<string>,
      options?: { systemFields?: boolean = false; deleted?: boolean = false }
    ) => Observable<any> // TODO not any
  }
}
