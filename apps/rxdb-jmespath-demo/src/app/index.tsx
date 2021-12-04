/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react'
import { RxDocument } from 'rxdb'
import faker from 'faker'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'
import {
  Nav,
  Dropdown,
  Panel,
  PanelProps,
  Button,
  ButtonToolbar,
  Input
} from 'rsuite'
import type { Database, CollectionNames } from './types'
import { LIMITS, EXPRESSIONS } from './params'
import { UPDATES } from './random'
import { CodeBlock } from './code-block'

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const App: React.FC = () => {
  const defaultCollection: CollectionNames = 'users'

  const [db, setDb] = useState<Database>()
  const [collection, setCollection] =
    useState<Database['collections'][CollectionNames]>()
  const [document, setDocument] = useState<RxDocument<any>>()
  const [expression, setExpression] = useState<string>()
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const initDB = async () => {
      const { initialize } = await import('./initialize')
      const _db = await initialize()
      // window['db'] = _db
      setDb(_db)
      setExpression(EXPRESSIONS[defaultCollection][0].value)
      setCollection(_db.collections[defaultCollection])
    }
    initDB()
    return () => {
      console.log('unmounted')
      if (db) {
        db.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [updating, setUpdating] = useState<string>()

  const pickRandomDocument = useCallback(async () => {
    if (collection) {
      const result = await collection.find().exec()
      const document = result[faker.datatype.number(result.length - 1)]
      setDocument(document)
    }
  }, [collection])

  const randomUpdates = async (
    collectionName: CollectionNames,
    percents: number
  ) => {
    if (db) {
      const col = db.collections[collectionName]
      const nbDocs = Math.floor((LIMITS[collectionName] * percents) / 100)
      const ids: string[] = []
      for (let i = 0; i < nbDocs; i++) {
        setUpdating(`Updating ${i}/${nbDocs}`)
        let id: string
        do {
          id = faker.datatype.number(LIMITS[collectionName] - 1).toString()
        } while (ids.includes(id))
        ids.push(id)
        const doc = await col.findOne(id).exec()
        if (doc) {
          const changes = UPDATES[collectionName]()
          await doc.atomicUpdate((doc) => ({ ...doc, ...changes }))
        }
      }
      setUpdating('')
    }
  }

  useEffect(() => {
    if (collection) {
      pickRandomDocument()
    }
  }, [collection, pickRandomDocument])

  useEffect(() => {
    if (document && expression) {
      const subscription = document.jmespath$(expression).subscribe({
        next: (val) => {
          setError(null)
          setResult(val)
        },
        error: (error) => {
          console.log(error)
          setResult(null)
          setError('Invalid value')
        }
      })
      return () => subscription.unsubscribe()
    } else {
      setResult(null)
    }
  }, [document, expression])

  const [tab, setTab] = useState('main')
  const Tab: React.FC<PanelProps & { name: string }> = ({
    name,
    children,
    ...props
  }) =>
    name === tab && (
      <Panel bordered {...props}>
        {children}
      </Panel>
    )

  if (!db) return <div>Loading RxDB schema and mock data...</div>
  if (!collection) return <div>Loading one document...</div>
  return (
    <Panel bordered>
      <h1>RxDB JMESPath demo</h1>
      <p>
        For more information, see the{' '}
        <a
          href="https://platy.plus/docs/artifacts/js/rxdb-plugin-jmespath"
          target="_blank"
          rel="noreferrer"
        >
          documentation
        </a>
      </p>
      <Nav appearance="tabs" onSelect={setTab} activeKey={tab}>
        <Nav.Item eventKey="main">Home</Nav.Item>
        {document && <Nav.Item eventKey="document">Document</Nav.Item>}
        {Object.values(db.collections).map((col) => (
          <Nav.Item key={col.name} eventKey={col.name}>
            {`${capitalizeFirstLetter(col.name)} schema`}
          </Nav.Item>
        ))}
      </Nav>
      <Tab name="main">
        <h2>JMESPath expression</h2>
        <ButtonToolbar>
          <Dropdown
            appearance="default"
            title={capitalizeFirstLetter(collection.name)}
            trigger="hover"
          >
            {Object.keys(db.collections).map((name: CollectionNames) => (
              <Dropdown.Item
                key={`exp-${name}`}
                onSelect={() => {
                  setCollection(db.collections[name])
                  setExpression(EXPRESSIONS[name][0]?.value)
                }}
              >
                {capitalizeFirstLetter(name)}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Button onClick={pickRandomDocument}>Pick random doc</Button>
          <Dropdown appearance="default" title="Load a preset" trigger="hover">
            {EXPRESSIONS[collection.name].map((e, i) => (
              <Dropdown.Item
                key={`exp-${i}`}
                onSelect={() => setExpression(e.value)}
              >
                {e.label}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown
            appearance="default"
            title={updating || 'Update 50% of...'}
            trigger="hover"
            disabled={!!updating}
          >
            {Object.keys(db.collections).map((name: CollectionNames) => (
              <Dropdown.Item
                key={`update-${name}`}
                onSelect={() => randomUpdates(name, 50)}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </ButtonToolbar>
        {document && <h3>Document id: '{document.primary}'</h3>}
        {document && (
          <div>
            <Input
              placeholder="Enter JMESPath expression"
              value={expression}
              onChange={setExpression}
            />
            <h2>Result</h2>
            <CodeBlock
              language="json"
              code={error || JSON.stringify(result, null, 2)}
            />
          </div>
        )}
      </Tab>

      {document && (
        <Tab name="document">
          <CodeBlock
            language="json"
            code={JSON.stringify(document.toJSON(), null, 2)}
          />
        </Tab>
      )}

      {Object.values(db.collections).map((col) => (
        <Tab key={col.name} name={col.name}>
          <CodeBlock
            language="json"
            code={JSON.stringify(col.schema.jsonSchema, null, 2)}
          />
        </Tab>
      ))}
    </Panel>
  )
}

export default App
