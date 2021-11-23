import { useToggle } from 'react-use'
import React from 'react'
import {
  Animation,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Modal,
  Panel,
  Table
} from 'rsuite'

import {
  useCountConfigChanges,
  usePersistConfig,
  useResetConfig,
  useStore
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { PrivateRoute } from '@platyplus/auth'
import { Contents } from '@platyplus/rxdb-hasura'

const { Column, HeaderCell, Cell } = Table

const APP_LABEL = 'Application'

const Modifications: React.FC = () => {
  const config = useStore((state) => {
    const result = []
    if (Object.keys(state.forms.platyplus_app_config).length) {
      const appConfig = Object.values(state.forms.platyplus_app_config)[0]
      if (appConfig.menu)
        result.push({
          key: `appConfig.menu`,
          type: APP_LABEL,
          path: <div>menu</div>
        })
      if (appConfig.home)
        result.push({
          key: `appConfig.home`,
          type: APP_LABEL,
          path: <div>home</div>,
          value: appConfig.home
        })
    }
    const addItems = (
      id: string,
      item: Contents,
      name: string,
      fields: string[],
      path?: (key: string, value: Contents, field: string) => string
    ) => {
      for (const field of fields) {
        if (item[field])
          result.push({
            key: `${name}.${id}.${field}`,
            type: name,
            path: path ? path(id, item, field) : `${id}.${field}`,
            value:
              typeof item[field] === 'object'
                ? JSON.stringify(item[field])
                : item[field]
          })
      }
    }

    if (Object.keys(state.forms.platyplus_pages).length) {
      const name = 'Page'
      for (const [id, item] of Object.entries(state.forms.platyplus_pages)) {
        addItems(
          id,
          item,
          name,
          ['icon', 'title'],
          (_, value, field) => `${value.slug}.${field}`
        )
        if (item.contents)
          result.push({
            key: `${name}.${id}.contents`,
            type: name,
            path: `${item.slug}.contents`,
            value: null
          })
      }
    }

    if (Object.keys(state.forms.platyplus_property_config).length) {
      const name = 'Property'
      for (const [id, item] of Object.entries(
        state.forms.platyplus_property_config
      )) {
        addItems(
          id,
          item,
          name,
          ['component', 'json_schema', 'icon', 'description', 'title'],
          (id) => id
        )
      }
    }

    if (Object.keys(state.forms.platyplus_table_config).length) {
      const name = 'Collection'
      for (const [id, item] of Object.entries(
        state.forms.platyplus_table_config
      )) {
        addItems(
          id,
          item,
          name,
          [
            'component',
            'description',
            'document_label',
            'document_title',
            'document_component',
            'title',
            'icon',
            'order'
          ],
          (id, _, field) => `${id}.${field}`
        )
      }
    }

    return result
  })

  return (
    <Table
      data={config}
      autoHeight
      locale={{ emptyMessage: 'No configuration changes' }}
    >
      <Column width={120}>
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey="type" />
      </Column>
      <Column width={120}>
        <HeaderCell>Path</HeaderCell>
        <Cell dataKey="path" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Details</HeaderCell>
        <Cell dataKey="value" />
      </Column>
    </Table>
  )
}

const PageComponent: React.FC = () => {
  const title = 'Configuration changes'
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
          <Modal.Title>{title}</Modal.Title>
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
              <ButtonToolbar>
                {countChanges && (
                  <ButtonGroup>
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
                  </ButtonGroup>
                )}
              </ButtonToolbar>
              <Panel>
                <Modifications />
              </Panel>
            </div>
          )}
        </Animation.Fade>
      </HeaderTitleWrapper>
    </>
  )
}
export const ConfigPage = () => (
  <PrivateRoute>
    <PageComponent />
  </PrivateRoute>
)
