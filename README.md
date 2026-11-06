# satsuntech.com

Static site for SatSun Tech, served by GitHub Pages (custom domain in `CNAME`, DNS at GoDaddy).
No build step: edit the HTML and push to `main`; GitHub Pages deploys in about a minute.

## Pages

| URL | File | Purpose |
|---|---|---|
| `/` | `index.html` | Company home — education-led, then care apps, contact |
| `/talentup/` | `talentup/index.html` | TalentUp brand page (Class 10 live, 11 & 12 in development) |
| `/talentup/class10-maths/` | `talentup/class10-maths/index.html` | Class 10 product page: features, screenshots, syllabus, pricing, FAQ |
| `/talentup/class11-maths/` | `talentup/class11-maths/index.html` | Coming-soon page |
| `/talentup/class12-maths/` | `talentup/class12-maths/index.html` | Coming-soon page |
| `/marksup/` | `marksup/index.html` | MarksUp — SSLC Maths TN (Jan 2027) |
| `/for-schools/` | `for-schools/index.html` | School pitch + enquiry form (opens email) |
| `/get/talentup/` | `get/talentup/index.html` | Smart link: Android → Play, iPhone → App Store, else web app. Use in print ads/QR codes. |
| `/talentup/privacy/` | `talentup/privacy/index.html` | TalentUp privacy policy (Play Console / App Store Connect URL) |
| `/talentup/delete-account/` | `talentup/delete-account/index.html` | Account-deletion page (Play Data safety URL) |
| `/talentup/support/` | `talentup/support/index.html` | Support page (App Store support URL) |
| `/privacy/` `/terms/` `/refund-policy/` `/disclaimer/` | `*/index.html` | Site-level legal pages (Razorpay KYC needs refund policy + terms + privacy + contact) |
| `/talentup.html` | redirect → `/talentup/class10-maths/` | Old URL, kept for existing links |
| `/404.html` | GitHub Pages not-found page | |

Shared assets: `assets/css/site.css` (one stylesheet; brand themes via `body.theme-talentup` / `body.theme-marksup`),
`assets/js/site.js` (menu, reveal, GA4 hook), `assets/img/brand/` (logo, favicons), `assets/img/og/` (social preview images).

## Things to set once

1. **App Store link** — set in `get/talentup/index.html` (`APP_STORE_URL`) and on the Class 10 page's App Store button. Change both if the listing URL ever changes.
2. **Google Analytics** — in `assets/js/site.js` set `GA_MEASUREMENT_ID` to the GA4 web-stream ID. Leave empty to keep analytics off.
3. **Official store badges** — the Play / App Store buttons are CSS. To use the official artwork, download the badges from
   Google (play.google.com/intl/en_us/badges) and Apple (developer.apple.com/app-store/marketing/guidelines) into `assets/img/brand/`
   and replace the `.store-btn` markup in `talentup/class10-maths/index.html`.

## App screenshots

Screenshots live in `assets/img/talentup/class10/*.webp` (540 px wide, Android status bar cropped) and `assets/img/marksup/`.
To replace one, export the phone screenshot, crop the status bar, resize to 540 px wide and save as WebP (quality ~85) under the same name.
Pages that still show a labelled placeholder (`.phone-placeholder`) are waiting for a screenshot — replace the div with
`<img src="…" alt="…" loading="lazy" width="270" height="576">`:

```
assets/img/talentup/class11/hero.webp           Class 11 page
assets/img/talentup/class12/hero.webp           Class 12 page
```

Prices are deliberately not shown anywhere on the site; the apps show current pricing in the store flow.

## After deploying

- Play Console → TalentUp → Store listing: privacy policy URL → `https://satsuntech.com/talentup/privacy/`;
  Data safety → account deletion URL → `https://satsuntech.com/talentup/delete-account/`.
- App Store Connect → TalentUp → privacy policy URL and support URL → the same pages.
- In-app links to the old GitHub Pages policy → update to the new URLs.
- `talentup-legal` repo: keep the old pages but add a redirect (`<meta http-equiv="refresh">`) to the new URLs so old links keep working.
- Google Search Console: submit `https://satsuntech.com/sitemap.xml`.
- GoDaddy: forward `satsuntech.in` → `https://satsuntech.com` (301) so the bare `.in` domain never 404s.

## Editing

Pages share the same header and footer markup. When you change the nav or footer, change it in every `index.html`
(a search-and-replace across the repo). Keep `googled34ba77f73305abe.html` — it is the Search Console verification file.
