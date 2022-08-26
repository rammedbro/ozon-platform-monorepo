import path from 'path';
import type {
  IE2ERunnerConfig,
  TCapabilityBrowsers,
  TCapabilityServices
} from '@bx-fe/e2e-runner-types';

import {
  E2E_DIST_DIR_PATH,
  PLATFORM_TESTS_DIR_PATH
} from '@bx-fe/platform-build';

const {
  E2E_BROWSER_SERVICE,
  E2E_BROWSER_NAME,
  E2E_TEAM,
  CEPH_PUBLISH_AKEY,
  CEPH_PUBLISH_SKEY,
  GITLAB_API_PRIVATE_TOKEN
} = process.env;

const config: IE2ERunnerConfig = {
  outputDir: E2E_DIST_DIR_PATH,
  browser: {
    name: E2E_BROWSER_NAME as TCapabilityBrowsers,
    service: E2E_BROWSER_SERVICE as TCapabilityServices,
    platform: 'desktop',
  },
  suite: 'screenshot',
  suites: {
    screenshot: {
      specs: [path.join(PLATFORM_TESTS_DIR_PATH, 'e2e/specs/screenshot.spec.ts')]
    },
  },
  allure: {
    projectId: '429',
    options: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }
  },
  screenshots: {
    suites: [/screenshot/],
    ciJobs: [/test:screenshot/],
    gitlab: {
      projectId: '259',
      token: GITLAB_API_PRIVATE_TOKEN,
    },
    s3: {
      bucket: 'frontend-ozon-ru-screenshots',
      accessKey: CEPH_PUBLISH_AKEY,
      secretKey: CEPH_PUBLISH_SKEY,
    },
    comparison: {
      screenshotPath: 'screenshots',
      formatSuiteDirName: `${E2E_TEAM}-{service}-{browser}-{platform}`,
      formatImageName: '{tag}-{width}x{height}',
      savePerInstance: true,
      blockOutStatusBar: true,
      blockOutToolBar: true
    },
  },
  typescript: true,
  wdioConfigExtend: require(path.join(PLATFORM_TESTS_DIR_PATH, 'e2e/utils/wdio-extend.ts'))
};

// Do not import in main build due to tree shaking
export default config;
