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
  ? LOG_LEVEL.INFO
  : LOG_LEVEL.WARN

type AtLeastTwoArray = [string, unknown, ...unknown[]]

const basicLog = (level: number, ...[id, ...args]: AtLeastTwoArray) => {
  const background = {
    [LOG_LEVEL.DEBUG]: 'transparent',
    [LOG_LEVEL.INFO]: 'DodgerBlue',
    [LOG_LEVEL.WARN]: 'Gold',
    [LOG_LEVEL.ERROR]: 'Tomato'
  }
  const color = {
    [LOG_LEVEL.DEBUG]: 'white',
    [LOG_LEVEL.INFO]: 'white',
    [LOG_LEVEL.WARN]: 'black',
    [LOG_LEVEL.ERROR]: 'white'
  }
  console.log(
    `%c ${id} `,
    `color: ${color[level]}; background-color: ${background[level]}; border-radius: 3px; padding: 0px 2px`,
    ...args
  )
}

export const debug = (...args: AtLeastTwoArray): void =>
  VERBOSE_LEVEL >= LOG_LEVEL.DEBUG && basicLog(LOG_LEVEL.DEBUG, ...args)

export const info = (...args: AtLeastTwoArray): void =>
  VERBOSE_LEVEL >= LOG_LEVEL.INFO && basicLog(LOG_LEVEL.INFO, ...args)

export const warn = (...args: AtLeastTwoArray): void =>
  VERBOSE_LEVEL >= LOG_LEVEL.WARN && basicLog(LOG_LEVEL.WARN, ...args)

export const error = (...args: AtLeastTwoArray): void =>
  VERBOSE_LEVEL >= LOG_LEVEL.ERROR && basicLog(LOG_LEVEL.ERROR, ...args)
