import { CheckPickerProps, TagPickerProps } from 'rsuite'
import { FieldComponent } from '../utils'

export type CollectionFieldProps = {
  accepter: React.ComponentType<CheckPickerProps | TagPickerProps>
  component: string
} & (CheckPickerProps | TagPickerProps)

export type CollectionFieldComponent = FieldComponent<CollectionFieldProps>
