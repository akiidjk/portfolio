export interface SpherePoint3D {
  x: number
  y: number
  z: number
}

/**
 * Distributes `count` points evenly across the surface of a sphere using
 * the Fibonacci sphere algorithm (golden-angle spiral). This avoids the
 * clustering you'd get from naive random or lat/long placement.
 */
export function fibonacciSphere(count: number, radius = 1): SpherePoint3D[] {
  if (count <= 0) return []

  const points: SpherePoint3D[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2 // 1 → -1
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i

    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
    })
  }

  return points
}
