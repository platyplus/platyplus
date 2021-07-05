import { Toggle } from 'rsuite'

import { FieldComponent } from './types'

export const ToggleField: FieldComponent = ({ document, field, edit }) => {
  return edit ? (
    <div>$edit$ {document[field]}</div>
  ) : (
    <Toggle checked={document[field]} disabled />
  )
}
