const { logger } = require('@nrwl/devkit')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const NpmApi = require('npm-api')

const repo = 'docker.io'

async function build(options, context) {
  const { root, projectName, workspace } = context
  const { dryRun, publish } = options
  if (dryRun) {
    logger.info('Dry run: nothing will be executed')
  }
  const projectPath = workspace.projects[projectName].root
  const absoluteProjectPath = path.join(root, projectPath)
  const dockerfile = path.join(absoluteProjectPath, 'Dockerfile')
  const organisation = workspace.npmScope
  const mainTag = `${organisation}/${projectName}`
  const tags = ['latest']
  const opts = { stdio: 'inherit' }
  const buildCommand = `docker build ${root} -f ${dockerfile} -t ${mainTag}`
  if (dryRun) {
    logger.log(buildCommand)
  } else {
    execSync(buildCommand, opts)
  }
  const version = execSync(`git tag --contains HEAD 2>/dev/null`)
    .toString()
    .split('\n')
    .find((t) => t.startsWith(`${projectName}@`))
    ?.substr(projectName.length + 1)
  if (version) tags.push(version)
  for (const tag of tags) {
    const tagCommand = `docker tag ${mainTag} ${repo}/${mainTag}:${tag}`
    if (dryRun) {
      logger.log(tagCommand)
    } else {
      execSync(tagCommand, opts)
    }
  }

  if (publish) {
    if (dryRun) {
      logger.log(`docker push --all-tags ${repo}/${mainTag}`)
    } else {
      execSync(`docker push --all-tags ${repo}/${mainTag}`, opts)
    }
  }

  return { success: true }
}

exports.default = build
