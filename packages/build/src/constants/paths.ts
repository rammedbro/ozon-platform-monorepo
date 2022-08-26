import { join, relative } from 'path';

export const ROOT_DIR_PATH = process.cwd();
export const NODE_MODULES_DIR_PATH = join(ROOT_DIR_PATH, 'node_modules');
export const PLATFORM_CONFIG_PATH = join(ROOT_DIR_PATH, 'platform.config.js');
export const CACHE_DIR_PATH = join(ROOT_DIR_PATH, '.cache');

export const BUILD_DIR_PATH = join(ROOT_DIR_PATH, '.build');
export const CLIENT_BUILD_DIR_PATH = join(BUILD_DIR_PATH, 'client');
export const SERVER_BUILD_DIR_PATH = join(BUILD_DIR_PATH, 'server');
export const TRANSLATIONS_CLIENT_BUILD_PATH = join(BUILD_DIR_PATH, 'translations.client.js');
export const TRANSLATIONS_SERVER_BUILD_PATH = join(SERVER_BUILD_DIR_PATH, 'translations.server.json');
export const STATS_BUILD_DIR_PATH = join(BUILD_DIR_PATH, 'stats');

export const TEAMS_DIR_PATH = join(ROOT_DIR_PATH, 'teams');
export const LAYOUTS_DIR_PATH = join(ROOT_DIR_PATH, 'layouts');
export const LOGS_DIR_PATH = join(ROOT_DIR_PATH, 'logs');
export const MOCKS_DIR_PATH = join(ROOT_DIR_PATH, 'mocks');
export const SERVICES_DIR_PATH = join(ROOT_DIR_PATH, 'services');
export const STATIC_DIR_PATH = join(ROOT_DIR_PATH, 'static');
export const SERVICE_WORKER_DIR_PATH = join(STATIC_DIR_PATH, 'network-cache');

export const PLATFORM_DIR_PATH = join(ROOT_DIR_PATH, '.platform');
export const PLATFORM_APP_DIR_PATH = join(PLATFORM_DIR_PATH, 'application');
export const PLATFORM_STORE_DIR_PATH = join(PLATFORM_DIR_PATH, 'store');
export const PLATFORM_TEAMS_DIR_PATH = join(PLATFORM_DIR_PATH, 'teams');
export const PLATFORM_TESTS_DIR_PATH = join(PLATFORM_DIR_PATH, 'tests');
export const PLATFORM_SERVICES_DIR_PATH = join(PLATFORM_DIR_PATH, 'services');
export const PLATFORM_CONFIGS_DIR_PATH = join(PLATFORM_DIR_PATH, 'configs');
export const PLATFORM_ENVS_DIR_PATH = join(PLATFORM_DIR_PATH, 'envs');

export const TS_CONFIG_PATH = join(ROOT_DIR_PATH, 'tsconfig.json');
export const JS_CONFIG_PATH = join(ROOT_DIR_PATH, 'jsconfig.json');
export const BABEL_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'babel.config.js');
export const WEBPACK_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'webpack.config.js');
export const WEBPACK_ALIAS_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'webpack.config.alias.js');
export const POSTCSS_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'postcss.config.js');
export const JEST_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'jest.config.js');
export const E2E_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, 'e2e.config.js');
export const ESLINT_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, '.eslintrc');
export const STYLELINT_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, '.stylelintrc');
export const LSLINT_CONFIG_PATH = join(ROOT_DIR_PATH, '.ls-lint.yml');
export const LINT_STAGED_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, '.lintstagedrc.js');
export const GITLAB_CI_E2E_CONFIG_PATH = join(PLATFORM_CONFIGS_DIR_PATH, '.gitlab-ci.e2e.yml');

export const CLIENT_MANIFEST_PATH = join(SERVER_BUILD_DIR_PATH, 'client.manifest.json');
export const SERVER_MANIFEST_PATH = join(SERVER_BUILD_DIR_PATH, 'server.manifest.json');
export const I18N_MANIFEST_PATH = join(SERVER_BUILD_DIR_PATH, 'i18n.manifest.json');
export const CLIENT_SOURCE_MANIFEST_PATH = join(SERVER_BUILD_DIR_PATH, 'client.source.manifest.json');
export const MODULES_MANIFEST_PATH = join(SERVER_BUILD_DIR_PATH, 'modules.manifest.json');

export const STYLE_HASH_MAP_PATH = join(BUILD_DIR_PATH, 'style-hash-map.json');
export const LEXEMES_HASH_MAP_PATH = join(BUILD_DIR_PATH, 'lexemes-hash-map.json');
export const REV_PATH = join(CLIENT_BUILD_DIR_PATH, 'rev.json');

export const UI_KIT_PATH = join(NODE_MODULES_DIR_PATH, '@bx-fe/ui-kit/dist/lib');
export const UI_KIT_ICONS_PATH = join(UI_KIT_PATH, 'icons');

export const DIST_DIR_PATH = join(ROOT_DIR_PATH, 'dist');
export const JEST_DIST_DIR_PATH = join(DIST_DIR_PATH, 'jest');
export const E2E_DIST_DIR_PATH = join(DIST_DIR_PATH, 'e2e');

export const IGNORED_PATHS = [
  'node_modules',
  'dist',
  '.git',
  '.vscode',
  '.idea',
  '.yalc',
  relative(ROOT_DIR_PATH, CACHE_DIR_PATH),
  relative(ROOT_DIR_PATH, BUILD_DIR_PATH),
  relative(ROOT_DIR_PATH, PLATFORM_DIR_PATH),
  relative(ROOT_DIR_PATH, SERVICE_WORKER_DIR_PATH)
];
