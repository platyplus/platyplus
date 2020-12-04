import fs from '@platyplus/fs'
import merge from 'deepmerge'
import { get, set } from 'object-path'
import path from 'path'

import { createPackage } from '../package'
import { ProjectConfig } from '../project'
import {
  DEFAULT_WORKING_DIR,
  PackageTypeConfigResult,
  ServiceTypes
} from '../settings'

/**
 *
 * @param project project configuration already loaded from a valid .platy.yaml file
 * @param directory subdirectory of the service, within the project folder
 * @param packageName package.json name of the service
 * @param type service type
 * @param description description of the service. Will correspond to the package.json description
 * @param route enable the ingress route in the Helm Chart values of the project
 * @param serviceTypeHook trigger service-type-specific post-install hook - e.g. the CLI triggers them manually later after prompting info from the user
 */
export const createService = async (
  project: ProjectConfig,
  directory: string,
  packageName: string,
  type: ServiceTypes,
  description: string,
  route: boolean,
  serviceTypeHook = true
): Promise<PackageTypeConfigResult> => {
  const projectDir = path.join(DEFAULT_WORKING_DIR, project.directory)
  const settings = await createPackage(
    type,
    packageName,
    path.join(projectDir, directory),
    description,
    true
  )
  const projectConfigPath = path.join(projectDir, '.platy.yaml')
  await fs.loadYaml(projectConfigPath, { services: [{ package: packageName }] })

  const helmDirectory = path.join(projectDir, 'helm')
  const helmValuesFile = path.join(helmDirectory, 'values.yaml')
  const helmValues = await fs.loadYaml<Record<string, unknown>>(
    helmValuesFile,
    { traefik: { enabled: false } }
  )

  set(helmValues, `${directory}.enabled`, true)

  if (route) {
    set(helmValues, `${directory}.ingress.enabled`, true)
  }
  if (settings.values) {
    set(
      helmValues,
      directory,
      merge(get(helmValues, directory, {}), settings.values)
    )
  }
  await fs.saveYaml(helmValuesFile, helmValues)

  if (serviceTypeHook) {
    await settings.postServiceCreate?.(project)
  }

  return settings
}
