/**
 * External links (http/https) open in a new tab with rel="noopener".
 * No "noreferrer", on purpose: partners, ČVUT, FSv and publishers should see
 * conex.fsv.cvut.cz as the referrer. mailto:, tel: and internal links get nothing.
 */
export const isExternal = (href: string | undefined): boolean => !!href && /^https?:\/\//i.test(href);

export const externalLinkAttrs = (href: string | undefined) =>
  isExternal(href) ? ({ target: '_blank', rel: 'noopener' } as const) : {};
