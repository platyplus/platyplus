import { createRxHasura, Database } from '@platyplus/rxdb-hasura'
import { Instance } from '@platyplus/vue-hasura-backend-plus'
import { App, InjectionKey, Ref, ref } from 'vue'
import { Router } from 'vue-router'
import { Store } from 'vuex'

import { loadPrimeVue } from './primevue'
import { addModule } from './store'
export const DefaultRxDBKey = Symbol()

export type RxDBHasuraPluginOptions<S> = {
  name: string
  endpoint: string
  hbp: Instance
  store: Store<S>
  router?: Router
}

export type RxHasuraPlugin = {
  db: Ref<Database | undefined>
  install(app: App, injectKey: string | InjectionKey<unknown>): void
}

// TODO explicit 'logout' that destroys the database. Don't destroy when auth status changes (it means we're offline)
export const createVueRxDBHasuraPlugin = <S = unknown>({
  name,
  endpoint,
  hbp,
  store,
  router
}: RxDBHasuraPluginOptions<S>): RxHasuraPlugin => {
  const db = ref<Database | undefined>()
  const install = async (
    app: App,
    injectKey: string | InjectionKey<unknown>
  ) => {
    createRxHasura(name, endpoint).then(value => {
      db.value = value
      value.setAuthStatus(!!hbp.auth.isAuthenticated(), hbp.auth.getJWTToken())
      hbp.auth.onAuthStateChanged(async (status: boolean) => {
        value.setAuthStatus(status, hbp.auth.getJWTToken())
      })
      hbp.auth.onTokenChanged((token?: string) => {
        console.log('onTokenChanged', token)
        value.setJwt(hbp.auth.getJWTToken())
      })
    })

    // * Load all components from the `./components` directory
    const components = require.context('.', true, /\.vue$/)
    components.keys().forEach(filename => {
      // const name = path.basename(filename, '.vue')
      const Comp = components(filename).default
      app.component(`H${Comp.name}`, Comp)
    })

    app.provide(injectKey || DefaultRxDBKey, db)
    addModule(db, store)
    loadPrimeVue(app)
    if (router) {
      router.beforeEach(function (to, from, next) {
        window.scrollTo(0, 0)
        // * Authentication guard
        if (to.meta.auth && !hbp.authenticated.value) next({ name: 'login' })
        else if (hbp.authenticated.value && to.path === '/')
          next({ name: 'home' })
        // * 404
        else if (!to.matched.length) next({ name: 'root' })
        else next()
      })
    }
  }
  return { db, install }
}
