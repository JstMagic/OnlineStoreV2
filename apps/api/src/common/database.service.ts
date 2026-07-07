import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly log = new Logger('DatabaseService');
  readonly pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ...(process.env.PGSSLMODE === 'no-verify' ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  // Boot migration: create the demo table, then APPLY every sql/*.sql file in order (this is
  // how a new feature's schema + seed data actually gets created — drop a sql/NNN-name.sql and
  // it runs). Wrapped so a missing/unreachable database logs a warning instead of crashing the
  // app — /health stays up and the cause is visible in the logs.
  async onModuleInit(): Promise<void> {
    try {
      await this.pool.query('CREATE TABLE IF NOT EXISTS items ( id SERIAL PRIMARY KEY, name TEXT NOT NULL )');
      const dir = join(process.cwd(), 'sql');
      if (!existsSync(dir)) return;
      for (const f of readdirSync(dir).filter((n) => n.endsWith('.sql')).sort()) {
        await this.pool.query(readFileSync(join(dir, f), 'utf8'));
      }
    } catch (err) {
      this.log.warn(`Skipped migrations: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  async onModuleDestroy(): Promise<void> { await this.pool.end().catch(() => undefined); }
}
