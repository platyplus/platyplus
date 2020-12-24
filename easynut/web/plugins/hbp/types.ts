import { Ref } from '@nuxtjs/composition-api'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'

declare module '@nuxt/types/config/runtime' {
  interface NuxtRuntimeConfig {
    hasuraBackendPlus: {
      endpoint: string
      refreshInSeconds?: number
      graphqlEndpoint: string
    }
  }
}

export type Claims = Record<string, unknown> & {
  ['https://hasura.io/jwt/claims']: HasuraClaims
}
export type HasuraClaims = Record<string, unknown> | undefined

export type HasuraBackendPlusInstance = {
  auth: Auth
  storage: Storage
  authenticated: Ref<boolean>
  claims: Ref<HasuraClaims | undefined>
}
