// TODO consider moving to a dedicated package
export const httpUrlToWebSockeUrl = (url: string): string =>
  url.replace(/(http)(s)?:\/\//, 'ws$2://')

export const webSocketUrlToHttpUrl = (url: string): string =>
  url.replace(/(ws)(s)?:\/\//, 'http$2://')
