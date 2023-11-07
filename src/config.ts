import { join } from 'node:path';

import config from 'config';
import dotenv from 'dotenv';
import { z } from 'zod';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: join(__dirname, '..', 'envs', envFile),
  debug: Boolean(process.env.DEBUG) || false,
});

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DEBUG: z.string().transform((val) => val === 'true'),
  RESOURCE_URL: z.string().url(),
});

const validatedConfig = schema.safeParse({ ...process.env, ...config });

if (!validatedConfig.success) {
  throw new Error('Invalid config: ' + validatedConfig.error.message);
}

export const configuration = validatedConfig.data;
