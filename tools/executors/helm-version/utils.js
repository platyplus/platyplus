const { lastValueFrom } = require('rxjs')
const { logger } = require('@nrwl/devkit')
const {
  tryBump
} = require('@jscutlery/semver/src/executors/version/utils/try-bump')
const {
  getProjectDependencies
} = require('@jscutlery/semver/src/executors/version/utils/get-project-dependencies')
const getTagPrefix = ({ projectName }, { versionTagPrefix }) =>
  versionTagPrefix.replace('${target}', projectName)

const getDependencyRoots = async (
  { projectName, workspace },
  { trackDeps, releaseAs }
) => {
  let dependencyRoots = []
  if (trackDeps && !releaseAs) {
    // Include any depended-upon libraries in determining the version bump.
    try {
      const dependencyLibs = await getProjectDependencies(projectName)
      dependencyRoots = dependencyLibs.map(
        (name) => workspace.projects[name].root
      )
    } catch (e) {
      logger.error('Failed to determine dependencies.')
      return []
    }
  }
  return dependencyRoots
}

exports.getNextVersion = async (context, options) => {
  const { projectName, workspace } = context
  const { releaseAs, preid } = options
  const projectRoot = workspace.projects[projectName].root
  const tagPrefix = getTagPrefix(context, options)
  return await lastValueFrom(
    tryBump({
      preset: 'angular',
      projectRoot,
      tagPrefix,
      dependencyRoots: await getDependencyRoots(context, options),
      releaseType: releaseAs,
      preid: preid
    })
  )
}
