export const getAppVersion = (): string => {
  const vMajor = 1;

  const parsedBuildDate = Date.parse(process.env.BUILD_DATE);
  const buildDate = isNaN(parsedBuildDate) ? new Date(Date.now()) : new Date(parsedBuildDate);
  const day = buildDate.getDate();
  const month = buildDate.getMonth() + 1;

  const fullYear = buildDate.getFullYear();
  const fullMonth = month >= 10 ? month : '0' + month;
  const fullDay = day >= 10 ? day : '0' + day;

  const vMinor = [fullYear, fullMonth, fullDay];
  const buildDateZeroTime = new Date(vMinor.join('-') + ' 00:00');

  const vPath = buildDate.getTime() - buildDateZeroTime.getTime();

  return `${vMajor}.${vMinor.join('')}.${vPath}`;
};

export function getVersionInfo(): string {
  const NO_DATA = 'no data or running in devmode';
  const VCS_REVISION = process.env.VCS_REVISION || NO_DATA;
  const VCS_SUMMARY = process.env.VCS_SUMMARY || NO_DATA;
  const BUILD_DATE = process.env.BUILD_DATE || NO_DATA;
  const VCS_NAME = 'GIT';
  const START_DATE = new Date().toISOString();
  const PLATFORM_NAME = 'nodejsapi';
  const PLATFORM_VERSION = process.version;
  const APP_NAME = '@ozon/ozon.ru';

  return JSON.stringify({
    platform_name: PLATFORM_NAME,
    platform_version: PLATFORM_VERSION,
    vcs_name: VCS_NAME,
    vcs_revision: VCS_REVISION,
    vcs_summary: VCS_SUMMARY,
    build_date: BUILD_DATE,
    start_date: START_DATE,
    app_name: APP_NAME,
    app_version: getAppVersion()
  });
}
