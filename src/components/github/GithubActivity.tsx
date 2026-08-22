import { useIsMobile } from '../../hooks/useBreakpoint'
import { ContributionGrid } from './ContributionGrid'
import { ContributionLegend } from './ContributionLegend'
import { useGithubContributions } from './useGithubContributions'

const GITHUB_USERNAME = 'akiidjk'

const statusTextClass = 'font-mono text-fs-10 tracking-[0.1em] text-dim-label'

export function GithubActivity() {
  // Still needed: ContributionGrid's blockSize/gap are real SVG geometry
  // numbers, not CSS — there's no responsive-class equivalent for those.
  const isMobile = useIsMobile()
  const { status, activities, totalCount } = useGithubContributions(GITHUB_USERNAME)

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 sm:mb-7">
        <div className="font-mono text-fs-9 tracking-[0.18em] text-dim-label uppercase sm:text-fs-10">
          [ GITHUB ACTIVITY ]
        </div>

        {status === 'success' && (
          <div className="font-mono text-fs-10 text-muted-steel">
            {totalCount.toLocaleString('en')} contributions, last 12 months
          </div>
        )}
      </div>

      {status === 'loading' && <div className={statusTextClass}>[ LOADING CONTRIBUTIONS… ]</div>}
      {status === 'error' && <div className={statusTextClass}>[ GITHUB DATA UNAVAILABLE ]</div>}

      {status === 'success' && (
        <>
          <ContributionGrid activities={activities} blockSize={isMobile ? 8 : 11} gap={isMobile ? 2 : 3} />
          <div className="mt-3.5 flex justify-end">
            <ContributionLegend />
          </div>
        </>
      )}
    </div>
  )
}
