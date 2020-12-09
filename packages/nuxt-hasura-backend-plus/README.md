# `@platyplus/nuxt-hasura-backend-plus`

Nuxt module for Hasura Backend Plus

## Installation

```sh
yarn add @platyplus/nuxt-hasura-backend-plus
```

Edit your `nuxt.config.js` file:

```js
export default {
  modules: [
    [
      '@platyplus/nuxt-hasura-backend-plus',
      {
        endpoint: 'http://my-hbp-endpoint.com',
        refreshInSeconds: 60000 // seconds before refreshing the token
      }
    ]
  ],

  buildModules: ['@nuxtjs/composition-api']
}
```

## Usage

Vue compositions:

- useRegister
- useLogin
- useLogout
- useStatus
- useHasuraClaims
