# Local presentation QA

## Outcome

Local Chromium verification passed for all 14 pages at 320, 390, 768 and 1440 pixels (56 page/viewport combinations). No outstanding failures in the automated checks. This is a clinic presentation preview, not a launch or accessibility certification.

## Reproduction

From the repository root:

```sh
node --check assets/site.js
node tests/content-regression.cjs
node tests/interaction-regression.cjs
node tests/audit-browser.cjs
git diff --check
```

All returned exit code 0 after fixes. Git emitted only its normal LF-to-CRLF warning for the browser test file. Playwright is loaded read-only from the pre-existing study-spot installation, or from `PLAYWRIGHT_MODULE` if supplied.

## Issues fixed and regression evidence

| Severity | Category | Finding | Verification |
|---|---|---|---|
| High | Content | Home/patient live hours depended on visitor timezone; schedule conflicted with official source | Removed live status; matched published split-shift hours from the full official Contact Us section; unlisted Friday/weekend hours require a call; regression rejects the old schedule |
| High | Content | Technique-specific indications and blanket safety/result claims exceeded support | Removed sinus/allergy, mood, fatigue and sleep cards; removed technique-to-condition claims and deterministic care paragraphs; added draft clinical-review and urgent-care guidance |
| Medium | UX/accessibility | Patient questions had no native disclosure interface | Five details/summary FAQs; Enter and Space tested at four widths and with JavaScript disabled |
| Medium | UX | Eight-topic library lacked search/filtering | Real local search, four topic groups, combined filters, case/whitespace handling, result announcement, empty state and reset; all links remain usable without JS |
| Medium | Visual | Tall mobile header, wrapping nav and late portrait | Mobile header <=116px, one-row navigation, 44px navigation targets, shorter hero and metadata; portrait starts before 800px at 390px viewport |
| Medium | Privacy | Blanket no-data claim omitted host logging | Explicit hosting-provider request-log caveat, no patient forms or tracking scripts, local unsaved search, external-site policy caveat |
| Low | Documentation | README labeled the real clinic site as the demo | Prominent correct preview URL and separately labeled official site |

Tests were introduced and observed failing before the content, FAQ, library and mobile-layout fixes. The library test also caught CSS overriding the HTML hidden attribute; an explicit hidden rule fixed it.

Phone links were inspected programmatically: all 47 original links already matched the actual clinic number, with no literal asterisks. They were preserved; the added FAQ phone link uses the same target.

## Scope and screenshots

Audits check landmarks, one H1, current-section navigation, skip-link keyboard activation, reduced motion, overflow, navigation targets, local files/anchors, decoded images, page/console errors, failed requests, external requests and noindex. Interaction tests also exercise article navigation and literal special-character searches.

Screenshots: `tests/audit-{page-stem}-{320|390|768|1440}.png`, plus `tests/audit-home-viewport-{width}.png`. The existing `.gitignore` excludes all of them. Visually inspected home desktop/mobile, patient resources at 320px, library at 390px, services desktop and back article tablet. Representative evidence:

- `tests/audit-home-viewport-390.png`
- `tests/audit-home-viewport-1440.png`
- `tests/audit-patient-resources-320.png`
- `tests/audit-library-index-390.png`
- `tests/audit-services-1440.png`
- `tests/audit-library-back-768.png`

## Remaining approval / testing limitations

- Clinic must confirm visit workflow, fees, branding, portrait permissions and launch details. Parent review found published hours in the full official Contact Us section omitted by the text extractor; home and patient tables now match that source. This does not establish holiday exceptions or real-time availability.
- All educational content is draft, awaiting clinical review and citations. This pass is not a medical accuracy certification.
- Chromium on local files only; no Safari/Firefox/device, screen-reader, live-host or comprehensive WCAG audit. No actual phone call or third-party navigation was performed.
- This report documents local verification. Public release verification is separate. No patient collection, tracking, simulated booking, chatbot, portal or fabricated review was introduced.
