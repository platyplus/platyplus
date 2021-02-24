<template lang="pug">
q-select(v-model="filteredModel"
  multiple
  :options="options"
  :label="title"
  emit-value
  option-value="id"
  stack-label)
  template(#selected)
    q-chip(removable v-if="filteredModel && filteredModel.length" v-for="id in filteredModel" @remove="remove(id)")
      h-document(:document="optionDocument(id)" type="label" )
    div(v-else) &nbsp;
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
  name: 'FieldEditCollection',
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
    const { model, title } = useFormProperty<string[] | undefined>(
      document,
      name
    )
    const db = useDB()
    const property = useProperty(document, name)
    // * filter out removed references
    const filteredModel = computed<string[]>({
      get: () =>
        model.value?.filter(id =>
          options.value.find(option => option.id === id)
        ) || [],
      set: (val: string[]) => {
        model.value = val
      }
    })
    // TODO move to a new useOptions(document, propertyName) ?
    const options = ref<Array<Contents>>([])
    const optionDocument = (id: string) =>
      options.value.find(option => option.id === id)

    const remove = (id: string) => {
      model.value = model.value?.filter(curs => curs !== id)
    }
    // ? Really necessary to pass through 'onMounted'?
    onMounted(() => {
      const refCollection = db.value?.[property.value.ref as string]
      refCollection &&
        useSubscription(
          refCollection
            .find()
            .sort('label')
            .$.subscribe(toObserver(options))
        )
    })
    return { filteredModel, options, optionDocument, remove, title }
  }
})
</script>
