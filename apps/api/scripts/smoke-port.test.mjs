import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('smoke.mjs port selection (CWE-338 regression)', () => {
  const scripts = [
    join(process.cwd(), 'scripts/smoke.mjs'),
    join(process.cwd(), '..', '..', 'scripts/smoke.mjs'),
  ];

  it.each(scripts)('does not use Math.random and uses a CSPRNG for the throwaway Postgres port (%s)', (scriptPath) => {
    const source = readFileSync(scriptPath, 'utf8');
    expect(source).not.toMatch(/Math\.random/);
    expect(source).toMatch(/import\s*\{\s*randomInt\s*\}\s*from\s*'node:crypto'/);
    expect(source).toMatch(/randomInt\(/);
  });
});
