# conex-ui

Shared header, footer and design tokens of conex.fsv.cvut.cz and its apps; see README.md for what is in it, how the
site and apps use it, and how a version is released.

## Rules

- Never commit or push to `main`. Work on a branch, open a PR, merge only when CI is green. Changes to
  `.github/workflows/` need the maintainer's explicit OK before merging.
- Every change is visible on the site and in every app: send screenshots of the demo (1440 px and 390 px, English
  and Czech, site and app pages) before merging, and keep the look identical unless the change is meant to alter it.
- Keep the components' props and the index's exports stable; a breaking change is a new major version (minor while at
  0.x) with a note in the PR.
- Ask before adding dependencies. Keep everything static: no cookies, trackers or runtime fetches.
- Semantic tokens only; never redraw or recolour the ČVUT/FSv logos (README, "Rules").
- Only the site frame lives here for now (header, footer, app bar, tokens). App components (inputs, charts) move here
  only when a second app needs them, after asking.
