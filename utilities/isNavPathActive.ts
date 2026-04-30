/**
 * For primary nav: Home is only active on /; other routes use prefix (e.g. /projects/…).
 */
export function isNavPathActive(asPath: string, href: string): boolean {
  const path = (asPath || "").split("?")[0]?.split("#")[0] || "/";
  if (href === "/") {
    return path === "/" || path === "";
  }
  return path === href || path.startsWith(`${href}/`);
}
