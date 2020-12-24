import { Context } from '@nuxt/types'

import { instance } from './plugin'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const apollo = ({ $config }: Context) => ({
  httpEndpoint: $config.hasuraBackendPlus.graphqlEndpoint,
  /*
   * For permanent authentication provide `getAuth` function.
   * The string returned will be used in all requests as authorization header
   */
  getAuth: () => {
    const token = instance.auth.getJWTToken()
    return token ? `Bearer ${token}` : ''
  }
})
