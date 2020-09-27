import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery, UseQueryReturn } from '@vue/apollo-composable'
import { computed, Ref } from '@vue/composition-api'
import { buildQueryFromSelectionSet } from 'apollo-utilities'
import { getFieldNames, pick, unfold } from 'src/utils'

export const useItemSubscription = <
  T extends Record<string, unknown> | Array<Record<string, unknown>>,
  TResult extends Record<string, T>,
  TVariables
>(
  document: TypedDocumentNode<TResult, TVariables>,
  result: Ref<T | undefined>,
  defaults: T,
  variables?: Ref<TVariables>
): UseQueryReturn<TResult, Partial<TVariables>> => {
  const fields = getFieldNames(document)

  const pickedVariables = computed<Partial<TVariables>>(
    () => (variables && pick(variables.value, fields)) || {}
  )
  // ? probably not the best way to define isNew
  // ? deepequals defaults?
  const isNew = computed(() => {
    if (variables?.value) {
      const obj = (variables.value as unknown) as Record<string, unknown>
      return !obj.id
    } else return true
  })

  const query = document && buildQueryFromSelectionSet(document)
  const operation = useQuery<TResult, Partial<TVariables>>(
    query,
    pickedVariables,
    () => ({
      enabled: !isNew.value
    })
  )

  operation.subscribeToMore(() => ({
    document: document,
    variables: pickedVariables.value
  }))
  operation.onResult((res) => {
    if (res) {
      if (res?.data) {
        result.value = unfold<TResult, T>(document, res.data) || defaults
      } else {
        // console.log(res)
      }
    }
  })
  return operation
}
