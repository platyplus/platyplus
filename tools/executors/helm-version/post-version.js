const { logger } = require('@nrwl/devkit')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

async function postVersion(
  { dryRun = false, versionTagPrefix },
  { workspace, root, projectName }
) {
  if (versionTagPrefix) {
    const tagPrefix = versionTagPrefix.replace('${target}', projectName)
    const tag = execSync(
      `git describe --match "${tagPrefix}[0-9]*" --abbrev=0 --tags $(git rev-list --tags --max-count=1)`
    )
      .toString()
      .replace(/(\r\n|\n|\r)/gm, '')

    const newVersion = tag.substring(tagPrefix.length)
    if (!newVersion) {
      logger.error(
        `Incorrect tag: ${tag} (versionTagPrefix: ${versionTagPrefix})`
      )

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
