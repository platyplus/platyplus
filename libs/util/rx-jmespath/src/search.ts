import { isObservable, Observable, of, switchMap, throwError } from 'rxjs'
import { Runtime, compile, ObjectType } from './jmespath'
import { Intercepter, SearchOptions } from './interpreter'

export const search$ =
  (
    expression: string | Observable<string>,
    options: SearchOptions = {}
  ): ((data$: Observable<ObjectType>) => Observable<ObjectType>) =>
  (data$) => {
    try {
      const runtime = new Runtime()
      const interpreter = new Intercepter(runtime, options)
      runtime._interpreter = interpreter
      return (isObservable(expression) ? expression : of(expression)).pipe(
        switchMap((exp) => {
          const node = compile(exp)
          return interpreter.visit$(node, data$)
        })
      )
    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
