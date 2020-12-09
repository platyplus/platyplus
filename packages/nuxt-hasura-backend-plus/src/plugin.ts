import { defineNuxtPlugin, Ref, ref } from '@nuxtjs/composition-api'
import decode from 'jwt-decode'
import nhost from 'nhost-js-sdk'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'
import { UserConfig } from 'nhost-js-sdk/dist/types'

import { HasuraClaims } from './types'

declare module '@nuxt/types' {
  interface Context {
    $auth: Auth
    $authenticated: Readonly<Ref<boolean>>
    $hasuraClaims: Readonly<Ref<HasuraClaims>>
    $storage: Storage
  }
}

export default defineNuxtPlugin(ctx => {
  const config: UserConfig = {
    base_url: '<%= options.endpoint %>',
    refresh_interval_time:
      (parseInt('<%= options.refreshInSeconds %>') || 60 * 10) * 1000
  }
  nhost.initializeApp(config)
  ctx.$auth = nhost.auth()
  ctx.$storage = nhost.storage()
  const authenticated = ref(false)
  ctx.$authenticated = authenticated
  const hasuraClaims = ref()
  ctx.$hasuraClaims = hasuraClaims
  ctx.$auth.onAuthStateChanged((logged_in: boolean) => {
    authenticated.value = logged_in
    if (logged_in) {
      const token: Record<string, unknown> = decode(ctx.$auth.getJWTToken())
      hasuraClaims.value = token['https://hasura.io/jwt/claims']
    } else {
      hasuraClaims.value = undefined
    }
  })
})
