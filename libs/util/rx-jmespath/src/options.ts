import { Observable } from 'rxjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectType = any // TODO

export type FieldGetter<T = CustomOptions> = (
  value: ObjectType,
  property: string | number,
  options: SearchOptions<T>
) => Observable<ObjectType>

type CustomOptions = Record<string, unknown>

export type IdentityGetter<T = CustomOptions> = (
  value: ObjectType,
  options: SearchOptions<T>
) => Observable<ObjectType>

export type SearchOptions<T = CustomOptions> = T & {
  getField?: FieldGetter<T>
  getIdentity?: IdentityGetter<T>
  circularData?: boolean
}
