import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

declare global {
  interface Window {
    __SSR__?: { path: string }
  }
}

const elem = document.getElementById('root')!
const initialPath = window.__SSR__?.path ?? window.location.pathname

const app = (
  <StrictMode>
    <App initialPath={initialPath} />
  </StrictMode>
)

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= elem.innerHTML.trim()
    ? hydrateRoot(elem, app)
    : createRoot(elem))
  root.render(app)
} else if (elem.innerHTML.trim()) {
  hydrateRoot(elem, app)
} else {
  createRoot(elem).render(app)
}
