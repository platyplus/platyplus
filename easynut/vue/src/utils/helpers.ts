export const httpUrlToWebSockeUrl = (url: string): string =>
  url.replace(/(http)(s)?:\/\//, 'ws$2://')

export const webSocketUrlToHttpUrl = (url: string): string =>
  url.replace(/(ws)(s)?:\/\//, 'http$2://')

// * Make one (or more) property optional
// See: https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// TODO https://github.com/piotrwitek/utility-types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ValuesOf<T extends unknown[]> = T[number]
