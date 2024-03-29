const { logger } = require('@nrwl/devkit')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const {
  default: semverExecutor
} = require('@jscutlery/semver/src/executors/version')
const { getNextVersion } = require('./utils')

const trimPrefix = (str, prefix) =>
  str.startsWith(prefix) && str.slice(prefix.length)

async function version(options, context) {
  const { root, projectName, workspace } = context
  const { dryRun } = options
  const projectRoot = workspace.projects[projectName].root
  const chartPath = path.join(root, projectRoot)
  const nextVersion = await getNextVersion(context, options)

  try {
    const chartFilePath = path.join(chartPath, 'Chart.yaml')
    const chart = yaml.load(fs.readFileSync(chartFilePath, 'utf8'))
    let changes = false
    const dependencyChanges = chart.dependencies?.filter((dep) => {
      const relativeDependencyPath = trimPrefix(dep.repository, 'file://')
      if (relativeDependencyPath) {
        logger.log(`Found dependency ${relativeDependencyPath}`)
        const dependencyPath = path.join(
          chartPath,
          relativeDependencyPath,
          'Chart.yaml'
        )
        const dependencyChart = yaml.load(
          fs.readFileSync(dependencyPath, 'utf8')
        )
        logger.log(
          `Helm Chart dependency change: ${dep.name}: from ${dep.version} to ${dependencyChart.version}`
        )
        if (dep.version !== dependencyChart.version) {
          dep.version = dependencyChart.version
          changes = true
          return true
        }
      }
      return false
    })
    if (nextVersion && chart.version !== nextVersion) {
      chart.version = nextVersion
      changes = true
    }
    if (changes) {
      if (!dryRun) {
        fs.writeFileSync(chartFilePath, yaml.dump(chart))
        const opts = { stdio: 'inherit' }
        if (dependencyChanges.length) {
          execSync(`helm dependency update ${chartPath}`, opts)
        }
        execSync(`git add ${chartPath}`, opts)
        execSync(`git commit -m "chore(release): bump helm Chart.yaml file"`)
      }
      logger.log(`executing @jscutlery/semver (dryRun:${dryRun})`)
      const result = await semverExecutor(options, context)
      if (!result.success) {
        logger.error('Failed to run @jscutlery/semver:version')
        return result
      }
      logger.log('@jscutlery/semver executed')
    } else {
      logger.log('No changes')
    }

    return { success: true }
  } catch (e) {
    logger.error(e)
    return { success: false }
  }
}

exports.default = version
