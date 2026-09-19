import { describe, expect, it } from 'vitest';
import { buildDatabasePoolConfig } from './database-config';

describe('buildDatabasePoolConfig', () => {
  const readCertificate = (path: string): string => `certificate:${path}`;

  it('defaults to verified TLS', () => {
    const config = buildDatabasePoolConfig(
      { DATABASE_URL: 'postgres://localhost:5432/app' },
      readCertificate,
    );

    expect(config.ssl).toEqual({ rejectUnauthorized: true });
  });

  it('uses a custom CA certificate while keeping verification enabled', () => {
    const config = buildDatabasePoolConfig(
      {
        DATABASE_URL: 'postgres://localhost:5432/app',
        PGSSLMODE: 'verify-full',
        PGSSLROOTCERT: '/tmp/ca.pem',
      },
      readCertificate,
    );

    expect(config.ssl).toEqual({
      rejectUnauthorized: true,
      ca: 'certificate:/tmp/ca.pem',
    });
  });

  it('rejects the insecure no-verify mode', () => {
    expect(() =>
      buildDatabasePoolConfig({ PGSSLMODE: 'no-verify' }, readCertificate),
    ).toThrow(/no-verify is not allowed/i);
  });

  it('rejects unknown SSL modes', () => {
    expect(() =>
      buildDatabasePoolConfig({ PGSSLMODE: 'require' }, readCertificate),
    ).toThrow(/Unsupported PGSSLMODE/i);
  });

  it('allows disable only outside production', () => {
    const config = buildDatabasePoolConfig(
      { NODE_ENV: 'development', PGSSLMODE: 'disable' },
      readCertificate,
    );

    expect(config.ssl).toBeUndefined();
  });

  it('rejects disable in production', () => {
    expect(() =>
      buildDatabasePoolConfig(
        { NODE_ENV: 'production', PGSSLMODE: 'disable' },
        readCertificate,
      ),
    ).toThrow(/not allowed when NODE_ENV=production/i);
  });

  it('propagates CA read failures', () => {
    const failingRead = (): string => {
      throw new Error('certificate missing');
    };

    expect(() =>
      buildDatabasePoolConfig(
        { PGSSLMODE: 'verify-full', PGSSLROOTCERT: '/tmp/missing.pem' },
        failingRead,
      ),
    ).toThrow('certificate missing');
  });
});
