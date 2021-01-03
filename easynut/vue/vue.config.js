const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  devServer: {
    disableHostCheck: true
  },

  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.json'
        })
      ]
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
