import { ExecutorContext, logger } from '@nrwl/devkit'
import { resolve } from 'path'
import { forkJoin, Observable, concat, defer, of } from 'rxjs'
import { catchError, mapTo, switchMap } from 'rxjs/operators'
import * as standardVersion from 'standard-version'

import {
  defaultHeader,
  getChangelogPath,
  updateChangelog
} from './utils/changelog'
import { resolveTagTemplate } from './utils/tag-template'
import { tryBump } from './utils/try-bump'
import { getProjectRoot } from './utils/workspace'

import type { VersionBuilderSchema } from './version.schema'
import { saveVersion } from './utils/save-version'

export interface CommonVersionOptions {
  dryRun: boolean
  newVersion: string
  noVerify: boolean
  preset: string
  projectRoot: string
  tagPrefix: string
  changelogHeader?: string
}

/**
 * Generate project's changelogs and return an array containing their path.
 * Skip generation if --skip-project-changelog enabled and return an empty array.
 */
export function _generateProjectChangelogs({
  projectRoots,
  workspaceRoot,
  ...options
}: CommonVersionOptions & {
  skipProjectChangelog: boolean
  projectRoots: string[]
  workspaceRoot: string
}): Observable<string[]> {
  if (options.skipProjectChangelog) {
    return of([])
  }

  return forkJoin(
    projectRoots
      /* Don't update the workspace's changelog as it will be
       * dealt with by `standardVersion`. */
      .filter((projectRoot) => projectRoot !== workspaceRoot)
      .map((projectRoot) =>
        updateChangelog({
          dryRun: options.dryRun,
          preset: options.preset,
          projectRoot,
          newVersion: options.newVersion
        })
      )
  )
}

function versionProject({
  dryRun,
  projectRoot,
  newVersion,
  noVerify,
  preset,
  tagPrefix,
  changelogHeader = defaultHeader
}: CommonVersionOptions) {
  return standardVersion({
    bumpFiles: [resolve(projectRoot, 'package.json')],
    /* Make sure that we commit the manually generated changelogs that
     * we staged. */
    commitAll: true,
    dryRun,
    header: changelogHeader,
    infile: getChangelogPath(projectRoot),
    /* Control version to avoid different results between the value
     * returned by `tryBump` and the one computed by standard-version. */
    releaseAs: newVersion,
    silent: false,
    noVerify,
    packageFiles: [resolve(projectRoot, 'package.json')],
    path: projectRoot,
    preset,
    tagPrefix,
    skip: {
      changelog: false
    }
  })
}

export default function version(
  { dryRun, noVerify, version, preid, versionTagPrefix }: VersionBuilderSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const preset = 'angular'
  const tagPrefix =
    versionTagPrefix !== undefined
      ? resolveTagTemplate(versionTagPrefix, {
          target: context.projectName,
          projectName: context.projectName
        })
      : `${context.projectName}@`

  const projectRoot = getProjectRoot(context)
  const newVersion$ = tryBump({
    preset,
    projectRoot,
    tagPrefix,
    releaseType: version,
    preid
  })

  const action$ = newVersion$.pipe(
    switchMap((newVersion) => {
      if (newVersion == null) {
        logger.info('⏹ Nothing changed since last release.')
        return of(undefined)
      }

      const options: CommonVersionOptions = {
        dryRun,
        newVersion,
        noVerify,
        preset,
        projectRoot,
        tagPrefix
      }

      const runStandardVersion$ = defer(() => versionProject(options))
      const saveVersion$ = defer(() =>
        saveVersion({ newVersion, projectRoot, dryRun })
      )
      return concat(runStandardVersion$, saveVersion$)
    })
  )

  return action$
    .pipe(
      mapTo({ success: true }),
      catchError((error) => {
        logger.error(error.stack ?? error.toString())
        return of({ success: false })
      })
    )
    .toPromise()
}
