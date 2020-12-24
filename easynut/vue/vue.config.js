const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  devServer: {
    disableHostCheck: true
  },

  configureWebpack: {
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.json'
        })
      ]
    }
  }
}
