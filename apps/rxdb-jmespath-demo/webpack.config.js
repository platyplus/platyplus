const path = require('path')
const webpack = require('webpack')
const nrwlConfig = require('@nrwl/react/plugins/webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (config, context) => {
  nrwlConfig(config) // first call it so that it @nrwl/react plugin adds its configs, then override your config.
  config.resolve.fallback = {
    fs: false,
    crypto: false,
    assert: require.resolve('assert/') // * somehow required by pouchdb
  }
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'IndexHtmlWebpackPlugin'
  )
  // config.node.global = true
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'RxDB JMESPath demo',
      template: path.resolve(__dirname, 'src/index.html'),
      base: '/',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    })
  )

  config.devServer = {
    ...config.devServer,
    host: '0.0.0.0',
    compress: true
    // disableHostCheck: true
    // watchOptions: {
    //   poll: true // Or you can set a value in milliseconds.
    // }
  }
  return {
    ...config,
    node: {
      global: true
    }
  }
}
