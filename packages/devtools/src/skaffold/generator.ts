import yaml from 'yaml'
import objectPath from 'object-path'
import { writeFile } from 'fs/promises'

import { loadConfig } from '../config'
import { Config } from '../config/types'
import { loadService } from '../service/load'
import { writeDockerfiles } from '../service/generator'

import { Artifact, Profile, Skaffold } from './types'
import { Service } from '../service/types'

/**
 * Determines how files should be synced depending on the service type
 */
const fileSyncs = {
  'ts-node': ({ path }: Service) => ({
    manual: [
      {
        src: `${path}/src/**/*.ts`,
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
    const service = await loadService(s.package)
    await writeDockerfiles(service)
    const { project, name, path } = service
    result.build.artifacts.push({
      image: `${project}-${name}`,
      context: '..',
      docker: {
        dockerfile: `${path}/Dockerfile-development`,
      },
    })
    result.deploy?.helm.releases.push({
      name: `${project}-${name}`,
      chartPath: `${name}/charts`,
      artifactOverrides: {
        image: `${project}-${name}`,
      },
    })
    const profileIndex = result.profiles.findIndex(
      (profile) => profile.name === 'dev'
    )
    const profile: Profile = result.profiles[profileIndex] || {}
    const artifact: Artifact = {
      image: `${project}-${name}`,
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
  const skaffoldYaml = await generateSkaffoldYaml(configFileName)
  try {
    await writeFile(skaffoldFileName, skaffoldYaml)
  } catch (error) {
    console.log(
      "Invalid config.yaml. Changes won't be taken into account:",
      error.message
    )
  }
}
