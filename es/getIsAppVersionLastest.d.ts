/**
 * 版本号大小对比
 *
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
declare function getIsAppVersionLastest(appName: string, compareVer: string, userAgent: string): boolean | null;
export default getIsAppVersionLastest;
