import type { Lang } from './i18n';

// Texts of the header and footer, in both languages. The site merges them into its own dictionary
// (same keys), so a page can use them too.

const en = {
  'site.name': 'ConEx Research Group',
  'site.fullName': 'Concrete Structures and Critical Infrastructure under Extreme Conditions and Threats',
  'a11y.skipToContent': 'Skip to content',
  'a11y.mainNav': 'Main navigation',
  'a11y.appNav': 'Application',
  'a11y.menu': 'Menu',
  'a11y.langSwitch': 'Language',
  'a11y.home': 'ConEx home page',
  'theme.toggle': 'Toggle dark mode',
  'header.fsv': 'CTU FCE',
  'header.cvut': 'CTU',
  'org.university': 'Czech Technical University in Prague',
  'org.faculty': 'Faculty of Civil Engineering',
  'org.department': 'Department of Concrete and Masonry Structures',
  'address.street': 'Thákurova 2077/7',
  'address.city': 'Prague 6-Dejvice',
  'address.postalCode': '166 29',
  'address.country': 'Czech Republic',
  'footer.about': 'About',
  'footer.navigation': 'Navigation',
  'footer.contact': 'Contact',
  'footer.home': 'Home',
  'footer.personalWeb': 'Personal website',
  'footer.build': 'Build',
  'nav.areas': 'Research areas',
  'nav.people': 'People',
  'nav.projects': 'Projects',
  'nav.publications': 'Publications',
  'person.email': 'Email',
  'person.room': 'Room',
  'person.phone': 'Phone',
  'person.address': 'Address',
} as const;

export type ShellKey = keyof typeof en;

const cs: Record<ShellKey, string> = {
  'site.name': 'Výzkumná skupina ConEx',
  'site.fullName': 'Betonové konstrukce a kritická infrastruktura při vystavení extrémním podmínkám a hrozbám',
  'a11y.skipToContent': 'Přejít na obsah',
  'a11y.mainNav': 'Hlavní navigace',
  'a11y.appNav': 'Aplikace',
  'a11y.menu': 'Nabídka',
  'a11y.langSwitch': 'Jazyk',
  'a11y.home': 'Úvodní stránka ConEx',
  'theme.toggle': 'Přepnout tmavý režim',
  'header.fsv': 'ČVUT FSv',
  'header.cvut': 'ČVUT',
  'org.university': 'České vysoké učení technické v Praze',
  'org.faculty': 'Fakulta stavební',
  'org.department': 'Katedra betonových a zděných konstrukcí',
  'address.street': 'Thákurova 2077/7',
  'address.city': 'Praha 6-Dejvice',
  'address.postalCode': '166 29',
  // Not written within the country.
  'address.country': '',
  'footer.about': 'O skupině',
  'footer.navigation': 'Navigace',
  'footer.contact': 'Kontakt',
  'footer.home': 'Úvod',
  'footer.personalWeb': 'Osobní stránky',
  'footer.build': 'Verze',
  'nav.areas': 'Výzkumné oblasti',
  'nav.people': 'Lidé',
  'nav.projects': 'Projekty',
  'nav.publications': 'Publikace',
  'person.email': 'E-mail',
  'person.room': 'Místnost',
  'person.phone': 'Telefon',
  'person.address': 'Adresa',
};

export const shellStrings: Record<Lang, Record<ShellKey, string>> = { en, cs };

/** Translator for the shell's own texts. */
export const shellT =
  (lang: Lang) =>
  (key: ShellKey): string =>
    shellStrings[lang][key] ?? shellStrings.en[key];
