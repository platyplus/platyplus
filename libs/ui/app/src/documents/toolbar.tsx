import { FormInstance } from 'rsuite/lib/Form'
import { MutableRefObject } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Animation, ButtonGroup, ButtonToolbar } from 'rsuite'

import { useQuery } from '@platyplus/navigation'
import {
  useDocumentPermissions,
  useFormHasChanged,
  useFormReset,
  useFormSave
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument, TableInformation } from '@platyplus/rxdb-hasura'
import { IconButtonWithHelper, ICON_RED } from '@platyplus/layout'

export const DocumentToolbar: React.FC<{
  tableinfo: TableInformation
  role: string
  document?: ContentsDocument
  edit?: boolean
  href?: string
  formRef?: MutableRefObject<FormInstance>
}> = ({ tableinfo, role, document, edit, href, formRef }) => {
  const query = useQuery()
  const editing = edit ?? query.has('edit')
  const location = useLocation()
  const navigate = useNavigate()
  const hasChanged = useFormHasChanged(tableinfo, role, document)
  const reset = useFormReset(tableinfo, role, document)
  const { save, canSave } = useFormSave(tableinfo, role, document)

  const handleSave = async () => {
    if (formRef) {
      const check = await formRef.current.checkAsync()
      if (check.hasError) return
    }
    await save()
    navigate(href || `/collections/${role}/${tableinfo.id}/${document.id}`, {
      replace: true
    })
  }

  const editDocument = () =>
    navigate(`${location.pathname}?edit`, { replace: true })
  const cancel = () => {
    // TODO confirm changes
    reset()
    if (document._isTemporary) navigate(-1)
    else navigate(location.pathname, { replace: true })
  }
  const removeDocument = async () => {
    // TODO prompt before removing
    await document.remove()
    navigate(-1)
  }
  const can = useDocumentPermissions(tableinfo, role, document)

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
                  disabled={!canSave}
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
                {can.edit && (
                  <IconButtonWithHelper
                    icon="edit"
                    helper="Edit"
                    onClick={editDocument}
                  />
                )}
                {can.remove && (
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
