<template lang="pug">
div(v-if="document")
  q-btn(@click="save") Save
  q-field(label="Table schema" stack-label)
    template(#control)
      h-field-read(:document="document" name="table_schema")
  q-field(label="Table name" stack-label)
    template(#control)
      h-field-read(:document="document" name="table_name")
  q-field(label="Properties" stack-label)
    template(#control)
      q-list.col-12
        q-expansion-item(v-for="property in propertiesConfig"
            expand-separator 
            :icon="property.icon"
            :label="property.property_name"
            :key="property.property_name"
            :caption="property.description")
          q-card
            q-card-section {{property}}
  template(v-if="config")
    h-field-edit(:document="config"
      name="document_label"
      label="Label"
      placeholder="Handlebars template for a given document")
    h-field-edit(:document="config"
      name="title"
      label="Title"
      placeholder="Title of the collection")
    h-field-edit-icon(:document="config"
      name="icon"
      label="Icon"
      placeholder="Icon of the collection")
    h-field-edit(:document="config"
      name="description"
      label="Description"
      placeholder="Short description of the collection")
    h-field-edit(:document="config" name="document_title")
    q-select(v-model="component"
      clearable
      :options="componentOptions"
      label="Component"
      stack-label)
  div(v-else) loading config...
  div form {{form}}
div(v-else) loading document...
</template>

<script lang="ts">
import {
  ContentsCollection,
  ContentsDocument,
  getId,
  Metadata,
  metadataName} from '@platyplus/rxdb-hasura'
import {
  useComponentsList,
  useDB,
  useFormProperty,
  useRefFieldValue
} from '@platyplus/vue-rxdb-hasura'
import { asyncComputed } from '@vueuse/core'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { v4 as uuid } from 'uuid'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRefs,
  watchEffect
} from 'vue'
import { useStore } from 'vuex'

import { useDocument, useDocumentLabel } from '../../composables'

export default defineComponent({
  name: 'DocumentMetadataTable',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection | undefined>,
      default: undefined
    },
    id: {
      type: String as PropType<string | undefined>,
      default: undefined
    },
    document: {
      type: Object as PropType<ContentsDocument | undefined>,
      default: undefined
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { collection, id, document } = toRefs(props)
    const collectionDocument = useDocument(collection, id)
    const doc = computed(() => document.value || collectionDocument.value)
    const col = computed(() => doc.value?.collection)
    const properties = computed(() => col.value?.properties)

    const label = useDocumentLabel(document)
    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])

    const componentOptions = useComponentsList('h-collection-')
    const db = useDB()
    const existingConfig = useRefFieldValue(doc, 'config')
    const newConfig = ref<ContentsDocument | undefined>()
    // TODO make this generic for similar cases:
    // TODO - create object relationship of a document
    // TODO - add item to array relationship of a document
    const config = computed<ContentsDocument | undefined>(() => {
      if (existingConfig.value !== null) return existingConfig.value
      else {
        if (!newConfig.value) {
          const collectionName = `${doc.value.collection.role}_metadata_table_config`
          const configCollection = db.value?.[collectionName]
          const tableId = `${doc.value.table_schema}.${doc.value.table_name}`
          const storeContents =
            store.getters['rxdb/getCollection'](configCollection) || {}
          // * Get the id back from the forms, or use a default uuid
          const id =
            Object.entries(storeContents).find(
              ([id, doc]) => doc.table_id === tableId
            )?.[0] || uuid()
          // * Create a temporary document
          newConfig.value = configCollection.newDocument({ id })
          // * Store the table id in the new config document
          store.commit('rxdb/setField', {
            document: newConfig.value,
            field: 'table_id',
            value: tableId
          })
          // * Store the table config id in the table document
          store.commit('rxdb/setField', {
            document: doc.value,
            field: 'config',
            value: tableId
          })
        }
        return newConfig.value as ContentsDocument
      }
    })

    const { model: component } = useFormProperty<string>(config, 'component')

    const metadata = computed<Metadata | undefined>(
      () =>
        db.value?.[`${doc.value.collection.role}_${metadataName(doc.value)}`]
          .metadata
    )
    const tableProperties = computed<string[]>(() =>
      // TODO filter out columns/relationshios: reuse the logic from replication pull
      metadata.value
        ? [
            ...metadata.value.columns
              .map(({ column_name, udt_name }) => column_name)
              .filter(
                name =>
                  ![
                    getId(me.valuetadata.value),
                    'deleted',
                    'updated_at',
                    'created_at'
                  ].includes(name)
              ),
            ...metadata.value.relationships.map(
              ({ rel_name, rel_type }) => rel_name
            ),
            ...metadata.value.computedProperties.map(({ name }) => name)
          ]
        : []
    )

    const propertiesConfig = computed(() => {
      const existingConfig = metadata.value?.propertiesConfig || []
      return tableProperties.value.map(
        name =>
          existingConfig.find(
            ({ property_name }) => property_name === name
          ) || { property_name: name }
      )
    })

    const save = () => store.dispatch('rxdb/save')
    return {
      doc,
      label,
      properties,
      form,
      componentOptions,
      component,
      config,
      save,
      propertiesConfig
    }
  }
})
</script>

<style></style>
