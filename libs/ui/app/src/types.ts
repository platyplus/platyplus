import { CollectionComponent } from './collections/types'
import { FieldComponent } from './fields/types'

export type RoutesConfig = Partial<
  Record<
    'home' | 'login' | 'register' | 'notFound',
    { enabled?: boolean; title?: string }
  > & { title: string }
>

export type CollectionComponentsConfig = Record<string, CollectionComponent>
export type FieldComponentsConfig = Record<string, FieldComponent>

export type ComponentsConfig = {
  collections: CollectionComponentsConfig
  fields: FieldComponentsConfig
}

export type AppConfig = RoutesConfig & { components?: ComponentsConfig }
