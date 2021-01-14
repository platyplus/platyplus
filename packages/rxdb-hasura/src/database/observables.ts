/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { BehaviorSubject } from 'rxjs'

import { ContentsCollection } from '../types'
export const jwt = new BehaviorSubject<string | undefined>(undefined)
export const status = new BehaviorSubject<boolean>(false)
export const hasura = new BehaviorSubject<Record<string, ContentsCollection>>(
  {}
)
