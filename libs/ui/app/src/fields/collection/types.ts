import { ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'
import { CheckPickerProps, TagPickerProps } from 'rsuite'
import { FieldComponent } from '../utils'

export type CollectionFieldProps = {
  accepter: React.ComponentType<CheckPickerProps | TagPickerProps>
  metadata: Metadata
  initial: ContentsDocument[]
  component: string
} & (CheckPickerProps | TagPickerProps)

export type CollectionFieldComponent = FieldComponent<CollectionFieldProps>
