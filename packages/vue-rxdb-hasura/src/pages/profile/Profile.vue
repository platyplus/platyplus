<template lang="pug">
.card(v-if="profile")
  h3
    i.p-mr-2(class='')
    span {{displayName}}
  p-toolbar.p-mb-4
    template(#left)
      p-button.p-mr-2(
        v-if='!editing',
        icon='pi pi-pencil',
        label='Edit',
        @click='edit'
      )
      p-button.p-mr-2(
        v-if='editing',
        icon='pi pi-save',
        label='Save',
        @click='save'
      ) 
      p-button.p-mr-2(
        v-if='editing',
        icon='pi pi-undo',
        label='Reset',
        @click='reset'
      ) 
      p-button.p-mr-2(
        v-if='editing',
        icon='pi pi-times',
        label='Cancel',
        @click='cancel'
      ) 
  h-document(:document="profile" :editing="editing" type="details")
.card(v-else) loading profile... -{{profile}}-
.card(v-if='editing') {{ form }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useDisplayName, useProfile } from '../../composables'
export default defineComponent({
  name: 'ProfilePage',
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const profile = useProfile()
    const displayName = useDisplayName(profile)
    const router = useRouter()
    const properties = computed(() => profile.value?.collection.properties)

    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])
    const read = () =>
      profile.value &&
      router.replace({
        name: 'profile'
      })

    const edit = () =>
      profile.value &&
      router.replace({
        name: 'profile',
        params: {
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
      profile,
      form,
      properties,
      save,
      reset,
      cancel,
      edit,
      displayName
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
