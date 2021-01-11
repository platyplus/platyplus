<template lang="pug">
.card
  h3 Home page
  p Home page of an authenticated user.
  p(v-if="status") token {{token}}
.card
  h5 Controls
  Button(v-if="!editing" @click="edit") edit
  Button(v-if="editing" @click="save") save 
  Button(v-if="editing" @click="reset") reset 
  Button(v-if="editing" @click="cancel") cancel
  div(v-if="editing") form: {{form}}
.card(v-for="collection of collections")
  h5 {{collection.name}}
  collection(:collection="collection" :editing="editing")
</template>

<script lang="ts">
import { useJWT, useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useCollections } from '@platyplus/vue-rxdb-hasura'
import { useToggle } from '@vueuse/core'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Test',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
