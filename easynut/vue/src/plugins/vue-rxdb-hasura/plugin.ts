import { createRxHasura } from '@platyplus/rxdb-hasura'
import { Instance } from '@platyplus/vue-hasura-backend-plus'
import { RxDatabase } from 'rxdb'
import { App, InjectionKey, Ref, ref } from 'vue'
import { Store } from 'vuex'

import { addModule } from './store'

export const DefaultRxDBKey = Symbol()

export type RxDBHasuraPluginOptions<S> = {
  name: string
  endpoint: string
  hbp: Instance
  store: Store<S>
}

export type RxHasuraPlugin = {
  db: Ref<RxDatabase | undefined>
  install(app: App, injectKey: string | InjectionKey<unknown>): void
}

// TODO explicit 'logout' that destroys the database. Don't destroy when auth status changes (it means we're offline)
export const createVueRxDBHasuraPlugin = <S = unknown>({
  name,
  endpoint,
  hbp,
  store
}: RxDBHasuraPluginOptions<S>): RxHasuraPlugin => {
  const db = ref<RxDatabase | undefined>()
  const install = async (
    app: App,
    injectKey: string | InjectionKey<unknown>
  ) => {
    createRxHasura(name, endpoint, hbp.auth.getJWTToken()).then(value => {
      db.value = value
      hbp.auth.onAuthStateChanged(async (status: boolean) => {
        value.setStatus(status, hbp.auth.getJWTToken())
      })
      hbp.auth.onTokenChanged(() => {
        value.setJwt(hbp.auth.getJWTToken())
      })
    })

    // * Load all components from the `./components` directory
    const components = require.context('./components', true, /\.vue$/)
    components.keys().forEach(filename => {
      // const name = path.basename(filename, '.vue')
      const Comp = components(filename).default
      app.component(Comp.name, Comp)
    })

    app.provide(injectKey || DefaultRxDBKey, db)
    addModule(db, store)
  }
  return { db, install }
}
