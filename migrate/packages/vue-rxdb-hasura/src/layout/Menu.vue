<template lang="pug">
.layout-menu-container
  h-submenu(:items="model" class="layout-menu" :root="true" @item-click="onItemClick")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Submenu from './Submenu.vue'
export default defineComponent({
  name: 'Menu',
  components: { Submenu },
  props: {
    model: {
      type: Array as PropType<Array<unknown>>,
      default: () => []
    }
  },
  emits: ['item-click'],
  setup(_, { emit }) {
    const onItemClick = (event: Event) => {
      emit('item-click', event)
    }
    return { onItemClick }
  }
})
</script>

<style scoped></style>
