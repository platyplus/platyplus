<template lang="pug">
Dropdown(v-if="editing" v-model="model" :options="options" optionValue="id" placeholder="Select an item")
  template(#option="slotProps")
    document-label(:document="slotProps.option")
  template(#value="slotProps")
    document-label(:document="refDocument")
div(v-else)
  document-label(:document="refDocument")
</template>

<script lang="ts">
import { GenericDocument, GenericRxDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs
} from 'vue'

import { useDB, useFormProperty, useProperty } from '../../composables'
export default defineComponent({
  name: 'FieldDocument',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model, changed } = useFormProperty<string>(document, name)

    // TODO move to a new useOptions(document, propertyName)
    const options = ref<Array<GenericDocument>>([])
    const property = useProperty(document, name)
    const refDocument = computed(() =>
      options.value.find(doc => doc.id === model.value)
    )

    const db = useDB()
    onMounted(() => {
      // TODO only subscribe when editing
      const refCollection = db.value?.[property.value.ref as string]
      refCollection &&
        useSubscription(refCollection.find().$.subscribe(toObserver(options)))
    })
    return { model, options, refDocument, changed }
  }
})
</script>
