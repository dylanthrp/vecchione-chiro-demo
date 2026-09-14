# Vecchioni Chiropractic — Portfolio Demo

**Independent, unsolicited design concept. Not the official clinic website. Not affiliated with Vecchioni Chiropractic in any way.**

Live site: https://vecchionichiropractic.com/  
Demo purpose: portfolio piece for Dylan Thorpe, demonstrating a multi-page chiropractic site with sharpened headshot, navy/cream/brass palette, mobile-first header, and full accessibility checks.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, statement of purpose, techniques, conditions, hours |
| `meet-the-doctor.html` | About Dr. Vecchioni with portrait + credentials grid |
| `services.html` | Five techniques + A.S.B. fellowship, full descriptions |
| `library-index.html` | Wellness library landing page (8 topic cards) |
| `library-back.html`, `library-neck.html`, `library-sciatica.html`, `library-headaches.html`, `library-carpal.html`, `library-joints.html`, `library-foot.html`, `library-auto.html` | Patient-education articles |
| `patient-resources.html` | Office hours, address, first-visit prep, affordability callout |

## Design

- **Palette:** navy (#1a2942) + cream (#f4eee0) + brass (#a88244)
- **Type:** Cormorant Garamond serif for headlines, Inter sans for UI
- **Header:** sticky cream header with logo + 3 icon pills (Call/Appt/Map)
- **Mobile:** brand row stacks above a 3-up action grid; navy topnav flattens to a single-row pill nav
- **Disclosure:** every page shows the "Unsolicited portfolio demo" banner linking to the official site

## Files

```
vecchione-chiro-demo/
├── assets/
│   ├── site.css            ← shared stylesheet (21KB)
│   ├── vecchioni-final.jpg ← doctor portrait (hero)
│   ├── vecchioni-thumb.jpg ← 200×200 thumbnail
│   └── wv-monogram.svg     ← "WV" logo mark
├── tests/
│   └── audit-browser.cjs   ← Playwright accessibility/responsive audit
├── [13 HTML pages]
└── README.md
```

## Verify

```bash
cd "C:/Users/dylan/Documents/vecchione-chiro-demo"
node tests/audit-browser.cjs
```

Runs across 320 / 390 / 768 / 1440 px viewports and checks:
- Skip link + Enter activates main
- All images decode (no broken refs)
- No horizontal overflow at any width
- No external (third-party) requests
- No console errors
- Topnav appears on every page with all five destinations

## Content attribution

All clinical descriptions and copy were derived from the public-facing content at vecchionichiropractic.com, plus Dr. Vecchioni's stated credentials (Sherman College D.C., F.A.S.B.E. fellowship). No clinical promises are made; the site does not collect patient information.

The portrait is a public-facing image of Dr. William D. Vecchioni, sharpened via Real-ESRGAN for the hero card.

## Polish features (portrait refresh + Van Born standards)

- **Sharpened portrait** — the prior AI-upscale had visible artifacts; replaced with a clean, in-focus source (1254×1254) and regenerated the 200×200 thumb.
- **First-visit section** — three numbered steps (paperwork, focused assessment, plan & next steps) between the hero and the statement.
- **Portrait badge** — "40+ years · Sherman D.C." pill sits on the photo at ≥720px widths.
- **Condition links** — five condition cards (Neck, Mid back, Low back, Headaches, Auto injuries) now link into the relevant wellness-library article.
- **Related reading** — a 4-card "From the wellness library" strip on the homepage.
- **Trust cards** — 4 cards summarizing what the practice offers (techniques, credentials, family care, affordability).
- **Open/closed status pill** — JS-driven, live, uses the same hours table; today's row is highlighted on home and patient-resources.
- **Privacy strip** — visible on every page, explains no data collection / no third-party trackers, links to the official site.
- **Vecchioni spelling fixed throughout** (the repo name remains `vecchione-chiro-demo` for URL stability).
- **Real phone links** — `tel:+13132771100` everywhere; masked placeholders removed.
- **Honest founding language** — "Since 1985" replaced with "40+ years in Dearborn Heights" / "mid-1980s" to match the live source.

