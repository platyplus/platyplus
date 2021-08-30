const nrwlConfig = require('@nrwl/react/plugins/webpack.js') // require the main @nrwl/react/plugins/webpack configuration function.
const { GenerateSW } = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = (config, context) => {
  nrwlConfig(config) // first call it so that it @nrwl/react plugin adds its configs, then override your config.

  // ! Webpack resolves the rxjs version of Nx (v6) before the one used by RxDB.
  // ! => Reverse resolve paths so the 'root' node_module goes first...
  // * See https://github.com/webpack/webpack/issues/6538
  config.resolve.modules = config.resolve.modules.reverse()

  if (config.mode === 'production')
    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        exclude: ['stats.json'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024 // TODO max 15MB - not ideal at all, find a way to reduce/split main.xxx.es5.js and vendor.js
      })
    )
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, './public') }]
    })
  )
  return {
    ...config,
    node: { global: true, fs: 'empty' } // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
  }
}
