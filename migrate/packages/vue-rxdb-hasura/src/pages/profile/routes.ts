import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/profile/:action?',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ './Profile.vue'),
    props: route => ({
      editing: route.params.action === 'edit'
    }),
    meta: {
      auth: true
    }
  }
]

export default routes
