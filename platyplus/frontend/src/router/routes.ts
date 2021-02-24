import { allRoutes } from '@platyplus/vue-rxdb-hasura'
import { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'root',
        component: () =>
          import(/* webpackChunkName: "root" */ 'pages/PublicHome.vue'),
        meta: {
          auth: false
        }
      },
      {
        path: '/home',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ 'pages/Home.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/debug',
        name: 'debug',
        component: () =>
          import(/* webpackChunkName: "debug" */ 'pages/Debug.vue'),
        meta: {
          auth: true
        }
      },
      ...allRoutes
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
