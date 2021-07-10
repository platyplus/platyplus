import { useQuery } from '@platyplus/navigation'
import {
  useDocumentPermissions,
  useFormChanged,
  useFormSave,
  useResetForm
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useLocation, useHistory } from 'react-router-dom'
import {
  Animation,
  ButtonGroup,
  ButtonToolbar,
  Icon,
  IconButton,
  IconButtonProps,
  Popover,
  Whisper
} from 'rsuite'
import { SVGIcon } from 'rsuite/lib/@types/common'
import { IconNames, IconProps } from 'rsuite/lib/Icon'

// TODO move to theme
const ICON_RED = { style: { color: '#f44336' } }
// TODO move to @platyplus/rsuite

const IconButtonWithHelper: React.FC<
  Omit<IconButtonProps, 'icon'> & {
    icon: IconNames | SVGIcon
    helper: string
    iconProps?: Omit<IconProps, 'icon'>
  }
> = ({ icon, helper, iconProps, ...props }) => {
  return (
    <Whisper
      placement="bottom"
      trigger="hover"
      speaker={<Popover>{helper}</Popover>}
      delay={300}
    >
      <IconButton icon={<Icon icon={icon} {...iconProps} />} {...props} />
    </Whisper>
  )
}

export const DocumentToolbar: React.FC<{
  document?: ContentsDocument
  edit?: boolean
}> = ({ document, edit }) => {
  const query = useQuery()
  const editing = edit ?? query.has('edit')
  const location = useLocation()
  const history = useHistory()
  const reset = useResetForm(document)
  const changed = useFormChanged(document)
  const saveForm = useFormSave(document)
  const save = async () => {
    await saveForm()
    history.replace(location.pathname)
  }

  const editDocument = () => history.replace(`${location.pathname}?edit`)
  const cancel = () => {
    // TODO confirm changes
    reset()
    history.replace(location.pathname)
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
                  onClick={save}
                  disabled={!changed}
                />
                <IconButtonWithHelper
                  icon="undo"
                  helper="Reset"
                  onClick={reset}
                  disabled={!changed}
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
