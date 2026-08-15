import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  glow: number // 0..1, how close to the cursor's pull this frame
}

interface Ring {
  x: number
  y: number
  age: number
}

const INFLUENCE_RADIUS = 190
const COLLAPSE_RADIUS = 9
const CONNECT_RADIUS = 95
const RING_LIFETIME = 22

function spawnParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 0.08 + Math.random() * 0.12
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 0.6 + Math.random() * 1.3,
    glow: 0,
  }
}

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

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

    const count = Math.min(150, Math.max(50, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 11000)))
    const particles: Particle[] = Array.from({ length: count }, () => spawnParticle(w, h))
    const rings: Ring[] = []

    let mouse: { x: number; y: number } | null = null
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse = null }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.015
        p.vy += (Math.random() - 0.5) * 0.015
        p.glow = 0

        if (mouse) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)

          if (dist < COLLAPSE_RADIUS) {
            rings.push({ x: p.x, y: p.y, age: 0 })
            Object.assign(p, spawnParticle(w, h))
            continue
          }

          if (dist < INFLUENCE_RADIUS) {
            const t = 1 - dist / INFLUENCE_RADIUS
            p.glow = t
            const nx = dx / dist, ny = dy / dist
            // Rotate the pull vector so particles spiral in rather than fly straight at the cursor.
            const spin = 1.1 * t
            const cx = nx * Math.cos(spin) - ny * Math.sin(spin)
            const cy = nx * Math.sin(spin) + ny * Math.cos(spin)
            const pull = t * t * 0.55
            p.vx += cx * pull
            p.vy += cy * pull
          }
        }

        p.vx *= 0.96
        p.vy *= 0.96
        const speed = Math.hypot(p.vx, p.vy)
        const maxSpeed = p.glow > 0 ? 3.5 : 0.35
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed
          p.vy = (p.vy / speed) * maxSpeed
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!, b = particles[j]!
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < CONNECT_RADIUS) {
            const alpha = (1 - dist / CONNECT_RADIUS) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(150,150,145,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Particles — blend toward accent green near the cursor
      for (const p of particles) {
        const g = p.glow
        const red = 232 - (232 - 199) * g
        const green = 232 + (255 - 232) * g
        const blue = 227 - (227 - 46) * g
        const alpha = 0.35 + g * 0.65
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + g * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`
        if (g > 0.4) {
          ctx.shadowColor = 'rgba(199,255,46,0.8)'
          ctx.shadowBlur = 6 * g
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Collapse rings — expanding, fading burst where a particle fell in
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]!
        ring.age++
        if (ring.age > RING_LIFETIME) {
          rings.splice(i, 1)
          continue
        }
        const t = ring.age / RING_LIFETIME
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, t * 26, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(199,255,46,${(1 - t) * 0.6})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
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
        opacity: 0.75,
      }}
    />
  )
}
