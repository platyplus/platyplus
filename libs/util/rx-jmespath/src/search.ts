import { isObservable, Observable, of, switchMap, throwError } from 'rxjs'
import { Runtime, compile, ObjectType } from './jmespath'
import { Intercepter } from './interpreter'
import { SearchOptions } from './options'

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
          // ? Not ideal. Find a better workaround?
          if (options.circularData && expression === '*')
            throw new Error(
              `Data schema is circular; The expression '*' is not allowed`
            )
          const node = compile(exp)
          return interpreter.visit$(node, data$)
        })
      )
    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
