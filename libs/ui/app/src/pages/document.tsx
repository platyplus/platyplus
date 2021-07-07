import { usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import {
  useDocument,
  useFormChanged,
  useFormSave,
  useResetForm
} from '@platyplus/react-rxdb-hasura'
import { useParams } from 'react-router'
import { useLocation, useHistory } from 'react-router-dom'
import {
  ButtonGroup,
  ButtonToolbar,
  Icon,
  IconButton,
  IconButtonProps,
  Panel,
  Popover,
  Whisper
} from 'rsuite'
import { SVGIcon } from 'rsuite/lib/@types/common'
import { IconNames, IconProps } from 'rsuite/lib/Icon'

import { DocumentComponentWrapper } from '../documents'

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

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const query = useQuery()
  const editing = query.has('edit')
  const location = useLocation()
  const history = useHistory()
  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  const reset = useResetForm(document)
  const changed = useFormChanged(document)
  const saveForm = useFormSave(document)
  const save = async () => {
    await saveForm()
    history.replace(location.pathname)
  }
  const edit = () => history.replace(`${location.pathname}?edit`)
  const cancel = () => {
    // TODO confirm changes
    reset()
    history.replace(location.pathname)
  }
  const remove = async () => {
    // TODO prompt
    await document.remove()
    history.goBack()
  }
  if (isFetching) return <Loading />
  else
    return (
      <Panel
        bordered
        header={
          <div>
            <div
              style={{
                position: 'absolute'
              }}
            >
              {document.label}
            </div>
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
                  <IconButtonWithHelper
                    icon="edit"
                    helper="Edit"
                    onClick={edit}
                  />
                  <IconButtonWithHelper
                    icon="trash"
                    helper="Delete"
                    iconProps={ICON_RED}
                    onClick={remove}
                  />
                </ButtonGroup>
              )}
            </ButtonToolbar>
          </div>
        }
      >
        <DocumentComponentWrapper document={document} edit={editing} />
      </Panel>
    )
}

export default DocumentPage
