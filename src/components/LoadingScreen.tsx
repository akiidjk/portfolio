import { useEffect, useRef, useState } from 'react'

const MIN_DISPLAY_MS = 1800
const EXIT_DURATION_MS = 600

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const startRef = useRef(Date.now())

  // Lock scroll while the loading screen is up.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${EXIT_DURATION_MS}ms ease`,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          color: '#3D3D3D',
          letterSpacing: '0.2em',
          marginBottom: 28,
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}
      >
        [ INITIALIZING SYSTEM ]
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(46vw, 380px)',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          border: '1px solid #1a1a1a',
          backgroundColor: '#0d0d0d',
        }}
      >
        <video
          src="/assets/video_eye.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setIsVideoReady(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%) contrast(1.15) brightness(0.9)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(46vw, 380px)',
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            color: '#5D5D5D',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          <span>LOADING</span>
          <span>{Math.floor(progress).toString().padStart(3, '0')}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: 2,
            backgroundColor: '#1a1a1a',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#C7FF2E',
              boxShadow: '0 0 6px #C7FF2E',
              transition: 'width 0.15s linear',
            }}
          />
        </div>
      </div>
    </div>
  )
}
