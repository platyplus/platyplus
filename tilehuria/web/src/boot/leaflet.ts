/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

import { Icon } from 'leaflet'
import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import {
  LControl,
  LGeoJson,
  LMap,
  LMarker,
  LPopup,
  LTileLayer,
  LTooltip
} from 'vue2-leaflet'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Icon.Default.prototype as any)._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default boot(() => {
  Vue.component('l-map', LMap)
  Vue.component('l-tile-layer', LTileLayer)
  Vue.component('l-geo-json', LGeoJson)

  Vue.component('l-marker', LMarker)
  Vue.component('l-popup', LPopup)
  Vue.component('l-tooltip', LTooltip)
  Vue.component('l-control', LControl)
})
