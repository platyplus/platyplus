import { useToggle } from 'react-use'
import React from 'react'
import { Animation, Button, ButtonGroup, Modal } from 'rsuite'

import {
  useCountConfigChanges,
  usePersistConfig,
  useResetConfig
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { PrivateRoute } from '@platyplus/auth'

const Page: React.FC = () => {
  const title = 'Configuration'
  const countChanges = useCountConfigChanges()
  const [show, toggle] = useToggle(false)
  const saveConfig = usePersistConfig()
  const save = async () => {
    saveConfig()
    toggle(false)
  }
  const reset = useResetConfig()
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
                {countChanges ? (
                  <>
                    <IconButtonWithHelper
                      icon="save"
                      helper="Apply changes"
                      onClick={toggle}
                      size="sm"
                    >
                      Apply changes
                    </IconButtonWithHelper>
                    <IconButtonWithHelper
                      icon="undo"
                      helper="Reset changes"
                      onClick={reset}
                      size="sm"
                    >
                      Reset
                    </IconButtonWithHelper>
                  </>
                ) : (
                  <div>No changes yet</div>
                )}
              </ButtonGroup>
            </div>
          )}
        </Animation.Fade>
      </HeaderTitleWrapper>
    </>
  )
}
export const ConfigPage = () => (
  <PrivateRoute>
    <Page />
  </PrivateRoute>
)
