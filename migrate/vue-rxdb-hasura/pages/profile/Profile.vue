<template lang="pug">
q-page
  q-card(v-if="profile")
    q-card-section(v-if="profile")
      h3 {{displayName}}
      q-btn-group(outline)
        q-btn(v-if="!editing" icon="fas fa-edit" label="Edit" @click="edit" outline color="primary")
        q-btn(v-if="editing" icon="fas fa-save" label="Save" @click="save" outline color="primary")
        q-btn(v-if="editing" icon="fas fa-undo" label="Reset" @click="reset" outline color="primary")
        q-btn(v-if="editing" icon="fas fa-times" label="Cancel" @click="cancel" outline color="primary")
      h-document(:document="profile" :editing="editing" type="details")
    q-card-section(v-else) loading profile... -{{profile}}-
  q-card(v-if='editing')
    q-card-section {{ form }}
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
