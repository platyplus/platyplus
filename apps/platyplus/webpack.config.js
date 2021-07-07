const nrwlConfig = require('@nrwl/react/plugins/webpack.js') // require the main @nrwl/react/plugins/webpack configuration function.

module.exports = (config, context) => {
  nrwlConfig(config) // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  // ! Webpack resolves the rxjs version of Nx (v6) before the one used by RxDB.
  // ! => Reverse resolve paths so the 'root' node_module goes first...
  // * See https://github.com/webpack/webpack/issues/6538
  config.resolve.modules = config.resolve.modules.reverse()

  return {
    ...config,
    node: { global: true, fs: 'empty' } // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
  }
}
