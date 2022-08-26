const regex = /[a-z-.\d]+/.toString().slice(1, -1);

export const lsLintConfig = {
  '.dir': 'kebab-case | regex:__mocks__ | regex:_info',
  '.js': `kebab-case | regex:${regex}`,
  '.config.js': 'kebab-case',
  '.schema.js': 'kebab-case',

  '.ts': `kebab-case | regex:${regex}`,
  '.class.ts': 'kebab-case',
  '.d.ts': 'kebab-case',
  '.mock.ts': 'kebab-case',
  '.test.ts': 'kebab-case',
  '.test.mock.ts': 'kebab-case',
  '.types.ts': 'kebab-case',
  '.utils.ts': 'kebab-case',

  '.vue': `kebab-case | regex:${regex}`,

  '.css': 'kebab-case',
  '.module.css': 'kebab-case',
  '.pcss': `kebab-case | regex:${regex}`,
  '.module.pcss': `kebab-case | regex:${regex}`
};
