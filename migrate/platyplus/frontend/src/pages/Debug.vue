<template lang="pug">
q-page
  h3 Debug page
  p A few things to check everything works.
  p(v-if="status") token {{token}}
q-card
  q-card-section
    h5 Controls
    q-btn(v-if="!editing" @click="edit") edit
    q-btn(v-if="editing" @click="save") save 
    q-btn(v-if="editing" @click="reset") reset 
    q-btn(v-if="editing" @click="cancel") cancel
    div(v-if="editing") form: {{form}}
q-card(v-for="collection of collections")
  q-card-section
    h5 {{collection.name}}
    h-collection(:collection="collection" :editing="editing")
</template>

<script lang="ts">
import { useJWT, useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useCollections } from '@platyplus/vue-rxdb-hasura'
import { useToggle } from '@vueuse/core'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DebugPage',
  setup() {
    const status = useStatus()
    const token = useJWT()
    const collections = useCollections()
    const store = useStore()

    const form = computed(() => store.getters['rxdb/form'])

    const [editing, edit] = useToggle()
    const save = async () => {
      await store.dispatch('rxdb/save')
      editing.value = false
      // await next()
    }
    const reset = () => {
      store.commit('rxdb/reset')
    }
    const cancel = () => {
      reset()
      editing.value = false
    }

    return {
      status,
      token,
      collections,
      form,
      save,
      reset,
      cancel,
      editing,
      edit
    }
  }
})
</script>
