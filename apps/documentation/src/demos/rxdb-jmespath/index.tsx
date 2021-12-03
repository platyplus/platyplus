import React, { useEffect, useState, useRef } from 'react'
// ! Impossible to build docusaurus when using isRxDatabase()
import { RxDocument } from 'rxdb'
import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { Observable, Observer } from 'rxjs'
import Select from 'react-select'
import type { Database } from './types'

const App: React.FC = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const [db, setDb] = useState<Database>()

  const [document, setDocument] = useState<RxDocument<any>>()
  const [expression, setExpression] = useState<string>(
    'posts[].comments[] | length(@)'
  )
  const [result, setResult] = useState<any>()
  const [error, setError] = useState<string>()

  const [start, setStart] = useState<Date>(new Date())
  const [end, setEnd] = useState<Date>(new Date())
  const [timing, setTiming] = useState<number>()

  useEffect(() => {
    const initDB = async () => {
      const { initialize } = await import('./initialize')
      const _db = await initialize()
      window['db'] = _db
      setDb(_db)
    }
    initDB()
    return () => {
      console.log('unmounted')
      if (db) {
        db.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const subscription = db?.collections.users
      .find()
      .where('id')
      .eq('1')
      .limit(1)
      .$.subscribe(([first]) => setDocument(first))
    return () => subscription?.unsubscribe()
  }, [db])

  useEffect(() => start && setTiming(end.getTime() - start.getTime()), [end])

  useEffect(() => {
    if (document && expression) {
      const subscription = new Observable((observer: Observer<any>) => {
        setStart(new Date())
        document.jmespath$(expression).subscribe(observer)
      }).subscribe({
        next: (val) => {
          setEnd(new Date())
          setError(null)
          setResult(val)
        },
        error: (error) => {
          console.log(error)
          setStart(null)
          setTiming(0)
          setResult(null)
          setError('Invalid value')
        }
      })
      return () => subscription.unsubscribe()
    } else {
      setResult(null)
    }
  }, [document, expression])

  const EXPRESSIONS = [
    { value: 'posts[].title', label: `Title of all the user's posts` },
    {
      value: 'posts[].comments[] | length(@)',
      label: `Total number of comments of the user's posts`
    },
    {
      value: 'comments[].post.user.name',
      label: `Name of the author of the posts the user commented`
    }
  ]
  const refInput = useRef<any>()
  if (!db) return <div>Loading RxDB schema and mock data...</div>
  if (!document) return <div>Loading one document...</div>
  return (
    <Tabs className="unique-tabs">
      <TabItem value="Search" default>
        <h2>JMESPath expression</h2>
        <div className="container">
          <div className="row">
            <div className="col col--6">
              Collection: <b>{document.collection.name}</b>, document id:
              <b>{document.primary}</b>
            </div>
            <div className="col col--6">
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Load a preset"
                onChange={(changed) => {
                  if (changed) {
                    setExpression(changed.value)
                    refInput.current.focus()
                  }
                }}
                options={EXPRESSIONS}
              />
            </div>
          </div>
        </div>
        <div className="form">
          <input
            ref={refInput}
            autoFocus
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </div>
        <h2>Result {timing && !error ? `(${timing}ms)` : ''}</h2>
        <CodeBlock className="language-json">
          {error || JSON.stringify(result, null, 2)}
        </CodeBlock>
      </TabItem>
      <TabItem value="Document details">
        <CodeBlock className="language-json">
          {JSON.stringify(document, null, 2)}
        </CodeBlock>
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
