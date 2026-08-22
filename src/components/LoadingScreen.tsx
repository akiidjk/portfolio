import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const MIN_DISPLAY_MS = 1800
const EXIT_DURATION_MS = 600
const VISITED_KEY = 'akiidjk-visited'

// sessionStorage can throw in restrictive contexts (Safari private mode,
// some sandboxed iframes) — this is a mood-setting ritual, not a critical
// feature, so failing open (always show it) beats crashing the app.
function hasVisited(): boolean {
  try {
    return sessionStorage.getItem(VISITED_KEY) !== null
  } catch {
    return false
  }
}

function markVisited(): void {
  try {
    sessionStorage.setItem(VISITED_KEY, '1')
  } catch {
    // ignore — worst case the ritual replays next load
  }
}

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const startRef = useRef(Date.now())

  // Repeat visits within the same session skip the ritual entirely — this
  // runs before paint so a returning visitor never sees it flash in.
  useLayoutEffect(() => {
    if (hasVisited()) onFinish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lock scroll while the loading screen is up.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Let an impatient visitor skip straight to the exit animation.
  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProgress(100)
    }
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [])

  // Ease progress up to 90% while assets are still loading.
  useEffect(() => {
    let raf = 0
    const tick = () => {
      setProgress((p) => (p >= 90 ? p : Math.min(p + (90 - p) * 0.04 + 0.15, 90)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Once the video is ready, finish the bar after a minimum display time.
  useEffect(() => {
    if (!isVideoReady) return
    const elapsed = Date.now() - startRef.current
    const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0)
    const timeout = setTimeout(() => setProgress(100), remaining)
    return () => clearTimeout(timeout)
  }, [isVideoReady])

  // Trigger the fade-out once the bar completes.
  useEffect(() => {
    if (progress < 100) return
    markVisited()
    const timeout = setTimeout(() => setIsExiting(true), 250)
    return () => clearTimeout(timeout)
  }, [progress])

  // Unmount after the fade-out transition finishes.
  useEffect(() => {
    if (!isExiting) return
    const timeout = setTimeout(onFinish, EXIT_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [isExiting, onFinish])

  return (
    <div
      onClick={() => setProgress(100)}
      className={`fixed inset-0 z-[100000] flex cursor-none flex-col items-center justify-center bg-void-black transition-opacity duration-[600ms] ease-in-out ${
        isExiting ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-[1] mb-7 font-mono text-fs-10 tracking-[0.2em] text-dim-label uppercase">
        [ INITIALIZING SYSTEM ]
      </div>

      <div className="relative z-[1] aspect-square w-[min(46vw,380px)] overflow-hidden border border-hairline bg-panel-black">
        <video
          src="/assets/video_eye.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setIsVideoReady(true)}
          className="h-full w-full object-cover grayscale contrast-[1.15] brightness-90"
        />
      </div>

      <div className="relative z-[1] mt-5 w-[min(46vw,380px)]">
        <div className="mb-2 flex justify-between font-mono text-fs-10 tracking-[0.1em] text-muted-steel">
          <span>LOADING</span>
          <span>{Math.floor(progress).toString().padStart(3, '0')}%</span>
        </div>
        <div className="h-0.5 w-full bg-hairline">
          <div
            className="h-full w-full origin-left bg-signal-green shadow-[0_0_6px_var(--color-signal-green)] transition-transform duration-150 ease-linear"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      <div className="relative z-[1] mt-4 font-mono text-fs-9 tracking-[0.1em] text-dim-label">
        [ ESC OR CLICK TO SKIP ]
      </div>
    </div>
  )
}
