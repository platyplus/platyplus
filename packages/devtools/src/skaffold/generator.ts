import { loadConfig } from '../config'
import { Config } from '../config/types'
import { lernaPackagePath } from '../utils/lerna'
import { Artifact, Profile, Skaffold } from './types'
import yaml from 'yaml'

export const generateSkaffold = async (config: Config): Promise<Skaffold> => {
  const result = { ...config.skaffold }
  for (const service of config.services) {
    const [projectName, serviceName] = (
      await lernaPackagePath(service.package)
    ).split('/')
    result.build.artifacts.push({
      image: `${projectName}-${serviceName}`,
      context: '..',
      docker: {
        buildArgs: { SERVICE: `${projectName}/${serviceName}` },
      },
    })
    result.deploy?.helm.releases.push({
      name: `${projectName}-${serviceName}`,
      chartPath: `${serviceName}/charts`,
      artifactOverrides: {
        image: `${projectName}-${serviceName}`,
      },
    })
    const profileIndex = result.profiles.findIndex(
      (profile) => profile.name === 'dev'
    )
    const profile: Profile = result.profiles[profileIndex] || {}
    const artifact: Artifact = {
      image: `${projectName}-${serviceName}`,
      context: '..',
      docker: {
        dockerfile: 'Dockerfile-development',
        buildArgs: { SERVICE: `${projectName}/${serviceName}` },
      },
      sync: {
        manual: [
          {
            src: `${projectName}/${serviceName}/src/**/*.ts`, // ? only if typescript service
            dest: '.',
          },
        ],
      },
    }
    // TODO use object-path
    if (!profile.activation) profile.activation = [{ command: 'dev' }]
    else if (profile.activation.every((act) => act.command !== 'dev'))
      profile.activation.push({ command: 'dev' })
    if (!profile.build) profile.build = { artifacts: [artifact] }
    else if (!profile.build.artifacts) profile.build.artifacts = [artifact]
    else profile.build.artifacts.push(artifact)
    if (profileIndex == -1) {
      profile.name = 'dev'
      result.profiles.push(profile)
    }
  }
  return result
}

export const generateSkaffoldYaml = async (
  configPath: string
): Promise<string> => {
  const config = await loadConfig(configPath)
  const skaffold = await generateSkaffold(config)
  return yaml.stringify(skaffold)
}
