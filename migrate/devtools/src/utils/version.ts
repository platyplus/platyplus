import conventionalAngular from 'conventional-changelog-angular'
import { Commit } from 'conventional-commits-parser'
import conventionalRecommendedBump, {
  Callback,
  Options
} from 'conventional-recommended-bump'

export type Recommendation = Callback.Recommendation & {
  commits: Commit<string | number | symbol>[]
}

const reasons: Callback.Recommendation.ReleaseType[] = [
  'major',
  'minor',
  'patch'
]

export const recommendedBump = async (
  tagName: string,
  path: string | string[],
  commits: Commit<string | number | symbol>[] = []
): Promise<Recommendation> => {
  const {
    recommendedBumpOpts: { whatBump }
  } = await conventionalAngular
  if (Array.isArray(path)) {
    const result: Recommendation = { level: 2, commits }
    for (const p of path) {
      const singleResult = await recommendedBump(tagName, p)
      // * Adds only commits that are not present yet
      commits.push(
        ...singleResult.commits.filter(
          commit => !commits.some(({ hash }) => hash === commit.hash)
        )
      )
      singleResult.level = Math.min(
        singleResult.level as number,
        result.level as number
      )
    }
    if (!commits.length) {
      result.level = undefined
      result.reason = 'No commit'
    } else {
      result.releaseType = reasons[result.level || 2]
    }
    return result
  } else {
    return new Promise((resolve, reject) => {
      conventionalRecommendedBump(
        {
          preset: 'angular',
          whatBump: wbCommits => {
            commits.push(...wbCommits)
            return whatBump(wbCommits)
          },
          lernaPackage: tagName,
          path
        } as Options,
        (error, recommendation) => {
          if (error) reject(error)
          if (!commits.length) {
            recommendation.level = undefined
            recommendation.reason = 'No commit'
            recommendation.releaseType = undefined
          }
          resolve({ ...recommendation, commits })
        }
      )
    })
  }
}
