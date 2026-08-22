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
      className="pointer-events-none fixed z-[99999] size-[18px] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div className="absolute top-0.5 left-[8.5px] h-3.5 w-px bg-phosphor-white" />
      <div className="absolute top-[8.5px] left-0.5 h-px w-3.5 bg-phosphor-white" />
    </div>
  )
}
