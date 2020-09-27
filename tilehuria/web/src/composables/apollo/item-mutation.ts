import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useMutation, UseMutationReturn } from '@vue/apollo-composable'
import { Ref } from '@vue/composition-api'
import { fold, getFieldNames, pick, unfold } from 'src/utils'

import { copyObject, ObjectToVariablesFunction } from '.'

export const useItemMutation = <
  T extends Record<string, unknown>,
  TResult extends Record<string, T>,
  TVariables,
  RList extends Record<string, T[]>,
  VList
>(
  document: TypedDocumentNode<TResult, TVariables>,
  type: 'insert' | 'update' | 'delete',
  item: Ref<T>,
  list?: TypedDocumentNode<RList, VList>,
  sort: (a: T, b: T) => number = () => 0,
  initialItem?: Ref<T>,
  dataToVariables: ObjectToVariablesFunction<T, TVariables> = copyObject
): UseMutationReturn<TResult, TVariables> & {
  fields: (keyof TVariables)[]
} => {
  const fields = getFieldNames(document)
  const mutation = useMutation<TResult, TVariables>(document, () => ({
    // variables: variables.value,
    update: (cache, { data }) => {
      // TODO cache one single element
      if (data) {
        const result = unfold<TResult, T>(document, data)
        if (list) {
          const cachedQuery = cache.readQuery<RList>({
            query: list
          })
          if (cachedQuery) {
            const cachedList = unfold<RList, T[]>(list, cachedQuery)
            if (cachedList) {
              let newList = [...cachedList]
              if (type === 'insert') {
                newList.push(result)
                newList = newList.sort(sort)
              } else if (type === 'update') {
                // TODO custom id key(s)
                newList = newList.map((cursor) =>
                  cursor.id === result.id ? result : cursor
                )
              } else if (type === 'delete') {
                // TODO custom id key(s)
                newList = newList.filter((cursor) => cursor.id !== result.id)
              }
              cache.writeQuery({
                query: list,
                data: fold(list, newList.sort(sort))
              })
            }
          }
        }
        return result
      }
    }
  }))
  mutation?.onDone((res) => {
    if (res?.data) {
      const unfolded = unfold<TResult, T>(document, res.data)
      item.value = item.value ? { ...item.value, ...unfolded } : { ...unfolded }
      if (initialItem) initialItem.value = { ...item.value }
    }
  })
  const mutate = async () => {
    const variables = dataToVariables(item.value, initialItem?.value)
    return await mutation.mutate(pick(variables, fields))
  }
  return { ...mutation, mutate, fields }
}
