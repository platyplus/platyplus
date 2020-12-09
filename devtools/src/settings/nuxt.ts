import fs from '@platyplus/fs'
import { execSync, spawn } from 'child_process'
import objectPath from 'object-path'
import path from 'path'

import { DEFAULT_WORKING_DIR } from '.'
import { PackageTypes, ServiceTypeConfig } from './types'

// * See: https://github.com/nuxt/create-nuxt-app/blob/master/packages/create-nuxt-app/lib/prompts.js
const defaults = {
  language: 'ts',
  pm: 'yarn',
  ui: 'none',
  features: ['axios', 'pwa'],
  linter: [],
  test: 'none',
  mode: 'universal', // universal (SSR/SSG), spa
  target: 'server',
  devTools: [],
  ci: 'none',
  vcs: 'none'
}

const nuxtCreate = async (
  directory: string,
  name: string,
  packageName: string
): Promise<void> => {
  const answers = {
    ...defaults,
    name: packageName
  }
  const child = spawn(
    'yarn',
    [
      'create',
      'nuxt-app',
      name,
      '--answers',
      `'${JSON.stringify(answers).replace(/'/g, "'")}'`
    ],
    {
      cwd: path.join(DEFAULT_WORKING_DIR, directory),
      stdio: 'inherit'
    }
  )

  //   process.stdin.setRawMode(true)
  //   process.stdin.pipe(child.stdin)
  return new Promise(resolve => {
    child.on('exit', () => {
      resolve()
    })
  })
}

export const nuxtConfig: ServiceTypeConfig = ({
  directory,
  package: packageName,
  name,
  absolutePath,
  relativePath,
  pathToRoot,
  dependencies
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
          dockerfile: `${relativePath}/Dockerfile`
        }
      }
    },
    dev: {
      build: {
        image: `${directory}-${name}`,
        context: '..',
        docker: {
          dockerfile: `${relativePath}/Dockerfile-development`
        }
      },
      helm: {
        setValues: {
          ingress: {
            enabled: true,
            'hosts[0].name': `${name}.localhost`
          },
          targetPort: 3000
        }
      },
      files: [
        ...[
          'assets',
          'modules',
          'components',
          'layouts',
          'middleware',
          'pages',
          'plugins',
          'static',
          'store'
        ].map(dir => ({
          src: `${relativePath}/${dir}/**/*`,
          dest: '.'
        })),
        ...dependencies
          .filter(({ type }) => type === PackageTypes.TypeScript)
          .map(dep => ({
            src: `${dep.relativePath}/src/**/*`,
            dest: '.'
          })),
        {
          src: `${relativePath}/nuxt.config.*`,
          dest: '.'
        }
      ]
    },
    chartName: 'standard-service',
    init: async () => {
      await nuxtCreate(directory, name, packageName)
      if (await fs.pathExists(path.join(absolutePath, 'tsconfig.json'))) {
        // * update tsconfig file
        const tsPath = path.join(absolutePath, 'tsconfig.json')
        const tsValues = await fs.readJson(tsPath)
        objectPath.set(tsValues, 'extends', `${pathToRoot}/tsconfig.json`)
        await fs.writeJson(tsPath, tsValues, { spaces: '  ' })
        execSync("yarn add typescript@'<4'", { cwd: absolutePath })
        // TODO modulesDir: ['../../node_modules', 'node_modules'],
        // TODO NOHOIST - ** is not ideal but it makes the trick
        /*
        "workspaces": {
            "nohoist": [
                "**"
            ]
        }
        TODO then how/when update dependencies?
        TODO better solution: yarn add -D typescript@'<4'
        */
      }
    }
  }
}
