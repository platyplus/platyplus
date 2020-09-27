import { FetchResult } from 'apollo-link'

export type ErrorFunction = (
  fn: (param?: Error | undefined) => void
) => {
  off: () => void
}

export type DoneFunction<T> = (
  fn: (
    param?: FetchResult<T, Record<string, unknown>, Record<string, unknown>>
  ) => void
) => {
  off: () => void
}
