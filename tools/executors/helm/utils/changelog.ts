import { resolve } from 'path'
import { defer } from 'rxjs'
import * as changelog from 'standard-version/lib/lifecycles/changelog'
import * as standardVersionDefaults from 'standard-version/defaults'
// @link https://artifacthub.io/docs/topics/annotations/helm/

export const defaultHeader = `# Changelog`

export function getChangelogPath(projectRoot: string) {
  return resolve(projectRoot, 'CHANGELOG.md')
}

export function updateChangelog({
  projectRoot,
  dryRun,
  preset,
  newVersion
}: {
  projectRoot: string
  dryRun: boolean
  preset: string
  newVersion: string
}) {
  return defer(async () => {
    const changelogPath = resolve(projectRoot, 'CHANGELOG.md')
    await changelog(
      {
        ...standardVersionDefaults,
        header: defaultHeader,
        path: projectRoot,
        preset,
        dryRun,
        infile: changelogPath
      },
      newVersion
    )
    return changelogPath
  })
}
