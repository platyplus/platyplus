module.exports = {
  onPreBuild: ({ utils }) => {
    const currentProject = process.env.PROJECT_NAME
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF
    const latestCommit = process.env.COMMIT_REF
    // * Don't cancel initial Netlify build
    if (lastDeployedCommit !== latestCommit) {
      const projectHasChanged = projectChanged(
        currentProject,
        lastDeployedCommit,
        latestCommit
      )
      if (!projectHasChanged) {
        utils.build.cancelBuild(
          `Build was cancelled because ${currentProject} was not affected by the latest changes. CACHED_COMMIT_REF=${process.env.CACHED_COMMIT_REF}, COMMIT_REF=${process.env.COMMIT_REF}`
        )
      }
    }
  }
}

function projectChanged(currentProject, fromHash, toHash) {
  const execSync = require('child_process').execSync
  const getAffected = `yarn --silent nx print-affected --base=${fromHash} --head=${toHash}`
  const output = execSync(getAffected).toString()
  //get the list of changed projects from the output
  const changedProjects = JSON.parse(output).projects
  return changedProjects.includes(currentProject)
}
