import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/collection/:name/:action?',
    name: 'collection',
    component: () =>
      import(/* webpackChunkName: "collection" */ './Collection.vue'),
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
      import(/* webpackChunkName: "collection" */ './Document.vue'),
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
      import(/* webpackChunkName: "document" */ './Document.vue'),
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

export default routes
