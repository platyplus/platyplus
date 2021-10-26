import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  of
} from 'rxjs'

import { debug } from '@platyplus/logger'
import { CONFIG_TABLES, PLATYPLUS_TABLES } from './metadata'
import { Database } from './types'

const readyTables = new BehaviorSubject<string[]>([])

export const setReplicationReady = (name: string) => {
  debug(`[${name}] setReplicationReady`)
  const value = readyTables.getValue()
  if (!value.includes(name)) {
    value.push(name)
    readyTables.next(value)
  }
}
export const setReplicationBusy = (name: string) => {
  debug(`[${name}] setReplicationBusy`)
  const state = readyTables.getValue()
  const value = state.filter((v) => v !== name)
  if (value.length !== state.length) {
    readyTables.next(value)
  }
}

export const addStateToDatabasePrototype = (proto: Database) => {
  proto.isConfigReady$ = new Observable((subscriber) => {
    readyTables.subscribe((tables) =>
      subscriber.next(CONFIG_TABLES.every((name) => tables.includes(name)))
    )
  }).pipe(distinctUntilChanged<boolean>())
  proto.isReady$ = new Observable((subscriber) => {
    readyTables.subscribe((tables) =>
      subscriber.next(PLATYPLUS_TABLES.every((name) => tables.includes(name)))
    )
  }).pipe(distinctUntilChanged<boolean>())
  proto.jwt$ = new BehaviorSubject<string | null>(null)
  proto.isAdmin$ = new BehaviorSubject<boolean>(false)
  proto.isAuthenticated$ = new BehaviorSubject<boolean>(false)
  proto.setAuthStatus = (
    status: boolean | null,
    newJwt: string | null,
    admin: boolean
  ) => {
    debug('[setAuthStatus]', status, !!newJwt)
    if (typeof status === 'boolean') {
      proto.isAuthenticated$.next(status)
      proto.jwt$.next(newJwt)
      proto.isAdmin$.next(status ? admin : false)
    }
  }
  proto.isConnected$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(map(() => navigator.onLine))
}
