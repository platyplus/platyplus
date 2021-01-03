import './registerServiceWorker'

import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import { createVueRxDBHasuraPlugin } from '@platyplus/vue-rxdb-hasura'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const hbp = createHasuraBackendPlus({ endpoint: 'http://hbp.localhost' })

const rxdbHasura = createVueRxDBHasuraPlugin({
  name: 'easynut',
  endpoint: 'http://hasura.localhost/v1/graphql',
  store,
  hbp
})

createApp(App).use(store).use(router).use(hbp).use(rxdbHasura).mount('#app')
