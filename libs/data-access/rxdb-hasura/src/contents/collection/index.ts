import { ContentsCollectionMethods } from '../../types'
import { collectionConfigMethods } from './config'
import { collectionPermissionMethods } from './permissions'

export const collectionMethods: ContentsCollectionMethods = {
  ...collectionPermissionMethods,
  ...collectionConfigMethods
}
