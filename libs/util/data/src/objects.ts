// TODO replace by immer and object-path
import * as immutable from 'object-path-immutable'

export const pick = <T, K extends keyof T>(
  obj: T,
  keys: string | K[]
): Pick<T, K> => {
  if (!Array.isArray(keys)) keys = keys.split(',') as K[]
  return keys.reduce((acum, key: K) => {
    acum[key] = obj[key]
    return acum
  }, {} as T)
}

export const isEmpty = (obj: unknown) =>
  !obj || (typeof obj === 'object' && Object.keys(obj).length === 0)

// * Delete the deep object key described in the path, and recursively delete empty object keys
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deletePath = (object: any, path: string[]): any => {
  const result = immutable.del(object, path.join('.'))
  path.pop()
  if (path.length && !Object.keys(immutable.get(result, path.join('.'))).length)
    return deletePath(object, path)
  else return result
}

export const mutateObjectValues = <T>(
  obj: Record<string, unknown>,
  mutator: ([string, unknown]) => T
): Record<string, T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = mutator([key, value])
    return acc
  }, {})
}
