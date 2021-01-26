<template lang="pug">
div(v-if='collection && document', :key='document.primary')
  p-sidebar(v-model:visible="visibleInfo" position="right")
    div Last updated at: {{document.updated_at}}
    div Last updated by
    div created by
    div created at
    div revisions
  .card()
    h3
      i.p-mr-2(:class='collection.icon()')
      h-document-label(v-if="id" :document='document')
      span(v-else) New 
        span.p-text-lowercase {{collection.documentTitle()}}
    p-toolbar.p-mb-4
      template(#left)
        p-button.p-mr-2(
          v-if='!editing && collection.canUpdate()',
          icon='pi pi-pencil',
          label='Edit',
          @click='edit'
        )
        p-button.p-mr-2(
          v-if='!editing && document.canDelete()',
          icon='pi pi-times',
          label='Delete',
          @click='remove'
        )
        p-button.p-mr-2(
          v-if='editing && collection.canUpdate()',
          icon='pi pi-save',
          label='Save',
          @click='save'
        ) 
        p-button.p-mr-2(
          v-if='editing && collection.canUpdate()',
          icon='pi pi-undo',
          label='Reset',
          @click='reset'
        ) 
        p-button.p-mr-2(
          v-if='editing && collection.canUpdate()',
          icon='pi pi-times',
          label='Cancel',
          @click='cancel'
        ) 
      template(#right)
        p-button.p-button-rounded.p-button-text(icon="pi pi-info-circle" @click="toggleInfo")
    h-document(:document="document" :editing="editing" layout="details")
.card(v-else) loading document...
.card(v-if='collection?.canUpdate() && editing') {{ form }}
</template>

<script lang="ts">
import { useToggle } from '@vueuse/core'
import { useConfirm } from 'primevue/useconfirm'
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useCollection, useDocument } from '../../composables'
export default defineComponent({
  name: 'DocumentPage',
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
    const [visibleInfo, toggleInfo] = useToggle()
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
    const confirm = useConfirm()
    const remove = () => {
      confirm.require({
        message: 'Are you sure you want to remove this document?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          await document.value?.remove()
          router.go(-1)
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      })
    }

    return {
      visibleInfo,
      toggleInfo,
      form,
      collection,
      properties,
      save,
      reset,
      cancel,
      remove,
      confirm,
      edit,
      document
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
