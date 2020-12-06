import commandExists from 'command-exists'

type Dependency = {
  bin: string
  name?: string
  version?: string
  optional?: boolean
}

const dependencies: Dependency[] = [
  {
    bin: 'docker',
    version: '19.03.13'
  },
  {
    bin: 'cz',
    name: 'git-cz',
    optional: true
  },
  {
    bin: 'helm',
    version: '3.3.4'
  },
  { bin: 'node', version: '14.10.0' },
  { bin: 'skaffold', version: '1.17.0' },
  { bin: 'yarn', version: '1.22.10' },
  { bin: 'git' },
  { bin: 'quasar', version: '1.1.2', optional: true },
  { bin: 'hasura', name: 'Hasura CLI', version: '1.3.3', optional: true },
  { bin: 'kubectl' }
]

// TODO check versions as well
export const checkMissingRequirements = async (): Promise<Dependency[]> =>
  dependencies.filter(({ bin }) => !commandExists.sync(bin))
