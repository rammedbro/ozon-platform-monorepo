import type { ESLint } from 'eslint';

export type TEslintOptions = ESLint.Options & {
  quiet?: boolean;
};
