import dotenv from 'dotenv';
import { z } from 'zod';
import { join } from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: join(__dirname, '..', 'envs', envFile),
  debug: Boolean(process.env.DEBUG) || false,
});

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  WISE_TOKEN: z.string(),
  WISE_PROFILE_ID: z.string(),
  DEBUG: z.string().transform((val) => val === 'true'),
});

const validatedConfig = schema.safeParse(process.env);

if (!validatedConfig.success) {
  throw new Error('Invalid config: ' + validatedConfig.error.message);
}

export const configuration = validatedConfig.data;
