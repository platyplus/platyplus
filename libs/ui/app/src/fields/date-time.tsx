import { FieldComponent } from './types'

export const DateTimeField: FieldComponent = ({ document, field, edit }) => {
  return edit ? <div>$edit$ {document[field]}</div> : document[field]
}
