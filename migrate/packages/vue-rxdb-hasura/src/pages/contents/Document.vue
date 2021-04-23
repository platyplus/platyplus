<template lang="pug">
q-page
  q-card(v-if='collection && document', :key='document.primary')
    q-card-section
      h3
        q-icon.q-pa-sm(:name="collection.icon()")
        h-document(v-if="id" :document='document' type="label")
        span(v-else) New 
          span.text-lowercase {{collection.documentTitle()}}
      div.q-pa-md.q-gutter-y-md.column.items-start(v-if="(editing && collection.canUpdate()) || (!editing && document.canDelete())")
        q-btn-group(outline)
          q-btn(
            outline
            color="primary"
            v-if='!editing && collection.canUpdate()',
            icon='fas fa-edit',
            label='Edit',
            @click='edit'
          )
          q-btn(
            outline
            color="primary"
            v-if='!editing && document.canDelete()',
            icon='fas fa-trash',
            label='Delete',
            @click='remove'
          )
          q-btn(
            outline
            color="primary"
            v-if='editing && collection.canUpdate()',
            icon='fas fa-save',
            label='Save',
            @click='save'
          ) 
          q-btn(
            outline
            color="primary"
            v-if='editing && collection.canUpdate()',
            icon='fas fa-redo',
            label='Reset',
            @click='reset'
          ) 
          q-btn(
            outline
            color="primary"
            v-if='editing && collection.canUpdate()',
            icon='fas fa-times',
            label='Cancel',
            @click='cancel'
          ) 
      h-document(:document="document" :editing="editing")
  q-card(v-else)
    q-card-section loading document...
  q-card(v-if='collection?.canUpdate() && editing')
    q-card-section {{ form }}
</template>

<script lang="ts">
import { QVueGlobals } from 'quasar'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  PropType,
  toRefs
} from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useCollection, useDocument } from '../../composables'
export default defineComponent({
  name: 'PageDocument',
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String as PropType<string | undefined>,
      default: undefined
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
    const properties = computed(() => collection.value?.properties)
    const document = useDocument(collection, id)

    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])
    const read = () =>
      document.value &&
      router.replace({
        name: 'document',
        params: {
          collection: props.name,
          id: document.value.primary
        }
      })

    const edit = () =>
      props.id &&
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
      if (props.id) read()
      else router.go(-1)
    }
    const instance = getCurrentInstance()
    // TODO bug in useQuasar()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $q: QVueGlobals = (instance as any).ctx.$q
    const remove = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to remove this document?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await document.value?.remove()
        router.go(-1)
      })
    }

    return {
      form,
      collection,
      properties,
      save,
      reset,
      cancel,
      remove,
      edit,
      document
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
