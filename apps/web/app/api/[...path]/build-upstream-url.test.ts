import { describe, expect, it } from 'vitest';
import { buildUpstreamUrl } from './build-upstream-url';

describe('buildUpstreamUrl', () => {
  const base = 'http://localhost:8080';

  it('builds a normal upstream URL for a simple path', () => {
    const target = buildUpstreamUrl(base, ['products', '1'], '');
    expect(target.toString()).toBe('http://localhost:8080/products/1');
  });

  it('preserves the query string', () => {
    const target = buildUpstreamUrl(base, ['products'], '?category=shoes');
    expect(target.toString()).toBe('http://localhost:8080/products?category=shoes');
  });

  it('does not let a scheme-like segment hijack the origin (https:)', () => {
    const target = buildUpstreamUrl(base, ['https:', 'evil.com', 'x'], '');
    expect(target.origin).toBe('http://localhost:8080');
    expect(target.host).toBe('localhost:8080');
  });

  it('does not let a protocol-relative segment hijack the origin (//evil.com)', () => {
    const target = buildUpstreamUrl(base, ['', '', 'evil.com', 'x'], '');
    expect(target.origin).toBe('http://localhost:8080');
  });

  it('does not let an encoded slash in a segment traverse out of the path', () => {
    const target = buildUpstreamUrl(base, ['evil.com%2Fx'], '');
    expect(target.origin).toBe('http://localhost:8080');
    expect(target.pathname).toBe('/evil.com%252Fx');
  });

  it('does not let a backslash-prefixed segment hijack the origin', () => {
    const target = buildUpstreamUrl(base, ['\\\\evil.com', 'x'], '');
    expect(target.origin).toBe('http://localhost:8080');
  });

  it('does not follow a path-traversal segment above the base path', () => {
    const base2 = 'http://localhost:8080/api';
    const target = buildUpstreamUrl(base2, ['..', '..', 'admin'], '');
    expect(target.origin).toBe('http://localhost:8080');
  });
});
