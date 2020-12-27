import './registerServiceWorker'

import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import { createApp } from 'vue'

import App from './App.vue'
import { createRxDBHasuraPlugin } from './plugins/rxdb-hasura'
import router from './router'
import store from './store'

const hbp = createHasuraBackendPlus({ endpoint: 'http://hbp.localhost' })

const rxdbHasura = createRxDBHasuraPlugin({
  name: 'easynut',
  endpoint: 'http://hasura.localhost/v1/graphql',
  hbp
})

createApp(App).use(store).use(router).use(hbp).use(rxdbHasura).mount('#app')
