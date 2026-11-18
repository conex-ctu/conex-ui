// Languages and addresses, shared by the ConEx site and the lab apps (conex.fsv.cvut.cz).
// English is the default and has no prefix; Czech lives under /cs/. The rule holds for apps too:
// /apps/<slug>/ is English, /cs/apps/<slug>/ Czech.

export const languages = {
  en: 'English',
  cs: 'Čeština',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const langs = Object.keys(languages) as Lang[];

export const isLang = (value: unknown): value is Lang => typeof value === 'string' && value in languages;

/** The page language from its path: `/cs/...` is Czech, anything else English. */
export function langFromPath(pathname: string): Lang {
  for (const lang of langs) {
    if (lang === defaultLang) continue;
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) return lang;
  }
  return defaultLang;
}

/** Path with any non-default language prefix removed: `/cs/people/` → `/people/`. */
export function stripLocale(pathname: string): string {
  const lang = langFromPath(pathname);
  return lang === defaultLang ? pathname : pathname.slice(lang.length + 1) || '/';
}

/** Root-relative address of a path (given without a language prefix) in a language: `localePath('cs', 'people/')` → `/cs/people/`. */
export function localePath(lang: Lang, path = ''): string {
  const rest = path.replace(/^\//, '');
  return lang === defaultLang ? `/${rest}` : `/${lang}/${rest}`;
}

/** The same page in another language: the language prefix swapped. */
export const alternatePath = (pathname: string, lang: Lang): string => localePath(lang, stripLocale(pathname));
