import {
  GenericRxCollection,
  GenericRxDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import equal from 'deep-equal'
import { RxSchema } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { mergeMap } from 'rxjs/operators'
import { computed, ComputedRef, Ref, ref, WritableComputedRef } from 'vue'
import { useStore } from 'vuex'

import { useDocumentCollection } from './collection'

export const useRefFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>,
  name: Ref<string>
): Readonly<Ref<Readonly<T>>> => {
  const property = useProperty(document, name)
  const fieldValue = ref()
  useSubscription(
    document.value
      .get$(name.value)
      .pipe(
        mergeMap(async value =>
          property.value.ref ? await document.value.populate(name.value) : value
        )
      )
      .subscribe(toObserver(fieldValue))
  )
  return fieldValue
}

export const useFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>,
  name: Ref<string>
): Readonly<Ref<Readonly<T>>> => {
  const fieldValue = ref()
  useSubscription(
    document.value.get$(name.value).subscribe(toObserver(fieldValue))
  )
  return fieldValue
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
  return computed(() => {
    const schema: RxSchema = collection.value.schema
    const metadata: Metadata = collection.value.metadata
    const properties = { ...schema.jsonSchema.properties }
    // * remove array aggregates from the property list
    metadata.relationships
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
): { model: WritableComputedRef<T>; changed: ComputedRef<boolean> } => {
  const fieldValue = useFieldValue<T>(document, name)
  const store = useStore()

  const model = computed<T>({
    get: () =>
      (store.getters['rxdb/getField'](document.value, name.value) as T) ??
      fieldValue.value,
    set: (value: T) => {
      store.commit('rxdb/setField', {
        document: document.value,
        field: name.value,
        value: !equal(fieldValue.value, value) ? value : value ?? undefined
      })
    }
  })
  const changed = computed(
    () =>
      store.getters['rxdb/getField'](document.value, name.value) !==
        undefined &&
      !equal(
        fieldValue.value,
        store.getters['rxdb/getField'](document.value, name.value)
      )
  )
  return { model, changed }
}
