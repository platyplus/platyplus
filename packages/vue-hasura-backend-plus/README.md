# `@platyplus/vue-hasura-backend-plus`

Vue plugin for Hasura Backend Plus.
Works either with Vue 3 or the Vue Composition API, thanks to [Vue Demi]('https://github.com/vueuse/vue-demi').

## Installation

```sh
yarn add @platyplus/vue-hasura-backend-plus
```

Edit your `main` Vue file:

```js
import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import { createApp } from 'vue'

import App from './App.vue'

const hbp = createHasuraBackendPlus({
  endpoint: 'https://hasura-backend-plus.endpoint.com',
  refreshInSeconds: 600, // Defaults to 600 (10 minutes)
  router // Optional: vue-router instance. When set, will make sure the authentication is know prior to any routing
})

createApp(App).use(hbp).mount('#app')
```

## Usage

Vue compositions:

- useRegister
- useLogin
- useLogout
- useStatus
- useHasuraClaims
- useAllowedRoles
- useDefaultRole
