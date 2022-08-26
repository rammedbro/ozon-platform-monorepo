import ts from 'typescript';

import { IGNORED_PATHS } from '~/src/constants';
import type { ITypescriptConfig } from '~/src/types';
import { getPlatformAliasesForTypescript } from '~/src/utils';
import { EModuleResolution } from '~/src/types';

export const tsConfigFn: () => ITypescriptConfig = () => ({
  compilerOptions: {
    baseUrl: '.',
    typeRoots: [
      'node_modules/@types'
    ],
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    jsx: ts.JsxEmit.React,
    strict: true,
    noImplicitAny: false,
    noImplicitThis: false,
    strictNullChecks: false,
    suppressImplicitAnyIndexErrors: true,
    strictPropertyInitialization: false,
    skipLibCheck: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    removeComments: false,
    downlevelIteration: true,
    importHelpers: true,
    sourceMap: false,
    noEmit: true,
    paths: getPlatformAliasesForTypescript()
  },
  exclude: [
    ...IGNORED_PATHS,
    '**/__mocks__/**',
    '**/*.test.ts',
    '**/*.spec.ts',
  ],
  toJSON(): string {
    const { compilerOptions, exclude } = this;
    return JSON.stringify({
      compilerOptions: Object.assign({}, compilerOptions, {
        target: ts.ScriptTarget[compilerOptions.target].toLowerCase(),
        module: ts.ModuleKind[compilerOptions.module].toLowerCase(),
        moduleResolution: EModuleResolution[compilerOptions.moduleResolution].toLowerCase(),
        jsx: ts.JsxEmit[compilerOptions.jsx].toLowerCase(),
      }),
      exclude
    }, null, 2);
  }
});
