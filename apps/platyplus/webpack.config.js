const path = require('path')
const nrwlConfig = require('@nrwl/react/plugins/webpack.js') // require the main @nrwl/react/plugins/webpack configuration function.
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

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

  // TODO https://github.com/jantimon/favicons-webpack-plugin
  config.plugins.push(
    ...[
      new HtmlWebpackPlugin(),
      new WebpackPwaManifest({
        name: 'PlatyPlus',
        short_name: 'PlatyPlus',
        description: 'PlatyPlus application',
        display: 'standalone',
        theme_color: '#066ace',
        background_color: '#202020',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        ios: true,
        inject: true,
        icons: [
          {
            src: path.resolve(__dirname, 'src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          }
        ]
      })
    ]
  )
  return {
    ...config,
    node: { global: true, fs: 'empty' } // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
  }
}
