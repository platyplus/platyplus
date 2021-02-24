<template lang="pug">
q-page
  q-card(v-if="collection")
    q-card-section
      h3
        q-icon(:name="collection.icon()")
        span {{collection.title()}}
      p {{collection.description()}}
      div.q-pa-md.q-gutter-y-md.column.items-start(v-if="canEdit")
        q-btn-group(outline)
          // TODO put toolbar in the table view component
          q-btn(v-if="!editing && canUpdate" icon="fas fa-edit" label="Edit" @click="edit" outline color="primary")
          q-btn(v-if="!editing && canInsert" icon="fas fa-plus" label="Create" @click="create" outline color="primary")
          q-btn(v-if="editing" icon="fas fa-save" label="Save" @click="save" outline color="primary") 
          q-btn(v-if="editing" icon="fas fa-undo" label="Reset" @click="reset" outline color="primary") 
          q-btn(v-if="editing" icon="fas fa-times" label="Cancel" @click="cancel" outline color="primary") 
      h-collection(:key="collection.name" :collection="collection" :editing="editing")
  q-card(v-else)
    q-card-section loading collection...
  q-card(v-if="collection?.canUpdate() && editing")
    q-card-section {{form}}
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useCollection } from '../../composables'

export default defineComponent({
  name: 'CollectionPage',
  props: {
    name: {
      type: String,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    onBeforeRouteUpdate(() => {
      // TODO Confirm leaving if changes in the form
    })
    onBeforeRouteLeave(() => {
      // TODO Confirm leaving if changes in the form
    })

    // TODO allow creating a new document
    const router = useRouter()
    const collectionName = toRef(props, 'name')
    const collection = useCollection(collectionName)
    const canEdit = computed<boolean>(
      () =>
        collection.value?.componentName() !== 'grid' &&
        !!(collection.value?.canUpdate() || collection.value?.canInsert())
    )
    const canUpdate = computed<boolean>(
      () => canEdit.value && !!collection.value?.canUpdate()
    )
    const canInsert = computed<boolean>(
      () => canEdit.value && !!collection.value?.canInsert()
    )
    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])

    const read = () =>
      router.replace({
        name: 'collection',
        params: {
          name: props.name
        }
      })
    const edit = () =>
      router.replace({
        name: 'collection',
        params: {
          name: props.name,
          action: 'edit'
        }
      })
    const create = () =>
      router.push({
        name: 'newDocument',
        params: {
          collection: props.name
        }
      })
    const save = async () => {
      await store.dispatch('rxdb/save')
      read()
    }
    const reset = () => {
      store.commit('rxdb/reset')
    }
    const cancel = () => {
      reset()
      read()
    }
    return {
      form,
      collection,
      save,
      reset,
      cancel,
      canEdit,
      canInsert,
      canUpdate,
      edit,
      create
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
