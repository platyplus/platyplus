import { CollectionSettings } from '../types'

import { query, mutation, subscription } from './graphql'
import { schema } from './schema'

export const appConfig: CollectionSettings = {
  query,
  mutation,
  subscription,
  schema
}
