import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  BaseEditor,
  Descendant
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import { Button, ButtonToolbar, Icon, IconProps } from 'rsuite'

import { PropType } from '@platyplus/ts-types'
import { FormControlBaseProps } from 'rsuite/lib/@types/common'

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}
export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type BlockQuoteElement = {
  type: 'block-quote'
  children: CustomText[]
}
type CustomElement = ParagraphElement | HeadingElement | BlockQuoteElement

type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const RichText: React.FC<
  FormControlBaseProps<Descendant[]> & { readOnly?: boolean }
> = ({
  value: valueProp,
  defaultValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {},
  readOnly = false
}) => {
  const [state, setState] = useState(defaultValue)
  const value = valueProp !== undefined && valueProp.length ? valueProp : state
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(v) => {
        onChange(v, null)
        setState(v)
      }}
    >
      {!readOnly && (
        <ButtonToolbar>
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underline" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="header" />
          <BlockButton format="heading-two" icon="header" />
          <BlockButton format="block-quote" icon="quote-left" />
          <BlockButton format="numbered-list" icon="list-ol" />
          <BlockButton format="bulleted-list" icon="list-ul" />
        </ButtonToolbar>
      )}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        readOnly={readOnly}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (
  editor: Editor,
  format: PropType<CustomElement, 'type'>
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  })

  return !!match
}

const isMarkActive = (
  editor: Editor,
  format: keyof Omit<CustomText, 'text'>
) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton: React.FC<{
  format: any
  icon: PropType<IconProps, 'icon'>
}> = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon} />
    </Button>
  )
}

const MarkButton: React.FC<{ format: any; icon: PropType<IconProps, 'icon'> }> =
  ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon icon={icon} />
      </Button>
    )
  }

export default RichText
