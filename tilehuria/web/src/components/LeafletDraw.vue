<template lang="pug">
l-control(v-if='centerButton', :position='position')
  button(@click='setCenter') Center
</template>

<script lang="ts">
import 'leaflet-draw'

import {
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch
} from '@vue/composition-api'
import GeoJSON from 'geojson'
import L from 'leaflet'
import { LMap } from 'vue2-leaflet'

type Position = 'bottomleft' | 'bottomright' | 'topleft' | 'topright'
export default defineComponent({
  name: 'LeafletDraw',
  props: {
    position: {
      type: String, // TODO find a better way to type this prop
      default: 'bottomright'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object as PropType<GeoJSON.GeoJSON>,
      required: false
    },
    autoCenter: {
      type: Boolean,
      default: true
    },
    centerButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const map = (ctx.parent as LMap).mapObject

    let drawnItems = ref<L.FeatureGroup>(L.featureGroup().addTo(map))
    let drawControl = ref<L.Control.Draw>(
      new L.Control.Draw({
        position: props.position as Position,
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          },
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false
        },
        edit: {
          featureGroup: drawnItems.value as L.FeatureGroup
        }
      })
    )

    watch(
      () => props.readonly,
      (readonly) => {
        if (readonly) map.removeControl(drawControl.value)
        else map.addControl(drawControl.value)
      }
    )

    const setCenter = () => {
      if (props.value) {
        const sourceBounds = L.geoJSON(props.value).getBounds()
        map.fitBounds(sourceBounds, { padding: [80, 80] })
      }
    }

    watch(
      () => props.value,
      (newValue, oldValue) => {
        if (newValue && Object.keys(newValue).length) {
          // ? Weird thing: on creation, newValue can exist but be some kind of an empty object with proto methods
          drawnItems.value?.clearLayers()
          const geo = L.geoJSON(newValue)
          geo.eachLayer((l) => {
            drawnItems.value?.addLayer(l)
          })
          // * Center if autocenter is activated and it's the first time the value is loaded
          if (!(oldValue && Object.keys(oldValue).length) && props.autoCenter)
            setCenter()
        }
      }
    )

    onMounted(() => {
      const loadChanges = () => ctx.emit('input', drawnItems.value?.toGeoJSON())
      map.on(L.Draw.Event.EDITSTOP, loadChanges)
      map.on(L.Draw.Event.EDITVERTEX, loadChanges)
      map.on(L.Draw.Event.EDITMOVE, loadChanges)
      map.on(L.Draw.Event.EDITRESIZE, loadChanges)
      map.on(L.Draw.Event.CREATED, (event) => {
        drawnItems.value?.addLayer(event.layer)
        ctx.emit('input', drawnItems.value?.toGeoJSON())
      })
      map.on(L.Draw.Event.EDITED, loadChanges)
      map.on(L.Draw.Event.DELETED, (event) => {
        drawnItems.value?.removeLayer(event.layer)
        ctx.emit('input', drawnItems.value?.toGeoJSON())
      })
    })

    // const options = computed(() => {
    //   return { drawlayer: drawnItems.value }
    // })

    return { setCenter }
  }
})
</script>
