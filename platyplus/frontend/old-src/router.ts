import { allRoutes } from '@platyplus/vue-rxdb-hasura'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: () =>
      import(/* webpackChunkName: "root" */ './pages/PublicHome.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './pages/Home.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/debug',
    name: 'debug',
    component: () =>
      import(/* webpackChunkName: "debug" */ './pages/Debug.vue'),
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...allRoutes]
})

export default router
