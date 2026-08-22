import { useIsMobile } from '../hooks/useBreakpoint'

export function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer
      style={{
        flexShrink: 0,
        padding: isMobile ? '20px 20px' : '24px 40px',
        borderTop: '1px solid var(--hairline)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 8 : 0,
        justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono',
        fontSize: 'var(--fs-9)',
        color: 'var(--dim-label)',
        letterSpacing: '0.12em',
      }}
    >
      <span>akiidjk@2026</span>
      <span>TRYING TO DO BETTER</span>
      <span>SALERNO, ITALY — 41.89° N</span>
    </footer>
  )
}
