import { useEffect, useState } from 'react'

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

const BUTTON_BASE =
  'flex-1 cursor-none border border-hairline bg-transparent px-4 py-3.5 font-mono text-fs-10 tracking-[0.08em] text-muted-steel transition-colors duration-200 sm:flex-none sm:py-2.5'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

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
    <div className="fixed inset-x-0 bottom-0 z-[90000] flex animate-[modalSlideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex-col items-stretch justify-between gap-4 border-t border-hairline bg-panel-black p-5 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
      <div className="max-w-[860px]">
        <div className="mb-2 font-mono text-fs-9 tracking-[0.2em] text-dim-label uppercase">[ COOKIE.NOTICE ]</div>
        <p className="font-mono text-fs-11 leading-[1.6] text-muted-steel sm:text-fs-12">
          This site sets <span className="text-phosphor-white">zero</span> cookies. If analytics ever show up here,
          they'll be the cookieless, anonymous kind, no identity, no cross-site profile, nothing sold. You are still
          legally required to click something anyway.
        </p>
      </div>

      <div className="flex shrink-0 gap-2.5">
        <button
          onClick={dismiss}
          className={`${BUTTON_BASE} hover:border-signal-green hover:bg-signal-green hover:text-void-black`}
        >
          ACCEPT (DOESN'T MATTER)
        </button>
        <button onClick={dismiss} className={`${BUTTON_BASE} hover:border-active-gray hover:text-phosphor-white`}>
          REJECT (ALSO DOESN'T MATTER)
        </button>
      </div>
    </div>
  )
}
