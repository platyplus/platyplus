const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const plugins = process.env.CI ? [] : [new BundleAnalyzerPlugin()]

module.exports = {
  devServer: {
    disableHostCheck: true
  },

  configureWebpack: {
    plugins,
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.json'
        })
      ]
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}
