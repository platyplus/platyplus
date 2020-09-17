import path from 'path'
import { set } from 'object-path'

import fs from '@platyplus/fs'

import { DEFAULT_ROOT_DIR } from '../config'
import { DevToolsConfig } from '../configuration'
import { helmChartName } from '../service'

import { HelmChart } from './types'

export const defaults = (config: DevToolsConfig): HelmChart => ({
  apiVersion: 'v2',
  description: config.description,
  name: config.name,
  version: '0.1.0', //TODO
  appVersion: '1.0', //TODO
  dependencies: []
})

// TODO required to rebuild dependencies when skipBuildDependencies = false
// * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
const cleanDependencies = async (helmDirectory: string, chartName: string) => {
  const glob = fs.glob.sync(
    path.join(helmDirectory, `charts/${chartName}*.tgz`)
  )
  glob.forEach(f => fs.removeSync(f))
}

export const syncHelmChart = async (
  projectPath: string,
  config: DevToolsConfig
): Promise<void> => {
  console.log(`Syncing ${projectPath}/helm/Chart.yaml...`)
  const helmDirectory = path.join(DEFAULT_ROOT_DIR, projectPath, 'helm')
  const helmChartFile = path.join(helmDirectory, 'Chart.yaml')
  const yamlChart = await fs.loadYaml<HelmChart>(
    helmChartFile,
    defaults(config)
  )
  yamlChart.description = config.description
  yamlChart.name = config.name

  // TODO required to rebuild dependencies when skipBuildDependencies = false
  // * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
  await fs.remove(path.join(helmDirectory, 'Chart.lock'))

  for (const service of config.services) {
    let index = yamlChart.dependencies.findIndex(cursor =>
      cursor.alias
        ? cursor.alias === service.name
        : cursor.name === service.name
    )
    if (index < 0) index = yamlChart.dependencies.length
    set(yamlChart, `dependencies.${index}.name`, service.name)
    set(yamlChart, `dependencies.${index}.version`, '*') // ? not ideal
    if (!yamlChart.dependencies[index].condition) {
      yamlChart.dependencies[index].condition = `${service.name}.enabled`
      // TODO write `${service.name}.enabled` = true in values.yaml ? Or in the dev section of skaffold.yaml?
    }
    const chartName = helmChartName[service.type]
    await cleanDependencies(helmDirectory, chartName)
    const chartPath = path.join(helmDirectory, 'charts', service.name)
    if (!(await fs.pathExists(chartPath))) {
      const embeddedChartToServicePath = path.join(
        DEFAULT_ROOT_DIR,
        service.directory,
        service.name,
        'helm'
      )
      if (await fs.pathExists(embeddedChartToServicePath)) {
        set(yamlChart, `dependencies.${index}.name`, 'helm')
        set(
          yamlChart,
          `dependencies.${index}.repository`,
          `file://../${service.directory}/${service.name}`
        )
      } else {
        set(yamlChart, `dependencies.${index}.alias`, service.name)
        set(yamlChart, `dependencies.${index}.name`, chartName)
        if (process.env.NODE_ENV === 'development') {
          set(
            yamlChart,
            `dependencies.${index}.repository`,
            `file://../../charts/${chartName}`
          )
        } else {
          set(
            yamlChart,
            `dependencies.${index}.repository`,
            'https://charts.platyplus.io'
          )
        }
      }
    }
  }
  await fs.saveYaml(helmChartFile, yamlChart)
}
