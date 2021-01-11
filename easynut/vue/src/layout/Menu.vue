<template lang="pug">
.layout-menu-container
  Submenu(:items="model" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Submenu from './Submenu.vue'
export default defineComponent({
  components: { Submenu },
  props: {
    model: {
      type: Array as PropType<Array<unknown>>,
      default: []
    }
  },
  emits: ['menuitem-click'],
  setup(_, { emit }) {
    const onMenuItemClick = (event: Event) => {
      emit('menuitem-click', event)
    }
    return { onMenuItemClick }
  }
})
</script>

<style scoped></style>
