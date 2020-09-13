import { stat, unlink } from 'fs/promises'
import path from 'path'
import tmp from 'tmp'
import chodikar from 'chokidar'
import { spawn } from 'child_process'

import { writeSkaffold } from './generator'
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
export const runSkaffold = async (
  project: string,
  rootDir = process.env.INIT_CWD || (process.env.PWD as string)
): Promise<void> => {
  const projectPath = path.join(rootDir, project)
  try {
    if (!(await stat(projectPath)).isDirectory()) {
      throw Error(`${projectPath} is not a directory`)
    }
    const configPath = path.join(projectPath, 'config.yaml')
    const skaffoldPath = tmp.tmpNameSync()
    console.log(`Temporary skaffold.yaml file is ${skaffoldPath}`)
    await writeSkaffold(configPath, skaffoldPath)
    console.log('Skaffold config saved.')

    // TODO watch xyz package.json / yarn.lock files (as dependencies can change)
    const watcher = chodikar.watch(configPath)
    watcher.on('add', () => {
      const skaffold = spawn(
        'skaffold',
        ['dev', '--port-forward', '-f', `${skaffoldPath}`],
        {
          cwd: `${rootDir}/${project}`,
          stdio: ['inherit', 'inherit', 'inherit'],
          shell: true,
        }
      )
      skaffold.on('exit', async () => {
        watcher.close()
        await unlink(skaffoldPath)
      })
    })
    watcher.on('change', async () => {
      console.log('Config changed. Reloading...')
      await writeSkaffold(configPath, skaffoldPath)
      console.log('Skaffold config updated.')
    })
  } catch (error) {
    console.log(error)
    throw Error(`${project} directory does not exist`)
  }
}
