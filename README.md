# Vecchioni Chiropractic — clinic presentation preview

## [View the design preview](https://dylanthrp.github.io/vecchione-chiro-demo/)

**Independent presentation concept, not the official clinic website.** Not affiliated with the clinic. Logo, branding and draft copy require clinic approval before any official launch.

**Official clinic website:** https://vecchionichiropractic.com/

## Scope

14 static HTML pages share `assets/site.css`. The navy/cream/brass palette, local doctor portrait and simple phone/hours/directions navigation are retained. Native patient FAQs work without JavaScript. `assets/site.js` progressively enhances the eight-topic wellness library with local search, category filtering, result counts and reset. No booking simulation, chat, patient forms, portal, reviews, analytics or tracking scripts.

Search terms stay in the page, are not sent or saved, and never enter the URL. GitHub Pages or another hosting provider may retain standard request logs. Clicking an external link leaves this preview and is subject to that site's policies. This is not a HIPAA compliance claim.

## Local verification

```bash
cd "C:/Users/dylan/Documents/vecchione-chiro-demo"
node tests/content-regression.cjs
node tests/interaction-regression.cjs
node tests/audit-browser.cjs
```

Browser tests use the existing Playwright installation at `C:/Users/dylan/Downloads/study-spot/node_modules/playwright` (read-only; no changes made there). Override with `PLAYWRIGHT_MODULE` to use a different installed module. Chromium must be installed for Playwright. No build step or server is required: tests load local HTML.

The responsive audit covers every page at 320, 390, 768 and 1440 pixels: overflow, landmarks, headings, skip links, images, same-site links and anchors, navigation, script errors and unsolicited external requests. Interaction tests cover FAQ keyboard controls and library search/filter/reset/empty states, including a JavaScript-disabled fallback. Screenshots are regenerated as ignored `tests/audit-*.png` files. These are targeted checks, not a WCAG certification or cross-browser guarantee.

## Content and approval notes

- The [official homepage](https://vecchionichiropractic.com/) identifies Sherman College, the Applied Spinal Biomechanics fellowship, techniques, 40 years of service and wellness plans. Its copy is the source for those biographical details, not independent credential verification.
- Hours match the official website's full Contact Us section: Monday/Tuesday/Thursday 10:00 AM–1:00 PM and 3:00 PM–7:00 PM; Wednesday 10:00 AM–1:00 PM and 3:00 PM–6:00 PM, Eastern. Friday/weekend hours are not listed, so visitors are asked to call. The earlier preview schedule conflicted with that source and was removed, along with unreliable live open/closed badges. Confirm schedules and holiday exceptions directly with the clinic before an official launch.
- Educational articles and first-visit guidance are draft copy, not authored or approved by the doctor. Unsupported technique-to-condition promises were removed; clinical review, citations and clinic workflow confirmation remain required before launch.
- The public-facing doctor portrait is retained. Image and branding permissions still need approval. Fonts use local system fallbacks; no external font service is called.
- Every page retains `noindex, nofollow`. GitHub Pages hosts a presentation preview, not an official clinic launch.

## Design references

Patient-first navigation, readable mobile layouts, provider context and direct contact paths informed this pass. Vendor suggestions that would imply an actual clinical integration were deliberately not simulated.

- https://getdeardoc.com/blog/medical-practice-website-design
- https://www.officite.com/9-doctor-website-design-examples-that-attract-patients/
