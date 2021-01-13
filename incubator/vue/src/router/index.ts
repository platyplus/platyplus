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
  },
  {
    path: '/formlayout',
    name: 'formlayout',
    component: () =>
      import(
        /* webpackChunkName: "layout-demo" */ '../components/FormLayoutDemo.vue'
      )
  },
  {
    path: '/input',
    name: 'input',
    component: () =>
      import(/* webpackChunkName: "input" */ '../components/InputDemo.vue')
  },
  {
    path: '/floatlabel',
    name: 'floatlabel',
    component: () => import('../components/FloatLabelDemo.vue')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../components/ButtonDemo.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../components/TableDemo.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../components/ListDemo.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../components/TreeDemo.vue')
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../components/PanelsDemo.vue')
  },
  {
    path: '/overlay',
    name: 'overlay',
    component: () => import('../components/OverlayDemo.vue')
  },
  {
    path: '/menu',
    component: () => import('../components/MenuDemo.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/menu/PersonalDemo.vue')
      },
      {
        path: '/menu/seat',
        component: () => import('../components/menu/SeatDemo.vue')
      },
      {
        path: '/menu/payment',
        component: () => import('../components/menu/PaymentDemo.vue')
      },
      {
        path: '/menu/confirmation',
        component: () => import('../components/menu/ConfirmationDemo.vue')
      }
    ]
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('../components/MessagesDemo.vue')
  },
  {
    path: '/file',
    name: 'file',
    component: () => import('../components/FileDemo.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../components/ChartDemo.vue')
  },
  {
    path: '/misc',
    name: 'misc',
    component: () => import('../components/MiscDemo.vue')
  },
  {
    path: '/display',
    name: 'display',
    component: () => import('../utilities/DisplayDemo.vue')
  },
  // {
  //   path: '/flexbox',
  //   name: 'flexbox',
  //   component: () => import('../utilities/FlexBoxDemo.vue')
  // },
  {
    path: '/text',
    name: 'text',
    component: () => import('../utilities/TextDemo.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('../utilities/Icons.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import('../utilities/GridDemo.vue')
  },
  {
    path: '/spacing',
    name: 'spacing',
    component: () => import('../utilities/SpacingDemo.vue')
  },
  {
    path: '/elevation',
    name: 'elevation',
    component: () => import('../utilities/ElevationDemo.vue')
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('../utilities/Typography.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import('../pages/CrudDemo.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../pages/CalendarDemo.vue')
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('../components/EmptyPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
