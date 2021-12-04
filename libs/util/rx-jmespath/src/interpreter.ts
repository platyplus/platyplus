import {
  switchMap,
  of,
  Observable,
  combineLatest,
  toArray,
  from,
  map,
  mergeScan,
  throwError,
  concat
} from 'rxjs'
import {
  isObject,
  TreeInterpreter,
  ASTNode,
  objValues,
  isFalse,
  strictDeepEqual,
  ObjectType,
  Runtime
} from './jmespath'
import { FieldGetter, IdentityGetter, SearchOptions } from './options'

const defaultFieldGetter: FieldGetter = (value, key) => of(value[key] ?? null)
const defaultIdentity: IdentityGetter = (value) => of(value)

const ACTIONS: Record<
  string,
  (
    interpreter: Intercepter,
    node: ASTNode,
    value: ObjectType
  ) => Observable<ObjectType>
> = {
  Field: (interpreter, node, value) => {
    if (value === null) {
      return of(null)
    } else {
      if (isObject(value)) {
        return interpreter.options.getField(
          value,
          node.name,
          interpreter.options
        )
      } else return of(null)
    }
  },

  Subexpression: (interpreter, node, value) =>
    interpreter.visit$(node.children[0], of(value)).pipe(
      switchMap((firstValue) =>
        // ? replace 'from'->children by combineLatest?
        from(node.children.slice(1)).pipe(
          mergeScan(
            (acc) => interpreter.visit$(node.children[1], of(acc)),
            firstValue
          )
        )
      )
    ),

  IndexExpression: (interpreter, node, value) =>
    interpreter.visit$(
      node.children[1],
      interpreter.visit$(node.children[0], of(value))
    ),

  Index: (interpreter, node, value) => {
    if (!Array.isArray(value)) {
      return of(null)
    }
    let index: number = node.value
    if (index < 0) {
      index = value.length + index
    }
    return interpreter.options.getField(value, index, interpreter.options)
  },

  Slice: (interpreter, node, value) => {
    if (!Array.isArray(value)) return of(null)
    const sliceParams = node.children.slice(0)
    const computed = interpreter.computeSliceParams(value.length, sliceParams)
    const [start, stop, step] = computed
    const r: Observable<ObjectType>[] = []
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        r.push(interpreter.options.getField(value, i, interpreter.options))
      }
    } else {
      for (let i = start; i > stop; i += step) {
        r.push(interpreter.options.getField(value, i, interpreter.options))
      }
    }
    // ? Is this a problem to use concat/toArray here instead of combineLatest?
    return concat(...r).pipe(toArray())
  },

  Projection: (interpreter, node, value) => {
    return interpreter.visit$(node.children[0], of(value)).pipe(
      switchMap((base) => {
        if (Array.isArray(base)) {
          if (base.length) {
            return combineLatest(
              base.map((i) => interpreter.visit$(node.children[1], of(i)))
            ).pipe(map((result) => result.filter((i) => i !== null)))
          } else {
            return of([])
          }
        } else return of(null)
      })
    )
  },

  ValueProjection: (interpreter, node, value) =>
    interpreter.visit$(node.children[0], of(value)).pipe(
      switchMap((base) => {
        if (isObject(base)) {
          const values = objValues(base)
          if (values.length) {
            return combineLatest(
              objValues(base).map((value) =>
                interpreter.visit$(node.children[1], of(value))
              )
            ).pipe(
              map((combination) =>
                combination.filter((value) => value !== null)
              )
            )
          } else return of([])
        } else return of(null)
      })
    ),

  FilterProjection: (interpreter, node, value) =>
    interpreter.visit$(node.children[0], of(value)).pipe(
      switchMap((base) =>
        Array.isArray(base)
          ? base.length
            ? combineLatest(
                base.map((i, index) =>
                  interpreter
                    .visit$(node.children[2], of(i))
                    .pipe(map((value) => (isFalse(value) ? null : base[index])))
                )
              ).pipe(
                map((combi) => combi.filter((i) => i !== null)),
                switchMap((combi) =>
                  combi.length
                    ? combineLatest(
                        combi.map((i) =>
                          interpreter.visit$(node.children[1], of(i))
                        )
                      ).pipe(map((combi2) => combi2.filter((i) => i !== null)))
                    : of([])
                )
              )
            : of([])
          : of(null)
      )
    ),

  Comparator: (interpreter, node, value) =>
    combineLatest([
      interpreter.visit$(node.children[0], of(value)),
      interpreter.visit$(node.children[1], of(value))
    ]).pipe(
      map(([f, s]) => {
        const action = {
          EQ: () => strictDeepEqual(f, s),
          NE: () => !strictDeepEqual(f, s),
          GT: () => f > s,
          GTE: () => f >= s,
          LT: () => f < s,
          LTE: () => f <= s
        }[node.name]
        return action
          ? action()
          : throwError(() => new Error('Unknown comparator: ' + node.name))
      })
    ),

  Flatten: (interpreter, node, value) =>
    interpreter
      .visit$(node.children[0], of(value))
      .pipe(
        map((original) =>
          Array.isArray(original)
            ? original.reduce(
                (merged, current) =>
                  Array.isArray(current)
                    ? [...merged, ...current]
                    : [...merged, current],
                []
              )
            : null
        )
      ),

  Identity: (interpreter, __, value) =>
    interpreter.options.getIdentity(value, interpreter.options),

  MultiSelectList: (interpreter, node, value) =>
    value === null
      ? of(null)
      : node.children.length
      ? combineLatest(
          node.children.map((child) => interpreter.visit$(child, of(value)))
        )
      : of([]),

  MultiSelectHash: (interpreter, node, value) =>
    value === null
      ? of(null)
      : node.children.length
      ? combineLatest(
          node.children.map((child) =>
            interpreter
              .visit$(child.value, of(value))
              .pipe(map((i) => ({ [child.name]: i })))
          )
        ).pipe(
          map((combination) =>
            combination.reduce((acc, curr) => ({ ...acc, ...curr }), {})
          )
        )
      : of({}),

  OrExpression: (interpreter, node, value) =>
    combineLatest([
      interpreter.visit$(node.children[0], of(value)),
      interpreter.visit$(node.children[1], of(value))
    ]).pipe(map(([f, s]) => (isFalse(f) ? s : f))),

  AndExpression: (interpreter, node, value) =>
    interpreter
      .visit$(node.children[0], of(value))
      .pipe(
        switchMap((f) =>
          isFalse(f) ? of(f) : interpreter.visit$(node.children[1], of(value))
        )
      ),

  NotExpression: (interpreter, node, value) =>
    interpreter
      .visit$(node.children[0], of(value))
      .pipe(map((f) => isFalse(f))),

  Literal: (_, node, __) => of(node.value),

  Pipe: (interpreter, node, value) =>
    interpreter.visit$(
      node.children[1],
      interpreter.visit$(node.children[0], of(value))
    ),

  Current: (_, __, value) => of(value),

  Function: (interpreter, node, value) =>
    node.children.length
      ? combineLatest(
          node.children.map((child) => interpreter.visit$(child, of(value)))
        ).pipe(
          map((resolvedArgs) =>
            interpreter.runtime.callFunction(node.name, resolvedArgs)
          )
        )
      : of(interpreter.runtime.callFunction(node.name, [])),

  ExpressionReference: (_, node, __) => {
    const refNode = node.children[0]
    refNode.jmespathType = 'Expref'
    return of(refNode)
  }
}

export class Intercepter extends TreeInterpreter {
  options: SearchOptions

  constructor(
    runtime: Runtime,
    {
      getField = defaultFieldGetter,
      getIdentity = defaultIdentity,
      circularData = false,
      ...other
    }: SearchOptions = {
      getField: defaultFieldGetter,
      getIdentity: defaultIdentity,
      circularData: false
    }
  ) {
    super(runtime)
    this.options = {
      getField,
      getIdentity,
      circularData,
      ...other
    }
  }

  visit$(
    node: ASTNode,
    value$: Observable<ObjectType>
  ): Observable<ObjectType> {
    return value$.pipe(
      switchMap(
        (value) =>
          ACTIONS[node.type]?.(this, node, value) ||
          throwError(() => new Error('Unknown node type: ' + node.type))
      )
    )
  }
}
