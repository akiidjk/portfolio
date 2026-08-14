import { useIsMobile } from '../hooks/useBreakpoint'

export function SectionHeader({ index, title, right }: { index: string; title: string; right?: string }) {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 10 : 20,
        paddingBottom: 18,
        borderBottom: '1px solid #1a1a1a',
      }}
    >
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#292929', letterSpacing: '0.12em' }}>
        [{index}]
      </span>
      <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: '#E8E8E3', letterSpacing: '0.16em' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: '#111', minWidth: isMobile ? 16 : undefined }} />
      {right && (
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#292929',
            letterSpacing: '0.1em',
            flexBasis: isMobile ? '100%' : 'auto',
          }}
        >
          {right}
        </span>
      )}
    </div>
  )
}
