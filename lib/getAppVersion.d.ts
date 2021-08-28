/**
 * 获取APP版本号
 *
 * @param appName - app名称
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
declare function getAppVersion(appName: string, withappstr: boolean, userAgent: string): string | boolean | null;
export default getAppVersion;
