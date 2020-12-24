export type Claims = Record<string, unknown> & {
  ['https://hasura.io/jwt/claims']: HasuraClaims
}
export type HasuraClaims = Record<string, unknown> | undefined

export type HasuraBackendPlusPluginOptions = {
  endpoint: string
  refreshInSeconds?: number
}
