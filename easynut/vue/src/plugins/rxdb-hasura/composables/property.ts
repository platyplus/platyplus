import { useSubscription } from '@vueuse/rxjs'
import { RxSchema } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useStore } from 'vuex'

import {
  GenericDocument,
  GenericRxCollection,
  GenericRxDocument
} from '../types'
import { useDocumentCollection } from './collection'
import { useTable } from './table'

export const useFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>,
  name: Ref<string>
): ComputedRef<T> => {
  const property = useProperty(document, name)
  const fieldValue = ref()
  useSubscription(
    document.value
      .get$(name.value)
      .subscribe(async (newValue: GenericDocument) => {
        if (property.value.ref) {
          const populatedValue = await document.value.populate(name.value)
          fieldValue.value = populatedValue
        } else {
          fieldValue.value = newValue
        }
      })
  )
  return computed(() => fieldValue.value)
}

export const useProperty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>,
  name: Ref<string>
): ComputedRef<TopLevelProperty | PrimaryProperty> =>
  computed(
    () => document.value.collection.schema.jsonSchema.properties[name.value]
  )

export const useCollectionProperties = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: Ref<GenericRxCollection | any>
): ComputedRef<Record<string, TopLevelProperty | PrimaryProperty>> => {
  const name = computed(() => collection.value.name)
  const table = useTable(name)

  return computed(() => {
    const schema: RxSchema = collection.value.schema
    const properties = { ...schema.jsonSchema.properties }
    // * remove array aggregates from the property list
    table.value.relationships
      .filter(({ rel_type }) => rel_type === 'array')
      .forEach(({ rel_name }) => delete properties[`${rel_name}_aggregate`])
    // * remove primary key and other final fields as they can't be observed
    schema.finalFields.forEach(field => delete properties[field])
    // * remove 'system' properties
    delete properties._rev
    delete properties._attachments
    return properties
  })
}

export const useDocumentProperties = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>
): ComputedRef<Record<string, TopLevelProperty | PrimaryProperty>> => {
  const collection = useDocumentCollection(document)
  return useCollectionProperties(collection)
}

export const useFormProperty = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>,
  name: Ref<string>
): ComputedRef<T> => {
  const store = useStore()

  const model = computed<T>({
    get: () => store.getters['rxdb/getField'](document.value, name.value) as T,
    set: (value: T) => {
      store.commit('rxdb/setField', {
        document: document.value,
        field: name.value,
        value
      })
    }
  })
  return model
}
