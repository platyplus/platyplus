// TODO move to another package / find a better way to log/debug
enum LOG_LEVEL {
  MUTE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

// TODO set level in an environment variable
const VERBOSE_LEVEL = process.env.DEBUG // TODO set in webpack/yarn
  ? LOG_LEVEL.DEBUG
  : process.env.NODE_ENV === 'development'
  ? LOG_LEVEL.INFO
  : LOG_LEVEL.DEBUG // TODO set to WARN

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
