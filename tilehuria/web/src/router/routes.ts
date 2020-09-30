import { AsyncComponent } from 'vue'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: (() => import('layouts/MainLayout.vue')) as AsyncComponent,
    children: [
      {
        path: '',
        component: (() => import('pages/Index.vue')) as AsyncComponent
      },
      {
        path: 'login',
        component: (() => import('pages/Login.vue')) as AsyncComponent,
        meta: { roles: ['anonymous'] }
      },
      {
        path: 'register',
        component: (() => import('pages/Registration.vue')) as AsyncComponent
      },
      {
        path: 'areas-of-interest',
        component: (() =>
          import('pages/ListAreasOfInterest.vue')) as AsyncComponent,
        meta: { roles: ['user'] }
      },
      {
        path: 'areas-of-interest/new',
        component: (() => import('pages/AreaOfInterest.vue')) as AsyncComponent,
        meta: { roles: ['user'] }
      },
      {
        path: 'areas-of-interest/:id',
        props: true,
        component: (() => import('pages/AreaOfInterest.vue')) as AsyncComponent,
        meta: { roles: ['user'] }
      },
      {
        path: 'tile-providers',
        component: (() => import('pages/ListProviders.vue')) as AsyncComponent,
        meta: { roles: ['user'] }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: (() => import('pages/Error404.vue')) as AsyncComponent
  }
]

export default routes
