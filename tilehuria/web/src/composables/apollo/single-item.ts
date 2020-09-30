import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { computed, Ref, ref } from '@vue/composition-api'
import { FetchResult } from 'apollo-link'
import { useFormEditor, useItemSubscription } from 'src/composables'

import { useItemMutation } from './item-mutation'

export type ObjectToVariablesFunction<T, U> = (
  object: T,
  initialObject: T | undefined
) => U

export const copyObject = <T extends Record<string, unknown>, U>(
  object: T
): U => ({ ...object } as U)

interface ItemOptions<
  T,
  RQuery,
  RInsert,
  RUpdate,
  RList,
  RRemove,
  VQuery,
  VInsert,
  VUpdate,
  VList,
  VRemove
> {
  subscription?: TypedDocumentNode<RQuery, VQuery>
  insert?: TypedDocumentNode<RInsert, VInsert>
  update?: TypedDocumentNode<RUpdate, VUpdate>
  list?: TypedDocumentNode<RList, VList>
  remove?: TypedDocumentNode<RRemove, VRemove>
  dataToVariables?: ObjectToVariablesFunction<
    T,
    VQuery | VInsert | VUpdate | VList | VRemove
  >
  sort?: (a: T, b: T) => number
  defaults: T
}

export const useSingleItem = <
  T extends Record<string, unknown>,
  RQuery extends Record<string, T>,
  RInsert extends Record<string, T>,
  RUpdate extends Record<string, T>,
  RList extends Record<string, T[]>,
  RRemove extends Record<string, T>,
  VQuery extends Record<string, unknown>,
  VInsert extends Record<string, unknown>,
  VUpdate extends Record<string, unknown>,
  VList extends Record<string, unknown>,
  VRemove extends Record<string, unknown>
>(
  {
    subscription,
    insert,
    update,
    list,
    defaults,
    sort = () => 0,
    dataToVariables = copyObject
  }: ItemOptions<
    T,
    RQuery,
    RInsert,
    RUpdate,
    RList,
    RRemove,
    VQuery,
    VInsert,
    VUpdate,
    VList,
    VRemove
  >,
  formDefaults?: Partial<T>
): {
  item: Ref<T>
  isNew: Readonly<Ref<boolean>>
  values: Ref<T>
  loading: Readonly<Ref<boolean>>
  editing: Readonly<Ref<boolean>>
  save: () => Promise<void>
  edit: () => void
  cancel: () => void
  reset: () => void
  onSaved: (
    fn: (
      param?: FetchResult<
        RInsert | RUpdate,
        Record<string, unknown>,
        Record<string, unknown>
      >
    ) => void
  ) => void
  onError: (fn: (param?: Error) => void) => void
} => {
  const mergedDefaults = { ...defaults, ...formDefaults } as T
  const item = ref<T>(mergedDefaults) as Ref<T>

  const isNew = computed(
    // TODO not ideal - won't likely work e.g. when updating after the id has just been added from an insert
    // ? deepequals defauls?
    () => !item.value.id
  )

  const { editing, save, edit, cancel, reset, values } = useFormEditor<T>(
    item,
    {
      edit: isNew.value,
      save: async () => {
        if (isNew.value) await insertOp?.mutate()
        else await updateOp?.mutate()
      }
    }
  )

  const subscriptionOp =
    subscription &&
    useItemSubscription(
      subscription,
      item,
      mergedDefaults,
      computed(() => dataToVariables(item.value, mergedDefaults))
    )
  const insertOp =
    insert &&
    useItemMutation(insert, 'insert', values, list, sort, item, dataToVariables)
  const updateOp =
    update &&
    useItemMutation(update, 'update', values, list, sort, item, dataToVariables)

  const loading = computed<boolean>(
    () => !!subscriptionOp?.loading.value && !item.value
  )

  const onSaved = (
    fn: (
      param?: FetchResult<
        RInsert | RUpdate,
        Record<string, unknown>,
        Record<string, unknown>
      >
    ) => void
  ) => {
    insertOp?.onDone(fn)
    updateOp?.onDone(fn)
  }

  const onError = (fn: (param?: Error) => void) => {
    subscriptionOp?.onError(fn)
    insertOp?.onError(fn)
    updateOp?.onError(fn)
  }

  return {
    item,
    isNew,
    values,
    loading,
    editing,
    save,
    edit,
    cancel,
    reset,
    onSaved,
    onError
  }
}
