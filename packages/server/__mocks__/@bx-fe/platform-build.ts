import { join } from 'path';

const pathToMockManifests = join(process.cwd(), 'packages/server/tests/fixtures/manifests');

export const CLIENT_MANIFEST_PATH = join(pathToMockManifests, 'client.manifest.json');
export const SERVER_MANIFEST_PATH = join(pathToMockManifests, 'server.manifest.json');
export const I18N_MANIFEST_PATH = join(pathToMockManifests, 'i18n.manifest.json');
export const CLIENT_SOURCE_MANIFEST_PATH = join(pathToMockManifests, 'client.source.manifest.json');
export const MODULES_MANIFEST_PATH = join(pathToMockManifests, 'modules.manifest.json');
export const TRANSLATIONS_SERVER_BUILD_PATH = join(pathToMockManifests, 'translations.server.json');

export const CLIENT_BUILD_DIR_PATH = 'client';
export const LOGS_DIR_PATH = 'logs';
