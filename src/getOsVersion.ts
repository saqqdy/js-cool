import getAppVersion from './getAppVersion'

/**
 * Get the phone system version
 *
 * @example
 * ```
 * getOsVersion('iPhone') // '13.2.3'
 * getOsVersion('iPhone', true) // 'iPhone/13.2.3'
 * ```
 * @deprecated please use 'osVersion' instead
 * @param osName - system type string Android, iPod, iWatch or iPhone
 * @param withOS - whether to bring the name
 * @param userAgent - ua, may not be passed, default takes navigator.appVersion
 * @return null/true/false
 */
function getOsVersion(
	osName: string,
	withOS?: boolean,
	userAgent?: string
): string | boolean | null {
	userAgent = userAgent || navigator.appVersion
	const d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS']
	let name = osName,
		ver
	const index = d.indexOf(osName)
	if (index > -1 && userAgent.includes('like Mac OS X')) {
		name = 'OS'
	}
	const reg = new RegExp(name + '\\s[\\d\\_]+', 'ig')
	ver = (userAgent.match(reg) + '').replace(/\s/gi, '/').replace(/_/gi, '.')
	if (index > -1) {
		ver = ver.replace(/OS\//gi, osName + '/')
	}
	return getAppVersion(osName, withOS, ver)
}

export default getOsVersion
