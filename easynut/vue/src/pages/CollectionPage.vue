<template lang="pug">
.card(v-if="collection")
  h3
    i.p-mr-2(:class="collection.icon()")
    span {{collection.title()}}
  p {{collection.description()}}
  Toolbar.p-mb-4(v-if="collection.canUpdate()")
    template(#left)
      Button.p-mr-2(v-if="!editing" icon="pi pi-pencil" label="Edit" @click="edit")
      Button.p-mr-2(v-if="editing" icon="pi pi-save" label="Save" @click="save") 
      Button.p-mr-2(v-if="editing" icon="pi pi-undo" label="Reset" @click="reset") 
      Button.p-mr-2(v-if="editing" icon="pi pi-times" label="Cancel" @click="cancel") 
  collection(:key="collection.name" :collection="collection" :editing="editing")
.card(v-else) loading...
.card(v-if="collection?.canUpdate() && editing") {{form}}
</template>

<script lang="ts">
import { useCollection } from '@platyplus/vue-rxdb-hasura'
import { useToggle } from '@vueuse/core'
import { computed, defineComponent, toRef } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CollectionPage',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    onBeforeRouteUpdate(() => {
      editing.value = false
      // TODO Confirm leaving if changes in the form
    })
    onBeforeRouteLeave(() => {
      // TODO Confirm leaving if changes in the form
    })
    const collectionName = toRef(props, 'name')
    const collection = useCollection(collectionName)
    // const status = useStatus()
    // const token = useJWT()
    // const collections = useCollections()
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
      form,
      collection,
      collectionName,
      status,
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
