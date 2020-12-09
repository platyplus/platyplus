# `@platyplus/nuxt-hasura-backend-plus`

Nuxt module for Hasura Backend Plus

## Installation

```sh
yarn add @platyplus/nuxt-hasura-backend-plus
```

## Usage

Edit your `nuxt.config.js` file:

```js
export default {
  plugins: ['@platyplus/nuxt-hasura-backend-plus'],

  publicRuntimeConfig: {
    hbpUrl: 'http(s)://my-hbp-endoint.com'
  },
  modules: [
    [
      '@platyplus/nuxt-hasura-backend-plus',
      {
        endpoint: 'https://hbp.localhost',
        refreshInSeconds: 10 // seconds before refreshing the token
      }
    ]
  ],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api']
}
```
