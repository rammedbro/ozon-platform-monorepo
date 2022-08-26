import { Command } from 'commander';
import {
  buildApp,
  buildResources,
  buildRev,
  buildTranslations,
  buildStyleHashMap,
  buildScreenshotsPipelineConfig,
  buildScreenshotsComposerResponses,
} from '@bx-fe/platform-build';
import { dev } from '@bx-fe/platform-server';

import type { Cli } from '~/src';

export class BuildCliCommand extends Command {
  constructor(program: Cli) {
    super('build');

    this.description('Module for building the application');

    this.command('app')
      .description('Build the application')
      .argument('[names...]',
        'Names of your targets for building. ' +
        'If not specified all configs will be built in parallel'
      )
      .option('-a, --analyze', 'Run webpack analyzer. Works only for client bundle.')
      .action(program.bindPlatformOptions(buildApp));

    this.command('resources')
      .description('Build all resources for application')
      .action(buildResources);

    this.command('dev')
      .description('Build the application with webpack dev server')
      .action(dev);

    this.command('rev')
      .description('Build rev.json file. Should be include in application pre-build.')
      .action(buildRev);

    this.command('translations')
      .description('Build translations. Should be include in application pre-build.')
      .action(buildTranslations);

    this.command('style-hash-map')
      .description('Build style hash map. Should be include in application pre-build.')
      .action(buildStyleHashMap);

    this.command('screenshots-pipeline-config')
      .description(
        'Build screenshot tests pipeline config. ' +
        'Should be added to trigger job in main gitlab ci config.'
      )
      .action(buildScreenshotsPipelineConfig);

    this.command('screenshots-composer-responses')
      .description('Build mocked composer responses for screenshots tests.')
      .action(buildScreenshotsComposerResponses);
  }
}
