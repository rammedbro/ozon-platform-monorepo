import { join } from 'path';
import fs from 'fs-extra';

export function installApplication(output: string): void {
  const input = join(__dirname, 'lib');
  fs.copySync(input, output);
}
