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

  const res = await fetch(new URL(INTERNAL_HTML_ROUTE, origin))
  const html = await res.text()
  const idx = html.indexOf(SSR_OUTLET)
  if (idx === -1) throw new Error(`index.html is missing the ${SSR_OUTLET} marker`)

  const split: [string, string] = [html.slice(0, idx), html.slice(idx + SSR_OUTLET.length)]
  if (isProd) cachedTemplateSplit = split
  return split
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
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
          headers: withSecurityHeaders({ 'Cache-Control': 'public, max-age=31536000, immutable' }),
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

    [INTERNAL_HTML_ROUTE]: indexHtml,

    // SSR fallback for every other (non-asset) route — the client router
    // then takes over for in-app navigation.
    '/*': async (req) => {
      const url = new URL(req.url)
      const [before, after] = await getTemplateSplit(url.origin)
      const head = injectRouteMeta(before, url.pathname)

      const payload = JSON.stringify({ path: url.pathname }).replace(/</g, '\\u003c')

      const reactStream = await renderToReadableStream(
        <StrictMode>
          <App initialPath={url.pathname} />
        </StrictMode>,
        {
          onError(error) {
            console.error(error)
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
      return new Response(stream, {
        status,
        headers: withSecurityHeaders({ 'Content-Type': 'text/html; charset=utf-8' }),
      })
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
