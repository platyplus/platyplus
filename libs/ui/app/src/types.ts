import { PropertyType } from '@platyplus/rxdb-hasura'
import { CollectionComponent } from './collections/types'
import { DocumentComponent } from './documents/types'
import { FieldComponent } from './fields/types'

export type RoutesConfig = Partial<
  Record<
    'home' | 'login' | 'register' | 'profile' | 'notFound',
    { enabled?: boolean; title?: string }
  > & { title: string }
>

export type CollectionComponentsConfig = Record<string, CollectionComponent>
export type FieldComponentsConfig = Partial<
  Record<PropertyType, Record<string, FieldComponent>>
>
export type DocumentComponentsConfig = Record<string, DocumentComponent>

export type ComponentsConfig = {
  collections: CollectionComponentsConfig
  fields: FieldComponentsConfig
  documents: DocumentComponentsConfig
}

export type AppConfig = RoutesConfig & { components?: ComponentsConfig }
