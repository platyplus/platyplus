import './registerServiceWorker'
import '@platyplus/humanitarian-icons/icons.css'

import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import { createVueRxDBHasuraPlugin } from '@platyplus/vue-rxdb-hasura'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const store = createStore({})

const hbp = createHasuraBackendPlus({
  endpoint: 'http://hbp.localhost',
  router
})

const rxdbHasura = createVueRxDBHasuraPlugin({
  name: 'incubator',
  endpoint: 'http://hasura.localhost/v1/graphql',
  store,
  hbp,
  router
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(hbp)
app.use(rxdbHasura)

app.mount('#app')
