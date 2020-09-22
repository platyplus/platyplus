import chalk from 'chalk'
import { spawn } from 'child_process'
import chodikar from 'chokidar'
import path from 'path'

import { getProject, syncProject } from '../project'
import { DEFAULT_WORKING_DIR } from '../settings'

/**
 * Starts Skaffold for a given project
 * 1. Reads the Platyplus DevTools config.yaml file
 * 2. Generates the Dockerfiles
 * 3. Generates the skaffold settings (as a temporary file)
 * 4. Runs skaffold
 * 5. Watches changes in the Paltyplus DevTools config.yaml file, and re-runs 1-2-3 in that case (Skaffold handles step 4)
 * @param project The project directory, in which the config.yaml file will be found
 * @param rootDir
 */
export const runSkaffoldDev = async (
  projectName: string,
  rootDir = DEFAULT_WORKING_DIR
): Promise<void> => {
  const project = await getProject(projectName)
  if (!project) throw Error(`Project ${projectName} not found.`)
  // TODO watch xyz package.json / yarn.lock files (as dependencies can change)
  const configPath = path.join(rootDir, project.directory, 'config.yaml')
  const watcher = chodikar.watch(configPath)
  watcher.on('add', async () => {
    await syncProject(project.name)
    const skaffold = spawn('skaffold', ['dev', '--port-forward'], {
      cwd: path.join(rootDir, project.directory),
      stdio: ['inherit', 'inherit', 'inherit'],
      shell: true,
    })
    skaffold.on('exit', () => {
      watcher.close()
    })
  })
  watcher.on('change', async () => {
    console.log(chalk.green('Config changed. Syncing...'))
    await syncProject(project.name)
  })
}
