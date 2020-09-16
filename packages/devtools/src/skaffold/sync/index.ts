import { get, set } from 'object-path'

import { getLernaPackage } from '@platyplus/lerna'

import { DevToolsConfig } from '../../configuration'
import { loadService, writeDockerfiles } from '../../service'
import { loadYaml } from '../../utils'

import { defaultSkaffoldConfiguration } from '../default'
import { Skaffold } from '../types'

import { syncDevProfile } from './profiles'
import { syncArtifact } from './artifact'
import { syncFiles } from './files'
import { syncHelm } from './helm'

export const loadSkaffoldConfiguration = async (
  projectPath: string,
  configuration: DevToolsConfig
): Promise<Skaffold> => {
  console.log(`Syncing ${projectPath}/skaffold.yaml...`)
  const skaffold = await loadYaml(
    projectPath,
    'skaffold.yaml',
    defaultSkaffoldConfiguration
  )
  const profileIndex = syncDevProfile(skaffold)
  const helmReleaseIndex = syncHelm(
    skaffold,
    configuration.name,
    'deploy.helm.releases'
  )
  for (const s of configuration.services) {
    console.log(`Syncing service config ${s.package}...`)
    const npmPackage = await getLernaPackage(s.package)
    const service = await loadService(npmPackage.location)
    await writeDockerfiles(service)
    const { directory, name } = service
    const path = `${directory}/${name}`

    const idxBuildArt = syncArtifact(skaffold, service, 'build.artifacts')
    set(
      skaffold,
      `build.artifacts.${idxBuildArt}.docker.dockerfile`,
      `${path}/Dockerfile`
    )

    const idxDevArt = syncArtifact(
      skaffold,
      service,
      `profiles.${profileIndex}.build.artifacts`
    )
    const devArtifactPath = `profiles.${profileIndex}.build.artifacts.${idxDevArt}`
    set(
      skaffold,
      `${devArtifactPath}.docker.dockerfile`,
      `${path}/Dockerfile-development`
    )
    set(skaffold, `${devArtifactPath}.sync`, syncFiles[service.type](service))
    set(
      skaffold,
      `deploy.helm.releases.${helmReleaseIndex}.artifactOverrides.${name}.image`,
      `${directory}-${name}`
    )
  }
  return skaffold
}
