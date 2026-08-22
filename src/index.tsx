import { serve } from 'bun'
import { StrictMode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import App from './App'
import indexHtml from './index.html'
import { canonicalUrl, getRouteMeta, isKnownRoute } from './route-meta'

const isProd = process.env.NODE_ENV === 'production'

// Bun only transforms an HTML import (bundling <script>/<link>, injecting
// the dev HMR client) for requests that hit a route it owns. Requesting
// this internal route lets our own SSR route reuse that exact transform —
// same trick as https://teyik0.medium.com/how-to-keep-bun-fullstack-hmr-while-adding-custom-ssr-no-proxy-no-vite-6ea12c76fe29
const INTERNAL_HTML_ROUTE = '/_bun_hmr_entry'
const SSR_OUTLET = '<!--ssr-outlet-->'

function ts() {
  return new Date().toISOString()
}

// Baseline hardening headers — cheap, zero functional risk, applied to
// every response this server hands out. No CSP here on purpose: this app
// has no user input to sanitize against, and a real CSP needs nonces for
// the inline JSON-LD/__SSR__ payload scripts, which is a bigger, riskier
// change than this pass warrants.
function withSecurityHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    ...extra,
  }
}

let cachedTemplateSplit: [string, string] | null = null

async function getTemplateSplit(origin: string): Promise<[string, string]> {
  // Dev needs a fresh fetch every request — that's what re-triggers Bun's
  // per-request re-bundle and keeps the injected HMR client in sync.
  if (isProd && cachedTemplateSplit) return cachedTemplateSplit

  const target = new URL(INTERNAL_HTML_ROUTE, origin)
  const fetchStart = performance.now()
  let res: Response
  try {
    res = await fetch(target, { signal: AbortSignal.timeout(5000) })
  } catch (error) {
    const reason = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    console.error(`[${ts()}] SSR template fetch FAILED — could not reach ${target}: ${reason}`)
    throw error
  }

  const fetchMs = (performance.now() - fetchStart).toFixed(1)

  if (!res.ok) {
    const body = await res.text().catch(() => '<unreadable body>')
    console.error(
      `[${ts()}] SSR template fetch returned ${res.status} ${res.statusText} from ${target} (${fetchMs}ms) — first 200 bytes: ${body.slice(0, 200).replace(/\s+/g, ' ')}`,
    )
  }

  const html = await res.text()
  const idx = html.indexOf(SSR_OUTLET)
  if (idx === -1) {
    console.error(
      `[${ts()}] SSR template is missing the ${SSR_OUTLET} marker — got ${html.length} bytes from ${target} in ${fetchMs}ms. First 300 bytes: ${html.slice(0, 300).replace(/\s+/g, ' ')}`,
    )
    throw new Error(`index.html is missing the ${SSR_OUTLET} marker`)
  }

  console.log(`[${ts()}] SSR template fetched from ${target} in ${fetchMs}ms (${html.length} bytes)`)

  const split: [string, string] = [html.slice(0, idx), html.slice(idx + SSR_OUTLET.length)]
  if (isProd) cachedTemplateSplit = split
  return split
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function logRequest(req: Request, pathname: string, status: number, startedAt: number) {
  const ms = (performance.now() - startedAt).toFixed(1)
  const host = req.headers.get('host') ?? '-'
  const proto = req.headers.get('x-forwarded-proto') ?? '-'
  const forwardedFor = req.headers.get('x-forwarded-for') ?? req.headers.get('cf-connecting-ip') ?? '-'
  const cfRay = req.headers.get('cf-ray')
  const proxyInfo = `host=${host} proto=${proto} for=${forwardedFor}${cfRay ? ` cf-ray=${cfRay}` : ''}`
  console.log(`[${ts()}] ${req.method} ${pathname} ${status} ${ms}ms | ${proxyInfo}`)
}

// Swaps the static template's default ("/") head tags for the requested
// route's — the SSR stream only fills #root, so this is the one place
// that can put the right <title>/description/OG tags in a real <head>.
function injectRouteMeta(head: string, pathname: string): string {
  const meta = getRouteMeta(pathname)
  const url = canonicalUrl(pathname)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)

  return head
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`)
}

const server = serve({
  routes: {
    '/assets/*': {
      async GET(req) {
        const path = new URL(req.url).pathname.replace('/assets/', 'src/assets/')
        const file = Bun.file(path)
        return new Response(file, {
          headers: withSecurityHeaders({ 'Cache-Control': 'public, max-age=86400' }),
        })
      },
    },

    '/robots.txt': new Response(Bun.file('public/robots.txt'), {
      headers: withSecurityHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      }),
    }),
    '/llms.txt': new Response(Bun.file('public/llms.txt'), {
      headers: withSecurityHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      }),
    }),
    '/sitemap.xml': new Response(Bun.file('public/sitemap.xml'), {
      headers: withSecurityHeaders({
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      }),
    }),
    '/cv.pdf': new Response(Bun.file('public/cv.pdf'), {
      headers: withSecurityHeaders({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="francesco-memoli-cv.pdf"',
        'Cache-Control': 'public, max-age=3600',
      }),
    }),

    [INTERNAL_HTML_ROUTE]: indexHtml,

    // SSR fallback for every other (non-asset) route — the client router
    // then takes over for in-app navigation.
    '/*': async (req) => {
      const startedAt = performance.now()
      const url = new URL(req.url)

      // Deliberately NOT url.origin: behind a reverse proxy (Caddy, Cloudflare)
      // the Host header — and therefore req.url's origin — is the public
      // domain, not this process. Using it here would make every single
      // page request fetch its own template over the public internet,
      // round-tripping back through the proxy chain to itself. server.url
      // is always this process's real local bind address.
      const [before, after] = await getTemplateSplit(server.url.origin)
      const head = injectRouteMeta(before, url.pathname)

      const payload = JSON.stringify({ path: url.pathname }).replace(/</g, '\\u003c')

      const reactStream = await renderToReadableStream(
        <StrictMode>
          <App initialPath={url.pathname} />
        </StrictMode>,
        {
          onError(error) {
            const reason = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
            console.error(`[${ts()}] SSR render error on ${url.pathname}: ${reason}`)
          },
        },
      )

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(head))
          await reactStream.pipeTo(
            new WritableStream({
              write(chunk) {
                controller.enqueue(chunk)
              },
            }),
          )
          controller.enqueue(encoder.encode(`<script>window.__SSR__=${payload}</script>${after}`))
          controller.close()
        },
      })

      const status = isKnownRoute(url.pathname) ? 200 : 404
      logRequest(req, url.pathname, status, startedAt)
      return new Response(stream, {
        status,
        headers: withSecurityHeaders({ 'Content-Type': 'text/html; charset=utf-8' }),
      })
    },
  },

  // Safety net: without this, an uncaught throw anywhere above (a failed
  // template fetch, a render crash) falls through to Bun's default
  // handling with little to no server-side log output — which is exactly
  // how a real failure can look like silence. This guarantees a log line
  // and a real 500 instead.
  error(error) {
    console.error(`[${ts()}] UNCAUGHT SERVER ERROR: ${error.name}: ${error.message}\n${error.stack ?? '(no stack)'}`)
    return new Response('Internal Server Error', {
      status: 500,
      headers: withSecurityHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
    })
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
console.log(`   internal SSR template fetches target: ${server.url.origin}${INTERNAL_HTML_ROUTE}`)

// In production, Bun bundles the HTML-import route's assets lazily on its
// first hit, then caches — so without this, whoever visits first after a
// deploy/restart eats that cost instead of it happening once at boot.
if (isProd) {
  getTemplateSplit(server.url.origin).catch((error) => {
    console.error(
      `[${ts()}] Failed to warm the SSR template cache: ${error instanceof Error ? error.message : String(error)}`,
    )
  })
}
