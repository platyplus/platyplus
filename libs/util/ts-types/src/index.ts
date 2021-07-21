// TODO https://github.com/sindresorhus/type-fest

// * See https://github.com/microsoft/TypeScript/issues/14094#issuecomment-373629568
type Without<T> = { [P in keyof T]?: undefined }
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T)

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

// * See https://stackoverflow.com/questions/45894524/getting-type-of-a-property-of-a-typescript-class-using-keyof-operator
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

// * Make one (or more) property optional
// See: https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// TODO https://github.com/piotrwitek/utility-types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
