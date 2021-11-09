const { logger } = require('@nrwl/devkit')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const trimPrefix = (str, prefix) =>
  str.startsWith(prefix) && str.slice(prefix.length)

async function preVersion(
  { dryRun = false },
  { root, projectName, workspace }
) {
  const projectPath = workspace.projects[projectName].root
  const chartPath = path.join(root, projectPath)

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
            `${depName}: from ${dep.version} to ${dependencyChart.version}`
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
      if (!dryRun) {
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
  } catch (e) {
    logger.error(e)
    return { success: false }
  }

  return { success: true }
}

exports.default = preVersion
