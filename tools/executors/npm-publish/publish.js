const { logger } = require('@nrwl/devkit')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const NpmApi = require('npm-api')

const publish = (path, dryRun) => {
  const options = ['--access public']
  if (dryRun) options.push('--dry-run')
  execSync(`npm publish ${options.join(' ')} ${path}`, {
    stdio: 'pipe'
  })
}
async function version(options, context) {
  const { projectName, workspace } = context
  const { dryRun = false, buildPath } = options
  try {
    const { name, version } = JSON.parse(
      fs.readFileSync(path.join(buildPath, 'package.json'), 'utf-8')
    )
    const npm = new NpmApi()
    const repo = npm.repo(name)
    try {
      const res = await repo.package()
      if (res.version === version) {
        logger.info(
          `${name}@${version} has been already published. Do nothing.`
        )
      } else {
        publish(buildPath, dryRun)
      }
    } catch (e) {
      logger.log('Not found in registry. Publish for the first time.')
      publish(buildPath, dryRun)
    }
  } catch {
    logger.error('Cannot read information in package.json')
    return { success: false }
  }
  return { success: true }
}

exports.default = version
