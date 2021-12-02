/* eslint-disable @typescript-eslint/no-explicit-any */
export declare module './jmespath' {
  export type ObjectType = any // TODO

  //   TODO check type - which properties are optional?
  export type ASTNode = {
    value: any // TODO
    type: string
    name: string
    children: Array<ASTNode>
    jmespathType?: any // TODO
  }

  export class Runtime {
    _interpreter: TreeInterpreter
    callFunction(name: string, resolvedArgs: Array<ObjectType>)
  }
  export class TreeInterpreter {
    constructor(runtinme: Runtime)
    runtime: Runtime
    computeSliceParams(
      length: number,
      sliceParams: Array<ASTNode>
    ): [number, number, number]
  }
  export function compile(expression: string): ASTNode
  export function search(obj: ObjectType, expression: string): ObjectType
  export function isObject(obj: ObjectType): boolean

  export function isFalse(obj: ObjectType): boolean
  export function strictDeepEqual(
    first: ObjectType,
    second: ObjectType
  ): boolean
  export function objValues(obj: Record<string, unknown>): ObjectType[]
}
