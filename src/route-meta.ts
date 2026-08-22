export interface RouteMeta {
  title: string
  description: string
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Francesco Memoli (akiidjk) — CS Student, CTF Player & Software Engineer',
    description:
      'Portfolio of Francesco Memoli (akiidjk), CS student at UNISA focused on web exploitation, CTF competitions, and microservices, DevOps, and distributed systems architecture. Co-founder of ByteTheCookies.',
  },
  '/projects': {
    title: 'Projects — Francesco Memoli (akiidjk)',
    description:
      'Catalog of open-source projects by Francesco Memoli (akiidjk): CTF infrastructure, tooling, and distributed-systems experiments including CookieFarm and Discord CTF Helper.',
  },
  '/experience': {
    title: 'Experience — Francesco Memoli (akiidjk)',
    description:
      'Timeline of CTF competitions, teams, and milestones for Francesco Memoli (akiidjk), co-founder of ByteTheCookies.',
  },
  '/about': {
    title: 'About — Francesco Memoli (akiidjk)',
    description:
      'Francesco Memoli (akiidjk), CS student at UNISA focused on web exploitation, microservices, and DevOps.',
  },
  '/contact': {
    title: 'Contact — Francesco Memoli (akiidjk)',
    description: 'Get in touch with Francesco Memoli (akiidjk).',
  },
}

export const NOT_FOUND_META: RouteMeta = {
  title: '404 — Francesco Memoli (akiidjk)',
  description: 'This page does not exist.',
}

export function isKnownRoute(path: string): boolean {
  return path in ROUTE_META
}

export function getRouteMeta(path: string): RouteMeta {
  return ROUTE_META[path] ?? NOT_FOUND_META
}

export function canonicalUrl(path: string): string {
  return `https://akiidjk.dev${path === '/' ? '' : path}`
}
