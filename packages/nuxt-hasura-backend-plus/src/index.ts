import { Module } from '@nuxt/types'
import path from 'path'

interface HasuraBackendPlusModuleOptions {
  endpoint: string
  refreshInSeconds: number
}
export * from './composables'
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
