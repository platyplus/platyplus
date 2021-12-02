import React, { useEffect, useState } from 'react'
import { RxDocument } from 'rxdb'
// * Impossible to build docusaurus when using isRxDatabase()
import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import type { Database } from './types'
import { SchemaDetails } from './schema-details'
import { Observable, Observer } from 'rxjs'

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

  if (!db) return <div>Loading RxDB schema and mock data...</div>
  if (!document) return <div>Loading one document...</div>
  return (
    <div>
      <SchemaDetails db={db} />
      <Tabs className="unique-tabs">
        <TabItem value="Search">
          <h2>JMESPath expression</h2>
          <div>
            Collection: <b>{document.collection.name}</b>, document id:
            <b>{document.primary}</b>
          </div>
          <div
            className="DocSearch-Form"
            style={{ height: '32px', marginBottom: '20px', marginTop: '10px' }}
          >
            <input
              className="DocSearch-Input"
              style={{ padding: '0', fontSize: '1em' }}
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
      </Tabs>
    </div>
  )
}

export default App
