<template lang="pug">
select(v-if="editing" v-model="model")
  option(v-for="option in options" :value="option.id")
    document-label(:document="option") ..
div(v-else)
  document-label(:document="value")
</template>

<script lang="ts">
import { GenericDocument, GenericRxDocument } from '@platyplus/rxdb-hasura'
import { Subscription } from 'rxjs'
import {
  defineComponent,
  onMounted,
  onUnmounted,
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
    value: {
      type: Object as PropType<GenericRxDocument | null>,
      default: null
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
    const model = useFormProperty<number>(document, name)

    // TODO move to useOptions(document, propertyName)
    const options = ref<Array<GenericDocument>>([])
    const property = useProperty(document, name)
    const db = useDB()
    // TODO only subscribe when editing
    let subscription: Subscription | undefined
    onMounted(() => {
      const reCollectionName = property.value.ref as string
      const refCollection = db.value?.[reCollectionName]
      subscription = refCollection
        ?.find()
        .$.subscribe((e: GenericRxDocument[]) => {
          options.value = e
        })
    })
    onUnmounted(() => {
      subscription?.unsubscribe()
    })
    return { model, options }
  }
})
</script>
