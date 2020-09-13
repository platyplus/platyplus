import { stat, unlink } from 'fs/promises'
import path from 'path'
import tmp from 'tmp'
import chodikar from 'chokidar'
import { spawn } from 'child_process'

import { writeSkaffold } from './generator'

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

    const watcher = chodikar.watch(configPath) // TODO watch xyz package.json / yarn.lock files (as dependencies can change)
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
    })
  } catch (error) {
    console.log(error)
    throw Error(`${project} directory does not exist`)
  }
}
