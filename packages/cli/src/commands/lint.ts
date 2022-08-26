import { Command } from 'commander';
import {
  lintScripts,
  lintStyles,
  lintTypes,
  lintFilenames,
  lintStaged
} from '@bx-fe/platform-build';

import type { Cli } from '~/src/index.ts';

export class LintCliCommand extends Command {
  constructor(program: Cli) {
    super('lint');

    this.description('Module for linting files for platform');

    this.command('scripts')
      .description('Lint js, ts and vue template and script block files. Supports all cli options from eslint.')
      .argument('<patterns...>', 'Patterns to find files for linting.')
      .allowUnknownOption()
      .hook('preAction', program.parseUnknownOptions)
      .action(lintScripts);

    this.command('styles')
      .description('Lint css, pcss and vue style block files. Supports all cli options from stylelint.')
      .argument('<patterns...>', 'Patterns to find files for linting.')
      .allowUnknownOption()
      .hook('preAction', program.parseUnknownOptions)
      .action(lintStyles);

    this.command('filenames')
      .description('Lint filenames')
      .action(lintFilenames);

    this.command('staged')
      .description('Run linters for uncommitted files. Supports all cli options from lint-staged.')
      .allowUnknownOption()
      .hook('preAction', program.parseUnknownOptions)
      .action(lintStaged);

    this.command('types')
      .description('Check types with tsc. Supports all cli options from tsc.')
      .argument('<patterns...>', 'Patterns to find files for linting.')
      .allowUnknownOption()
      .hook('preAction', program.parseUnknownOptions)
      .action(lintTypes);
  }
}
