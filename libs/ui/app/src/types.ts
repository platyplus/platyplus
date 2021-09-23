import { PropertyType } from '@platyplus/rxdb-hasura'
import { CollectionComponent } from './collections/types'
import { DocumentComponent } from './documents/types'
import { FieldComponent } from './fields'
export type RouteConfig = { enabled?: boolean; title?: string }
export type RoutesConfig = Partial<
  Record<
    'home' | 'login' | 'register' | 'profile' | 'notFound',
    RouteConfig
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

export type AppSettings = {
  components?: ComponentsConfig
} & RoutesConfig

export type JSONAppConfig = {
  hasuraUrl: string | { prefix: string }
  authUrl: string | { prefix: string }
} & AppSettings

export type AppConfig = {
  hasuraUrl: string
  authUrl: string
} & AppSettings
