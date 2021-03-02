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
  ContentsDocument,
  getId,
  Metadata,
  metadataName
} from '@platyplus/rxdb-hasura'
import {
  newDocumentFactory,
  useComponentsList,
  useDB,
  useFormProperty,
  useRefFieldValue
} from '@platyplus/vue-rxdb-hasura'
import { v4 as uuid } from 'uuid'
import { computed, defineComponent, PropType, Ref, ref, toRef } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DocumentMetadataTable',
  props: {
    document: {
      type: Object as PropType<ContentsDocument | undefined>,
      default: undefined
    },
    editing: {
      // TODO
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const document = toRef(props, 'document') as Ref<
      ContentsDocument | undefined
    >

    const store = useStore()
    const form = computed(() => store.getters['rxdb/form']) // TODO remove, debug only

    const componentOptions = useComponentsList('h-collection-')
    const db = useDB()
    const existingConfig = useRefFieldValue(document, 'config')
    const newConfig = ref<ContentsDocument | undefined>()
    // TODO make this generic for similar cases:
    // TODO - create object relationship of a document
    // TODO - add item to array relationship of a document
    const config = computed<ContentsDocument | undefined>(() => {
      if (existingConfig.value !== null) return existingConfig.value
      else {
        const doc = document.value
        if (!newConfig.value && doc) {
          const collectionName = `${doc.collection.role}_metadata_table_config`
          const configCollection = db.value?.[collectionName]
          if (configCollection) {
            const tableId = `${doc.table_schema}.${doc.table_name}`
            const storeContents: Record<string, ContentsDocument> =
              store.getters['rxdb/getCollection'](configCollection) || {}
            // * Get the id back from the forms, or use a default uuid
            const id =
              Object.entries(storeContents).find(
                ([, doc]) => doc.table_id === tableId
              )?.[0] || uuid()
            // * Create a temporary document
            // TODO side effect -> change computed config to watch/watchEffect
            newConfig.value = newDocumentFactory(configCollection, id)
            // * Store the table id in the new config document
            store.commit('rxdb/setField', {
              document: newConfig.value,
              field: 'table_id',
              value: tableId
            })
            // * Store the table config id in the table document
            store.commit('rxdb/setField', {
              document: document.value,
              field: 'config',
              value: tableId
            })
          }
        }
        return newConfig.value
      }
    })

    const { model: component } = useFormProperty<string>(config, 'component')

    const metadata = computed<Metadata | undefined>(() => {
      const doc = document.value
      return (
        doc &&
        db.value?.[`${doc.collection.role}_${metadataName(doc)}`]?.metadata
      )
    })

    const properties = computed<string[]>(() =>
      // TODO filter out columns/relationshios: reuse the logic from replication pull
      {
        const meta = metadata.value
        return meta
          ? [
              ...meta.columns
                .map(({ column_name, udt_name }) => column_name as string)
                .filter(
                  name =>
                    ![
                      getId(meta),
                      'deleted',
                      'updated_at',
                      'created_at'
                    ].includes(name)
                ),
              ...meta.relationships.map(
                ({ rel_name, rel_type }) => rel_name as string
              ),
              ...meta.computedProperties.map(({ name }) => name)
            ]
          : []
      }
    )

    const propertiesConfig = computed(() => {
      const existingConfig = metadata.value?.propertiesConfig || []
      return properties.value.map(
        name =>
          existingConfig.find(
            ({ property_name }) => property_name === name
          ) || { property_name: name }
      )
    })

    const save = () => store.dispatch('rxdb/save')
    return {
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
