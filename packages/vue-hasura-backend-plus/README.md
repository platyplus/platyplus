# `@platyplus/vue-hasura-backend-plus`

Vue 3 plugin for Hasura Backend Plus

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
  endpoint: 'https://hasura-backend-plus.endpoint.com'
})

createApp(App)
  .use(hbp)
  .mount('#app')
```

## Usage

Vue compositions:

- useRegister
- useLogin
- useLogout
- useStatus
- useHasuraClaims
