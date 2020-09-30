import { loadYaml } from '@platyplus/fs'
import chalk from 'chalk'
import mergeDeep from 'merge-deep'
import { get, set } from 'object-path'
import path from 'path'

import { DevToolsConfig } from '../../project'
import { DEFAULT_WORKING_DIR, serviceTypesConfig } from '../../settings'
import { indexOfArrayPathObject } from '../../utils'
import { defaultSkaffoldConfiguration } from '../default'
import { Skaffold } from '../types'
import { syncDevProfile } from './profiles'

const mergeArrayElementAtPath = (
  source: Record<string, unknown>,
  arrayPath: string,
  key: string,
  element: Record<string, unknown>
): number => {
  const index = indexOfArrayPathObject(source, key, get(element, key), {
    initialPath: arrayPath
  })
  const olderKeys = get(source, `${arrayPath}.${index}`)
  const newKeys = olderKeys ? mergeDeep(olderKeys, element) : element
  set(source, `${arrayPath}.${index}`, newKeys)
  return index
}

const syncHelm = (
  source: Record<string, unknown>,
  initialPath: string,
  configuration: DevToolsConfig
) => {
  const index = indexOfArrayPathObject(source, 'name', configuration.name, {
    initialPath
  })
  const helmPath = `${initialPath}.${index}`
  set(source, `${helmPath}.name`, configuration.name)
  set(source, `${helmPath}.chartPath`, 'helm')
  set(source, `${helmPath}.skipBuildDependencies`, false)
  return index
}

export const loadSkaffoldConfiguration = async (
  configuration: DevToolsConfig
): Promise<Skaffold> => {
  console.log(
    chalk.green(`Syncing ${configuration.directory}/skaffold.yaml...`)
  )
  const filePath = path.join(
    DEFAULT_WORKING_DIR,
    configuration.directory,
    'skaffold.yaml'
  )
  const skaffold = await loadYaml(filePath, defaultSkaffoldConfiguration)
  const profileIndex = syncDevProfile(skaffold)
  syncHelm(skaffold, 'deploy.helm.releases', configuration)
  set(skaffold, 'build.tagPolicy', { sha256: {} })
  set(skaffold, `profiles.${profileIndex}.build.tagPolicy`, { sha256: {} })

  for (const service of configuration.services) {
    console.log(chalk.green(`Syncing service config ${service.package}...`))
    if (!service.type) throw Error('No service type.')
    const serviceConfig = serviceTypesConfig[service.type](service)
    if (serviceConfig.main?.build) {
      mergeArrayElementAtPath(
        skaffold,
        'build.artifacts',
        'image',
        serviceConfig.main.build
      )
    }

    const dev = serviceConfig.dev
    if (dev) {
      const devPath = `profiles.${profileIndex}`
      const initialPath = `${devPath}.deploy.helm.releases`

      const index = syncHelm(skaffold, initialPath, configuration)
      const helmPath = `${initialPath}.${index}`

      if (dev.build) {
        const initialPath = `${devPath}.build.artifacts`
        const index = mergeArrayElementAtPath(
          skaffold,
          initialPath,
          'image',
          dev.build
        )

        for (const file of dev.files || []) {
          mergeArrayElementAtPath(
            skaffold,
            `${initialPath}.${index}.sync.manual`,
            'image',
            file
          )
        }
        set(
          skaffold,
          `${helmPath}.artifactOverrides.${service.name}.image`,
          `${service.directory}-${service.name}`
        )
      }
      if (dev.helm?.setValues) {
        // TODO in Chart.yaml and here: the helm chart alias should be ${service.directory}-${service.name} - in case the same name is used twice
        set(
          skaffold,
          `${helmPath}.setValues.${service.name}`,
          mergeDeep(
            get(skaffold, `${helmPath}.setValues.${service.name}`),
            dev.helm.setValues
          )
        )
      }
    }
  }
  return skaffold
}
