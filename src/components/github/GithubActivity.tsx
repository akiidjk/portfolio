import { useIsMobile } from '../../hooks/useBreakpoint'
import { ContributionGrid } from './ContributionGrid'
import { ContributionLegend } from './ContributionLegend'
import { useGithubContributions } from './useGithubContributions'

const GITHUB_USERNAME = 'akiidjk'

const statusTextStyle = {
  fontFamily: 'JetBrains Mono',
  fontSize: 'var(--fs-10)',
  color: 'var(--dim-label)',
  letterSpacing: '0.1em',
} as const

export function GithubActivity() {
  const isMobile = useIsMobile()
  const { status, activities, totalCount } = useGithubContributions(GITHUB_USERNAME)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: isMobile ? 20 : 28,
        }}
      >
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 'var(--fs-9)' : 'var(--fs-10)',
            color: 'var(--dim-label)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          [ GITHUB ACTIVITY ]
        </div>

        {status === 'success' && (
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-10)', color: 'var(--muted-steel)' }}>
            {totalCount.toLocaleString('en')} contributions, last 12 months
          </div>
        )}
      </div>

      {status === 'loading' && <div style={statusTextStyle}>[ LOADING CONTRIBUTIONS… ]</div>}
      {status === 'error' && <div style={statusTextStyle}>[ GITHUB DATA UNAVAILABLE ]</div>}

      {status === 'success' && (
        <>
          <ContributionGrid activities={activities} blockSize={isMobile ? 8 : 11} gap={isMobile ? 2 : 3} />
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
            <ContributionLegend />
          </div>
        </>
      )}
    </div>
  )
}
