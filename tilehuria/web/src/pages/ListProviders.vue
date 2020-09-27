<template lang="pug">
  q-page
    q-spinner(v-if="loading" color="primary" size="3em")
    div.q-pa-md.row.items-start.q-gutter-md(v-else)
      q-card.card(v-for="{id, name, url, slug, tileSets_aggregate} of list" :key="id")
        q-img(:src="tileProviderBackground(url)" basic)
          q-tooltip
            div {{ url }}
            div {{ proxyrUrl(slug) }}
          div.absolute-bottom
            div.text-h6 {{name}}
            div.text-subtitle2 {{ slug }}
        div.absolute-top-right
          q-btn.q-pa-sm(v-if="tileSets_aggregate.aggregate.count === 0" size="12px" flat round dense icon="delete" color="negative" @click="remove({id})")
        q-card-actions
          q-btn(flat icon="content_copy" label="Original" dense @click="copyLocalLink(url)") 
          q-btn(flat icon="content_copy" label="Proxy" dense @click="copyLocalLink(proxyrUrl(slug))")
    q-page-sticky(position="bottom-right" :offset="[18, 18]")
      q-btn(fab icon="add" color="primary" @click='newProviderDialog = true')
    q-dialog(v-model='newProviderDialog' persistent transition-show='scale' transition-hide='scale')
      p-new-provider(@done="newProviderDialog = false")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import PNewProvider from 'components/NewProvider.vue'
import { copyToClipboard } from 'quasar'
import { useItemList } from 'src/composables'
import { GRAPHQL_CONFIG } from 'src/config'
import { tileProviderUrl } from 'src/config/tile-provider'
import { tileUrl } from 'src/utils'
const backgroundTile = [62, 44, 7]

export default defineComponent({
  name: 'ListProviders',
  components: {
    PNewProvider
  },
  setup(_, ctx) {
    const { list, loading, remove } = useItemList(GRAPHQL_CONFIG.tile_provider)

    // TODO
    const copyLocalLink = async (url: string) => {
      await copyToClipboard(url)
      ctx.root.$q.notify({
        message: `"${url}" copied to the clipboard`,
        timeout: 1000
      })
    }

    const proxyrUrl = (slug: string) => tileProviderUrl(slug)
    const tileProviderBackground = (url: string) => tileUrl(backgroundTile, url)
    const newProviderDialog = ref(false)

    return {
      list,
      loading,
      remove,
      newProviderDialog,
      tileProviderBackground,
      copyLocalLink,
      proxyrUrl
    }
  }
})
</script>

<style lang="sass" scoped>
.card
  width: 100%
  max-width: 250px
</style>
