import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './Login.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ './Register.vue'),
    meta: {
      auth: false
    }
  }
]

export default routes
