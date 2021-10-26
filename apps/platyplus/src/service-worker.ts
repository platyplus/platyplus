import { NavigationRoute, registerRoute } from 'workbox-routing'
import {
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate
} from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope & typeof globalThis

precacheAndRoute(self.__WB_MANIFEST)
registerRoute(
  '/config.json',
  new NetworkFirst({
    cacheName: 'config',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
if (process.env.NODE_ENV === 'production') {
  registerRoute(
    ({ url }) => url.pathname.startsWith('/assets/'),
    new StaleWhileRevalidate()
  )
  // ? Is fallback working?
  registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')))
} else registerRoute(/(.*?)/, new NetworkOnly())
