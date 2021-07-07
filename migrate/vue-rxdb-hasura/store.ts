import * as immutable from 'object-path-immutable'

// TODO move to utils
// * Delete the deep object key described in the path, and recursively delete empty object keys
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deletePath = (object: any, path: string[]): any => {
  const result = immutable.del(object, path.join('.'))
  path.pop()
  if (path.length && !Object.keys(immutable.get(result, path.join('.'))).length)
    return deletePath(object, path)
  else return result
}
