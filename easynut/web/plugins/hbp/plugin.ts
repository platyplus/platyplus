import { defineNuxtPlugin, onGlobalSetup, ref } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from '@vue/composition-api'
import decode from 'jwt-decode'
import nhost from 'nhost-js-sdk'

import { Claims, HasuraBackendPlusInstance, HasuraClaims } from './types'
export const DefaultHasuraBackendPlusClient = Symbol()

export const instance = {} as HasuraBackendPlusInstance
export const plugin = defineNuxtPlugin(({ $config, app }) => {
  nhost.initializeApp({
    base_url: $config.hasuraBackendPlus.endpoint,
    // use_cookies?: boolean;
    refresh_interval_time:
      ($config.hasuraBackendPlus.refreshInSeconds || 600) * 1000 * 60
    // client_storage?: ClientStorage;
    // client_storage_type?: string;
  })
  instance.auth = nhost.auth()
  instance.storage = nhost.storage()
  instance.claims = ref<HasuraClaims>()
  instance.authenticated = ref(false)
  instance.auth.onAuthStateChanged((logged_in: boolean) => {
    instance.authenticated.value = logged_in
    if (logged_in) {
      const token: Claims = decode(instance.auth.getJWTToken())
      instance.claims.value = token['https://hasura.io/jwt/claims']
    } else {
      instance.claims.value = undefined
    }
  })

  onGlobalSetup(() => {
    provide(DefaultHasuraBackendPlusClient, instance)
    if (app.apolloProvider.defaultClient)
      provide(DefaultApolloClient, app.apolloProvider.defaultClient)
  })
})
