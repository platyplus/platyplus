<template lang="pug">
#q-app
  router-view
</template>

<script lang="ts">
import { DefaultApolloClient } from '@vue/apollo-composable'
import { defineComponent } from '@vue/composition-api'
import { provide } from '@vue/composition-api'
import {
  createApolloClient,
  provideAuth,
  provideStorage,
  useAuth} from 'src/composables'

import { HASURA_HTTP_ENDPOINT } from './config'

export default defineComponent({
  name: 'App',

  setup() {
    provideAuth()
    provideStorage()
    const auth = useAuth()

    provide(DefaultApolloClient, createApolloClient(HASURA_HTTP_ENDPOINT, auth))
  }
})
</script>
