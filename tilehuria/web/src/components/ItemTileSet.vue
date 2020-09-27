<template lang="pug">
q-expansion-item(
  v-model='expanded',
  expand-separator,
  icon='perm_identity',
  :label='label',
  caption='John Doe',
  @show='$emit("show")',
  @hide='$emit("hide")'
)
  template(#header)
    q-item-section
      q-item-label(overline) {{ label }}
      q-item-label(v-if='!expanded && source.progress != 1 && !isNew')
        q-linear-progress.q-mt-md(:value='source.progress')
    q-item-section(
      side,
      v-if='!expanded && source.progress == 1 && source.size'
    )
      q-badge {{ source.size | prettyBytes }}
  template(#default, v-if='values')
    q-item
      q-item-section(top)
        q-item-label(overline) Format
        q-item-label
          q-badge {{ values.format }}
      q-item-section(top)
        q-item-label(overline) Quality
        q-item-label(overline) &nbsp;
        q-item-label 
          q-slider(
            v-model='values.quality',
            :min='0',
            :max='100',
            :label-always='!editing',
            :label='editing',
            :readonly='!editing',
            @change='change'
          )
    q-item(v-if='source.size')
      q-item-section
        q-item-label(overline) MBTile file
        q-item-label
          q-badge(v-if='source.progress === 1') {{ source.size | prettyBytes }}
          q-linear-progress.q-mt-md(v-else, :value='source.progress')
      q-item-section(v-if='source.progress === 1')
        q-item-label
          q-btn.q-ma-md(type='a', :href='downloadLink') Download
</template>

<script lang="ts">
import '../filters/pretty-bytes'

import { TileSet } from '@platyplus/tilehuria-schema'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRefs
} from '@vue/composition-api'
import { useFormFragment } from 'src/composables'
import { HBP_ENDPOINT } from 'src/config'
export default defineComponent({
  name: 'ItemTileSet',
  props: {
    source: {
      type: Object as PropType<TileSet>,
      required: true
    },
    value: {
      type: Object as PropType<TileSet>
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const expanded = ref(false)
    const { source, editing } = toRefs(props)
    const { values } = useFormFragment(source, editing)

    const change = () => {
      ctx.emit('input', values.value)
    }

    const isNew = computed(() => !source.value.id)

    const label = computed(() => source.value.tileProvider?.name)

    const downloadLink = computed(() => {
      if (source.value) {
        const {
          areaOfInterest: { name, userId },
          tileProvider: { slug }
        } = source.value
        if (userId)
          return `${HBP_ENDPOINT}/storage/o/mbtiles/${userId}/${slug}/${name}.mbtiles`
      }
    })

    return { label, downloadLink, values, expanded, change, isNew }
  }
})
</script>
