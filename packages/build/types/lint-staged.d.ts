declare module 'lint-staged' {
  export interface ILintStagedOptions {
    allowEmpty: boolean;
    concurrent: boolean;
    configPath: string;
    cwd: string;
    debug: boolean;
    maxArgLength: number | null;
    quiet: boolean;
    relative: boolean;
    shell: boolean;
    stash: boolean;
    verbose: boolean;
  }

  export default function (options?: Partial<ILintStagedOptions>): Promise<boolean>;
}
