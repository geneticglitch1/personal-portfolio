# Design prompt — portfolio wireframe + motion system

> Paste into Claude (design / artifact mode). Produce the **layout and motion design only** —
> a wireframe with the visual system resolved. **Use neutral placeholder labels, not real
> content.** Real copy gets poured in afterward; do not invent a bio, projects, or names.

---

## What to make

A personal-portfolio **wireframe** delivered as **one self-contained HTML file** I can open and
preview. Decide the **grid, type scale, spacing rhythm, color system, and every animation** — and
nothing else. Fill text slots with neutral placeholders (`Full Name`, `Section heading`,
`Project title`, `0.00×`, greeked one-liners). The design must read as **professional** and feel
**heavily animated but never tacky** — motion serves structure, never decorates.

### Output
- One `.html` file. Tailwind CDN or inline CSS — no build, opens directly.
- **Animations actually run:** Lenis (CDN) smooth scroll; GSAP + ScrollTrigger (CDN) or Web
  Animations API for reveals, count-ups, pinning, parallax.
- Desktop-first, responsive to mobile. Respect `prefers-reduced-motion` (clean static fallback).

---

## Visual system (decide and commit)

- **Grid:** 12-col, asymmetric, generous margins, lots of whitespace, varied column spans. Mono
  labels/numbers in the margins like a printed spec sheet.
- **Type:** editorial contrast across three roles via web fonts.
  - *Display* (huge headings): high-contrast serif (e.g. Fraunces) **or** strong grotesk (Inter
    Tight / Geist) — pick one personality.
  - *Body:* clean grotesk (Inter / Geist).
  - *Mono:* every technical slot — metric values, tags, years, category labels, margin notes
    (Geist Mono / JetBrains Mono).
- **Color:** restrained. Paper/ink base + **exactly one** accent (accent only on metrics, links,
  key emphasis). No second accent. High contrast, AA+.
- **Feel:** printed design-magazine spread brought to life. Polish ≈ Linear / Vercel marketing,
  warmer and more editorial. Calm, confident, professional.

---

## Layout blocks (structure + placeholders only)

1. **Hero** — oversized `Full Name`, one-line `positioning statement`, small mono status chip,
   quiet scroll cue.
2. **Selected work** — 3–4 feature blocks. Each: oversized index number, `Project title`, one big
   `metric` (count-up target), one-line `description`, a mono `tag · tag · tag` row, a link.
3. **Index** — list/table of rows: `year · Project title · category · one-line`. Hover-expand.
4. **Experience** — role block: `Org`, `Title`, `dates`, a headline line, 3–4 bullet lines.
5. **Skills** — grouped clusters: `Group label` + a row of mono tags. 4–6 groups.
6. **Awards** — 3 rows: `Title · detail · year`.
7. **About** — short paragraph slot + a meta row (`school · degree · metric · date`) + a small
   memberships row.
8. **Contact / footer** — a row of links (`email · GitHub · LinkedIn · résumé`) + one footer line.

(There will also be a per-project detail page later — design a simple article layout slot for it:
title, metric, intro, a pulled blockquote, body paragraphs, a mono stack row, links, prev/next.)

---

## Motion — DO (the floor, not a menu; the page must read as genuinely motion-rich)
- Lenis momentum/smooth scroll.
- Heading reveals: `clip-path` / mask wipes + line-by-line staggered fades on enter.
- **Count-ups** on metric slots when they scroll into view. Ease-out, ~0.8–1.2s, once.
- Animated pull-quote / blockquote reveal.
- Magnetic links/buttons (a few px of pull toward cursor).
- Index rows that expand / reveal on hover with intent.
- One or two pinned/sticky section transitions; **small-scale** layered parallax (transform-only).
- Smooth crossfade between sections / the detail-page transition.
- Optional, at most one: slow tasteful marquee; variable-font weight shift on hover.

## Motion — DON'T (anti-tacky)
- ❌ No 3D galaxies, starfields, particles, gratuitous WebGL.
- ❌ No autoplay audio / sound.
- ❌ No neon glow everywhere, no glassmorphism overload, no heavy blur.
- ❌ No bouncy overshoot springs on everything, no confetti, no cursor trails, no typewriter effect.
- ❌ No rainbow gradients, no gradient text as a crutch.
- ❌ No time-wasting intro loader. No motion that delays readable content > ~300ms or hijacks scroll.

If unsure whether something is tacky: it is. Cut it.

---

## Constraints
- Professional first. The animation is a layer over a layout that already works static.
- All motion on `transform` / `opacity` only (GPU-friendly, no layout thrash).
- Keyboard-navigable, visible focus, AA contrast.
- **No real content** — placeholders only. I add the copy.
