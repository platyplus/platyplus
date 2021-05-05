// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('@zeit/next-less')

const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

// const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {
    return
  }
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true
// })

module.exports = withNx(
  withCSS({
    nx: {
      // Set this to false if you do not want to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: true
    },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true
        }
      })
    )
  })
)
