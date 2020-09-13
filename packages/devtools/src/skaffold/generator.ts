import yaml from 'yaml'
import objectPath from 'object-path'
import { writeFile } from 'fs/promises'

import { loadConfig } from '../config'
import { Config } from '../config/types'
import { loadService } from '../service/load'
import { writeDockerfiles } from '../service/generator'

import { Artifact, Profile, Skaffold } from './types'

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
      sync: {
        manual: [
          {
            src: `${path}/src/**/*.ts`, // TODO only if typescript service
            dest: '.',
          },
        ],
      },
    }

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
    console.log('Skaffold config saved.')
  } catch (error) {
    console.log(
      "Invalid config.yaml. Changes won't be taken into account:",
      error.message
    )
  }
}
