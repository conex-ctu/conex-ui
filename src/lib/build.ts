// Build information for the footer's build line (Footer `build`). Node only: call it in a page's or layout's
// frontmatter, which runs at build time; never import it into browser code (it uses node:child_process).
import { execSync } from 'node:child_process';

export interface BuildInfo {
  /** Full commit hash. */
  sha: string;
  /** When the page was built. */
  date: Date;
  /** The commit on GitHub; the line links to it. */
  url?: string;
}

/**
 * The commit being built (GITHUB_SHA in GitHub Actions, else `git rev-parse HEAD`) and the build time. With `repo`
 * (e.g. 'conex-ctu/conex-web') the line links to the commit; for a private repository only its members can open it.
 * Undefined outside a git checkout: the footer then shows no build line.
 */
export function gitBuild(repo?: string): BuildInfo | undefined {
  let sha = process.env['GITHUB_SHA'];
  if (!sha) {
    try {
      sha = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch {
      return undefined;
    }
  }
  if (!/^[0-9a-f]{40}$/.test(sha)) return undefined;
  const info: BuildInfo = { sha, date: new Date() };
  if (repo) info.url = `https://github.com/${repo}/commit/${sha}`;
  return info;
}
