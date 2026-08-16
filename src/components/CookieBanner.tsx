import { useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useBreakpoint'

const DISMISSED_KEY = 'akiidjk-cookie-notice-dismissed'

function isDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, '1')
  } catch {
    // ignore
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  // Client-only reveal — nothing here needs to exist during SSR, and
  // checking localStorage on the server isn't possible anyway.
  useEffect(() => {
    if (!isDismissed()) setVisible(true)
  }, [])

  if (!visible) return null

  const dismiss = () => {
    markDismissed()
    setVisible(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90000,
        backgroundColor: 'var(--panel-black)',
        borderTop: '1px solid var(--hairline)',
        padding: isMobile ? '20px' : '20px 40px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 16 : 32,
        animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ maxWidth: 860 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-9)',
            color: 'var(--dim-label)',
            letterSpacing: '0.2em',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}
        >
          [ COOKIE.NOTICE ]
        </div>
        <p
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 'var(--fs-11)' : 'var(--fs-12)',
            color: 'var(--muted-steel)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          This site sets <span style={{ color: 'var(--phosphor-white)' }}>zero</span> cookies. If analytics ever show up
          here, they'll be the cookieless, anonymous kind, no identity, no cross-site profile, nothing sold. You are
          still legally required to click something anyway.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: '1px solid var(--hairline)',
            color: 'var(--muted-steel)',
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-10)',
            padding: isMobile ? '14px 16px' : '10px 16px',
            cursor: 'none',
            letterSpacing: '0.08em',
            flex: isMobile ? 1 : undefined,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--void-black)'
            e.currentTarget.style.backgroundColor = 'var(--signal-green)'
            e.currentTarget.style.borderColor = 'var(--signal-green)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted-steel)'
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'var(--hairline)'
          }}
        >
          ACCEPT (DOESN'T MATTER)
        </button>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: '1px solid var(--hairline)',
            color: 'var(--muted-steel)',
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-10)',
            padding: isMobile ? '14px 16px' : '10px 16px',
            cursor: 'none',
            letterSpacing: '0.08em',
            flex: isMobile ? 1 : undefined,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--phosphor-white)'
            e.currentTarget.style.borderColor = 'var(--active-gray)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted-steel)'
            e.currentTarget.style.borderColor = 'var(--hairline)'
          }}
        >
          REJECT (ALSO DOESN'T MATTER)
        </button>
      </div>
    </div>
  )
}
