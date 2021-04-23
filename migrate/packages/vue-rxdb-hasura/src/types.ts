// * Make one (or more) property optional
// See: https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// TODO https://github.com/piotrwitek/utility-types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
