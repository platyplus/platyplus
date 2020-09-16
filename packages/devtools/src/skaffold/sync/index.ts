import path from 'path'
import { set } from 'object-path'

import { getLernaPackage } from '@platyplus/lerna'
import { loadYaml } from '@platyplus/fs'

import { DevToolsConfig } from '../../configuration'
import { loadService, writeDockerfiles } from '../../service'

import { defaultSkaffoldConfiguration } from '../default'
import { Skaffold } from '../types'

import { syncDevProfile } from './profiles'
import { syncArtifact } from './artifact'
import { syncFiles } from './files'
import { syncHelm } from './helm'
import { DEFAULT_ROOT_DIR } from '../../config'

export const loadSkaffoldConfiguration = async (
  projectPath: string,
  configuration: DevToolsConfig
): Promise<Skaffold> => {
  console.log(`Syncing ${projectPath}/skaffold.yaml...`)
  const filePath = path.join(DEFAULT_ROOT_DIR, projectPath, 'skaffold.yaml')
  const skaffold = await loadYaml(filePath, defaultSkaffoldConfiguration)
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
