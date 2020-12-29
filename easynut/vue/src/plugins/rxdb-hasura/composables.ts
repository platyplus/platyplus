import { useSubscription } from '@vueuse/rxjs'
import Handlebars from 'handlebars'
import { RxCollection, RxSchema } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import {
  computed,
  ComputedRef,
  inject,
  isRef,
  onMounted,
  provide,
  Ref,
  ref
} from 'vue'

import { TableFragment } from '../../generated'
import { RxHasuraDatabase } from './database'
import { DefaultRxDBKey, RxDBHasuraPlugin } from './plugin'
import { GenericDocument, GenericRxDocument } from './types'

export const useDB = (): ComputedRef<RxHasuraDatabase> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    if (!plugin?.db.value) throw Error('useDb: database not found')
    return plugin?.db.value
  })
}

export const useTables = (): ComputedRef<Record<string, TableFragment>> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    if (!plugin?.tables) throw Error('useTables: no tables found')
    return plugin.tables.value
  })
}

export const useTable = (
  name: string | Ref<string>
): ComputedRef<TableFragment> => {
  const tables = useTables()
  return computed(() => {
    const tableName = isRef(name) ? name.value : name
    const table = tables.value[tableName]
    if (!table) throw Error(`useTable: table ${tableName} not found`)
    return table
  })
}

export const useCollection = (
  name: string | Ref<string>
): ComputedRef<RxCollection | undefined> => {
  const db = useDB()
  return computed(() => db.value?.collections[isRef(name) ? name.value : name])
}

export const useDocumentCollection = (
  document: Ref<GenericRxDocument>
): ComputedRef<RxCollection> => computed(() => document.value.collection)

export const useCollections = (): ComputedRef<Record<string, RxCollection>> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    return plugin?.collections?.value || {}
  })
}

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
          // if (Array.isArray(newValue)) {
          //     // ! Basically redoing population by hand. not ideal
          //     // ! But on the other hand, populate need the ref document to be loaded to the DB
          // fieldValue.value = {}
          // for (const val of newValue) {
          //   const subscription = await props.document.collection.database.collections[
          //     property.value.ref
          //   ]
          //     .findOne(val)
          //     .$.subscribe(doc => {
          //       fieldValue.value[val] = doc
          //       if (doc) subscription.unsubscribe()
          //     })
          // }
          // } else {
          //   // ? Maybe same problem as for arrays
          //   const populatedValue = await props.document[`${props.name}_`]
          //   fieldValue.value = populatedValue
          // }
        } else {
          fieldValue.value = newValue
        }
      })
  )
  return computed(() => fieldValue.value)
}

export const useDocumentLabel = (props: {
  document?: GenericRxDocument
}): ComputedRef<string | null> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  const doc = ref<GenericDocument>()
  return computed(() => {
    if (props.document) {
      // ? cannot use useSubscription -> not unrerigstered on unmount. Problem?
      props.document.$.subscribe(async (newValue: GenericDocument) => {
        doc.value = newValue
      })
      const template =
        plugin?.tables.value[props.document.collection.name].config?.label ||
        '{{id}}'
      const compiledTemplate = Handlebars.compile(template, { noEscape: true })
      return compiledTemplate(
        // props.document?.toJSON ? props.document.toJSON() : props.document
        doc.value
      )
    } else return null
  })
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
  collection: Ref<RxCollection | any>
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

export const createForm = <T>(): Ref<Record<string, T>> => {
  const form = ref({})
  provide('form', form)
  return form
}

export const useFormProperty = <T>(
  name: Ref<string>,
  initialValue: Ref<T>
): Ref<T> => {
  const model = ref<T>() as Ref<T>
  const form = inject<Ref<GenericDocument>>('form', ref({}))
  onMounted(() => {
    form.value[name.value] = initialValue.value
    model.value = initialValue.value
  })
  return model
}
