/**
 * Feature-detects WebGL support so we can fall back to a plain grid
 * on browsers/environments where a 3D canvas can't be created
 * (older browsers, some sandboxed webviews, disabled GPU, etc.).
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!context
  } catch {
    return false
  }
}
