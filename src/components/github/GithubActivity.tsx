import { Suspense } from 'react'
import { getGithubContributions } from '../../lib/github-contributions'
import { ErrorBoundary } from '../ErrorBoundary'
import { GitHubContributions, GitHubContributionsFallback } from './github-contribution'

const GITHUB_USERNAME = 'akiidjk'

export function GithubActivity() {
  const contributions = getGithubContributions(GITHUB_USERNAME)

  return (
    <div>
      <div className="mb-5 font-mono text-fs-9 tracking-[0.18em] text-dim-label uppercase sm:mb-7 sm:text-fs-10">
        [ GITHUB ACTIVITY ]
      </div>
      <ErrorBoundary>
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions contributions={contributions} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
