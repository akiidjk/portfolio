import { useEffect, useRef } from 'react'
import { useHasFinePointer } from '../hooks/useBreakpoint'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const hasFinePointer = useHasFinePointer()

  useEffect(() => {
    if (!hasFinePointer) return
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [hasFinePointer])

  // No real mouse (touch device) — skip the custom crosshair entirely.
  if (!hasFinePointer) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: 18,
        height: 18,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'difference',
      }}
    >
      <div
        style={{ position: 'absolute', width: 1, height: 14, background: 'var(--phosphor-white)', top: 2, left: 8.5 }}
      />
      <div
        style={{ position: 'absolute', width: 14, height: 1, background: 'var(--phosphor-white)', left: 2, top: 8.5 }}
      />
    </div>
  )
}
