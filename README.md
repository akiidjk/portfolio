# akiidjk.dev

Personal portfolio of [Francesco Memoli](https://github.com/akiidjk) (`akiidjk`) — CS student at UNISA, CTF player, co-founder of [ByteTheCookies](https://bytethecookies.org).

Bun + React 19, server-rendered by hand directly on `Bun.serve()` (no meta-framework) — see [`src/index.tsx`](src/index.tsx). Design system documented in [`DESIGN.md`](DESIGN.md); product context in [`PRODUCT.md`](PRODUCT.md).

## Develop

```bash
bun install
just dev        # or: bun run dev
```

Dev server runs with hot reload at `http://localhost:3000` (or `$PORT`).

## Other commands

```bash
just              # list every recipe, grouped
just typecheck    # tsc --noEmit
just format       # prettier --write .
just build        # ahead-of-time bundle to dist/
just start        # run the production server from source (no Docker)
```

## Docker

Local build/run only — no registry push, no remote deploy wired up.

```bash
just up           # build the image, then run it in the foreground
just docker-build # build only
just docker-run   # run only (needs docker-build first)
just docker-stop  # stop a detached container
```

Copy `.env.example` to `.env` to override `PORT`, `IMAGE_NAME`, `IMAGE_TAG`, or `CONTAINER_NAME`.

## Stack

Bun · React 19 · Tailwind v4 (`bun-plugin-tailwind`) · TypeScript, strict mode. No meta-framework — SSR, routing, and the client bundle are all hand-wired against `Bun.serve()` and `Bun.build()` directly.
