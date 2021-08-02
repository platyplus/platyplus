import { CheckPicker } from 'rsuite'
import { CollectionFieldComponent } from './types'

import { CollectionField } from './wrapper'

export const CollectionSelectField: CollectionFieldComponent = ({
  ...props
}) => <CollectionField accepter={CheckPicker} component="label" {...props} />
