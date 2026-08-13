import { useEffect, useRef } from 'react'

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (t: number) => {
      timeRef.current = t * 0.0004
      ctx.clearRect(0, 0, w, h)

      // Subtle dot grid
      const step = 40
      const time = timeRef.current
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2)
          const wave = Math.sin(dist * 0.015 - time * 2) * 0.5 + 0.5
          const alpha = wave * 0.12
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(232,232,227,${alpha})`
          ctx.fill()
        }
      }

      // Thin horizontal lines
      for (let y = 0; y < h; y += 80) {
        const phase = Math.sin(y * 0.01 + time) * 0.05
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.strokeStyle = `rgba(41,41,41,${0.5 + phase})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }
    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6,
      }}
    />
  )
}
