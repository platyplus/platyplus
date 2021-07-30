import produce from 'immer'
import gql from 'graphql-tag'
import { CollectionConfig } from '../types'
import { MetadataStore, metadataStore } from '../../store'

export const propertyConfig: CollectionConfig = {
  query: gql`
    query propertyConfig($updated_at: timestamptz!, $batchSize: Int!) {
      metadata_property_config(
        where: { updated_at: { _gt: $updated_at } }
        limit: $batchSize
        order_by: [{ updated_at: asc }, { id: asc }]
      ) {
        id
        property_id
        updated_at
        table_id
        deleted
        property_name
        component
        json_schema
        icon
        description
        title
      }
    }
  `,
  mutation: gql`
    mutation insertMetadataPropertyConfig(
      $objects: [metadata_property_config_insert_input!]!
    ) {
      insert_metadata_property_config(
        objects: $objects
        on_conflict: {
          constraint: property_config_property_id_key
          update_columns: [
            table_id
            deleted
            property_name
            component
            json_schema
            icon
            description
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
    subscription onPropertyConfig($now: timestamptz!) {
      metadata_property_config(
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
      property_id: {
        type: 'string'
      },
      table_id: {
        type: ['string', 'null']
      },
      property_name: {
        type: ['string', 'null']
      },
      component: {
        type: ['string', 'null']
      },
      json_schema: {
        type: ['object', 'null']
      },
      icon: {
        type: ['string', 'null']
      },
      title: {
        type: ['string', 'null']
      },
      description: {
        type: ['string', 'null']
      }
    },
    indexes: ['updated_at'],
    required: ['id']
  },
  onUpsert: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        state.config.properties[doc.property_id] = doc
      })
    )
  },
  onDelete: (doc) => {
    metadataStore.setState(
      produce<MetadataStore>((state) => {
        delete state.config.properties[doc.property_id]
      })
    )
  }
}
