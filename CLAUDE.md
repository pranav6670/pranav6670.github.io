# pranav6670.github.io — agent guide

Personal site: an interactive terminal homepage (aleksagordic.com-inspired) on a
pi.website-style design system (cream paper, serif display, mono details).
No frameworks, no build step. GitHub Pages serves `master`; work happens on
`revamp/pi-website-style` → push → Pranav merges the PR himself.

## Ground rules

- Git identity for this repo is personal: `pranav6670 <pranavnat24@gmail.com>`
  (already pinned in `.git/config`). Never use the rivianvw.tech identity.
- `docs/superpowers/` (design specs / plans) is local-only and gitignored —
  never commit or push it.
- All terminal copy — bio, status tree, projects list, blog list, socials —
  lives in ONE place: the data objects at the top of `js/terminal-core.js`
  (`STATUS`, `FILES`, `PROJECTS`, `BLOG`, `SOCIALS`). Pure logic, no DOM.
  DOM rendering is `js/terminal.js`; dynamic text goes through
  `textContent`, never `innerHTML`.
- Tests must pass before pushing: `node --test tests/terminal-core.test.mjs`.
- Cache busting: whenever `css/site.css` or any `js/*.js` changes, bump the
  `?v=` token on every asset URL in `index.html`, `projects/*.html`,
  `blog/index.html` (one `sed` across those files).

## Design system (match it, don't reinvent it)

- Tokens in `css/site.css`: cream `#F5F4EF` background, black text, muted
  `#686868`, gold accent `#E0BC4E`, pale blue `#C8DEDF`.
- Fonts: serif stack leads with `Signifier` (licensed, not installed) and
  falls back to Fraunces; body is Source Sans 3; mono is the system stack.
- Article anatomy (measured off pi.website `/blog/pi07`): 768px column;
  serif title ~60px weight 400 line-height 1.25; mono label/value facts
  table (labels are small muted uppercase); body 18px/1.625 with 1rem
  paragraph gaps; understated 1.25rem w600 serif h2s; media breaks out to
  `min(1000px, 92vw)` with 8px radius and no border.

## Adding a project write-up

1. Create `projects/<slug>.html` by copying an existing article page
   (e.g. `projects/image-augmenter.html`). Keep: slim header (brand +
   About), `← back to home`, `.article__title`, `.article__facts` `<dl>`
   with Type / Area / (optional Award) / Code rows, breakout
   `.article__figure` (img needs alt, width/height, `loading="lazy"`),
   body paragraphs, optional "Tech used" h2 + `.article__list`, a single
   "See on GitHub" button (no "More info" buttons), footer.
2. Add a feed item to `projects/index.html`.
3. Add `{ slug, title, meta }` to `PROJECTS` in `js/terminal-core.js` —
   this powers `projects`, `open <slug>`, `cd projects/<slug>`, and tab
   completion automatically.
4. Put the image under `images/portfolio/projects/` (lowercase filename).
5. Run tests, bump `?v=`, commit on the branch, push.

## Adding a blog post

- Medium post: add `{ title, date, href }` to `BLOG` in
  `js/terminal-core.js` and a feed item to `blog/index.html`.
- On-site post: create `blog/<slug>.html` with the same article anatomy as
  project pages, add the feed item, and add a `BLOG` entry using the
  relative href (`blog/<slug>.html`). Prose style: pi.website blog —
  editorial, quiet, generous whitespace; first person; no marketing tone.
