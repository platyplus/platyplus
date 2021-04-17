<template lang="pug">
ul(v-if='items')
  template(v-for='(item,i) of items')
    li(v-if='visible(item) && !item.separator' :key='i' :class="[{'active-menuitem': activeIndex === i && !item.to && !item.disabled}]" role='none')
      .arrow(v-if='item.items && root===true')
      router-link(v-if='item.to' :to='item.to' :class="[item.class, 'p-ripple',{'active-route': activeIndex === i, 'p-disabled': item.disabled}]" :style='item.style' @click='onItemClick($event,item,i)' :target='item.target' exact='' role='menuitem' v-ripple='')
        i(:class='item.icon')
        span {{item.label}}
        i.pi.pi-fw.pi-angle-down.menuitem-toggle-icon(v-if='item.items')
        span.menuitem-badge(v-if='item.badge') {{item.badge}}
      a(v-if='!item.to' :href="item.url||'#'" :style='item.style' :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" @click='onItemClick($event,item,i)' :target='item.target' role='menuitem' v-ripple='')
        i(:class='item.icon')
        span {{item.label}}
        i.pi.pi-fw.pi-angle-down.menuitem-toggle-icon(v-if='item.items')
        span.menuitem-badge(v-if='item.badge') {{item.badge}}
      transition(name='layout-submenu-wrapper')
        h-submenu(v-show='activeIndex === i' :items='visible(item) && item.items' @item-click="$emit('item-click', $event)")
    li.p-menu-separator(:style='item.style' v-if='visible(item) && item.separator' :key="'separator' + i" role='separator')

</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'Submenu',
  props: {
    items: {
      type: Array as PropType<Array<unknown>>,
      default: () => []
    },
    root: {
      type: Boolean,
      default: false
    }
  },
  emits: ['item-click'],
  setup(_, { emit }) {
    const activeIndex = ref<number>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onItemClick = (event: Event, item: any, index: number) => {
      if (item.disabled) {
        event.preventDefault()
        return
      }

      if (!item.to && !item.url) {
        event.preventDefault()
      }

      //execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item })
      }

      activeIndex.value = index === activeIndex.value ? undefined : index

      emit('item-click', {
        originalEvent: event,
        item: item
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visible = (item: any) => {
      return typeof item.visible === 'function'
        ? item.visible()
        : item.visible !== false
    }
    return { activeIndex, onItemClick, visible }
  }
})
</script>

<style scoped></style>
