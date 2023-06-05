import getAppVersion from './getAppVersion'

/**
 * Version number size comparison
 *
 * @example
 * ```js
 * // navigator.appVersion = "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
 * getIsAppVersionLastest('Chrome', '90.0.4515.159'); // true;
 * getIsAppVersionLastest('Chrome', '94.10.4515.159', navigator.appVersion); // false;
 * ```
 * @param appName - app name
 * @param compareVer - required, Version number to be compared
 * @param userAgent - ua, not required, default=navigator.appVersion
 * @return null/true/false
 */
function getIsAppVersionLastest(
	appName: string,
	compareVer: string,
	userAgent?: string
): boolean | null {
	userAgent = userAgent || navigator.appVersion
	let basicVer = appName.indexOf('.') > 0 ? appName : getAppVersion(appName, false, userAgent) // Compatible with getIsAppVersionLastest("1.2.2", "1.2.3") Directly pass in the version number for comparison
	if (basicVer === null) {
		return null
	} // Not a designated client
	if (basicVer === false) {
		return false
	} // is the specified client but the version number is unknown
	basicVer = basicVer + '.'
	compareVer = compareVer + '.'
	const bStr = parseFloat(basicVer)
	const cStr = parseFloat(compareVer)
	const bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0
	const cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0
	if (cStr > bStr) {
		return false
	} else if (cStr < bStr) {
		return true
	} else {
		if (bStrNext >= cStrNext) {
			return true
		} else {
			return false
		}
	}
}

export default getIsAppVersionLastest
