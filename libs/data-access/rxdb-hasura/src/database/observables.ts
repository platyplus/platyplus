/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { BehaviorSubject } from 'rxjs'

import { ContentsCollection } from '../types'
export const contents = new BehaviorSubject<Record<string, ContentsCollection>>(
  {}
)
