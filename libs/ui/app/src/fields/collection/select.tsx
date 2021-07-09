import { CheckPicker } from 'rsuite'
import { FieldComponent } from '../types'

import { CollectionField } from './wrapper'

export const CollectionSelectField: FieldComponent = ({ ...props }) => (
  <CollectionField accepter={CheckPicker} component="label" {...props} />
)
