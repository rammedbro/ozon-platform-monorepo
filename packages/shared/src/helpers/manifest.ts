import { nativeRequire } from './native-require';

export const readBuildManifest = (manifestPath: string): any => {
  const manifest = nativeRequire(manifestPath);

  if (manifest === undefined) {
    throw new Error(`Couldn't read the manifest on path ${manifestPath}`);
  }

  return manifest;
};
