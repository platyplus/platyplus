// TODO move to a separate package and export git-isomorphic
// * See: https://github.com/isomorphic-git/isomorphic-git/issues/236
import getGitConfigPath from 'git-config-path'
import parseGitConfig from 'parse-git-config'
type AuthorInfo = { name: string; email: string }

export const getGlobalGitAuthorInfo = async (): Promise<AuthorInfo> => {
  const globalGitConfigPath = getGitConfigPath('global')
  const parsedConfig = await parseGitConfig({
    path: globalGitConfigPath
  })
  if (parsedConfig && parsedConfig.user) return parsedConfig.user as AuthorInfo
  else throw Error('Cannot find global git config or user info')
}
