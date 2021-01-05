import 'primeflex/primeflex.css'
// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createRxHasura } from '@platyplus/rxdb-hasura'
import { Instance } from '@platyplus/vue-hasura-backend-plus'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
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
    createRxHasura(name, endpoint).then(value => {
      db.value = value
      value.setStatus(!!hbp.auth.isAuthenticated(), hbp.auth.getJWTToken())
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
    app.use(PrimeVue)
    app.component('Button', Button)
    app.component('Calendar', Calendar)
    app.component('Checkbox', Checkbox)
    app.component('Column', Column)
    app.component('ColumnGroup', ColumnGroup)
    app.component('DataTable', DataTable)
    app.component('Dialog', Dialog)
    app.component('Dropdown', Dropdown)
    app.component('InputNumber', InputNumber)
    app.component('InputText', InputText)
  }
  return { db, install }
}
