import * as bcrypt from 'bcrypt';

/**
 * Hashes a plain text password using bcrypt.
 * @param password Plain text password
 * @returns Promise<string> Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password Plain text password
 * @param hash Hashed password
 * @returns Promise<boolean> True if match, false otherwise
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
