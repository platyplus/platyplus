/* eslint-disable @typescript-eslint/no-explicit-any */
;(window as any).global = window
;(window as any).process = {
  env: { DEBUG: undefined }
}

export { createVueRxDBHasuraPlugin, DefaultRxDBKey } from './plugin'
export * from './composables'
export * from './routes'
export * from './config'

/** // ! GENERAL RULES ! //
 * * column `updated_at` of type `timestamptz` must exist, and must change value when row is update
 * * primary key must be column `id` of type `uuid`
 * * select permissions to `id` and `updated_at` for the connected user
 * TODO `deleted` column
 */
