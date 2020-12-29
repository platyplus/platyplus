import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from '@vue/composition-api'

export default defineNuxtPlugin(({ app }) => {
  console.log('plugin/apollo: started')
  onGlobalSetup(() => {
    console.log('plugin/apollo: global setup')
    const apolloClient = app.apolloProvider.defaultClient
    provide(DefaultApolloClient, apolloClient)
    console.log('plugin/apollo: global setup ok')
  })
})
console.log(' DEACTIVATED')
