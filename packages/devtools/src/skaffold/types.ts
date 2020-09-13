export type Artifact = {
  image: string
  context: string
  docker: {
    dockerfile?: string
    buildArgs?: Record<string, string>
  }
  sync?: { manual?: ManualSync[]; infer?: string[] }
}
type Release = {
  name: string
  chartPath: string
  artifactOverrides?: {
    image?: string
  }
}
type Activation = {
  command: string
}
type ManualSync = {
  src: string
  dest: string
}

export type Profile = {
  name: string
  activation: Activation[]
  build?: {
    artifacts: Array<Artifact>
  }
}
export type Skaffold = {
  apiVersion: 'skaffold/v2beta7'
  kind: 'Config'
  build: {
    artifacts: Artifact[]
  }
  deploy?: {
    helm: {
      releases: Release[]
    }
  }
  profiles: Profile[]
}
