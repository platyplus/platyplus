import { useToggle } from 'react-use'
import React from 'react'
import { Animation, Button, ButtonGroup, List, Modal } from 'rsuite'

import {
  useConfigStore,
  useOrderedContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { ConfigListItem } from './list-item'

export const ConfigListPage: React.FC = () => {
  const [collections, setCollections] = useOrderedContentsCollections(true)
  const title = 'Configuration'
  const countChanges = useConfigStore((state) => state.countChanges() || false)
  const [show, toggle] = useToggle(false)
  const changes = useConfigStore((state) => state.forms)
  const saveConfig = useConfigStore((state) => state.save())
  const save = async () => {
    await saveConfig()
    toggle(false)
  }

  const sort = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const result = Array.from(collections)
    const [removed] = result.splice(oldIndex, 1)
    result.splice(newIndex, 0, removed)
    setCollections(new Map(result))
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
        <Animation.Fade in={!!collections}>
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
              {collections && (
                <List hover bordered sortable onSort={sort} pressDelay={300}>
                  {[...collections.values()].map((collection, index) => (
                    <ConfigListItem
                      key={index}
                      index={index}
                      metadata={collection.metadata}
                    />
                  ))}
                </List>
              )}
            </div>
          )}
        </Animation.Fade>
      </HeaderTitleWrapper>
    </>
  )
}
