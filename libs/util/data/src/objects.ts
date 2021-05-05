export const pick = <T, K extends keyof T>(
  obj: T,
  keys: string | K[]
): Pick<T, K> => {
  if (!Array.isArray(keys)) keys = keys.split(',') as K[]
  return keys.reduce((acum, key: K) => ((acum[key] = obj[key]), acum), {} as T)
}
