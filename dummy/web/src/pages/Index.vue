<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { pick } from '@platyplus/data'
import { defineComponent, ref } from '@vue/composition-api'
import ExampleComponent from 'components/CompositionComponent.vue'
import { Meta, Todo } from 'components/models'

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ])
    const meta = ref<Meta>({
      totalCount: 1200,
    })
    console.log('example using a lerna package', pick({ a: 1, b: 2 }, ['a']))
    return { todos, meta }
  },
})
</script>
