import { ControlLabel, Form, FormGroup, HelpBlock, Icon } from 'rsuite'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { useHover } from 'react-use'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  PropertyTitle,
  useConfigEnabled,
  useDocumentProperties,
  useGetForm,
  useSetForm
} from '@platyplus/react-rxdb-hasura'
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'

import { FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'

const DocumentField: React.FC<{
  document: ContentsDocument
  propertyName: string
  edit: boolean
  property: TopLevelProperty | PrimaryProperty
}> = ({ document, propertyName, property, edit }) => {
  const configEnabled = useConfigEnabled()
  const element = (hovered: boolean) => (
    <FormGroup style={hovered ? { border: '1px solid gray' } : {}}>
      {hovered && (
        <div
          style={{
            position: 'fixed',
            right: '45px'
          }}
        >
          <Icon icon="ellipsis-v" />
        </div>
      )}
      <ControlLabel>
        <PropertyTitle
          collection={document.collection as ContentsCollection}
          property={propertyName}
        />
      </ControlLabel>
      <FieldComponentWrapper
        document={document}
        field={propertyName}
        edit={edit}
        editable={true}
      />
      {edit && property.required && <HelpBlock>Required</HelpBlock>}
    </FormGroup>
  )

  const [hoverable] = useHover(element)
  return configEnabled ? hoverable : element(false)
}

export const DocumentDetails: DocumentComponent = ({ document, edit }) => {
  const setForm = useSetForm(document)
  const [properties, setProperties] = useDocumentProperties(document)
  const formValues = useGetForm(document)
  const reorder = (list: Map<string, unknown>, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return new Map(result)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const items = reorder(
      properties,
      result.source.index,
      result.destination.index
    )
    setProperties(items)
  }

  const grid = 4
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging && 'lightgreen',
    ...draggableStyle
  })

  if (properties)
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Form onChange={setForm} fluid formDefaultValue={formValues}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {[...properties.keys()].map((property, index) => (
                  <Draggable
                    key={property}
                    draggableId={property}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <DocumentField
                          document={document}
                          property={properties.get(property)}
                          propertyName={property}
                          edit={edit}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Form>
      </DragDropContext>
    )
  else return null
}
