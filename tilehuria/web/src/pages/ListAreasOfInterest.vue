<template lang="pug">
  q-page.row.q-pa-md
    q-spinner(v-if="loading" color="primary" size="3em")
    q-list.col-12(v-else bordered separator)
      q-item(v-for="aoi of list" :key="aoi.id" :aoi="aoi" clickable, v-ripple)
        q-item-section(@click="goto(aoi.id)")
          q-item-label {{ aoi.name || aoi.id }}
          q-item-label(caption v-if="aoi.tilesCount")
            span {{aoi.tilesCount.toLocaleString()}} {{ 'tile' | pluralize(aoi.tilesCount) }}
            span( v-if="aoi.tileSets_aggregate.aggregate.count") , {{aoi.tileSets_aggregate.aggregate.count}} {{ 'tile set' | pluralize(aoi.tileSets_aggregate.aggregate.count) }}
        q-item-section(side)
          div.text-grey-8.q-gutter-xs
            q-btn(v-if="!aoi.tileSets_aggregate.aggregate.count" size="12px" flat round dense icon="delete" color="negative" @click="remove(aoi)")
    q-page-sticky(position="bottom-right" :offset="[18, 18]")
      q-btn(fab icon="add" color="primary" to="/areas-of-interest/new")
</template>

<script lang="ts">
import '../filters/pluralize'

import { defineComponent } from '@vue/composition-api'
import { useItemList } from 'src/composables'
import { GRAPHQL_CONFIG } from 'src/config'

export default defineComponent({
  name: 'ListAreasOfInterest',
  setup(_, ctx) {
    const { list, loading, remove } = useItemList(
      GRAPHQL_CONFIG.area_of_interest
    )

    const goto = async (id: string) => {
      await ctx.root.$router.push(`/areas-of-interest/${id}`)
    }

    return { list, loading, remove, goto }
  }
})
</script>
