const { logger } = require('@nrwl/devkit')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const {
  default: semverExecutor
} = require('@jscutlery/semver/src/executors/version')
const { default: postVersion } = require('./post-version')

const trimPrefix = (str, prefix) =>
  str.startsWith(prefix) && str.slice(prefix.length)

async function version(options, context) {
  const { root, projectName, workspace } = context
  const projectRoot = workspace.projects[projectName].root
  const chartPath = path.join(root, projectRoot)

  try {
    const chartFilePath = path.join(chartPath, 'Chart.yaml')
    const chart = yaml.load(fs.readFileSync(chartFilePath, 'utf8'))

    const changes = chart.dependencies?.filter((dep) => {
      const relativeDependencyPath = trimPrefix(dep.repository, 'file://')
      if (relativeDependencyPath) {
        logger.log(`Found dependency ${relativeDependencyPath}`)
        const dependencyPath = path.join(
          chartPath,
          relativeDependencyPath,
          'Chart.yaml'
        )
        try {
          const dependencyChart = yaml.load(
            fs.readFileSync(dependencyPath, 'utf8')
          )
          logger.log(
            `Helm Chart dependency change: ${depName}: from ${dep.version} to ${dependencyChart.version}`
          )
          if (dep.version !== dependencyChart.version) {
            dep.version = dependencyChart.version
            return true
          }
        } catch {}
      }
      return false
    })
    if (changes.length) {
      if (!options.dryRun) {
        fs.writeFileSync(chartFilePath, yaml.dump(chart))
        const options = { stdio: 'inherit' }
        execSync(`helm dependency update ${chartPath}`, options)
        execSync(`git add ${chartPath}`, options)
        execSync(
          `git commit -m "chore: bump dependency versions ${changes
            .map((d) => d.name)
            .join(', ')}"`
        )
      }
    } else {
      logger.log('No changes of depencendy versions')
    }
    const result = await semverExecutor(options, context)
    if (!result.success) {
      logger.error('Failed to run @jscutlery/semver:version')
      return result
    }
    try {
      const tagPrefix = options.versionTagPrefix.replace(
        '${target}',
        projectName
      )
      const tag = execSync(
        `git describe --match "${tagPrefix}[0-9]*" --abbrev=0 --tags $(git rev-list --tags --max-count=1)`
      )
        .toString()
        .replace(/(\r\n|\n|\r)/gm, '')
      await postVersion({ dryRun: options.dryRun, tag }, context)
    } catch (e) {
      logger.error('Failed to run post version')
      return { success: false }
    }
  } catch (e) {
    logger.error(e)
    return { success: false }
  }

  return { success: true }
}

exports.default = version
