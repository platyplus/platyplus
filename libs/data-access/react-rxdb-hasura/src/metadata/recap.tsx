import { useToggle } from 'react-use'
import { Badge, Button, IconButton, Icon, Modal } from 'rsuite'
import { useConfigEnabled } from './enabled'
import { useConfigStore } from './store'

export const ConfigRecap: React.FC = () => {
  const enabled = useConfigEnabled()
  const [show, toggle] = useToggle(false)
  const countChanges = useConfigStore((state) => state.countChanges() || false)
  const changes = useConfigStore((state) => state.forms)
  const saveConfig = useConfigStore((state) => state.save())
  const save = async () => {
    await saveConfig()
    toggle(false)
  }
  if (enabled)
    return (
      <>
        <Badge content={countChanges}>
          <IconButton circle icon={<Icon icon="wrench" />} onClick={toggle} />
        </Badge>
        <Modal show={show} onHide={toggle}>
          <Modal.Header>
            <Modal.Title>Configuration changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {countChanges && <div>{JSON.stringify(changes)}</div>}
          </Modal.Body>
          {countChanges ? (
            <Modal.Footer>
              <Button onClick={save} appearance="primary">
                Confirm
              </Button>
              <Button onClick={toggle} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button onClick={toggle} appearance="primary">
                OK
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </>
    )
  else return null
}
