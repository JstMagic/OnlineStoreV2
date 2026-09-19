import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

describe('GHSA-2xp9-vwfh-vxw4 regression', () => {
  it('next must be >= 15.5.24 (AVIF image-optimization RCE)', () => {
    const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url));
    const raw: unknown = JSON.parse(readFileSync(pkgPath, 'utf8'));

    if (!isObject(raw)) {
      throw new Error('package.json must be an object');
    }

    const dependencies = isObject(raw.dependencies) ? raw.dependencies : undefined;
    const nextVersion = typeof dependencies?.next === 'string' ? dependencies.next : '';

    const normalized = nextVersion.replace(/^[\^~>=<\s]+/, '');
    const match = normalized.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?/);

    const major = match ? Number(match[1] ?? '0') : 0;
    const minor = match ? Number(match[2] ?? '0') : 0;
    const patch = match ? Number(match[3] ?? '0') : 0;

    const satisfies =
      major > 15 ||
      (major === 15 && (minor > 5 || (minor === 5 && patch >= 24)));

    expect(satisfies).toBe(true);
  });
});
