import { TagPicker } from 'rsuite'
import { FieldComponent } from '../utils'
import { CollectionField } from './wrapper'

export const CollectionTagField: FieldComponent = ({ ...props }) => (
  <CollectionField accepter={TagPicker} component="tag" {...props} />
)
