import { Command } from 'commander';
import { testUnit, testE2E } from '@bx-fe/platform-build';

import type { Cli } from '~/src';

export class TestCliCommand extends Command {
  constructor(program: Cli) {
    super('test');

    this.description('Module for running tests for platform');

    this.command('unit')
      .description('Run unit tests. Supports all cli options for jest.')
      .argument('[files...]', 'Tests for running. If not specified all tests will be ran.')
      .allowUnknownOption()
      .hook('preAction', program.parseUnknownOptions)
      .action(testUnit);

    this.command('e2e')
      .description('Run e2e tests')
      .action(testE2E);
  }
}
