<template lang="pug">
Dropdown(v-model="model" :options="options" optionValue="id" placeholder="Select an item")
  template(#option="slotProps")
    document-label(:document="slotProps.option")
  template(#value="slotProps")
    document-label(:document="refDocument")
</template>

<script lang="ts">
import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs
} from 'vue'

import { useDB, useFormProperty, useProperty } from '../../../composables'
export default defineComponent({
  name: 'FieldEditDocument',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<string>(document, name)

    // TODO move to a new useOptions(document, propertyName) ?
    const options = ref<Array<Contents>>([])
    const property = useProperty(document, name)
    const refDocument = computed(() =>
      options.value.find(doc => doc.id === model.value)
    )

    const db = useDB()
    // ? Really necessary to pass through 'onMounted'?
    onMounted(() => {
      const refCollection = db.value?.[property.value.ref as string]
      refCollection &&
        useSubscription(refCollection.find().$.subscribe(toObserver(options)))
    })
    return { model, options, refDocument }
  }
})
</script>
