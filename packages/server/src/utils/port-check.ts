import { execSync } from 'child_process';
import os from 'os';

const commands = {
  macOs: 'lsof -i -P | grep :',
  windows: 'netstat -an | find ":',
};

export const isPortAvailable = (port: string | number): boolean => {
  const command = os.platform() === 'win32' ? commands.windows + port + '"' : commands.macOs + port;

  try {
    execSync(command);
    return false;
  } catch (e) {
    return true;
  }
};
