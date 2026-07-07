import { z } from 'zod';
// Validated once at boot by ConfigModule — a bad/missing var throws and stops startup (fail-fast).
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  ALLOWED_ORIGINS: z.string().default('http://localhost:8080'),
  DATABASE_URL: z.string().min(1),
  PGSSLMODE: z.string().optional(),
});
export function validateEnv(config: Record<string, unknown>): z.infer<typeof EnvSchema> {
  const parsed = EnvSchema.safeParse(config);
  if (!parsed.success) {
    const detail = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error('Invalid environment configuration:\n' + detail);
  }
  return parsed.data;
}
