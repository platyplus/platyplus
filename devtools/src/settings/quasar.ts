import fs from '@platyplus/fs'
import chalk from 'chalk'
import { execSync, spawn } from 'child_process'
import objectPath from 'object-path'
import path from 'path'

import { globalPath } from '../utils'
import { DEFAULT_WORKING_DIR } from '.'
import { ServiceTypeConfig } from './types'

const quasarCreate = async (directory: string, name: string): Promise<void> => {
  const child = spawn(`${globalPath()}/quasar`, ['create', name], {
    cwd: path.join(DEFAULT_WORKING_DIR, directory),
    stdio: ['pipe', 'inherit', 'inherit']
  })
  process.stdin.setRawMode(true)
  child.stdin.write(`${name}\n`)
  process.stdin.pipe(child.stdin)
  return new Promise((resolve) => {
    child.on('exit', () => {
      resolve()
    })
  })
}

export const quasarConfig: ServiceTypeConfig = ({
  directory,
  name,
  absolutePath,
  pathToRoot
}) => {
  return {
    values: {
      imageConfig: { tag: 'latest', pullPolicy: 'IfNotPresent' }
    },
    main: {
      build: {
        image: `${directory}-${name}`,
        context: '..',
        docker: {
          dockerfile: `${directory}/${name}/Dockerfile`
        }
      }
    },
    dev: {
      build: {
        image: `${directory}-${name}`,
        context: '..',
        docker: {
          dockerfile: `${directory}/${name}/Dockerfile-development`
        }
      },
      helm: {
        setValues: {
          ingress: {
            enabled: true,
            'hosts[0].name': `${name}.localhost`
          },
          targetPort: 8080
        }
      },
      files: [
        {
          src: `${directory}/${name}/src/**/*.{ts,vue,json,sass,html}`,
          dest: '.'
        },
        {
          src: `${directory}/${name}/quasar.conf.js`,
          dest: '.'
        },
        {
          src: `${directory}/${name}/src/assets/**/*`,
          dest: '.'
        },
        {
          src: `${directory}/${name}/public/**/*`,
          dest: '.'
        }
      ]
    },
    chartName: 'standard-service',
    init: async () => {
      console.log(
        chalk.yellow(
          'Attention: DO NOT SELECT the ESLint feature, but SELECT the Typescript feature'
        )
      )
      await quasarCreate(directory, name)
      if (await fs.pathExists(path.join(absolutePath, 'tsconfig.json'))) {
        execSync(
          `lerna add --dev @platyplus/quasar-app-extension-ts-lerna --scope=${name}`,
          {
            cwd: DEFAULT_WORKING_DIR,
            stdio: 'inherit'
          }
        )
        execSync(`${globalPath()}/quasar ext invoke @platyplus/ts-lerna`, {
          cwd: absolutePath,
          stdio: 'inherit'
        })
        // * Update the tsconfig.webpack.json file from the quasar extension so it points to the root config
        const tsWebpackPath = path.join(absolutePath, 'tsconfig.webpack.json')
        const tsWebpack = await fs.readJson(tsWebpackPath)
        objectPath.set(tsWebpack, 'extends', `${pathToRoot}/tsconfig.json`)
        await fs.writeJson(tsWebpackPath, tsWebpack, { spaces: '  ' })
      }
    }
  }
}
