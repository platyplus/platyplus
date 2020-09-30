import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  DocumentNode,
  FieldDefinitionNode,
  OperationDefinitionNode,
  TypeNode,
  VariableDefinitionNode
} from 'graphql'

export const SCALARS = {
  ID: 'string',
  String: 'string',
  Boolean: 'boolean',
  Int: 'number',
  Float: 'number',
  citext: 'string',
  jsonb: 'json',
  smallint: 'number',
  timestamptz: 'data',
  uuid: 'string'
}

export type FieldDefinition = {
  required: boolean
  multiple: boolean
  type: string
  // definition: FieldDefinitionNode
}

const getType = (type: TypeNode | VariableDefinitionNode): string => {
  if (type.kind === 'NamedType') return type.name.value
  // else if (type.kind === 'ListType') return JSON.stringify(type.type)
  else return getType(type.type)
}

const getFieldDefinition = (
  fieldDefinition: FieldDefinitionNode | VariableDefinitionNode
) => ({
  required: fieldDefinition.type.kind === 'NonNullType',
  multiple: fieldDefinition.type.kind === 'ListType',
  type: getType(fieldDefinition.type)
})

export const getFields = <TData, TVariables>(
  document?: TypedDocumentNode<TData, TVariables>
): Record<keyof TVariables, FieldDefinition> => {
  const definitions = document?.definitions.find(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode
  return definitions.variableDefinitions?.reduce(
    (previous, current) => (
      (previous[current.variable.name.value] = getFieldDefinition(current)),
      previous
    ),
    {} as Record<string, FieldDefinition>
  ) as Record<keyof TVariables, FieldDefinition>
}

export const getFieldNames = <TData, TVariables>(
  document?: TypedDocumentNode<TData, TVariables>
): (keyof TVariables)[] => {
  const definitions = document?.definitions.find(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode
  return definitions.variableDefinitions?.map(
    (variable) => variable.variable.name.value
  ) as (keyof TVariables)[]
}

const getSelectionKey = (document: DocumentNode) => {
  const definition = document.definitions.find(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode | undefined
  if (!definition || !definition.name)
    throw Error('Operation has no definition or name')
  const selection = definition.selectionSet.selections[0]
  if (selection.kind !== 'Field')
    throw Error(
      `Invalid selection kind in ${definition.name.value} : ${selection.kind}`
    )
  return selection.name.value
}

export const fold = <TResult extends Record<string, T>, T>(
  document: TypedDocumentNode<TResult, unknown>,
  item: T
): TResult => {
  const key = getSelectionKey(document)
  return {
    [key]: item
  } as TResult
}

export const unfold = <TResult extends Record<string, T>, T>(
  document: TypedDocumentNode<TResult, unknown>,
  result: TResult
): T => {
  const key = getSelectionKey(document)
  return result[key]
}
