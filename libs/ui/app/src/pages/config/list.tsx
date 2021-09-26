import { useToggle } from 'react-use'
import React from 'react'
import { Animation, Button, ButtonGroup, List, Modal } from 'rsuite'

import {
  useCountConfigChanges,
  useTableInfoList,
  usePersistConfig
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { ConfigListItem } from './list-item'

export const ConfigListPage: React.FC = () => {
  const [tables, setTablesOrder] = useTableInfoList(true)
  const title = 'Configuration'
  const countChanges = useCountConfigChanges()
  const [show, toggle] = useToggle(false)
  const saveConfig = usePersistConfig()
  const save = async () => {
    saveConfig()
    toggle(false)
  }

  const sort = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const result = [...tables]
    const [removed] = result.splice(oldIndex, 1)
    result.splice(newIndex, 0, removed)
    setTablesOrder(result)
  }

  return (
    <>
      <Modal show={show} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>Configuration changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Config changes occurred: describe them here</Modal.Body>
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
        <Animation.Fade in={true}>
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
              {
                <List hover bordered sortable onSort={sort} pressDelay={300}>
                  {tables.map((tableinfo, index) => (
                    <ConfigListItem
                      key={tableinfo.id}
                      index={index}
                      tableinfo={tableinfo}
                    />
                  ))}
                </List>
              }
            </div>
          )}
        </Animation.Fade>
      </HeaderTitleWrapper>
    </>
  )
}
