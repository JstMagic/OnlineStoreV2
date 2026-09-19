import type { PoolConfig } from 'pg';

export interface DatabaseConnectionEnv {
  NODE_ENV?: string;
  DATABASE_URL?: string;
  PGSSLMODE?: string;
  PGSSLROOTCERT?: string;
}

export interface VerifiedTlsOptions {
  rejectUnauthorized: true;
  ca?: string;
}

const ALLOWED_PG_SSL_MODES = ['disable', 'verify-full'] as const;

type PgSslMode = typeof ALLOWED_PG_SSL_MODES[number];

function isAllowedPgSslMode(value: string): value is PgSslMode {
  return ALLOWED_PG_SSL_MODES.some((allowed) => allowed === value);
}

export function buildDatabasePoolConfig(
  env: DatabaseConnectionEnv,
  readCertificate: (certificatePath: string) => string,
): PoolConfig {
  const mode = env.PGSSLMODE ?? 'verify-full';

  if (!isAllowedPgSslMode(mode)) {
    throw new Error(
      `Unsupported PGSSLMODE "${mode}". Use PGSSLMODE=verify-full with a trusted certificate authority. PGSSLMODE=no-verify is not allowed.`,
    );
  }

  if (mode === 'disable') {
    if (env.NODE_ENV === 'production') {
      throw new Error(
        'PGSSLMODE=disable is not allowed when NODE_ENV=production. Use PGSSLMODE=verify-full and provide PGSSLROOTCERT if a custom CA is required.',
      );
    }

    return { connectionString: env.DATABASE_URL };
  }

  const ssl: VerifiedTlsOptions = { rejectUnauthorized: true };

  if (env.PGSSLROOTCERT) {
    ssl.ca = readCertificate(env.PGSSLROOTCERT);
  }

  return { connectionString: env.DATABASE_URL, ssl };
}
