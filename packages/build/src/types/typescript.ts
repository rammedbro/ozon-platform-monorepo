import type { CompilerOptions } from 'typescript';

export enum EModuleResolution {
  'classic' = 1,
  'node' = 2
}

export interface ITypescriptConfig {
  extends?: string;
  compilerOptions: CompilerOptions;
  exclude?: string[];
  include?: string[];
  files?: string[];
  toJSON: () => string;
}
