const { logger } = require('@nrwl/devkit')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

async function postVersion(
  { dryRun = false, tag },
  { workspace, root, projectName }
) {
  if (tag) {
    const newVersion = tag.split('@')[1]
    if (!newVersion) {
      logger.error(`Incorrect tag: ${tag}`)
      return {
        success: false
      }
    }
    const projectPath = workspace.projects[projectName].root
    const chartPath = path.join(root, projectPath)
    const chartFilePath = path.join(chartPath, 'Chart.yaml')

    const chart = yaml.load(fs.readFileSync(chartFilePath, 'utf8'))
    const oldVersion = chart.version
    if (oldVersion !== newVersion) {
      logger.info(`Version bump from ${oldVersion} to ${newVersion}`)
      const options = { stdio: 'inherit' }
      chart.version = newVersion
      if (!dryRun) {
        fs.writeFileSync(chartFilePath, yaml.dump(chart))
        execSync(`git add ${chartFilePath}`, options)
        execSync(`git commit --amend --no-edit`, options)
      }
    }
  } else {
    logger.error('No tag given as an option')
    return { success: false }
  }
  return { success: true }
}

exports.default = postVersion
