export function requiredEnvVars(key: string): string {
  const value = process.env[key];

  if (value == null) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
