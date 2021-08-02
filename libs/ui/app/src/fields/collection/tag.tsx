import { TagPicker } from 'rsuite'
import { FieldComponent } from '../utils'
import { CollectionFieldProps } from './types'
import { CollectionField } from './wrapper'

export const CollectionTagField: FieldComponent<CollectionFieldProps> = ({
  ...props
}) => <CollectionField accepter={TagPicker} component="tag" {...props} />
