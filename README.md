# pranav6670.github.io

My personal site — the homepage is an interactive terminal you can type into.

**Live at [pranav6670.github.io](https://pranav6670.github.io/)** · try `help`, `whoami`, `projects`, `open locallens`, or `cd blog`. Tab completes, ↑/↓ walk history, and a couple of easter eggs are hiding.

## How it's built

No frameworks, no build step — hand-written HTML/CSS/JS served by GitHub Pages.

| Path | What it is |
| --- | --- |
| `js/terminal-core.js` | All terminal logic and site content (commands, completion, history) — pure functions, no DOM |
| `js/terminal.js` | DOM glue: rendering, key handling, navigation effects |
| `css/site.css` | The whole design system — cream paper, serif display, mono details |
| `projects/` | Project write-ups (pi.website-style articles) + index |
| `blog/` | Writing + index |
| `tests/terminal-core.test.mjs` | Unit tests for the terminal core |

Design notes: the terminal is inspired by [aleksagordic.com](https://www.aleksagordic.com/); the typography and article layout by [pi.website](https://www.pi.website/) (Fraunces standing in for Signifier, Source Sans 3, system mono).

## Working on it

```sh
python3 -m http.server            # serve locally
node --test tests/terminal-core.test.mjs   # run the tests
```

Site copy lives in the data objects at the top of `js/terminal-core.js`. Asset URLs carry a `?v=` cache token — bump it in every HTML file whenever CSS/JS change.
