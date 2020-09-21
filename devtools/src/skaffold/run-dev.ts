import path from 'path'
import chodikar from 'chokidar'
import { spawn } from 'child_process'

import { syncProject } from '../project'
import { getProjectConfiguration } from '../project/get-config'

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
  rootDir = process.env.INIT_CWD || (process.env.PWD as string)
): Promise<void> => {
  const project = await getProjectConfiguration(projectName)
  if (!project) throw Error(`Project ${projectName} not found.`)
  // TODO watch xyz package.json / yarn.lock files (as dependencies can change)
  const configPath = path.join(project.directory, 'config.yaml')
  const watcher = chodikar.watch(configPath)
  watcher.on('add', () => {
    const skaffold = spawn('skaffold', ['dev', '--port-forward'], {
      cwd: `${rootDir}/${project}`,
      stdio: ['inherit', 'inherit', 'inherit'],
      shell: true,
    })
    skaffold.on('exit', async () => {
      watcher.close()
    })
  })
  watcher.on('change', async () => {
    console.log('Config changed. Syncing...')
    await syncProject(project.directory)
  })
}
