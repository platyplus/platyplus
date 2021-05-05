import { jsonataPaths } from '@platyplus/jsonata-schema'
import decode from 'jwt-decode'

import { ContentsCollection } from './types'

export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// TODO consider moving to a dedicated package
export const httpUrlToWebSockeUrl = (url: string): string =>
  url.replace(/(http)(s)?:\/\//, 'ws$2://')

export const webSocketUrlToHttpUrl = (url: string): string =>
  url.replace(/(ws)(s)?:\/\//, 'http$2://')

export type FieldMapItem = FieldMap | true
export interface FieldMap {
  [key: string]: FieldMapItem
}

// * Generate query fields according to the loaded schema
// * It is meant to:
// * - avoid sending the details of GraphQL JSON fields
// * - systematically add default fields of properties (primary key and `deleted`)
const generateRxdbJsonataPaths = (
  schema: FieldMap,
  collection?: ContentsCollection
): FieldMap => {
  const subFields = Object.entries(schema).reduce<FieldMap>(
    (aggr, [key, value]) => {
      const ref = collection?.schema.jsonSchema.properties[key].ref
      if (collection && ref) {
        if (value === true) {
          aggr[key] = { [collection.schema.primaryPath]: true, deleted: true }
        } else
          aggr[key] = generateRxdbJsonataPaths(value, collection?.database[ref])
      } else aggr[key] = true

      return aggr
    },
    {}
  )
  return subFields
}

export const rxdbJsonataPaths = (
  expression: string,
  collection: ContentsCollection
): FieldMap => generateRxdbJsonataPaths(jsonataPaths(expression), collection)

export const objectSchemaToGraphqlFields = (
  schema: FieldMapItem,
  path = ''
): string => {
  if (typeof schema === 'object') {
    return `${path} { ${Object.entries(schema)
      .map(([key, value]) => {
        // TODO check ref collection through "collection[key]"
        return objectSchemaToGraphqlFields(value, key)
      })
      .join(', ')} }`
  } else {
    return path
  }
}

type Claims = Record<string, unknown> & {
  ['https://hasura.io/jwt/claims']: HasuraClaims
}
type HasuraClaims = {
  [key: string]: string | string[] | undefined
  'x-hasura-allowed-roles': string[]
  'x-hasura-default-role': string
}

export const hasuraClaims = (token: string): HasuraClaims =>
  decode<Claims>(token)['https://hasura.io/jwt/claims']

export const createHeaders = (
  role: string,
  token?: string
): Record<string, string> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    const hasura = hasuraClaims(token)
    const allowedRoles = hasura['x-hasura-allowed-roles']
    const defaultRole = hasura['x-hasura-default-role']
    if (role !== defaultRole && allowedRoles.includes(role))
      headers['x-hasura-role'] = role
  }
  return headers
}
