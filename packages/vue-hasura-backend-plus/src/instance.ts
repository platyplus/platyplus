import decode from 'jwt-decode'
import nhost from 'nhost-js-sdk'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'
import { App, Ref, ref } from 'vue'

import { DefaultHasuraBackendPlusKey } from './inject-key'
import { Claims, HasuraBackendPlusPluginOptions, HasuraClaims } from './types'

export class Instance {
  auth: Auth
  storage: Storage
  claims: Ref<HasuraClaims>
  token: Ref<string | undefined>
  authenticated: Ref<boolean>

  constructor(options: HasuraBackendPlusPluginOptions) {
    nhost.initializeApp({
      base_url: options.endpoint,
      // use_cookies?: boolean;
      refresh_interval_time: (options.refreshInSeconds || 600) * 1000
      // client_storage?: ClientStorage;
      // client_storage_type?: string;
    })
    this.auth = nhost.auth()
    this.storage = nhost.storage()
    this.claims = ref<HasuraClaims>()
    this.authenticated = ref(false)
    this.token = ref()
    options.router?.beforeEach(async (to, from, next) => {
      if (this.auth.isAuthenticated() === null) {
        this.authenticated.value = await new Promise<boolean>(resolve => {
          this.auth.onAuthStateChanged((status: boolean) => {
            resolve(status)
          })
        })
      }
      next()
    })
    this.auth.onAuthStateChanged((logged_in: boolean) => {
      this.authenticated.value = logged_in
      if (logged_in) {
        this.token.value = this.auth.getJWTToken()
        const fullClaims: Claims = decode(this.auth.getJWTToken())
        this.claims.value = fullClaims['https://hasura.io/jwt/claims']
      } else {
        this.token.value = undefined
        this.claims.value = undefined
      }
    })
  }

  install(app: App, injectKey?: symbol): void {
    app.provide(injectKey || DefaultHasuraBackendPlusKey, this)
  }
}

export const createHasuraBackendPlus = (
  options: HasuraBackendPlusPluginOptions
): Instance => {
  return new Instance(options)
}
