import { FormInstance } from 'rsuite/lib/Form'
import { MutableRefObject } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Animation, ButtonGroup, ButtonToolbar } from 'rsuite'

import { useQuery } from '@platyplus/navigation'
import {
  useDocumentPermissions,
  useFormHasChanged,
  useFormReset,
  useFormSave
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { IconButtonWithHelper, ICON_RED } from '@platyplus/layout'

export const DocumentToolbar: React.FC<{
  document?: ContentsDocument
  edit?: boolean
  formRef: MutableRefObject<FormInstance>
}> = ({ document, edit, formRef }) => {
  const query = useQuery()
  const editing = edit ?? query.has('edit')
  const location = useLocation()
  const history = useHistory()
  const hasChanged = useFormHasChanged(document)
  const reset = useFormReset(document)
  const save = useFormSave(document)

  const handleSave = async () => {
    if (formRef) {
      const check = await formRef.current.checkAsync()
      if (check.hasError) return
    }
    await save()
    history.replace(
      `/collection/${document.collection.name}/${document.primary}`
    )
  }

  const editDocument = () => history.replace(`${location.pathname}?edit`)
  const cancel = () => {
    // TODO confirm changes
    reset()
    if (document._isTemporary) history.goBack()
    else history.replace(location.pathname)
  }
  const removeDocument = async () => {
    // TODO prompt
    await document.remove()
    history.goBack()
  }
  const { canDelete, canEdit } = useDocumentPermissions(document)
  return (
    <Animation.Fade in={!!document}>
      {(props, ref) => (
        <div {...props}>
          <ButtonToolbar
            style={{
              float: 'right'
            }}
          >
            {editing ? (
              <ButtonGroup>
                <IconButtonWithHelper
                  icon="save"
                  helper="Save"
                  onClick={handleSave}
                  disabled={!hasChanged}
                />
                <IconButtonWithHelper
                  icon="undo"
                  helper="Reset"
                  onClick={reset}
                  disabled={!hasChanged}
                />
                <IconButtonWithHelper
                  icon="back-arrow"
                  helper="Cancel"
                  onClick={cancel}
                />
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                {canEdit && (
                  <IconButtonWithHelper
                    icon="edit"
                    helper="Edit"
                    onClick={editDocument}
                  />
                )}
                {canDelete && (
                  <IconButtonWithHelper
                    icon="trash"
                    helper="Delete"
                    iconProps={ICON_RED}
                    onClick={removeDocument}
                  />
                )}
              </ButtonGroup>
            )}
          </ButtonToolbar>
        </div>
      )}
    </Animation.Fade>
  )
}
