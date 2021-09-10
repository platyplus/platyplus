import { logger } from '@nrwl/devkit'
import { resolve } from 'path'
import * as yaml from 'yaml'
import { writeFile, readFile } from 'fs/promises'

export const saveVersion = async ({
  newVersion,
  projectRoot,
  dryRun = false
}: {
  newVersion: string
  projectRoot: string
  dryRun?: boolean
}) => {
  const filePath = resolve(projectRoot, 'Chart.yaml')
  const rawFile = await readFile(filePath, 'utf-8')
  const yamlFile = yaml.parse(rawFile)
  yamlFile.version = newVersion
  if (!dryRun) await writeFile(filePath, yamlFile)
  logger.info(`New Chart version in ${filePath}: ${yamlFile.version}`)
}
