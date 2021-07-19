export const upperCaseFirst = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const httpUrlToWebSockeUrl = (url: string): string =>
  url.replace(/(http)(s)?:\/\//, 'ws$2://')

export const webSocketUrlToHttpUrl = (url: string): string =>
  url.replace(/(ws)(s)?:\/\//, 'http$2://')

export const initials = (value: string): string =>
  value
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
