import fs, { tmp } from '@platyplus/fs'
import chalk from 'chalk'
import { execSync } from 'child_process'
import path from 'path'

import { getProject } from '../project'
import { DEFAULT_WORKING_DIR } from '.'
import { PackageType, ServiceTypeConfig } from './types'
export const hasuraBackendPlusConfig: ServiceTypeConfig = ({
  directory,
  name,
  location
}) => ({
  main: {
    build: {
      image: `${directory}-${name}`,
      context: name
    }
  },
  dev: {
    build: false
    // helm: {
    //   setValues: {
    //     adminSecret: 'development-hasura-admin-secret',
    //     jwt: {
    //       key: 'long-hasura-jwt-more-than-thirty-two-characters',
    //       algorithm: 'HS256'
    //     }
    //   }
    // }
  },
  chartName: 'hasura-backend-plus',
  // * Find an existing Hasura service and copy the official HBP migrations/metadata into it
  postInstall: async () => {
    // * Determine if this package is located in a project directory
    const cursor = location.split('/')
    while (
      !fs.pathExistsSync(`/${cursor.join('/')}/.platy.yaml`) &&
      cursor.length
    ) {
      cursor.pop()
    }
    if (!cursor.length) {
      console.log(
        chalk.greenBright(
          'Nowhere to install Hasura migrations. The location of this Hasura Backend Plus package does not appear to be embedded into a PlatyDev project. '
        )
      )
      return
    }

    // * Load the project
    const projectPath = path.relative(
      DEFAULT_WORKING_DIR,
      `/${cursor.join('/')}`
    )
    const project = await getProject(projectPath)

    const hasuraServices = project.services.filter(
      (service) => service.type === PackageType.Hasura
    )

    // * Stop if no Hasura service has been found in the project
    if (!hasuraServices.length) {
      console.log(
        chalk.greenBright(
          `Nowhere to install Hasura migrations. No Hasura package found in the ${projectPath} project.`
        )
      )
      return
    }

    // * Stop if more than one Hasura service has been found in the project
    if (hasuraServices.length > 1) {
      console.log(
        chalk.greenBright(
          `Found more than one Hasura service in the ${projectPath} project. Install migrations manually`
        )
      )
      return
    }

    // * One single Hasura service found. Load the HBP migrations/metadata and update Helm values
    const hasura = hasuraServices[0]
    console.log(
      chalk.green(
        `Loading migrations and metadata to ${hasura.directory}/${hasura.name} from https://github.com/nhost/hasura-backend-plus...`
      )
    )

    // * Clone the repo in a temp dir
    // TODO git clone --filter only the required directories
    const tempDir = tmp.dirSync().name
    execSync(
      'git clone --depth=1 https://github.com/nhost/hasura-backend-plus.git',
      {
        cwd: tempDir,
        stdio: 'ignore'
      }
    )

    // * Copy HBP migrations
    try {
      for (const migration of fs.glob.sync(
        path.join(tempDir, 'hasura-backend-plus/migrations/*')
      )) {
        // TODO only sql files, not yaml files
        await fs.move(
          migration,
          path.join(hasura.location, 'migrations', path.basename(migration))
        )
      }
    } catch (err) {
      console.log(
        chalk.red(
          `Something went wrong in loading HBP migrations into ${hasura.directory}/${hasura.name}. Please copy/mere them manually.`
        )
      )
      console.log(err)
    }

    // * Copy HBP metadata. Will not work if some metadata already exists
    for (const source of fs.glob.sync(
      path.join(tempDir, 'hasura-backend-plus/metadata/*')
    )) {
      const destination = path.join(
        hasura.location,
        'metadata',
        path.basename(source)
      )
      if (fs.pathExistsSync(destination)) {
        // * If the file already exists, check if it's a YAML file or not
        if (path.extname(source) === '.yaml') {
          // * If it's a YAML file, then concatenate if it's an object, or merge if it's an object
          const oldData = await fs.readYaml<
            Record<string, unknown> | Record<string, unknown>[]
          >(destination)
          if (Array.isArray(oldData)) {
            const newData = await fs.readYaml<Record<string, unknown>[]>(source)
            await fs.saveYaml(destination, [...oldData, ...newData])
          } else {
            const newData = await fs.readYaml<Record<string, unknown>>(source)
            await fs.loadYaml(destination, newData, true)
          }
        } else {
          // * If the file is not a YAML file, then consider as text and append it (e.g. graphql file)
          const newData = fs.readFileSync(source).toString()
          fs.appendFileSync(destination, newData)
        }
      } else {
        await fs.move(source, destination)
      }
    }

    await fs.remove(tempDir)

    // * Update Helm Chart values so it loads Hasura-related environment values from Hasura secrets and config-map
    await fs.loadYaml(
      path.join(DEFAULT_WORKING_DIR, projectPath, 'helm/values.yaml'),
      {
        [name]: { connect: { hasura: { enabled: true } } }
      }
    )
  }
})
