import {
  defineNuxtPlugin,
  inject,
  onGlobalSetup,
  provide,
  ref
} from '@nuxtjs/composition-api'
import decode from 'jwt-decode'
import nhost from 'nhost-js-sdk'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'
import { UserConfig } from 'nhost-js-sdk/dist/types'

import { HasuraClaims } from './types'

export const HasuraBackendPlus = Symbol()

export type HasuraBackendPlusInstance = {
  auth: Auth
  storage: Storage
  authenticated: boolean
  claims?: HasuraClaims
}
export default defineNuxtPlugin(ctx => {
  const config: UserConfig = {
    base_url: '<%= options.endpoint %>',
    refresh_interval_time:
      (parseInt('<%= options.refreshInSeconds %>') || 60 * 10) * 1000
  }

  onGlobalSetup(() => {
    console.log('plugin/apollo: global setup')
    nhost.initializeApp(config)
    const auth = nhost.auth()
    const storage = nhost.storage()
    const instance: HasuraBackendPlusInstance = {
      auth,
      storage,
      authenticated: false,
      claims: undefined
    }

    instance.auth.onAuthStateChanged((logged_in: boolean) => {
      instance.authenticated = logged_in
      if (logged_in) {
        const token: Record<string, unknown> = decode(ctx.$auth.getJWTToken())
        instance.claims = token['https://hasura.io/jwt/claims'] as Record<
          string,
          unknown
        >
      } else {
        ctx.$hasuraClaims = undefined
      }
    })
    provide(HasuraBackendPlus, instance)
    console.log('plugin/apollo: global setup ok')
  })
})
