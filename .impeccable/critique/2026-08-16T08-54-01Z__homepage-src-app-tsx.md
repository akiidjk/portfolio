---
target: homepage (src/App.tsx)
total_score: 28
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 1
timestamp: 2026-08-16T08-54-01Z
slug: homepage-src-app-tsx
---
Method: dual-agent (A: design-review subagent · B: detector/browser-evidence subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav active-section highlight, hover states, loading progress all present; minor gaps only |
| 2 | Match System / Real World | 4 | Terminal/CTF metaphor matches the primary audience's mental model precisely |
| 3 | User Control and Freedom | 3 | ESC closes modal/skips loader; back button on /projects; no major gaps |
| 4 | Consistency and Standards | 3 | Global `cursor: none` removes the native hover/pointer convention with no compensating "clickable" signal |
| 5 | Error Prevention | 3 | Low error-surface site; nothing notably risky |
| 6 | Recognition Rather Than Recall | 2 | Nav renders only `[00]`–`[04]`; real section names live only in `aria-label`, invisible to sighted users |
| 7 | Flexibility and Efficiency | 2 | Search/filter and sphere drag are real, but no direct-jump or keyboard shortcuts beyond ESC |
| 8 | Aesthetic and Minimalist Design | 4 | "The Black Site" system executed with real discipline — see Strengths |
| 9 | Error Recovery | 4 | NotFound / ErrorBoundary / image-load fallback all on-brand and humane |
| 10 | Help and Documentation | n/a | Genuinely inapplicable for an Experience-mode showcase |
| **Total** | | **28/36** | **Good** |

## Design Specificity Verdict

**LLM assessment**: Highly specific — could not be dropped onto a generic dev portfolio unchanged. Evidence: in-joke Hero copy ("Eat some cookies pls" / "I use arch btw"), the ByteTheCookies/Olicyber/CyberChallenge.IT archive entries, the "SALERNO, ITALY — 41.89° N" footer line, a bespoke gravity-well particle canvas that visually rhymes with the black-hole hero background, joke cookie-consent copy ("ACCEPT (DOESN'T MATTER)"), and "Built for the machine." on `/projects`. Voice, dataset, and interaction design are authored for this person and audience, not generic.

**Deterministic scan**: `detect.mjs` exit code 2, 2 findings, both `layout-transition` (layout-property animation) warnings — no false positives, no findings related to design specificity or the `cursor: none` pattern.

**Visual overlays**: Not available. Neither assessment had a working browser-automation tool in this session (the `claude-in-chrome` extension is not set up here, and no Playwright/Puppeteer tool is exposed). No screenshots or console evidence exist to report; nothing was fabricated. Both assessments relied on source-code reading against the committed DESIGN.md system instead.

## Overall Impression

The identity is real and specific — this is not a templated dark-mode portfolio, and the restraint (one accent color, one signature ornament, disciplined hover rules) is actually being followed in the code, not just aspirational. The gap is between that visual discipline and functional/accessibility execution: a token-misuse contrast bug and an unlabeled nav undercut the system's own "instrumented, legible" premise, and this session's font-size bump added size without adding hierarchy.

## What's Working

1. **`HeroCanvas.tsx`'s gravity-well particle system** — a bespoke canvas sketch where particles spiral into the cursor and flash signal-green on capture, thematically tied to the black-hole hero background. A real differentiator no templated portfolio hero would have.
2. **Terminal-boot copy consistency** — `ERR_ROUTE_NOT_FOUND`, `ERR_UNCAUGHT_EXCEPTION`, `INITIALIZING SYSTEM`, `[ CATALOG / N ENTRIES ]` all share one "system output" voice across every state, including failure states.
3. **Reticle restraint** — the corner-bracket ornament appears exactly once, on the Nav logo, matching DESIGN.md's "1-2 focal elements only" rule to the letter.

## Priority Issues

**[P0] Nav has no visible section labels** — `Nav.tsx` renders only `[00]`–`[04]`; real names ("Home", "Selected Work", etc.) exist solely in `aria-label`, invisible to sighted users.
**Why it matters**: fails Recognition Rather Than Recall and the cognitive-load working-memory check — a first-time visitor can't tell what any section is without clicking into it.
**Fix**: show a short visible text label (on hover/focus at minimum, or always on desktop where there's room) alongside each bracket code.
**Suggested command**: `/impeccable clarify`

**[P0] `--active-gray` (#404040) is used as text color and fails WCAG contrast** — against `--void-black` (#080808) it computes to ~1.9:1, well under the 4.5:1 normal-text floor and even the 3:1 large-text floor. Used as literal text (not just borders) in `Contact.tsx`'s footer line, `SectionHeader.tsx`'s index number and right-aligned label, `LoadingScreen.tsx`'s skip hint, and `ProjectsPage.tsx`'s results count.
**Why it matters**: a direct WCAG 1.4.3 violation on multiple recurring text elements; this is token misuse, not a palette-design flaw — `--dim-label` (~6.9:1) and `--muted-steel` (~4.67:1) both already pass and sit right next to it in the same neutral ramp.
**Fix**: swap these specific text usages from `--active-gray` to `--dim-label` or `--muted-steel`; keep `--active-gray` reserved for its documented border-hover role.
**Suggested command**: `/impeccable audit`

**[P1] This session's font-size bump added size without adding hierarchy** — the active scale (`--fs-8` through `--fs-17` in `src/index.css`) runs ten consecutive tokens each ~1px apart, and 37 call sites across the codebase use just the two smallest (`--fs-8`/`--fs-9`, now ~9-10px). A uniform +1px-per-step pass doesn't create differentiation at sizes this small — labels, timestamps, and status text still read as one undifferentiated tier.
**Why it matters**: this is a text-dense, label-heavy UI where small-type legibility and hierarchy carry real information (timestamps, index numbers, status readouts); the recent change made text bigger but not more scannable.
**Fix**: widen the ratio between adjacent steps (closer to ×1.125 than a flat +1px), or collapse the closely-spaced steps (merge fs-9/fs-10, fs-12/fs-13) into a shorter, more distinct scale.
**Suggested command**: `/impeccable typeset`

**[P2] Detector-confirmed layout-thrash animations** — `LoadingScreen.tsx:201` (`transition: width`) and `ProjectsList.tsx:153` (`transition: max-height`, imported by `ProjectsPage.tsx` and `Work.tsx`) both animate layout properties directly.
**Why it matters**: width/height/margin transitions force layout recalculation on every frame; on the loading screen (an animation every first-visit session runs) and the projects list (used across two routes) this is a repeated, avoidable jank risk.
**Fix**: replace with `transform`/`opacity`, or `grid-template-rows` for the height-animating case.
**Suggested command**: `/impeccable optimize`

**[P2] The loading screen's one escape hatch is also the hardest text to read** — `LoadingScreen.tsx`'s ESC/click skip hint uses the same low-contrast `--active-gray` token flagged in the P0 contrast issue, at `--fs-10` (~11px).
**Why it matters**: this is the one moment an impatient or struggling visitor most needs to find the exit, and it's currently the least legible text on the page.
**Fix**: covered by the P0 contrast fix, but treat this specific instance as highest priority within that fix.
**Suggested command**: `/impeccable audit`

## Persona Red Flags

**Jordan (First-Timer)**: `Nav.tsx`'s `[00]`-`[04]` labels give zero clue what any section is before clicking (P0 above). `Cursor.tsx`'s crosshair never changes shape between clickable and non-clickable regions — no native pointer fallback anywhere — so Jordan has to hover everything to discover what's interactive.

**Sam (Accessibility-Dependent)**: the `--active-gray`-as-text contrast failure directly hits footer text, nav index numbers, and the loading-skip hint (WCAG 1.4.3). No `prefers-reduced-motion` handling anywhere in `index.css`, `HeroCanvas.tsx`, or the Hero's infinite-blink typewriter caret — the continuously animating particle field runs unconditionally for motion-sensitive users. Global `cursor: none` removes native affordance with no `:focus-visible` styling defined anywhere in the design system, so keyboard users fall back to an unstyled browser default outline.

**Casey (Mobile)**: `Hero.tsx` hides both personality lines ("Eat some cookies pls" / "I use arch btw") on mobile — mobile visitors get a quietly less charismatic hero than desktop. `ProjectsList.tsx` rows rely on the whole row being tappable with no visual signifier on mobile (the `→` arrow's hover-driven reveal has no mobile equivalent, and defaults to the flagged low-contrast token anyway). `LoadingScreen.tsx` autoplays a video on every first mobile session with no lighter fallback for constrained connections.

## Minor Observations

- Nav's 5 top-level items exceed the ≤4 cognitive-load guideline, compounding the missing-labels issue — a visitor has to both remember 5 opaque codes and never see what they map to.
- `Archive.tsx`'s "YEARS ACTIVE: 04" stat sits against archive entries spanning 2022→2026 (5 calendar years) — a small data-precision inconsistency a scrutinizing technical audience is likely to notice.
- `Contact.tsx` shows an external-link glyph only on the email link; the LinkedIn/CTF-team social links open in new tabs too but get no matching glyph.
- `ProjectDetail.tsx`'s GitHub icon button is `opacity: 0` by default on desktop until the image is hovered — for a CTF/technical audience this is probably the single most-wanted CTA in the modal, and it's the least discoverable element in it.
- `About.tsx` is the emotional-journey valley — a fairly conventional bio-plus-focus-areas layout sandwiched between the Archive's dense stat/timeline punch and Work's technical density.

## Questions to Consider

- If the crosshair cursor never changes shape on hover and native pointer affordance is suppressed everywhere, how is a recruiter who bounces in 10 seconds supposed to learn which of the dozens of near-identical mono-gray labels are clickable?
- Ten font-size tokens spanning 9–18px in 1px increments — is the scale still doing any real hierarchy work, or would fewer, more distinct steps serve this label-heavy UI better?
- Is the ~1.8s gated boot ritual on every first-visit session earning its keep for the recruiter/client secondary audience most likely to bounce before the payoff, versus the CTF-native primary audience who'd likely tolerate or enjoy it?
