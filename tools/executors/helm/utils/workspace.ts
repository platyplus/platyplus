import { ExecutorContext } from '@nrwl/devkit'
import { resolve } from 'path'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { readJsonFile } from './filesystem'

export interface WorkspaceDefinition {
  projects: {
    [key: string]: {
      root: string
    }
  }
}

export function getProjectRoot(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName].root
}

export function _getWorkspaceDefinition(
  workspaceRoot: string
): Observable<WorkspaceDefinition> {
  return readJsonFile(resolve(workspaceRoot, 'workspace.json')).pipe(
    catchError(() => readJsonFile(resolve(workspaceRoot, 'angular.json')))
  )
}
