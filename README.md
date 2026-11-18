# conex-ui

The header, footer and design tokens of the ConEx Research Group's website
([conex.fsv.cvut.cz](https://conex.fsv.cvut.cz)), shared by the site and every lab app, so they all look the same and
there is one place to change them.

For Astro 7 + Tailwind 4. Source components, no build step: the site and the apps compile them.

## What is in it

| | |
|---|---|
| `components/ConexHead.astro` | Figtree font, favicon, theme script (inside `<head>`) |
| `components/Header.astro` | ConEx wordmark, main navigation, CTU / CTU FCE links, EN \| CS switch, theme toggle, mobile menu |
| `components/AppBar.astro` | an app's own bar under the header: its name, its links (e.g. the guide), an `actions` slot |
| `components/Footer.astro` | group name, affiliation, FSv and ČVUT logos, navigation, contact |
| `components/ConEx.astro`, `PostalAddress.astro`, `ContactRow.astro`, `InstitutionLogos.astro`, `Icon.astro` | parts of the above, also used by the site's pages |
| `conex.css` | colours (light and dark), font, motion tokens, focus ring, view transitions, no-JS fallbacks |
| `@conex-ctu/ui/build` | `gitBuild()`: the commit and build time for the footer's build line (build time only) |
| `@conex-ctu/ui` (index) | languages and addresses (`localePath`, `alternatePath`, `langFromPath`), navigation items, links, default contact, the header/footer texts (`shellStrings`) |

Not in it (yet): form inputs, charts and other app components. They stay in the apps until a second app needs them.

## Addresses and languages

English is the default and has no prefix; Czech lives under `/cs/`. Apps follow the same rule:

| | English | Czech |
|---|---|---|
| site page | `/people/` | `/cs/people/` |
| app | `/apps/<slug>/` | `/cs/apps/<slug>/` |

The components take the language from the page's address (`/cs/...` is Czech) unless a `lang` prop is given, and the
language switch links to the same address with the prefix swapped. An app builds its files under `apps/<slug>/`
(including its assets, so they never mix with the site's `/_astro/`) and uploads only its two folders; the site's
upload leaves `apps/*/` and `cs/apps/*/` alone.

## Using it in an app or the site

```bash
npm install github:conex-ctu/conex-ui#v0.1.0
```

`package.json` then has `"@conex-ctu/ui": "github:conex-ctu/conex-ui#v0.1.0"`. Peer dependencies: `astro` 7 and
`tailwindcss` 4 (with `@tailwindcss/vite`).

The global stylesheet:

```css
@import "tailwindcss";
@import "@conex-ctu/ui/conex.css";
```

A page layout (an app with a light theme only, here):

```astro
---
import ConexHead from '@conex-ctu/ui/components/ConexHead.astro';
import Header from '@conex-ctu/ui/components/Header.astro';
import AppBar from '@conex-ctu/ui/components/AppBar.astro';
import Footer from '@conex-ctu/ui/components/Footer.astro';
import { langFromPath, localePath } from '@conex-ctu/ui';
import '../styles/global.css';

const lang = langFromPath(Astro.url.pathname);
const home = localePath(lang, 'apps/example/');
---
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Example app | ConEx</title>
    <ConexHead theme="light" />
  </head>
  <body class="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
    <Header themeToggle={false} />
    <AppBar title="Example app" href={home} links={[{ href: `${home}guide/`, label: 'About and guide' }]} />
    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8"><slot /></main>
    <Footer />
  </body>
</html>
```

`demo/` has a complete example (`npm run dev`, then <http://localhost:4321/apps/example/>).

Props worth knowing:

- `Header`: `lang`, `alternates` (the other language's address when it is not the prefix swap, e.g. on a 404 page),
  `themeToggle` (default `true`).
- `ConexHead`: `theme` `'auto'` (stored choice or system; the site) or `'light'` (apps without a dark theme).
- `Footer`: `lang`, `contact` (default: the group's PI from `lib/site.ts`; the site passes its synced people entry),
  `build`: a small line at the bottom, "Build b9aeeb8 · 18 Nov 2026" / "Verze b9aeeb8 · 18. 11. 2026", linked to the
  commit (`rel="nofollow"`), the full hash and the build time on hover. Get it at build time in the layout's
  frontmatter: `import { gitBuild } from '@conex-ctu/ui/build'; … <Footer build={gitBuild('conex-ctu/<repo>')} />`
  (`GITHUB_SHA` in GitHub Actions, else `git rev-parse HEAD`; outside a checkout, no line). Node only: never import
  `@conex-ctu/ui/build` into browser code.
- `LangSwitch` marks itself `data-lang-switch`: an app that carries state across the switch (e.g. a filled form)
  listens for clicks on `[data-lang-switch] a`.

Links in the header and footer are root-relative (`/people/`), so they work from any app on conex.fsv.cvut.cz. In an
app's dev server they lead to pages that do not exist locally; that is expected.

## Changing the header or footer

Work on a branch here, and try the change in the site or an app with a local copy instead of a release:

```bash
# in the site or the app
npm install ../conex-ui          # links your local checkout; edits show up on reload
# ... when done, before committing there:
npm install github:conex-ctu/conex-ui#v0.2.0
```

Never commit a `file:` dependency in the site or an app.

## Releasing a version

1. PR here; CI (type check and demo build) must be green; screenshots of the demo before merging.
2. After the merge, tag `main`: `git tag v0.2.0 && git push origin v0.2.0` (semantic versions: a changed prop or
   removed export is a new major version; while at 0.x, a new minor).
3. In the site and each app, a PR that updates the dependency (`npm install github:conex-ctu/conex-ui#v0.2.0`) and
   shows the pages before and after. A change reaches a page only when that site or app is rebuilt and deployed.

## Rules

- Semantic tokens only (`bg-background`, `text-primary`, ...), never raw colours; colours change in `conex.css` only.
- The ČVUT and FSv logos are registered trademarks, taken from the ČVUT graphic manual
  (cvut.cz/logo-a-graficky-manual): never redraw, recolour or re-crop them. Each file's viewBox is cropped to its
  artwork, so the emblems match in size; a new logo file needs the same crop.
- Icons are Lucide (ISC licence), copied unchanged.
- No new dependencies without asking the maintainer.

No licence is granted for the code yet (all rights reserved); the logos are not ours to license in any case.
