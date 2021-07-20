/**
 * How to use KoifyEnv
 * 
 * Example:
 * interface ApplicationEnv {
 *    MYSQL_HOST: string,
 *    MYSQL_USER: string,
 *    MYSQL_PASSWORD: string,
 *    MYSQL_DATABASE: string,
 *    MYSQL_TEST: string,
 * }
 *
 * const envs = <ApplicationEnv>KoifyEnv(undefined, [
 *    'MYSQL_HOST',
 *    'MYSQL_USER',
 *    'MYSQL_PASSWORD',
 *    'MYSQL_DATABASE',
 *    'MYSQL_TEST'
 * ]);
 */

import dotenv from 'dotenv';

/**
 * 
 * @param defaultVars An object that contains set of default key-value pair of environment variables
 * @param required An array of key-names of required environment variables
 * @returns An object of all environment variables in key-value pair
 */
export function KoifyEnv<T>(defaultVars?: any, required?: string[]): T {
  const envVars = typeof defaultVars !== 'undefined' ? defaultVars : {};

  dotenv.config();

  const keys = Object.keys(process.env);

  if (typeof required !== 'undefined') {
    for (let i = 0; i < required.length; i += 1) {
      const key = required[i];

      if (!keys.includes(key)) {
        throw new Error(`Missing required environment variable with key: ${key}`);
      }
    }
  }

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    envVars[key] = process.env[key];
  }

  return envVars;
}
