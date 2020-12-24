export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '@platyplus/easy-web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/plugin.ts'],
  // plugins: ['@platyplus/nuxt-hasura-backend-plus'],
  // plugins: ['~/plugins/apollo.ts'],
  // plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // modulesDir: [
  //   '../../node_modules',
  //   '../../packages/nuxt-hasura-backend-plus/src'
  // ],
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // [
    //   '@nuxt/typescript-build',
    //   {
    //     typeCheck: {
    //       ts: require.resolve('typescript')
    //     }
    //   }
    // ],

    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api'

    // [
    //   '@platyplus/nuxt-hasura-backend-plus',
    //   { endpoint: 'http://hbp.localhost' }
    // ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/apollo'

    // [
    //   '@platyplus/nuxt-hasura-backend-plus',
    //   { endpoint: 'http://hbp.localhost' }
    // ]
  ],

  publicRuntimeConfig: {
    hasuraBackendPlus: {
      endpoint: 'http://hbp.localhost',
      refreshInSeconds: 10,
      graphqlEndpoint: 'http://hasura.localhost/v1/graphql'
    }
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.ts'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // modulesDir: ['../../node_modules', 'node_modules', '../../packages'],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
