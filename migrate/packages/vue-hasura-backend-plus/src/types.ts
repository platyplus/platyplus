import { Router } from 'vue-router'

export type Claims = Record<string, unknown> & {
  ['https://hasura.io/jwt/claims']: HasuraClaims
}
export type HasuraClaims = {
  [key: string]: string | string[] | undefined
  'x-hasura-allowed-roles': string[]
  'x-hasura-default-role': string
}

export type HasuraBackendPlusPluginOptions = {
  endpoint: string
  refreshInSeconds?: number
  router?: Router
}
