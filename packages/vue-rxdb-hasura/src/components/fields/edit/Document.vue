<template lang="pug">
q-select(v-model="model"
  :clearable="clearable"
  :options="options"
  :label="title"
  emit-value
  option-value="id"
  stack-label)
  template(#selected)
    h-document(v-if="model" :document="refDocument" type="label")
  template(#option="scope")
    q-item(v-bind="scope.itemProps")
      q-item-section
        q-item-label
          h-document(v-if="scope.opt" :document="scope.opt" type="label")
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
    const { model, title } = useFormProperty<string | null>(document, name)

    // TODO move to a new useOptions(document, propertyName) ?
    const options = ref<Array<Contents>>([])
    const property = useProperty(document, name)

    const refDocument = computed(
      () => model.value && options.value.find(doc => doc.id === model.value)
    )
    // TODO clearable - problem is in the way null/undefined values are handled in the store
    // TODO clearable -> related to permissions as well
    const clearable = computed(() => property.value.type?.includes('null'))
    const db = useDB()
    // ? Really necessary to pass through 'onMounted'?
    onMounted(() => {
      const refCollection = db.value?.[property.value.ref as string]
      refCollection &&
        useSubscription(
          refCollection.find().sort('label').$.subscribe(toObserver(options))
        )
    })
    return { model, options, refDocument, clearable, title }
  }
})
</script>
