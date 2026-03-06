import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Load environment variables from a .env.test file.
 */
export function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.test');
  dotenv.config({ path: envPath });

  return process.env;
}