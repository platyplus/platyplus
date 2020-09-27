import VueCompositionApi from '@vue/composition-api'
import { boot } from 'quasar/wrappers'

declare module '@vue/composition-api' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}

export default boot(({ Vue }) => {
  Vue.use(VueCompositionApi)
})
