---
name: akiidjk — Francesco Memoli
description: A dark, terminal-instrumented portfolio for a CTF player and systems/DevOps builder
colors:
  void-black: "#080808"
  panel-black: "#0d0d0d"
  divider-black: "#1c1c1c"
  hairline: "#2a2a2a"
  active-gray: "#404040"
  dim-label: "#565656"
  muted-steel: "#7A7A7A"
  soft-gray: "#868686"
  body-gray: "#999999"
  phosphor-white: "#E8E8E3"
  signal-green: "#C7FF2E"
  scanline-light: "rgba(0,0,0,0.08)"
  scanline-strong: "rgba(0,0,0,0.12)"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(42px, 13vw, 156px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  headline-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(38px, 9vw, 104px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(36px, 12vw, 96px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.045em"
  headline-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(28px, 8vw, 64px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
  lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(17px, 5vw, 21px)"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "40px"
  xl: "80px"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-steel}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  button-ghost-hover:
    textColor: "{colors.phosphor-white}"
  button-solid:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.void-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.phosphor-white}"
    rounded: "{rounded.none}"
    padding: "20px"
  list-row-hover:
    backgroundColor: "{colors.panel-black}"
  image-fallback:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.dim-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
---

# Design System: akiidjk — Francesco Memoli

## Overview

**Creative North Star: "The Black Site"**

This is a covert-terminal aesthetic, not a marketing site wearing dark mode. The canvas is near-total black, lit by exactly one signal color, and every surface reads like it's mid-operation: status readouts, timestamps, blinking indicators, camera-feed and system-panel framing. Nothing here is decorative — text is either data (a label, a timestamp, a status) or prose (a paragraph), and the two never blur into each other. The system is precise, terse, and instrumented: it feels logged and measured, not styled.

It deliberately rejects the opposite defaults: no glossy SaaS gradients, no soft pastel palette, no playful/rounded shapes, no marketing copy tone. Where most portfolios perform warmth, this one performs competence — the CTF/security-community audience it's built for reads craft in restraint, not friendliness.

**Key Characteristics:**
- Near-black canvas (#080808) with exactly one accent color used anywhere — signal green
- Zero border-radius except perfect circles (status dots, the avatar photo)
- Every panel is a hard-edged rectangle bounded by a 1px hairline, never a shadow
- JetBrains Mono for anything that reads as system output; Inter for anything that reads as prose or a headline
- The native cursor is suppressed everywhere interactive; a custom crosshair stands in for it
- Depth comes from texture (scanlines, grain, vignettes) — never from drop shadows
- A corner-bracket reticle frames the one truly personal element on the page (the avatar) — the system's signature ornament, used sparingly rather than on every card

## Colors

One accent, used sparingly, against a near-black neutral ramp with seven distinct steps — the ramp is doing most of the hierarchy work, not the accent.

### Primary
- **Signal Green** (`#C7FF2E`): the entire system's one accent. Marks the active/hovered state, a "live" indicator, or the one thing on screen you should look at right now — never used for decoration or as a repeated brand color block.

### Neutral
- **Void Black** (`#080808`): the page background, and the resting fill of small dots/markers meant to look "off"/inactive.
- **Panel Black** (`#0d0d0d`): elevated surface — cards, status panels, image containers. The one step up from the void.
- **Divider Black** (`#1c1c1c`): thin structural rules (the horizontal fill line inside `SectionHeader`) — reserved for that specific role, not swapped with Hairline.
- **Hairline** (`#2a2a2a`): the default border and divider color everywhere — the single most-used color in the system after the neutrals it separates.
- **Active Gray** (`#404040`): the *only* border state change — hairline steps up exactly one shade here on hover/active. Never a color hue-shift, never a thicker border.
- **Dim Label** (`#565656`): resting-state mono labels, index numbers, inactive status dots, and the `[ IMAGE UNAVAILABLE ]` text on image-load-failure placeholders.
- **Muted Steel** (`#7A7A7A`): secondary mono text — nav links at rest, metadata labels, timestamps.
- **Soft Gray** (`#868686`): a step lighter than Muted Steel, used only for secondary Inter body paragraphs (`About`'s supporting text) below the lead paragraph.
- **Body Gray** (`#999999`): Inter prose color — the primary paragraph color.
- **Phosphor White** (`#E8E8E3`): primary text — headlines, titles, active nav state, hovered list-row titles. Never pure `#fff`.
- **Scanline Light** / **Scanline Strong** (`rgba(0,0,0,0.08)` / `rgba(0,0,0,0.12)`): the repeating-gradient scanline texture over images, at two intentional strengths depending on how busy the underlying image is — not a color per se, but the one non-neutral-gray value pair worth naming since it recurs across every image treatment.

### Named Rules
**The One Signal Rule.** Signal Green is the only accent color anywhere in the system. It marks exactly one thing at a time — an active state, a live indicator, a hovered link. It never appears twice for two different reasons on the same screen, and it never decorates.

**The One-Shade Hover Rule.** Border-color state changes move exactly one step: Hairline (`#2a2a2a`) → Active Gray (`#404040`). No border ever changes hue, width, or style on interaction — only that one shade step, or a swap to Signal Green when the element is the thing actively selected.

## Typography

**Display/Headline Font:** Inter (with `sans-serif` fallback)
**Label Font:** JetBrains Mono (with `monospace` fallback)

**Character:** Inter carries every large statement — hero name, section headlines — set tight and heavy (700 weight, negative tracking down to `-0.045em`) so big type reads as a single confident mark rather than a sentence. JetBrains Mono carries everything that behaves like system output — labels, timestamps, status, nav, index numbers — set small and wide-tracked, usually uppercase, so it reads as instrumentation, not prose.

### Hierarchy
- **Display** (700, `clamp(42px, 13vw, 156px)`, line-height 0.9, `-0.045em`): the hero name only — the single largest mark on the site.
- **Headline-lg** (700, `clamp(38px, 9vw, 104px)`, line-height 0.92, `-0.045em`): the Projects catalog H1 ("Built for the machine.") — the second-largest statement, one step down from Display.
- **Headline** (700, `clamp(36px, 12vw, 96px)`, line-height 1, `-0.045em`): Contact's closing "LET'S TALK." — a deliberate peak-end moment, not a repeated pattern.
- **Headline-sm** (700, `clamp(28px, 8vw, 64px)`, line-height 1.05, `-0.045em`): `ProjectDetail`'s modal title — the headline weight scaled down for a nested/modal context.
- **Title** (700, 12–17px, letter-spacing 0.16em or tight `-0.02em` depending on context): section titles (`SectionHeader`) and list-row/card titles.
- **Lead** (300, `clamp(17px, 5vw, 21px)`, line-height 1.5, `-0.025em`): the opening paragraph of a text-heavy section (`About`'s intro) — larger and tighter-tracked than Body, used once per section to open it.
- **Body** (300–400, 13–16px, line-height 1.5–1.75): paragraph prose — Body Gray for primary paragraphs, Soft Gray for secondary/supporting ones, never Phosphor White.
- **Label** (400, 9–11px, letter-spacing 0.05em–0.2em, usually uppercase): the dominant text style by volume — index numbers, timestamps, status readouts, nav links, buttons, badges.

Four large-type steps (Display/Headline-lg/Headline/Headline-sm) sit close together by design — each is a real, distinct, single-use size rather than a shared "headline" value reused everywhere. Don't collapse them into one number; don't add a fifth without a genuinely new context.

### Named Rules
**The Two-Voice Rule.** A given piece of text is either Inter (a statement, meant to be read) or JetBrains Mono (a readout, meant to be scanned) — never a third font, and never a headline set in mono or a label set in Inter.

## Layout

Sections stack full-width and are separated by a single 1px Hairline border — never a gap or background-color change. Horizontal section padding is 80px desktop / 20px mobile, matching the `lg`/base spacing step. Every section opens with the same `SectionHeader` pattern: a bracketed index (`[ 01 ]`) in Label type, the section title, a Divider Black rule that fills remaining width, and an optional right-aligned meta label — this is the closest thing the system has to a recurring template, and it should not be varied.

**Breakpoints:** mobile ≤640px, tablet ≤1024px (`useBreakpoint.ts`). Below 640px, multi-column grids collapse to a single column and horizontal padding drops from 80px/40px to 20px; typography scales down via `clamp()` rather than discrete breakpoint overrides where it's already fluid.

List and timeline patterns (the project list, the archive timeline) use a left-aligned vertical hairline rule with markers or index numbers hung off it, rather than a table grid — this is the system's default way of presenting a sequence.

## Elevation & Depth

Flat by default — there is no shadow-based elevation system, and no tonal-surface layering beyond the two black steps (Void → Panel). Depth is implied by texture, not by shadow: repeating scanline gradients over images (`rgba(0,0,0,0.08)` as a light wash, `rgba(0,0,0,0.12)` where the texture needs to read stronger against a busier image — same pattern, two intentional strengths, not drift), radial vignettes, and a subtle full-page noise-grain overlay (`body::before`, 3% opacity). The one true shadow in the system is a Signal Green glow (`0 0 5px`–`6px #C7FF2E`), and it is reserved for "this is live/active" — never for lifting a card off the page.

### Named Rules
**The No-Lift Rule.** Nothing elevates on hover via shadow or scale-up-and-float. Interaction is communicated by border-color, text-color, or an accent glow — never by a card visually detaching from the page.

## Shapes

Every rectangle is a hard rectangle — zero border-radius anywhere except perfect circles (`50%`), reserved for the avatar photo and small status/timeline dots. Borders are always 1px solid Hairline (or Active Gray on hover), never a mixed-weight or dashed line. Corner-bracket "reticle" marks (four short L-shaped strokes just outside a container's corners) are the system's one signature ornamental device beyond the plain rectangle — currently used once, framing the Nav avatar like a target-lock, not decorating every card. Reach for it on a focal element that deserves the emphasis; it stops being a signature the moment it's on more than a couple of things per page.

## Components

### Buttons
- **Shape:** hard rectangle, 0px radius, 1px Hairline border.
- **Ghost / Secondary** (the default — `VIEW ALL PROJECTS`, filter chips): transparent background, Muted Steel Label-type text, Hairline border.
- **Hover / Focus:** text steps to Phosphor White, border steps to Active Gray — the One-Shade Hover Rule, nothing else animates.
- **Solid / Primary** (rare — reserved for the one primary call to action per surface, e.g. `OPEN CATALOG`): Signal Green fill, Void Black text, bold Label type, no border.

### Cards / Containers
- **Corner Style:** 0px radius, always.
- **Background:** Panel Black on Void Black, or transparent with only a Hairline border (no fill) when nested inside an already-dark panel.
- **Shadow Strategy:** none at rest (see Elevation & Depth); a Signal Green glow only when the container represents a "live" state.
- **Border:** 1px Hairline, stepping to Active Gray or Signal Green when hovered/selected.
- **Internal Padding:** 16–24px small panels, up to 36px for larger status/detail panels.

### List Rows (signature pattern)
The system's default way to present a collection (projects, archive entries) — not a card grid. A left accent bar (3px, Signal Green) is scaled to zero height at rest and grows in from the top on hover; the row background steps to Panel Black; a trailing `→` glyph slides in and brightens. Index numbers are Label type in Dim Label, brightening to Signal Green on the active row.

### Navigation
- Sticky, blurred-glass header (`backdrop-filter: blur(12px)` over translucent Void Black) with a Hairline bottom border.
- Nav links are Label type, Dim Label at rest, Phosphor White for the active section — no underline, no background pill.

### Modal
- Full-viewport overlay in translucent Void Black (`rgba(8,8,8,0.96)`), fade in/out (`0.25s ease` open, reversed on close).
- Content panel slides up and fades in on open (`translateY(24px)→0`, `cubic-bezier(0.16, 1, 0.3, 1)`, 0.35s) and reverses symmetrically on close — every modal must animate both directions, never just the open.

### Custom Cursor (signature component)
The native cursor is hidden (`cursor: none`) on every interactive surface; a small fixed crosshair (`mix-blend-mode: difference`) tracks the pointer instead, and is suppressed entirely on touch/coarse-pointer devices. This is a system-wide commitment, not a per-component choice — any new interactive element must also set `cursor: none` or the illusion breaks.

### Reticle Frame (signature component)
Four short corner-bracket strokes (Hairline at rest, 8px each, sitting just outside the framed element's corners) around a single focal image — the Nav avatar today. Not a hover effect and not a border; it's a permanent frame, reserved for the one or two elements per page that earn "focal."

### Image Failure State
Any project image (`ProjectDetail`, the projects-sphere preview card) that fails to load falls back to a Panel Black rectangle at the same dimensions, centered `[ IMAGE UNAVAILABLE ]` in Label type, Dim Label color — never a broken-image glyph. Surrounding chrome (hover overlay, the GitHub link) stays interactive regardless of image state.

## Do's and Don'ts

### Do:
- **Do** keep Signal Green to one meaning per screen — active/live/selected — per the One Signal Rule.
- **Do** step hover states exactly one shade (Hairline → Active Gray) per the One-Shade Hover Rule.
- **Do** set anything that behaves like system output (labels, timestamps, status, nav, badges) in JetBrains Mono, uppercase, letter-spaced 0.05–0.2em.
- **Do** animate modals symmetrically — a reversed close animation is mandatory, not optional polish.
- **Do** default new collections to the List Row pattern (accent bar + hover reveal) rather than a card grid.
- **Do** fall back to the Image Failure State panel on any project image load error — never a broken-image glyph.

### Don't:
- **Don't** add a second accent color, even a "supporting" one. The system has exactly one.
- **Don't** use border-radius on anything that isn't a perfect circle.
- **Don't** lift cards with shadow or scale on hover — see the No-Lift Rule.
- **Don't** leave the native cursor visible on an interactive element — it must be `cursor: none` with the crosshair standing in.
- **Don't** soften the voice with marketing language, taglines, or playful copy — the terse, instrumented tone is load-bearing, confirmed in PRODUCT.md.
- **Don't** put the Reticle Frame on more than a couple of elements per page — it stops being a signature the moment it's decoration.
