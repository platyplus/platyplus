import { Module } from '@nuxt/types'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'
import path from 'path'

import { HasuraClaims } from './types'
export { HasuraBackendPlus } from './plugin'
declare module '@nuxt/types' {
  interface Context {
    $auth: Auth
    $authenticated: Readonly<boolean>
    $hasuraClaims: Readonly<HasuraClaims | undefined>
    $storage: Storage
  }
}

interface HasuraBackendPlusModuleOptions {
  endpoint: string
  refreshInSeconds: number
}
export * from './composables'
export * from './types'

const hbpModule: Module<HasuraBackendPlusModuleOptions> = function (options) {
  try {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.ts'),
      options
    })
  } catch {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      options
    })
  }
}

export default hbpModule
