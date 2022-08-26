import { Command } from 'commander';
import { publishAssets, publishStatic } from '@bx-fe/platform-build';

export class PublishCliCommand extends Command {
  constructor() {
    super('publish');

    this.description('Module for the platform\'s tools');

    this.command('assets')
      .description('Publish assets to s3')
      .action(publishAssets);

    this.command('static')
      .description('Publish static to s3')
      .action(publishStatic);
  }
}
