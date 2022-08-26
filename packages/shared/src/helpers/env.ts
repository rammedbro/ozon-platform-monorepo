export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = !isDevelopment;
export const isCI = process.env.CI === 'true';
