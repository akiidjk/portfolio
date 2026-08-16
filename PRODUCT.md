# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the CTF/security community — teammates, other CTF players, HackTheBox/CTF contacts, security researchers who might recognize the handle `akiidjk` or the team ByteTheCookies. Their job here is to size up technical credibility (what he's built, what he's shipped, what he's actively doing), not to convert into a lead.

Secondary, evidenced in the site's own copy but not the design priority: recruiters/employers assessing him as a CS student for a job or internship, and potential freelance/consulting clients (Contact section states he's "currently working on private projects for clients"). Serve these without letting the site drift toward a generic corporate hire-me page — the CTF/security audience comes first.

## Product Purpose

A personal portfolio for Francesco Memoli (`akiidjk`), first-year Computer Science student at UNISA (Salerno, Italy) and co-founder of the CTF team ByteTheCookies. It exists to show real, shipped work (mostly security/CTF tooling, plus systems and web projects) and current focus, and to give the CTF/security community a way to place him and reach him.

## Positioning

The differentiator is straddling two worlds that don't usually share a portfolio: offensive security / CTF work (web exploitation, CTF infrastructure) and microservices / DevOps / distributed-systems architecture. Neither should crowd out the other — the combination is the point, confirmed as the intended lead message.

## Operating Context

A visitor browses the project catalog (currently 17 real projects, each linked to its actual GitHub repo), reads the About section for background and current focus, checks the Archive for competition/event history, and reaches out via email or GitHub/LinkedIn in Contact. No accounts, no dashboards, no backend state beyond serving content — it's a read-only, single-session browse.

## Capabilities and Constraints

- Bun + React 19, server-rendered (custom SSR wired directly into `Bun.serve()`, no meta-framework), Tailwind v4 for styling.
- Static content sourced from `src/data/projects.ts` and hand-written copy in components — no CMS, no database, no auth.
- Two real routes: `/` (home) and `/projects` (full catalog); everything else is client-side section scrolling.
- Dark, terminal/brutalist visual language is already established and working (accent green on near-black, JetBrains Mono + Inter, scan-line/glitch motifs) — this is existing design authority, not something for `init` to redecide.

## Brand Commitments

- Name: Francesco Memoli. Handle/nickname used everywhere: `akiidjk`. Team: ByteTheCookies.
- Voice is technical, terse, and native to CTF/CLI culture (e.g. "I use arch btw", terminal-style labels like `[ SYS.STATUS ]`) — not corporate or salesy. Preserve this in any future copy.
- Location detail (Salerno, Italy, 41.89° N) and the "learn, learn, learn, never stop learning, become better than yesterday" personal motto are both real, repeated brand elements — treat as durable, not filler.

## Evidence on Hand

- Real project list with real GitHub links (CookieFarm, Discord CTF Helper, zdiff, ADH, Styx, and others), each with actual repo/stack/status metadata in `src/data/projects.ts`.
- Real contact channels: `me@akiidjk.dev`, `github.com/akiidjk`, `linkedin.com/in/akiidjk`.
- **Absent, and must not be fabricated by future work:** testimonials, client case studies, employer history/resume, press mentions, or usage/traffic numbers. None exist; don't invent placeholders that look real.

## Product Principles

1. The CTF/security community is the primary audience — optimize for technical credibility there before optimizing for recruiter- or client-friendliness.
2. Never let the security side or the microservices/DevOps side eat the other; the combination is the differentiator.
3. Voice stays technical and terse, CTF/CLI-native — no marketing gloss, no invented social proof.
4. Everything shown must be real: real repos, real affiliations, real contact info. No placeholder testimonials or fabricated metrics, ever.
5. Serve recruiters and freelance-client visitors as a secondary path, not by diluting the primary identity.
