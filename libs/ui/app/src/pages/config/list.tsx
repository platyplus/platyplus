import { useToggle } from 'react-use'
import React from 'react'
import { Animation, Button, ButtonGroup, List, Modal } from 'rsuite'

import {
  useConfigStore,
  useMetadataCollection
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { ConfigListItem } from './list-item'

export const ConfigListPage: React.FC<{ role?: string }> = ({
  role = 'user'
}) => {
  const { isFetching, result } = useMetadataCollection(role)
  const title = 'Configuration'
  const countChanges = useConfigStore((state) => state.countChanges() || false)
  const [show, toggle] = useToggle(false)
  const changes = useConfigStore((state) => state.forms)
  const saveConfig = useConfigStore((state) => state.save())
  const save = async () => {
    await saveConfig()
    toggle(false)
  }

  return (
    <>
      <Modal show={show} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>Configuration changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(changes)}</Modal.Body>
        <Modal.Footer>
          <Button onClick={save} appearance="primary">
            Apply
          </Button>
          <Button onClick={toggle} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <HeaderTitleWrapper title={title}>
        <Animation.Fade in={!isFetching}>
          {(props) => (
            <div {...props}>
              <ButtonGroup style={{ paddingBottom: '10px' }}>
                {countChanges && (
                  <IconButtonWithHelper
                    icon="save"
                    helper="Apply changes"
                    onClick={toggle}
                    size="sm"
                  >
                    Apply changes
                  </IconButtonWithHelper>
                )}
              </ButtonGroup>
              <List hover bordered>
                {result.map((item, index) => (
                  <ConfigListItem key={index} index={index} metadata={item} />
                ))}
              </List>
            </div>
          )}
        </Animation.Fade>
      </HeaderTitleWrapper>
    </>
  )
}
