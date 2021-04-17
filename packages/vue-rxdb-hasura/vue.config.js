module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  },
  chainWebpack: config => {
    config.plugin('fork-ts-checker').tap(args => {
      args[0].typescript.configFile = './tsconfig.build.json'
      return args
    })
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}
