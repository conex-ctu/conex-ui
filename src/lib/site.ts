import type { Lang } from './i18n';
import type { ShellKey } from './strings';

// Site data that the header and footer show. Change it here, then release a new version and update it in the site
// and in every app (README, "Releasing a version").

/** Main navigation of conex.fsv.cvut.cz, shared by the header and the footer; paths without a language prefix. */
export const navItems: { path: string; label: ShellKey }[] = [
  { path: 'areas/', label: 'nav.areas' },
  { path: 'people/', label: 'nav.people' },
  { path: 'projects/', label: 'nav.projects' },
  { path: 'publications/', label: 'nav.publications' },
];

export const externalLinks: Record<'fsv' | 'cvut' | 'department', Record<Lang, string>> = {
  fsv: {
    // Not /en/: the faculty's server redirects it to its English-Czech terminology page.
    en: 'https://www.fsv.cvut.cz/?lang=en',
    cs: 'https://www.fsv.cvut.cz/',
  },
  cvut: {
    en: 'https://www.cvut.cz/en',
    cs: 'https://www.cvut.cz/',
  },
  // Czech only; there is no English version.
  department: {
    en: 'https://concrete.fsv.cvut.cz/',
    cs: 'https://concrete.fsv.cvut.cz/',
  },
};

/** The footer's contact person. */
export interface Contact {
  name: string;
  role: string;
  /** Language the role is written in, when it differs from the page's. */
  roleLang?: Lang;
  /** Profile page on the site, without a language prefix. */
  profilePath: string;
  room?: string;
  email?: string;
  phone?: string[];
  web?: string;
}

/**
 * Default footer contact, for the apps. The site passes its own, from the synced people data (conex-work), so keep
 * these values in step with that entry (people/radek-stefan) when it changes.
 */
export const defaultContact: Record<Lang, Contact> = {
  en: {
    name: 'Radek Štefan',
    role: 'Principal Investigator / Assistant Professor',
    profilePath: 'people/radek-stefan/',
    room: 'B-736',
    email: 'radek.stefan@fsv.cvut.cz',
    phone: ['+420 775 195 659'],
    web: 'https://people.fsv.cvut.cz/stefarad/',
  },
  cs: {
    name: 'Radek Štefan',
    role: 'Vedoucí skupiny / odborný asistent',
    profilePath: 'people/radek-stefan/',
    room: 'B-736',
    email: 'radek.stefan@fsv.cvut.cz',
    phone: ['+420 775 195 659'],
    web: 'https://people.fsv.cvut.cz/stefarad/',
  },
};
