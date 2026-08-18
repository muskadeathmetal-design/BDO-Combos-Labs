# BDO Combos Lab — Clean Rewrite

This branch is the clean production rewrite created on 2026-08-18.

The previous site, legacy Vxxx scripts, historical locale pages and patch workflows are preserved on:

`legacy-before-clean-rewrite-2026-08-18`

Production now consists of a single static application:

- `index.html` — application shell
- `styles.css` — shared visual system
- `app.js` — state, pages, editors, Transition / Cancel, Builder and AnalysisCore bridge
- `_headers` — Cloudflare security/cache headers

The new runtime intentionally has no global refresh interval and no competing render wrappers.