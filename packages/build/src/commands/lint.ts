import consola from 'consola';
import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import { execSync } from 'child_process';
import ls from 'lint-staged';
import glob from 'fast-glob';
import ts from 'typescript';
import type { ILintStagedOptions } from 'lint-staged';

import {
  ROOT_DIR_PATH,
  IGNORED_PATHS,
  LINT_STAGED_CONFIG_PATH
} from '~/src/constants';
import { tsConfigFn } from '~/src/configs';
import type { TEslintOptions, ITypescriptConfig } from '~/src/types';

export async function lintScripts(
  patterns: string[],
  options: TEslintOptions = {}
): Promise<void> {
  const {
    quiet = false,
    ...restOptions
  } = options;
  const linter = new ESLint({
    ...restOptions,
    cwd: ROOT_DIR_PATH,
  });

  const files: string[] = [];
  patterns.forEach(pattern =>
    glob.sync(pattern, {
      cwd: ROOT_DIR_PATH,
      ignore: IGNORED_PATHS,
      onlyFiles: true,
    }).forEach(file => files.push(file))
  );

  const results = await linter.lintFiles(files);
  if (quiet) {
    results.forEach(result => {
      result.messages = result.messages.filter(warning => warning.severity === 2);
    });
  }
  await ESLint.outputFixes(results);

  const formatter = await linter.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);

  const resultCode = Number(results.some(item => item.errorCount > 0));
  process.exit(resultCode);
}

export async function lintStyles(
  patterns: string[],
  options: stylelint.LinterOptions = {}
): Promise<void> {
  const {
    quiet = false,
    ...restOptions
  } = options;

  const files: string[] = [];
  patterns.forEach(pattern =>
    glob.sync(pattern, {
      cwd: ROOT_DIR_PATH,
      ignore: IGNORED_PATHS,
      onlyFiles: true,
    }).forEach(file => files.push(file))
  );

  const { errored, results } = await stylelint.lint({
    ...restOptions,
    files,
  });

  if (quiet) {
    results.forEach(result => {
      result.warnings = result.warnings.filter(warning => warning.severity === 'error');
    });
  }

  const formatter = stylelint.formatters['string'];
  const resultText = formatter(results);
  consola.log(resultText);

  process.exit(Number(errored));
}

export async function lintFilenames(): Promise<void> {
  execSync('ls-lint');
}

export async function lintTypes(
  patterns: string[],
  options: ITypescriptConfig['compilerOptions'] = {}
): Promise<void> {
  const files: string[] = [];
  patterns.forEach(pattern =>
    glob.sync(pattern, {
      cwd: ROOT_DIR_PATH,
      ignore: IGNORED_PATHS,
      onlyFiles: true
    }).forEach(file => files.push(file))
  );

  const tsConfig = tsConfigFn();
  const program = ts.createProgram(files, {
    ...tsConfig.compilerOptions,
    ...options
  });
  const result = program.emit();

  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(result.diagnostics);

  diagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      consola.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      consola.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  process.exit(Number(result.emitSkipped));
}

export async function lintStaged(options: Partial<ILintStagedOptions> = {}): Promise<void> {
  const result = await ls({
    ...options,
    cwd: ROOT_DIR_PATH,
    configPath: LINT_STAGED_CONFIG_PATH,
    concurrent: true,
  });

  process.exit(Number(!result));
}
