import { StrictMode } from 'react'
import App from './App'

/**
 * The whole HTML document, rendered by React on both the server
 * (renderToReadableStream) and the client (hydrateRoot(document, ...)).
 * Per-route <title>/<meta description>/<link canonical> are rendered
 * inside App and hoisted into <head> by React 19 — this shell only
 * holds the site-wide, route-independent tags.
 */
export function Document({ initialPath }: { initialPath: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="keywords"
          content="Francesco Memoli, akiidjk, software engineer, security researcher, CTF, binary exploitation, reverse engineering, systems programming, Zig, Rust, C, ByteTheCookies, Salerno Italy" />
        <meta name="author" content="Francesco Memoli" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#080808" />

        <link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
        <link rel="apple-touch-icon" href="/assets/logo.svg" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <link rel="stylesheet" href="/index.css" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="akiidjk" />
        <meta property="og:image" content="https://akiidjk.dev/assets/black_hole.jpg" />
        <meta property="og:image:width" content="736" />
        <meta property="og:image:height" content="414" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://akiidjk.dev/assets/black_hole.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Francesco Memoli',
            alternateName: 'akiidjk',
            url: 'https://akiidjk.dev',
            image: 'https://akiidjk.dev/assets/black_hole.jpg',
            email: 'mailto:akiidjk@proton.me',
            jobTitle: 'Software Engineer & Security Researcher',
            address: { '@type': 'PostalAddress', addressLocality: 'Salerno', addressCountry: 'IT' },
            affiliation: { '@type': 'Organization', name: 'ByteTheCookies' },
            sameAs: ['https://github.com/akiidjk', 'https://linkedin.com/in/akiidjk'],
          }),
        }} />
      </head>
      <body>
        <div id="root">
          <StrictMode>
            <App initialPath={initialPath} />
          </StrictMode>
        </div>
      </body>
    </html>
  )
}
