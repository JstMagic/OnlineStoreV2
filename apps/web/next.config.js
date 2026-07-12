/** @type {import('next').NextConfig} */

const path = require('path');

// Security headers applied to every response. CSP is the last line of defense against XSS —
// scripts are same-origin only; 'unsafe-inline' is allowed for STYLES only (Tailwind/Next inject
// inline styles). Tighten with nonces if you remove inline styles.
// Framing policy: 'none' by default so the DEPLOYED app can't be embedded by third parties
// (clickjacking defense). The platform's live-preview runtime injects PREVIEW_FRAME_ANCESTORS
// (the dashboard origin) so the in-dashboard preview can embed the dev server; production never
// sets it, so it stays locked. X-Frame-Options is dropped because it can't express an allowlist
// and a stray DENY would override the CSP; frame-ancestors is the modern, CSP-native control.
const frameAncestors = process.env.PREVIEW_FRAME_ANCESTORS || "'none'";
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; frame-ancestors " + frameAncestors + "; base-uri 'self'; form-action 'self'" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  // We lint via our own flat ESLint config (eslint.config.js) in the verify step; don't let
  // 'next build' run its own (eslintrc-based) lint, which would clash with the flat config.
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Proxy /api/* to the backend so the browser stays same-origin (no CORS, API port private).
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: (process.env.API_INTERNAL_URL || 'http://localhost:8080') + '/api/:path*',
      },
    ];
  },
  outputFileTracingRoot: path.resolve(__dirname, '..', '..'),
};

module.exports = nextConfig;
