import { useToggle } from 'react-use'
import { Drawer, Button, IconButton, Icon } from 'rsuite'
import { useConfigStore } from './store'

export const ConfigDrawer: React.FC = () => {
  const [show, toggle] = useToggle(false)
  const hasChanges = useConfigStore((state) => state.hasChanges())
  const changes = useConfigStore((state) => state.forms)
  const saveConfig = useConfigStore((state) => state.save())
  const save = async () => {
    await saveConfig()
    toggle(false)
    // TODO
  }
  return (
    <>
      {hasChanges && (
        <IconButton
          style={{
            position: 'fixed',
            top: '50%',
            left: '100%',
            transform: 'translate(-70%, 0%)',
            zIndex: 1
          }}
          circle
          size="lg"
          icon={<Icon icon="arrow-left" />}
          onClick={toggle}
        />
      )}
      <Drawer show={show} onHide={toggle}>
        <Drawer.Header>
          <Drawer.Title>Changes</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>{JSON.stringify(changes)}</Drawer.Body>
        <Drawer.Footer>
          <Button onClick={save} appearance="primary">
            Confirm
          </Button>
          <Button onClick={toggle} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}
