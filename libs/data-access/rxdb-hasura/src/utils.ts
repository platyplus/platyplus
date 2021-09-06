import { isRxDocument, RxDocument } from 'rxdb'
import { DeepReadonly } from 'rxdb/dist/types/types'
import clone from 'clone-deep'
import { DocumentNode } from 'graphql'
import decode from 'jwt-decode'

import { jsonataPaths } from '@platyplus/jsonata-schema'

import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  TableInfo
} from './types'
import { debug } from './console'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type FieldMapItem = FieldMap | true
export interface FieldMap {
  [key: string]: FieldMapItem
}

export const tableName = ({
  metadata: {
    table: { schema, name }
  }
}: Partial<TableInfo>): string =>
  schema === 'public' ? `${name}` : `${schema}_${name}`

export const collectionName = (tableInfo: Partial<TableInfo>, role: string) =>
  `${role}_${tableName(tableInfo)}`

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
  token?: string,
  substituteRole?: string
): Record<string, string> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    const hasura = hasuraClaims(token)
    const allowedRoles = hasura['x-hasura-allowed-roles']
    const defaultRole = hasura['x-hasura-default-role']
    if (substituteRole && allowedRoles.includes(substituteRole))
      headers['x-hasura-role'] = substituteRole
    else if (role !== defaultRole && allowedRoles.includes(role))
      headers['x-hasura-role'] = role
  }
  return headers
}

export const queryToSubscription = (query: DocumentNode): DocumentNode => {
  const result: typeof query = clone(query)
  result.definitions.forEach((definition) => {
    if (definition.kind === 'OperationDefinition') {
      ;(definition.operation as string) = 'subscription'
    }
  })
  return result
}

export const documentContents = <T>(doc: T | RxDocument<T>): DeepReadonly<T> =>
  isRxDocument(doc) ? (doc as RxDocument<T>).toJSON() : (doc as DeepReadonly<T>)

export const populateDocument = async (
  doc: ContentsDocument
): Promise<Contents> => {
  const result = clone(doc)
  for (const field of doc.collection.schema.topLevelFields) {
    if (doc.collection.schema.jsonSchema.properties[field].ref) {
      const population = await doc.populate(field)
      result[field] =
        population &&
        (Array.isArray(population)
          ? population.map((item) => item.toJSON())
          : population.toJSON())
    }
  }
  return result
}

export const tableRoles = (table: Partial<TableInfo>): string[] => {
  const roles: string[] = []
  table.metadata.select_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  table.metadata.insert_permissions?.forEach((p) => {
    if (!roles.includes(p.role)) roles.push(p.role)
  })
  return roles
}

export const removeCollection = async (collection: ContentsCollection) => {
  debug(`[${collection.name}] remove collection`)
  // await collection.replicator.destroy()
  // await db.removeCollectionDoc(name, previousSchema)
  // await collection.destroy()
  await collection.replicator.destroy()
  await collection.database.removeCollectionDoc(
    collection.name,
    collection.schema.jsonSchema
  )
  await collection.destroy()
}
