import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a random nonce (crypto.randomUUID is available in the middleware runtime)
  const nonce = crypto.randomUUID().replace(/-/g, '');

  // Pass the nonce to Next.js via a custom request header so the framework can apply it
  // to its own inline scripts (used by the experimental.csp config below).
  request.headers.set('x-nonce', nonce);

  // Build the dynamic CSP keeping all other directives, only script-src changes.
  const frameAncestors = process.env.PREVIEW_FRAME_ANCESTORS || "'none'";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self'",
    "object-src 'none'",
    `frame-ancestors ${frameAncestors}`,
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);

  return response;
}
