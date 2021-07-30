import produce from 'immer'
import gql from 'graphql-tag'
import { MetadataStore, metadataStore } from '../../store'
import { CollectionConfig } from '../types'

export const appConfig: CollectionConfig = {
  query: gql`
    query appConfig($updated_at: timestamptz!, $batchSize: Int!) {
      metadata_app_config(
        where: { updated_at: { _gt: $updated_at } }
        limit: $batchSize
        order_by: [{ updated_at: asc }, { id: asc }]
      ) {
        id
        updated_at
        menu_order
        deleted
      }
    }
  `,
  mutation: gql`
    mutation insertMetadataAppConfig(
      $objects: [metadata_table_config_insert_input!]!
    ) {
      insert_metadata_app_config(
        objects: $objects
        on_conflict: {
          constraint: app_config_pkey
          update_columns: [deleted, menu_order]
        }
      ) {
        returning {
          id
        }
      }
    }
  `,
  subscription: gql`
    subscription onAppConfig($now: timestamptz!) {
      metadata_app_config(
        where: { updated_at: { _gt: $now } }
        order_by: { updated_at: asc }
      ) {
        updated_at
      }
    }
  `,
  schema: {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      updated_at: {
        type: 'string'
      },
      menu_order: {
        type: ['array', 'null'],
        items: {
          type: 'string'
        }
      }
    },
    indexes: ['updated_at'],
    required: ['id']
  },
  onUpsert: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        state.config.app = doc
      })
    )
  },
  onDelete: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        delete state.config.app
      })
    )
  }
}
