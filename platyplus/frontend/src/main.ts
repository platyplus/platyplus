import './registerServiceWorker'
import '@platyplus/humanitarian-icons/icons.css'

import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import {
  createVueRxDBHasuraPlugin,
  fetchConfig
} from '@platyplus/vue-rxdb-hasura'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const store = createStore({})

fetchConfig().then(config => {
  const hbp = createHasuraBackendPlus({
    endpoint: config.hbp,
    router
  })

  const rxdbHasura = createVueRxDBHasuraPlugin({
    name: 'platyplus',
    endpoint: config.hasura,
    store,
    hbp,
    router
  })
  createApp(App).use(store).use(router).use(hbp).use(rxdbHasura).mount('#app')
})
