export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
export type PropertyOf<T> = T[keyof T]
