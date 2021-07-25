import { CheckPicker } from 'rsuite'
import { FieldComponent } from '../utils'

import { CollectionField } from './wrapper'

export const CollectionSelectField: FieldComponent = ({ ...props }) => (
  <CollectionField accepter={CheckPicker} component="label" {...props} />
)
