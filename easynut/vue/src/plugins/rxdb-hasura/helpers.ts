import { CoreTableFragment } from '../../generated'

export const fullTableName = (data: CoreTableFragment): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`

enum LOG_LEVEL {
  MUTE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

// TODO set level in an environment variable
const VERBOSE_LEVEL =
  process.env.NODE_ENV === 'development' ? LOG_LEVEL.INFO : LOG_LEVEL.ERROR

export const debug = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.DEBUG && console.log(...args)
export const info = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.INFO && console.log(...args)
export const warn = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.WARN && console.warn(...args)
export const error = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.warn(...args)
