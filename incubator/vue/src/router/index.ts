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
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../pages/Login.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../pages/Register.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/collection/:name/:action?',
    name: 'collection',
    component: () =>
      import(
        /* webpackChunkName: "collection" */ '../pages/CollectionPage.vue'
      ),
    props: route => ({
      name: route.params.name,
      editing: route.params.action === 'edit'
    }),
    meta: {
      auth: true
    }
  },
  {
    path: '/document/:collection/new',
    name: 'newDocument',
    component: () =>
      import(/* webpackChunkName: "collection" */ '../pages/DocumentPage.vue'),
    props: route => ({
      name: route.params.collection,
      editing: true
    }),
    meta: {
      auth: true
    }
  },
  {
    path: '/document/:collection/:id/:action?',
    name: 'document',
    component: () =>
      import(/* webpackChunkName: "document" */ '../pages/DocumentPage.vue'),
    props: route => ({
      name: route.params.collection,
      id: route.params.id,
      editing: route.params.action === 'edit'
    }),
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
