import { Command } from 'commander';
import { start } from '@bx-fe/platform-server';
import { startDebug } from '@bx-fe/platform-server-debug';

export class ServerCliCommand extends Command {
  constructor() {
    super('server');

    this.description('Module for running server for platform');

    this.command('start')
      .description('Run a standalone server')
      .action(start);

    this.command('start-debug')
      .description('Run a debug server')
      .action(startDebug);
  }
}
