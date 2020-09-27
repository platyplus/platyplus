import deepEqual from 'deep-equal'

export const difference = <T extends Record<string, unknown>>(
  initial: T[] | Readonly<T[]>,
  minus: T[] | Readonly<T[]>,
  equals: (a: T, b: T) => boolean = deepEqual
): T[] =>
  initial.filter(
    (initialElement) =>
      !minus.some((minusElement) => equals(initialElement, minusElement))
  )

export const intersection = <T extends Record<string, unknown>>(
  a: T[] | Readonly<T[]>,
  b: T[] | Readonly<T[]>,
  equals: (a: T, b: T) => boolean = deepEqual
): T[] =>
  a.filter((elementA) => b.some((elementB) => equals(elementA, elementB)))

/**
 * @param initial
 * @param update
 * @param hasSameId
 */
export const arrayChanges = <T extends Record<string, unknown>>(
  initial: T[] | Readonly<T[]>,
  update: T[] | Readonly<T[]>,
  hasSameId: (a: T, b: T) => boolean
): {
  add: T[]
  remove: T[]
  update: T[]
} => ({
  add: difference(update, initial, hasSameId),
  remove: difference(initial, update, hasSameId),
  update: intersection(
    initial,
    update,
    (a, b) => hasSameId(a, b) && !deepEqual(a, b)
  )
})

type CompareOptions = { caseSensitive: boolean }
// ! only works for non null, string fields
export const compareBy = <T extends Record<string, unknown>>(
  a: T,
  b: T,
  fields: (keyof T)[],
  options?: CompareOptions
): number => {
  const caseSensitive = options?.caseSensitive ?? true // TODO test
  // TODO multiple fields
  const [field, ...nextFields] = fields
  if (field) {
    if (typeof a[field] === 'string' && typeof b[field] === 'string') {
      let fa = a[field] as string
      let fb = b[field] as string
      if (caseSensitive) {
        fa = fa.toLowerCase()
        fb = fb.toLowerCase()
      }
      if (fa > fb) return 1
      else if (fa < fb) return -1
      else {
        if (nextFields) return compareBy(a, b, nextFields, options)
        else return 0
      }
    } else return 0
  } else return 0
}

export const compareByFields = <T extends Record<string, unknown>>(
  fields: (keyof T)[],
  options?: CompareOptions
) => (a: T, b: T): number => compareBy(a, b, fields, options)
