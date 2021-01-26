// TODO move to a separate package and export git-isomorphic
// * See: https://github.com/isomorphic-git/isomorphic-git/issues/236
import fs from '@platyplus/fs'
import getGitConfigPath from 'git-config-path'
import isoGit from 'isomorphic-git'
import parseGitConfig, { Options } from 'parse-git-config'

type AuthorInfo = { name: string; email: string }

export const getGlobalGitAuthorInfo = async (): Promise<AuthorInfo> => {
  const globalGitConfigPath = getGitConfigPath('global')
  const parsedConfig = await parseGitConfig({
    path: globalGitConfigPath
  } as Options)
  if (parsedConfig && parsedConfig.user) return parsedConfig.user as AuthorInfo
  else {
    console.log(globalGitConfigPath, parsedConfig)
    throw Error('Cannot find global git config or user info')
  }
}

export const getOriginUrl = async (
  dir: string
): Promise<string | undefined> => {
  const remotes = await isoGit.listRemotes({ dir, fs })
  return remotes.find(({ remote }) => remote === 'origin')?.url
}
