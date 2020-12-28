import { useSubscription } from '@vueuse/rxjs'
import Handlebars from 'handlebars'
import { RxCollection, RxDocument, RxSchema } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { computed, ComputedRef, inject, isRef, Ref, ref } from 'vue'

import { TableFragment } from '../../generated'
import { RxHasuraDatabase } from './database'
import { DefaultRxDBKey, RxDBHasuraPlugin } from './plugin'

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

export const useCollections = (): ComputedRef<Record<string, RxCollection>> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    return plugin?.collections?.value || {}
  })
}

export const useFieldValue = <T>(props: {
  document: RxDocument<Record<string, unknown>>
  name: string
}): ComputedRef<T> => {
  const property = useProperty(props)
  const fieldValue = ref()
  useSubscription(
    props.document.get$(props.name).subscribe(async newValue => {
      if (property.value.ref) {
        const populatedValue = await props.document.populate(props.name)
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
  document?: RxDocument<Record<string, unknown>>
}): ComputedRef<string | null> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  const doc = ref<Record<string, unknown>>()
  return computed(() => {
    if (props.document) {
      // ? cannot use useSubscription -> not unrerigstered on unmount. Problem?
      props.document.$.subscribe(async newValue => {
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

export const useProperty = (props: {
  document: RxDocument<Record<string, unknown>>
  name: string
}): ComputedRef<TopLevelProperty | PrimaryProperty> =>
  computed(
    () => props.document.collection.schema.jsonSchema.properties[props.name]
  )

/**
 *
 * @param props a props reactive object with either a RxCollection `collection` or a RxDocument `document` property
 */
export const useProperties = (props: {
  collection?: RxCollection
  document?: RxDocument<Record<string, unknown>>
}): ComputedRef<Record<string, TopLevelProperty | PrimaryProperty>> => {
  const collection = computed(() => {
    const collection = props.collection || props.document?.collection
    if (!collection)
      throw Error(
        'useProperties: no collection not document found in props param'
      )
    return collection
  })
  const name = computed(() => collection.value.name)
  const table = useTable(name)

  return computed(() => {
    const schema: RxSchema | undefined = collection.value.schema
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
