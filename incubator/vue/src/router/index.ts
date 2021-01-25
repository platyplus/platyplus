import { allRoutes } from '@platyplus/vue-rxdb-hasura'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PublicHome',
    component: () =>
      import(/* webpackChunkName: "public-home" */ '../pages/PublicHome.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/debug',
    name: 'debug',
    component: () =>
      import(/* webpackChunkName: "public-home" */ '../pages/Debug.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue'),
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
