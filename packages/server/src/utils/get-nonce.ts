export const getNonce = (): string => Math.random().toString(16).substring(2, 16);
