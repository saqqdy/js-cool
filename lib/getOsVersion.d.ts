/**
 * 获取手机系统版本
 *
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
declare function getOsVersion(osName: string, withosstr: boolean, userAgent: string): string | boolean | null;
export default getOsVersion;
