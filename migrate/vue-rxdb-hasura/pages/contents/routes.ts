const routes = [
  {
    path: '/document/:collection/new',
    name: 'newDocument',
    component: () => null,
    props: route => ({
      name: route.params.collection,
      editing: true
    }),
    meta: {
      auth: true
    }
  }
]

export default routes
