// ? find a better way to log/debug?
enum LOG_LEVEL {
  MUTE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

const VERBOSE_LEVEL = process.env.DEBUG
  ? LOG_LEVEL.DEBUG
  : process.env.NODE_ENV === 'development'
  ? LOG_LEVEL.DEBUG
  : LOG_LEVEL.WARN

export const debug = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.DEBUG && console.log(...args)
export const info = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.INFO && console.log(...args)
export const warn = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.WARN && console.warn(...args)
export const error = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.warn(...args)
export const errorDir = (...args: unknown[]): unknown =>
  VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.dir(...args)
