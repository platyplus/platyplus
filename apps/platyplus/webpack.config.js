const path = require('path')
const webpack = require('webpack')
const nrwlConfig = require('@nrwl/react/plugins/webpack.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (config, context) => {
  const name = process.env.APP_NAME
  const shortName = process.env.APP_SHORT_NAME || name
  const description = process.env.APP_DESCRIPTION
  const themeColor = '#066ace'
  const backgroundColor = '#202020'

  nrwlConfig(config) // first call it so that it @nrwl/react plugin adds its configs, then override your config.
  const isProd = config.mode === 'production'
  // ! Webpack resolves the rxjs version of Nx (v6) before the one used by RxDB.
  // ! => Reverse resolve paths so the 'root' node_module goes first...
  // * See https://github.com/webpack/webpack/issues/6538
  config.resolve.modules = config.resolve.modules.reverse()
  config.resolve.fallback = { fs: false, crypto: false }
  // TODO not ideal for debugging
  config.ignoreWarnings = [(warning) => true]
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'IndexHtmlWebpackPlugin'
  )

  if (isProd)
    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024 // TODO max 15MB - not ideal at all, find a way to reduce/split main.xxx.es5.js and vendor.js
      })
    )

  config.plugins.push(
    ...[
      new CopyPlugin({
        patterns: [
          {
            from: isProd ? './config.prod.json' : './config.json',
            to: './config.json'
          }
        ]
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: name,
        template: path.resolve(__dirname, 'src/index.html'),
        base: '/',
        meta: {
          viewport: 'width=device-width, initial-scale=1'
        }
      }),
      new FaviconsWebpackPlugin(path.resolve(__dirname, 'src/logo.png')),
      new WebpackPwaManifest({
        name,
        short_name: shortName,
        description,
        display: 'standalone',
        theme_color: themeColor,
        background_color: backgroundColor,
        publicPath: '/',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        ios: true,
        icons: [
          {
            src: path.resolve(__dirname, 'src/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ]
  )
  config.devServer = {
    ...config.devServer,
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    watchOptions: {
      poll: true // Or you can set a value in milliseconds.
    }
  }
  return {
    ...config,
    node: {
      global: true
    }
  }
}
