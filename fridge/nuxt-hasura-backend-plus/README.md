# `@platyplus/nuxt-hasura-backend-plus`

Nuxt module for Hasura Backend Plus

**Important note: this package is NOT STABLE.**

This package is not actively developped anymore, mostly because:

- Nuxt is not ready to work with Vue 3 and does not seamlessly work with the composition API
- The composition API of Apollo Vue is not stable enough yet.

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

### Typescript users

Update your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "types": ["@nuxt/types", "@platyplus/nuxt-hasura-backend-plus"]
  }
}
```

## Usage

Vue compositions:

- useRegister
- useLogin
- useLogout
- useStatus
- useHasuraClaims
