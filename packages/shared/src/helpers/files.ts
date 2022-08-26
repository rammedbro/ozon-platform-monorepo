import fs from 'fs';
import path from 'path';

export function isDirectory(source: string): boolean {
  return fs.lstatSync(source).isDirectory();
}

export function getDirectories(source: string): string[] {
  return fs.readdirSync(source).filter(name => isDirectory(path.join(source, name)));
}
