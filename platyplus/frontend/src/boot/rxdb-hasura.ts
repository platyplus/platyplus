import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import {
  createVueRxDBHasuraPlugin,
  fetchConfig
} from '@platyplus/vue-rxdb-hasura'
import { boot } from 'quasar/wrappers'

export default boot(async ({ app, store, router }) => {
  const config = await fetchConfig()
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
  app.use(hbp)
  app.use(rxdbHasura)
})
