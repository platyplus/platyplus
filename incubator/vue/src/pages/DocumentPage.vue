<template lang="pug">
.card(v-if='collection && document', :key='document.primary')
  h3
    i.p-mr-2(:class='collection.icon()')
    document-label(:document='document')
  Toolbar.p-mb-4(v-if='collection.canUpdate()')
    template(#left)
      Button.p-mr-2(
        v-if='!editing',
        icon='pi pi-pencil',
        label='Edit',
        @click='edit'
      )
      Button.p-mr-2(
        v-if='editing',
        icon='pi pi-save',
        label='Save',
        @click='save'
      ) 
      Button.p-mr-2(
        v-if='editing',
        icon='pi pi-undo',
        label='Reset',
        @click='reset'
      ) 
      Button.p-mr-2(
        v-if='editing',
        icon='pi pi-times',
        label='Cancel',
        @click='cancel'
      ) 
  div.p-fluid
    div.p-field(v-for='property, name of properties' :key="name")
      label(:for="name") {{name}}
      field-edit(v-if="editing && document.canEdit(name)" :document="document" :name="name" :label="true")
      div(v-else).p-component.p-inputtext
        field-read( :document="document" :name="name" )
.card(v-else) loading document...
.card(v-if='collection?.canUpdate() && editing') {{ form }}
</template>

<script lang="ts">
import {
  useCollection,
  useCollectionProperties,
  useDocument
} from '@platyplus/vue-rxdb-hasura'
import { computed, defineComponent, toRefs } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CollectionPage',
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
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
    const { id, name } = toRefs(props)
    const collection = useCollection(name)
    const properties = useCollectionProperties(collection)
    const document = useDocument(collection, id)

    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])

    const read = () =>
      router.replace({
        name: 'document',
        params: {
          collection: props.name,
          id: props.id
        }
      })
    const edit = () =>
      router.replace({
        name: 'document',
        params: {
          collection: props.name,
          id: props.id,
          action: 'edit'
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
      properties,
      save,
      reset,
      cancel,
      edit,
      document
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
