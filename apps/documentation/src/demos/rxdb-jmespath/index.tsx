import React, { useEffect, useState, useRef } from 'react'
// ! Impossible to build docusaurus when using isRxDatabase()
import { RxDocument } from 'rxdb'
import faker from 'faker'

import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

import type { Database, CollectionNames } from './types'
import { LIMITS } from './params'
import { UPDATES } from './random'

const App: React.FC = () => {
  if (typeof window === 'undefined') {
    return null
  }

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
      window['db'] = _db
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
  }, [])

  const [updating, setUpdating] = useState<string>(null)
  const pickRandomDocument = async () => {
    const result = await collection.find().exec()
    const document = result[faker.datatype.number(result.length - 1)]
    setDocument(document)
  }

  const randomUpdates = async (
    collectionName: CollectionNames,
    percents: number
  ) => {
    const col = db.collections[collectionName]
    const nbDocs = Math.floor((LIMITS[collectionName] * percents) / 100)
    const ids = []
    for (let i = 0; i < nbDocs; i++) {
      setUpdating(`Updating ${i}/${nbDocs}`)
      let id: string
      do {
        id = faker.datatype.number(LIMITS[collectionName] - 1).toString()
      } while (ids.includes(id))
      ids.push(id)
      const doc = await col.findOne(id).exec()
      const changes = UPDATES[collectionName]()
      await doc.atomicUpdate((doc) => ({ ...doc, ...changes }))
    }
    setUpdating(null)
  }

  useEffect(() => {
    if (collection) {
      pickRandomDocument()
    }
  }, [collection])

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

  const EXPRESSIONS: Record<
    CollectionNames,
    { value: string; label: string }[]
  > = {
    users: [
      { value: 'posts[].title', label: `Title of all the user's posts` },
      {
        value: 'posts[].comments[] | length(@)',
        label: `Total number of comments of the user's posts`
      },
      {
        value: 'comments[].post.user.name',
        label: `Name of the author of the posts the user commented`
      }
    ],
    posts: [
      {
        value: 'user.name',
        label: `Name of the post's author`
      }
    ],
    comments: [
      { value: 'user.name', label: `Name of the author of the comment` }
    ]
  }
  const refInput = useRef<any>()
  if (!db) return <div>Loading RxDB schema and mock data...</div>
  if (!collection) return <div>Loading one document...</div>
  return (
    <Tabs className="unique-tabs">
      <TabItem value="Search" default>
        <h2>JMESPath expression</h2>
        <div className="container">
          <div className="row">
            <div className="col col--3">
              <div className="dropdown dropdown--hoverable">
                <button className="button button--primary">
                  Select collection
                </button>
                <ul className="dropdown__menu">
                  {Object.keys(db.collections).map((name: CollectionNames) => (
                    <li key={`exp-${name}`}>
                      <a
                        className="dropdown__link"
                        href="#"
                        onClick={() => {
                          setCollection(db.collections[name])
                          setExpression(EXPRESSIONS[name][0]?.value)
                        }}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col col--3">
              <button
                className="button button--primary"
                onClick={pickRandomDocument}
              >
                Pick random doc
              </button>
            </div>
            <div className="col col--3">
              <div
                className={`dropdown ${updating ? '' : 'dropdown--hoverable'}`}
              >
                <button
                  className={`button button--primary ${
                    updating ? 'disabled' : ''
                  }`}
                >
                  {updating || 'Update 50% of...'}
                </button>
                <ul className="dropdown__menu">
                  {Object.keys(db.collections).map((name: CollectionNames) => (
                    <li key={`update-${name}`}>
                      <a
                        className="dropdown__link"
                        href="#"
                        onClick={() => randomUpdates(name, 50)}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col col--3">
              <div className="dropdown dropdown--hoverable">
                <button className="button button--primary">
                  Load a preset
                </button>
                <ul className="dropdown__menu">
                  {EXPRESSIONS[collection.name].map((e, i) => (
                    <li key={`exp-${i}`}>
                      <a
                        className="dropdown__link"
                        href="#"
                        onClick={() => setExpression(e.value)}
                      >
                        {e.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <h3 style={{ paddingTop: '10px' }}>
            Collection '{collection.name}',
            {document ? ` document id: ${document.primary}` : ' no document'}
          </h3>
          {document && (
            <div className="row">
              <div className="col col--12">
                <form className="form">
                  <input
                    ref={refInput}
                    autoFocus
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                  />
                </form>
                <h2>Result</h2>
                <CodeBlock className="language-json">
                  {error || JSON.stringify(result, null, 2)}
                </CodeBlock>
              </div>
            </div>
          )}
        </div>
      </TabItem>
      <TabItem value="Document details">
        {document && (
          <CodeBlock className="language-json">
            {JSON.stringify(document.toJSON(), null, 2)}
          </CodeBlock>
        )}
      </TabItem>
      <TabItem value="user-schema" label="User schema">
        <CodeBlock className="language-json">
          {JSON.stringify(db.collections.users.schema.jsonSchema, null, 2)}
        </CodeBlock>
      </TabItem>
      <TabItem value="post-schema" label="Post schema">
        <CodeBlock className="language-json">
          {JSON.stringify(db.collections.posts.schema.jsonSchema, null, 2)}
        </CodeBlock>
      </TabItem>
      <TabItem value="comment-schema" label="Comment schema">
        <CodeBlock className="language-json">
          {JSON.stringify(db.collections.comments.schema.jsonSchema, null, 2)}
        </CodeBlock>
      </TabItem>
    </Tabs>
  )
}

export default App
