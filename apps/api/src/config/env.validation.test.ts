import { describe, expect, it } from 'vitest';
import { validateEnv } from './env.validation';

describe('validateEnv', () => {
  it('rejects PGSSLMODE=no-verify', () => {
    expect(() => validateEnv({ PGSSLMODE: 'no-verify' })).toThrow(
      /Invalid environment configuration/i,
    );
  });

  it('defaults to verify-full', () => {
    const env = validateEnv({});

    expect(env.PGSSLMODE).toBe('verify-full');
  });

  it('rejects PGSSLMODE=disable in production', () => {
    expect(() =>
      validateEnv({ NODE_ENV: 'production', PGSSLMODE: 'disable' }),
    ).toThrow(/not allowed when NODE_ENV=production/i);
  });
});
