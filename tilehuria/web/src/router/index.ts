import { route } from 'quasar/wrappers'
import { getAuth } from 'src/composables'
import { ANONYMOUS_ROLE } from 'src/config'
import VueRouter from 'vue-router'

import { StoreInterface } from '../store'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) =>
    new Promise(resolve => {
      const auth = getAuth()
      if (auth) {
        const status = auth.isAuthenticated()
        if (status === null) {
          auth.onAuthStateChanged((status: boolean) => {
            resolve(status)
          })
        } else resolve(status)
      }
    }).then(status => {
      const roles = (to.meta as Record<string, unknown>).roles as
        | string[]
        | undefined
      if (status) {
        const role = getAuth().getClaim('x-hasura-default-role')
        if (!roles || roles.includes(role)) next()
        else next(from.fullPath)
      } else {
        if (roles && !roles.includes(ANONYMOUS_ROLE)) next('/login')
        else next()
      }
    })
  )
  return Router
})
