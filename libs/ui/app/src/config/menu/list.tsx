import React, { useMemo, useState } from 'react'
import {
  Animation,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Input,
  List,
  Modal,
  SelectPicker
} from 'rsuite'

import {
  HeaderTitleWrapper,
  IconButtonWithHelper,
  IconPicker
} from '@platyplus/layout'
import {
  useAppConfig,
  usePages,
  useTablesConfig
} from '@platyplus/react-rxdb-hasura'
import { MenuListItem } from './list-item'
import { isManyToManyJoinTable, MenuItem } from '@platyplus/rxdb-hasura'

export const ConfigMenuPage: React.FC = () => {
  const title = 'Menu configuration'
  const [appConfig, setAppConfig] = useAppConfig()
  const menu = appConfig.menu || []
  const tables = useTablesConfig()
  const tableOptions = useMemo(
    () =>
      tables
        .filter((table) => !isManyToManyJoinTable(table))
        .map((table) => ({ value: table.id, label: table.id })),
    [tables]
  )
  const pages = usePages()
  const pageOptions = useMemo(
    () =>
      pages.map((page) => ({
        value: page.slug,
        label: page.title ? `${page.title} (${page.slug})` : page.slug
      })),
    [pages]
  )
  const sort = ({ oldIndex, newIndex }) => {
    const moveItem = menu[oldIndex]
    const newMenu = [...menu]
    newMenu.splice(oldIndex, 1)
    newMenu.splice(newIndex, 0, moveItem)
    setAppConfig({ ...appConfig, menu: newMenu })
  }

  const [item, setItem] = useState<MenuItem>()
  const [index, setIndex] = useState(0)
  const formValue = useMemo(() => {
    return { icon: null, ...item }
  }, [item])

  const close = () => {
    setItem(null)
  }
  const add = () => {
    setIndex(menu.length)
    setItem({ id: '', type: 'table', name: '' })
  }
  const remove = () => {
    const newMenu = [...menu]
    newMenu.splice(index, 1)
    setAppConfig({ ...appConfig, menu: newMenu })
    close()
  }
  const save = () => {
    const newMenu = [...menu]
    if (index === menu.length) newMenu.push(item)
    else newMenu[index] = item
    setAppConfig({ ...appConfig, menu: newMenu })
    close()
  }
  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={true}>
        {(props) => (
          <div {...props}>
            <ButtonToolbar>
              <ButtonGroup>
                <IconButtonWithHelper
                  icon="plus"
                  helper="Add an item"
                  onClick={add}
                />
              </ButtonGroup>
            </ButtonToolbar>
            <List bordered sortable onSort={sort} pressDelay={300}>
              {menu.map((it, idx) => (
                <MenuListItem
                  key={idx}
                  index={idx}
                  data={it}
                  onClick={() => {
                    setItem(it)
                    setIndex(idx)
                  }}
                />
              ))}
            </List>
            <Modal show={!!item} onHide={close}>
              <Modal.Header>
                <Modal.Title>Menu item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {formValue && (
                  <Form
                    formDefaultValue={formValue}
                    onChange={(v) => setItem(v as MenuItem)}
                    onKeyDown={({ key }) => key === 'Enter' && save()}
                  >
                    <FormGroup>
                      <ControlLabel>Type</ControlLabel>
                      <FormControl
                        name="type"
                        accepter={SelectPicker}
                        data={[
                          { value: 'table', label: 'Table' },
                          { value: 'page', label: 'Page' }
                        ]}
                        defaultValue="table"
                        cleanable={false}
                        searchable={false}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Id</ControlLabel>
                      <FormControl
                        name="id"
                        accepter={SelectPicker}
                        data={
                          formValue.type === 'table'
                            ? tableOptions
                            : pageOptions
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl name="name" accepter={Input} />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>Icon</ControlLabel>
                      <FormControl name="icon" accepter={IconPicker} />
                    </FormGroup>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={save} appearance="primary">
                  Confirm
                </Button>
                {index !== menu.length && (
                  <Button onClick={remove} appearance="ghost" color="red">
                    Remove
                  </Button>
                )}
                <Button onClick={close} appearance="subtle">
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
