import { useCallback, useMemo } from 'react'
import { SelectPicker, Animation } from 'rsuite'
import { useRxData } from 'rxdb-hooks'

import { useDocumentProperties } from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'

import { DocumentFromParamsComponentWrapper } from '../../documents'
import { FieldComponent, FieldControl } from '../utils'
// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const [properties] = useDocumentProperties(document)
  const refCollectionName = properties.get(field).ref
  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )
  const { result } = useRxData<Contents>(refCollectionName, queryConstructor)

  const options = useMemo(
    () => result.map((doc) => ({ label: doc.label, value: doc.id })),
    [result]
  )

  return (
    <Animation.Fade in={!!document}>
      {(props, ref) => (
        <div {...props}>
          {edit ? (
            <FieldControl
              style={{ minWidth: 300 }}
              name={field}
              readOnly={!edit}
              data={options}
              cleanable={edit}
              accepter={SelectPicker}
            />
          ) : (
            <DocumentFromParamsComponentWrapper
              collectionName={refCollectionName}
              id={document[field]}
              componentName="label"
              edit={false}
            />
          )}
        </div>
      )}
    </Animation.Fade>
  )
}
