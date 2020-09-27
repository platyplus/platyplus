import { boot } from 'quasar/wrappers'
import { ValidationObserver,ValidationProvider } from 'vee-validate'

export default boot(({ Vue }) => {
  Vue.component('ValidationObserver', ValidationObserver)
  Vue.component('ValidationProvider', ValidationProvider)
})
