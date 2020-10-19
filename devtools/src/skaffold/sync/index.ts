import { loadYaml } from '@platyplus/fs'
import chalk from 'chalk'
import mergeDeep from 'merge-deep'
import { get, set } from 'object-path'
import path from 'path'

import { DevToolsConfig } from '../../project'
import { DEFAULT_WORKING_DIR } from '../../settings'
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
  const helmReleaseIndex = syncHelm(
    skaffold,
    'deploy.helm.releases',
    configuration
  )
  set(skaffold, 'build.tagPolicy', { sha256: {} })
  set(skaffold, `profiles.${profileIndex}.build.tagPolicy`, { sha256: {} })

  const devPath = `profiles.${profileIndex}`
  const devHelmReleasePath = `${devPath}.deploy.helm.releases`

  const devHelmReleaseIndex = syncHelm(
    skaffold,
    devHelmReleasePath,
    configuration
  )
  const helmPath = `deploy.helm.releases.${helmReleaseIndex}`
  const devHelmPath = `${devHelmReleasePath}.${devHelmReleaseIndex}`

  // * Enable Traefik and ingress routes
  set(skaffold, `${devHelmPath}.setValues.traefik.enabled`, true)
  // * Enable all Ingress routes in development mode
  set(
    skaffold,
    `${devHelmPath}.setValues.global.ingress`,
    mergeDeep(
      get(skaffold, `${devHelmPath}.setValues.global.ingress`, {
        enabled: true,
        domain: 'localhost'
      })
    )
  )

  for (const service of configuration.services) {
    console.log(chalk.green(`Syncing service config ${service.package}...`))
    if (!service.type) throw Error('No service type.')
    if (!service.config) throw Error('No service config.')
    const serviceConfig = service.config
    if (serviceConfig.main?.build) {
      mergeArrayElementAtPath(
        skaffold,
        'build.artifacts',
        'image',
        serviceConfig.main.build
      )
    }

    if (serviceConfig.main?.build) {
      set(
        skaffold,
        `${helmPath}.artifactOverrides.${service.name}.image`,
        `${service.directory}-${service.name}`
      )
    }

    const dev = serviceConfig.dev
    if (dev) {
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
          `${devHelmPath}.artifactOverrides.${service.name}.image`,
          `${service.directory}-${service.name}`
        )
      }
      if (dev.helm?.setValues) {
        set(
          skaffold,
          `${devHelmPath}.setValues.${service.name}`,
          mergeDeep(
            get(skaffold, `${devHelmPath}.setValues.${service.name}`),
            dev.helm.setValues
          )
        )
      }
    }
  }
  return skaffold
}
