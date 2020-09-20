/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function (api) {
  api.extendWebpack((cfg) => {
    // add/remove/change cfg (Webpack configuration Object)T
    const plugins = cfg.resolve.plugins || []
    plugins.push(
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.webpack.json',
      })
    )
    cfg.resolve.plugins = plugins
  })
}
