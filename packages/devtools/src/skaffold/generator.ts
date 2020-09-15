import yaml from 'yaml'
import objectPath from 'object-path'
import fs from 'fs-extra'

import { getLernaPackage } from '@platyplus/lerna'

import { loadConfig } from '../configuration'
import { Config } from '../configuration/types'
import { loadService } from '../service/load'
import { writeDockerfiles } from '../service/docker'
import { Service, ServiceType } from '../service/types'

import { Artifact, Profile, Skaffold, Sync } from './types'

/**
 * Determines how files should be synced depending on the service type
 */
const fileSyncs: Record<ServiceType, (service: Service) => Sync> = {
  'ts-node': ({ directory, name }) => ({
    manual: [
      {
        src: `${directory}/${name}/src/**/*.{ts,json}`,
        dest: '.',
      },
    ],
  }),
  quasar: ({ directory, name }) => ({
    manual: [
      {
        src: `${directory}/${name}/src/**/*.{ts,vue,json,sass,html}`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/quasar.conf.js`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/src/assets/**/*`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/public/**/*`,
        dest: '.',
      },
    ],
  }),
}

/**
 * Generates the object representation of the skaffold.yaml from a devtools config object
 * @param config the Platyplus DevTools object
 */
const generateSkaffold = async (config: Config): Promise<Skaffold> => {
  const result = { ...config.skaffold }
  for (const s of config.services) {
    const npmPackage = await getLernaPackage(s.package)
    const service = await loadService(npmPackage.location)
    await writeDockerfiles(service)
    const { directory, name } = service
    const path = `${directory}/${name}`
    const image = `${directory}-${name}`
    result.build.artifacts.push({
      image,
      context: '..',
      docker: {
        dockerfile: `${path}/Dockerfile-development`,
      },
    })
    result.deploy?.helm.releases.push({
      name: image,
      chartPath: `${name}/helm`,
      artifactOverrides: { image },
    })
    const profileIndex = result.profiles.findIndex(
      (profile) => profile.name === 'dev'
    )
    const profile: Profile = result.profiles[profileIndex] || {}
    const artifact: Artifact = {
      image,
      context: '..',
      docker: {
        dockerfile: `${path}/Dockerfile-development`,
      },
    }
    artifact.sync = fileSyncs[service.type](service)

    if (!profile.activation) profile.activation = [{ command: 'dev' }]
    else if (profile.activation.every((act) => act.command !== 'dev'))
      profile.activation.push({ command: 'dev' })
    if (!Array.isArray(objectPath.get(profile, 'build.artifacts')))
      objectPath.set(profile, 'build.artifacts.0', artifact)
    else profile.build?.artifacts.push(artifact)
    if (profileIndex == -1) {
      profile.name = 'dev'
      result.profiles.push(profile)
    }
  }
  return result
}

/**
 * Generates a skaffold.yaml YAML file from a Platyplus DevTools file path
 * @param configPath the path of the Platyplus DevTools file
 */
const generateSkaffoldYaml = async (configPath: string): Promise<string> => {
  const config = await loadConfig(configPath)
  const skaffold = await generateSkaffold(config)
  return yaml.stringify(skaffold)
}

export const writeSkaffold = async (
  configFileName: string,
  skaffoldFileName: string
): Promise<void> => {
  try {
    const skaffoldYaml = await generateSkaffoldYaml(configFileName)
    console.log(skaffoldYaml)
    await fs.outputFile(skaffoldFileName, skaffoldYaml)
  } catch (error) {
    console.log(
      "Invalid config.yaml. Changes won't be taken into account:",
      error.message
    )
  }
}
