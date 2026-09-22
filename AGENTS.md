# AGENTS.md — flagtextile.cn

Single-page static marketing site (Zhejiang Flag Import & Export). No framework, no build, no tests, no package manager. Files: `index.html`, `styles.css`, `script.js`, `images/`, `favicon.ico`, `CNAME`.

Page sections in order: `#home` hero, `#products` (4 tabs: fabrics/accessories/footwear/plush-toys), `#about` (intro + 4-step process), `#contact` (cards + Google Maps embed).

## Run / preview

No build step. Preview with any static server in repo root (e.g. `python -m http.server`), then open `index.html`. No lint/typecheck/test exists.

## Deploy

GitHub Pages custom domain. Pushing to `main` (`origin git@github.com:bob1118/flagtextile.cn.git`) deploys. Keep `CNAME` (`flagtextile.cn`) — deleting it breaks the custom domain.

## Conventions that bite

- **Cache-busting: CSS/JS are linked with `?v=N`** (`styles.css?v=10`, `script.js?v=3` currently). Bump N in `index.html` every time either file changes — browsers cache hard (`python -m http.server` sends no cache headers issued once), so a stale bundle keeps the visual state old.
- **i18n is duplicated, JS is source of truth.** Every `data-lang="<key>"` must exist in BOTH `zh` and `en` dicts at top of `script.js`; `switchLanguage()` overwrites all `textContent` on load, so the Chinese hardcoded in HTML is fallback only — edit the dicts. `data-lang` only on leaf elements (no child markup). Values may contain a `{year}` token, replaced at runtime by `new Date().getFullYear()` (gallery card title). Hero `h1` is split into three spans (`home-title-pre/flag/post`) purely for i18n; parts must concatenate exactly to `home-title` (still used for `document.title`).
- **Strict i18n split:** Chinese dict must contain no Latin product text; English dict no CJK (`Google Maps` proper noun excepted). Product titles: zh uses Chinese names, en uses source-folder names.
- **Canonical contact email is `ivr@foxmail.com`.** Contact = three `.contact-card`s (SVG icon + `contact-*-title` + value + action): `mailto:`, `tel:+8619285759256`, address anchors to `#map` via smooth scroll. Footer reuses `contact-email/phone-label` keys; Quick Links was removed.
- **Product images: hero + galleries + logo.** `images/` holds `1/2/3.jpg` (hero slideshow), `fabrics/trending/popular-1..8.jpg` + five product dirs (`acetate-print-emboss/`, `acetate-brim-stone/`, `acetate-brim-emboss-stone/`, `copysilk-emboss-regular/`, `copysilk-emboss-thick/`, each `01..04.jpg`; 1280×720 ≤200K, processed from `D:\WORK\_website\_images\fabrics\` via EXIF-normalize → rotate-if-portrait → downscale → quality loop), `footwear/` (`canvas/casual/sport/`), `plush-toys/` (`bear/dog/rabbit/`), `accessories/` (`bugle-beads/craft-pearl-beads/rhinestone-beads/`) — the last three each `01..03.jpg`, ~1600×900 ≤200K, supplied pre-processed (no pipeline); plus `logo.jpg`. Sub-directories must match cards one-to-one; English kebab-case dir names.
- **Gallery cards** carry photos in `data-images`, a count badge (`count-8`/`count-4`/`count-3` keys), an optional hardcoded weight chip (`280/300/400gsm`), and open the modal (prev/next + counter + name + spec copied live from `.spec-chip`, hidden when chipless + desc; close/ESC/backdrop/touch-swipe 40px). Category card titles render per language; en = folder name (`brim` = 冰花 in the acetate dirs).
- **Tabs, not stacked sections.** Four `.category-panel`s (`#cat-fabrics/accessories/footwear/plush-toys`) toggled by `switchTab()`; buttons carry `data-cat-tab` + ARIA. Label keys: `product-fabrics/footwear/plush-toys/accessories`. Language switch does not reset the active tab. Only the fabrics gallery card wears `new-badge` (新品/New).
- **Palette (scheme 乙 warm textile):** `:root` holds `--primary #9a3f1f`, `--primary-dark #7c3218`, `--secondary #c98a2d`, `--secondary-light #e0b25f`, `--accent #1f6f5b` (reserved), `--ink #3d2c23`, `--bg #faf6ef`, `--line #e7ddc9`. All of products/about/contact sit on a full-bleed `#f1eadd` band. `linear-gradient` appears exactly twice (hero overlay + New badge shimmer). Cards: `1px solid var(--line)` + 10px radius, no shadows; hover border turns `secondary`.
- **Motion:** scroll reveal uses JS-added `.reveal` (IntersectionObserver) and animates the independent `translate` property — never `transform`, which would kill the hover lift; `prefers-reduced-motion` disables all animation. Panels fade (`panel-fade`), modal scales in (`modal-in`). `#back-to-top` appears after 600px. Modal gallery supports touch swipe (40px threshold).
- **Behavior:** smooth-scroll covers `nav a, .products-cta a, a[href="#map"], .hero-actions a`; anchor clicks auto-close the mobile hamburger (`#nav-toggle` → `header.nav-open`, ≤768px only). Scrollspy adds `.active` to nav links (middle-band rootMargin). Product thumbnails are 4:3; product grid is `minmax(300px,1fr)`. Hero first image is preloaded; EN mobile h1 separately sized via `html[lang="en"]`.
- **Webfont:** Inter + Noto Sans SC via Google Fonts — blocked in mainland China; system-stack fallback stays in `font-family`.
- **Contact map is a keyless Google embed** (`output=embed`, `loading="lazy"`) + "View on Google Maps" link. No API key; blocked in mainland China, fine for ME/CA audience.
- Keep Traditional Chinese company name `浙江弗蘭戈進出口有限公司` / `ZHEJIANG FLAG IMPORT & EXPORT CO., LIMITED` verbatim (hero, about, footer).
