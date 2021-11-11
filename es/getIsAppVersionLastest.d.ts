/**
 * 版本号大小对比
 *
 * @example
 * ```js
 * // navigator.appVersion = "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
 * getIsAppVersionLastest('Chrome', '90.0.4515.159'); // true;
 * getIsAppVersionLastest('Chrome', '94.10.4515.159', navigator.appVersion); // false;
 * ```
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
declare function getIsAppVersionLastest(appName: string, compareVer: string, userAgent?: string): boolean | null;
export default getIsAppVersionLastest;
