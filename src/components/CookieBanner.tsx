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
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid #1a1a1a',
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
            fontSize: 9,
            color: '#3D3D3D',
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
            fontSize: isMobile ? 11 : 12,
            color: '#5D5D5D',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          This site sets <span style={{ color: '#E8E8E3' }}>zero</span> cookies. If analytics ever show up here, they'll
          be the cookieless, anonymous kind, no identity, no cross-site profile, nothing sold. You are still legally
          required to click something anyway.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: '1px solid #1a1a1a',
            color: '#5D5D5D',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            padding: isMobile ? '14px 16px' : '10px 16px',
            cursor: 'none',
            letterSpacing: '0.08em',
            flex: isMobile ? 1 : undefined,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#080808'
            e.currentTarget.style.backgroundColor = '#C7FF2E'
            e.currentTarget.style.borderColor = '#C7FF2E'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5D5D5D'
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = '#1a1a1a'
          }}
        >
          ACCEPT (DOESN'T MATTER)
        </button>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: '1px solid #1a1a1a',
            color: '#5D5D5D',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            padding: isMobile ? '14px 16px' : '10px 16px',
            cursor: 'none',
            letterSpacing: '0.08em',
            flex: isMobile ? 1 : undefined,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#E8E8E3'
            e.currentTarget.style.borderColor = '#292929'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5D5D5D'
            e.currentTarget.style.borderColor = '#1a1a1a'
          }}
        >
          REJECT (ALSO DOESN'T MATTER)
        </button>
      </div>
    </div>
  )
}
