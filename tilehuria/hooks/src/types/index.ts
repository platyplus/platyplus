import Koa from 'koa'

interface Request<T extends unknown> extends Koa.Request {
  body?: T
}

export interface Context<T extends unknown> extends Koa.Context {
  // body: T
  request: Request<T>
}

export type EventPayload<T> = {
  event: {
    session_variables?: { [key: string]: string }
    op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL'
    data: {
      old?: T
      new?: T
    }
  }
  created_at: Date
  id: string
  trigger: {
    name: string
  }
  table: {
    schema: string
    name: string
  }
}
export type ActionPayload<T> = {
  action: {
    name: string
  }
  input: T
  session_variables: {
    [key: string]: string
    'x-hasura-user-id': string
    'x-hasura-role': string
  }
}

export type HasuraEventContext<T> = Context<EventPayload<T>>
export type HasuraActionContext<T> = Context<ActionPayload<T>>
