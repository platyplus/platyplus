import deepEqual from 'deep-equal'
import { RxJsonSchema } from 'rxdb'

export const equivalentSchemas = <T>(
  previousSchema: RxJsonSchema<T>,
  nextSchema: RxJsonSchema<T>
) => {
  for (const key of [
    'indexes',
    'primaryKey',
    'properties',
    'required',
    'title',
    'type'
  ]) {
    const previous = Object.fromEntries(
      Object.entries(previousSchema[key]).filter(
        ([key]: [string, unknown]) => !key.startsWith('_')
      )
    )
    const next = Object.fromEntries(
      Object.entries(nextSchema[key]).filter(
        ([key]: [string, unknown]) => !key.startsWith('_')
      )
    )

    if (!deepEqual(previous, next)) return false
  }
  return true
}
