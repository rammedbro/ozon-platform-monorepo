export function lintStagedConfigFn(): Record<string, string> {
  const config: Record<string, string> = {};
  const commands: Record<string, string[]> = {
    scripts: ['js', 'ts', 'vue'],
    styles: ['css', 'pcss', 'vue']
  };

  Object.entries(commands).forEach(
    ([cmd, extensions]) => extensions.forEach(
      ext => {
        config[`*.${ext}`] = `platform lint ${cmd} --quiet --fix`;
      }
    ));

  return config;
}
