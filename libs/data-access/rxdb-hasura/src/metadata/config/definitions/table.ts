import produce from 'immer'
import gql from 'graphql-tag'
import { MetadataStore, metadataStore } from '../../store'
import { CollectionConfig } from '../types'

export const tableConfig: CollectionConfig = {
  query: gql`
    query tableConfig($updated_at: timestamptz!, $batchSize: Int!) {
      metadata_table_config(
        where: { updated_at: { _gt: $updated_at } }
        limit: $batchSize
        order_by: [{ updated_at: asc }, { id: asc }]
      ) {
        id
        updated_at
        table_id
        deleted
        component
        description
        document_label
        document_title
        icon
        order
        title
      }
    }
  `,
  mutation: gql`
    mutation insertMetadataTableConfig(
      $objects: [metadata_table_config_insert_input!]!
    ) {
      insert_metadata_table_config(
        objects: $objects
        on_conflict: {
          constraint: table_config_table_id_key
          update_columns: [
            deleted
            component
            description
            document_label
            document_title
            icon
            order
            title
          ]
        }
      ) {
        returning {
          id
        }
      }
    }
  `,
  subscription: gql`
    subscription onTableConfig($now: timestamptz!) {
      metadata_table_config(
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
      // deleted
      table_id: {
        type: 'string'
      },
      component: {
        type: ['string', 'null']
      },
      description: {
        type: ['string', 'null']
      },
      document_label: {
        type: ['string', 'null']
      },
      document_title: {
        type: ['string', 'null']
      },
      icon: {
        type: ['string', 'null']
      },
      order: {
        type: ['array', 'null'],
        items: {
          type: 'string'
        }
      },
      title: {
        type: ['string', 'null']
      }
    },
    indexes: ['updated_at'],
    required: ['id']
  },
  onUpsert: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        state.config.tables[doc.table_id] = doc
      })
    )
  },
  onDelete: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        delete state.config.tables[doc.table_id]
      })
    )
  }
}
