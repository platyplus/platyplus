export type Sync = { manual?: ManualSync[]; infer?: string[] }

export type Artifact = {
  image: string
  context: string
  docker?: {
    dockerfile?: string
    buildArgs?: Record<string, string>
  }
  sync?: Sync
}

export type Release = {
  name: string
  chartPath: string
  artifactOverrides?: {
    image?: string
  }
}

export type Activation = {
  command: string
}
type ManualSync = {
  src: string
  dest: string
}

type Build = {
  tagPolicy: {
    sha256?: Record<never, never>
  }
  artifacts: Artifact[]
}

export type Profile = {
  name: string
  activation: Activation[]
  build?: Build
}

export type Skaffold = {
  apiVersion: 'skaffold/v2beta8'
  kind: 'Config'
  build: Build
  deploy?: {
    helm: {
      releases: Release[]
    }
  }
  profiles: Profile[]
}

export type SkaffoldPortEvent = {
  localPort: number //5433
  remotePort: number //5432
  namespace: string // 'default'
  resourceType: string // 'service'
  resourceName: string // 'dummy-postgresql-headless'
  address: string // '127.0.0.1'
}

export type SkaffoldEvent = {
  result: {
    timestamp: string //'2020-09-30T20:23:33.333884Z'
    event: {
      portEvent?: SkaffoldPortEvent
      devLoopEvent?: {
        status: 'Succeeded' | string // ?
      }
    }
    entry: string //'Forwarding container  to local port 5433'
  }
}
