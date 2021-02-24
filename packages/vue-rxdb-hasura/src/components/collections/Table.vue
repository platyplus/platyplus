<template lang="pug">
q-table(:columns="columns" :rows="documents" row-key="id" :grid="grid")
  // TODO https://next.quasar.dev/vue-components/table#Custom-top
  template(#body="props")
    q-tr(:props="props")
      q-td(v-for="col of props.cols" :key="col.name")
        h-field-edit-inline(v-if="editing && props.row.canEdit(col.name)"
          :document="props.row"
          :name="col.name"
          :inTable="true")
        h-field-read(v-else :document="props.row" :name="col.name")
  template(#item="props")
    div.q-pa-xs.col-xs-12.col-sm-6.col-md-4
      router-link(:to="{name: 'document', params: {collection: collection.name, id: props.row.id}}")
        q-card
          q-card-section
            h-document(:document="props.row" type="label")

</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { computed, defineComponent, PropType, ref, toRef } from 'vue'

import { useNewDocumentFactory } from '../../composables'

export default defineComponent({
  name: 'CollectionTable',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    grid: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const collection = toRef(props, 'collection')
    const { newDoc } = useNewDocumentFactory(collection)
    const properties = computed(() => collection.value.properties)
    const columns = computed(() =>
      [...properties.value.entries()].map(([key, value]) => ({
        name: key,
        required: value.required,
        label: collection.value.title(key),
        align: 'left',
        field: (row: Record<string, unknown>) => row[key],
        format: (val: unknown) => `${val}`,
        sortable: true
      }))
    )
    // TODO not sure it's optimised
    const documents = ref<ContentsDocument[]>([])
    useSubscription(
      props.collection
        .find()
        .sort('label')
        .$.subscribe(toObserver(documents))
    )

    // TODO canEditCollection
    return { properties, newDoc, documents, columns }
  }
})
</script>
