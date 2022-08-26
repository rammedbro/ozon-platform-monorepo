import ora from 'ora';
import getopts from 'getopts';
import { performance } from 'perf_hooks';
import { Command } from 'commander';
import {
  platformInstall,
  platformUninstall,
  platformInfo,
  platformSetEnv,
  TEAMS_BUILD_PRESETS
} from '@bx-fe/platform-build';
import type { IPlatformOptions } from '@bx-fe/platform-build';

import { version } from '~/package.json';
import { BuildCliCommand } from '~/src/commands';
import { LintCliCommand } from '~/src/commands';
import { PublishCliCommand } from '~/src/commands';
import { ServerCliCommand } from '~/src/commands';
import { TestCliCommand } from '~/src/commands';
import type {
  TCommanderAction,
  TCommanderActionWithPlatformOptions
} from '~/src/types';

export class Cli {
  private program: Command = new Command();
  private spinner: ora.Ora = ora({ spinner: 'moon' });
  private start: number = 0;
  public options: IPlatformOptions = {};

  constructor() {
    this.program
      .version(version, '-v, --version')
      .usage('[options] <command>')
      .option('-plc, --platform-config [config]', 'Path to platform config', 'platform.config.js')
      .option('-plt, --platform-teams [teams...]', 'Teams for which script will be ran.', '')
      .option('-ple, --platform-env [env]', 'Env for running script', 'prod')
      .option(
        '-plp, --platform-preset',
        'Teams presets for scoping scripts.\n' +
        `Available presets: ${Object.keys(TEAMS_BUILD_PRESETS).join('\n')}`
      )
      .hook('preAction', () => {
        this.spinner.start('Running a command...');
        this.start = performance.now();
      })
      .hook('postAction', () => {
        const diff = (performance.now() - this.start) / 1000;
        this.spinner.succeed(`Command finished in ${diff.toFixed(2)}s`);
      });

    this.program
      .command('install')
      .description('Install source files of the platform')
      .action(platformInstall);

    this.program
      .command('uninstall')
      .description('Uninstall source files of the platform')
      .action(platformUninstall);

    this.program
      .command('info')
      .description('Info about the platform')
      .action(platformInfo);

    this.program
      .addCommand(new BuildCliCommand(this))
      .addCommand(new LintCliCommand(this))
      .addCommand(new TestCliCommand(this))
      .addCommand(new PublishCliCommand())
      .addCommand(new ServerCliCommand());
  }

  async run(args: string[] = process.argv): Promise<Command> {
    this.parsePlatformOptions(args);
    platformSetEnv(this.options.env);
    return this.program.parseAsync(args);
  }

  parseUnknownOptions(command: Command): void {
    const { operands: args, unknown: options } = command.parseOptions(command.args);
    const parsedOptions = getopts(options);
    command.processedArgs = [args];

    Object.entries(parsedOptions).slice(1).forEach(([key, value]) => {
      command.createOption(key);
      command.setOptionValue(key, value);
    });
  }

  bindPlatformOptions<T extends TCommanderAction>(action: T): TCommanderActionWithPlatformOptions<T> {
    return async (...args) => action(...args.slice(0, -1), this.options, args.slice(-1));
  }

  private parsePlatformOptions(args?: string[]): void {
    this.program.parseOptions(args);
    this.options = Object.fromEntries(
      Object.entries(this.program.opts())
        .map(([key, value]) => [
          key.replace('platform', '').toLowerCase(),
          value
        ])
    );
  }
}
