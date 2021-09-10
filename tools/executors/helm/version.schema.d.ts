export interface VersionBuilderSchema {
  dryRun?: boolean
  noVerify?: boolean
  version?:
    | 'patch'
    | 'minor'
    | 'major'
    | 'premajor'
    | 'preminor'
    | 'prepatch'
    | 'prerelease'
  preid?: string
  versionTagPrefix?: string
}
