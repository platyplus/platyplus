import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery, useResult } from '@vue/apollo-composable'
import { Ref, ref } from '@vue/composition-api'
import { ApolloQueryResult } from 'apollo-client'
import { unfold } from 'src/utils'

import { useItemMutation } from './item-mutation'
import { ObjectToVariablesFunction } from './single-item'

interface ListOptions<T, RList, RInsert, RRemove, VList, VInsert, VRemove> {
  list: TypedDocumentNode<RList, VList>
  insert?: TypedDocumentNode<RInsert, VInsert>
  remove?: TypedDocumentNode<RRemove, VRemove>
  dataToVariables?: ObjectToVariablesFunction<T, VInsert | VList | VRemove>
  sort?: (a: T, b: T) => number
  defaults: T
}

export const useItemList = <
  T extends Record<string, unknown>,
  RList extends Record<string, T[]>,
  RInsert extends Record<string, T>,
  RRemove extends Record<string, T>,
  VList extends Record<string, unknown>,
  VInsert extends Record<string, unknown>,
  VRemove extends Record<string, unknown>
>({
  list,
  remove,
  sort = () => 0,
  defaults
}: ListOptions<T, RList, RInsert, RRemove, VList, VInsert, VRemove>): {
  list: Readonly<Ref<readonly T[]>>
  loading: Ref<boolean>
  dataToVariables?: ObjectToVariablesFunction<T, VInsert | VList | VRemove>
  remove: (item: T) => Promise<void>
  onError: (
    fn: (param?: Error) => void
  ) => {
    off: () => void
  }
  onResult: (
    fn: (param?: ApolloQueryResult<RList> | undefined) => void
  ) => {
    off: () => void
  }
} =>
  // variables: Ref<VList>
  {
    // TODO subscriptions, queries, subscribe to more...
    // const query = options.list && buildQueryFromSelectionSet(options.list)
    const { result, onError, onResult, loading } = useQuery<RList>(list)
    const resultList = useResult<RList, T[], T[]>(result, [], (data) => {
      return unfold<RList, T[]>(list, data)
    })

    const item = ref<T>(defaults) as Ref<T>

    const removeItem =
      remove && useItemMutation(remove, 'delete', item, list, sort)

    const removeAction = async (object: T) => {
      item.value = object
      if (removeItem) {
        await removeItem.mutate()
      } else {
        // console.warn('Remove mutation is not defined')
      }
    }

    return {
      list: resultList,
      loading,
      remove: removeAction,
      onError,
      onResult
    }
  }
