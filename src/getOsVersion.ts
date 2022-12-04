import getAppVersion from './getAppVersion'

/**
 * 获取手机系统版本
 *
 * @example
 * ```
 * getAppVersion('iPhone') // '13.2.3'
 * getAppVersion('iPhone', true) // 'iPhone/13.2.3'
 * ```
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getOsVersion(
	osName: string,
	withosstr?: boolean,
	userAgent?: string
): string | boolean | null {
	userAgent = userAgent || navigator.appVersion
	let d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'],
		name = osName,
		index = d.indexOf(osName)
	if (index > -1 && userAgent.includes('like Mac OS X')) {
		name = 'OS'
	}
	let reg = eval('/' + name + '\\s[\\d\\_]+/ig'),
		// var isApp = userAgent.includes(name)
		ver = (userAgent.match(reg) + '').replace(/\s/gi, '/').replace(/_/gi, '.')
	if (index > -1) {
		ver = ver.replace(/OS\//gi, osName + '/')
	}
	return getAppVersion(osName, withosstr, ver)
}

export default getOsVersion
