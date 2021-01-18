/* eslint-disable @typescript-eslint/no-explicit-any */
import jsonata, { ExprNode } from 'jsonata'
type SchemaTypeValue = SchemaType | true

type SchemaType = {
  [key: string]: SchemaTypeValue
}

const recurse = (ps: any[]): SchemaType => {
  if (typeof ps[0] === 'string') return { [ps[0]]: recurse(ps.slice(1)) }
  else return ps[0] || true
}

const jsonataSchema = (path: ExprNode): any => {
  if (path.type === 'name') {
    return path.value
  } else if (path.type === 'path' && path.steps) {
    const steps = path.steps.map(step => jsonataSchema(step))
    return recurse(steps)
  } else if (path.arguments) {
    return path.arguments.reduce((aggr, arg) => {
      const next = jsonataSchema(arg)
      if (typeof next === 'string') return { ...aggr, [next]: true }
      else return { ...aggr, ...jsonataSchema(arg) }
    }, {})
  } else if ((path as any).expressions) {
    return (path as any).expressions.reduce((aggr: any, exp: any) => {
      aggr = { ...aggr, ...jsonataSchema(exp) }
      jsonataSchema(exp)
      return aggr
    }, {})
  } else if (path.type === 'binary' || path.type === 'apply') {
    return {
      ...jsonataSchema((path as any).lhs as ExprNode),
      ...jsonataSchema((path as any).rhs as ExprNode)
    }
  } else if (path.type === 'unary') {
    return jsonataSchema((path as any).lhs as ExprNode)
  } else if (Array.isArray(path)) {
    return path.reduce<any>((aggr, curr) => {
      aggr = { ...aggr, ...jsonataSchema(curr) }
      return aggr
    }, {})
  } else {
    return true
  }
}

export const jsonataPaths = (expression: string): SchemaType =>
  jsonataSchema(jsonata(expression).ast())
