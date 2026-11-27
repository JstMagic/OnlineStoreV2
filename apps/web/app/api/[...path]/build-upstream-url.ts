/**
 * Resolves the upstream request target from the trusted API base and the
 * caller-supplied catch-all path segments.
 *
 * Segments are joined onto the base's pathname via the `.pathname` setter
 * (not the two-argument `new URL(relative, base)` form). The WHATWG URL
 * "path state" parser used by the setter treats the assigned string purely
 * as path characters, so a segment such as `https:` or `//evil.com` can
 * never be reinterpreted as a scheme/host and hijack the origin, unlike
 * `new URL(path, base)`, whose merge algorithm follows a scheme-like or
 * `//`-prefixed segment to an attacker-controlled origin. The origin check
 * below is defense in depth in case that invariant ever changes.
 */
export function buildUpstreamUrl(base: string, pathSegments: string[], search: string): URL {
  const baseUrl = new URL(base);
  const target = new URL(baseUrl.toString());
  const encodedPath = pathSegments.map((segment) => encodeURIComponent(segment)).join('/');
  target.pathname = `${baseUrl.pathname.replace(/\/+$/, '')}/${encodedPath}`;
  target.search = search;

  if (target.protocol !== baseUrl.protocol || target.host !== baseUrl.host) {
    throw new Error('Resolved upstream target escaped the configured API host');
  }

  return target;
}
