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
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 'var(--fs-14)',
          color: 'var(--dim-label)',
          letterSpacing: '0.12em',
        }}
      >
        [{index}]
      </span>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 'var(--fs-14)',
          color: 'var(--phosphor-white)',
          letterSpacing: '0.16em',
        }}
      >
        {title}
      </span>
      <div
        style={{ flex: 1, height: 1, backgroundColor: 'var(--divider-black)', minWidth: isMobile ? 16 : undefined }}
      />
      {right && (
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-9)',
            color: 'var(--dim-label)',
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
