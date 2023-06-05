/**
 * Get the APP version number
 *
 * @param appName - app name
 * @param withApp - whether to bring the name
 * @param userAgent - ua, may not be passed, default is navigator.appVersion
 * @return null/true/false
 */
function getAppVersion(
	appName: string,
	withApp?: boolean,
	userAgent?: string
): string | boolean | null {
	userAgent = userAgent || navigator.appVersion
	const reg = new RegExp(appName + '\\/([\\d\\.]+)', 'i')
	const isApp = userAgent.includes(appName)
	const ver = userAgent.match(reg)
	// withApp = typeof(withApp) != "undefined" ? withApp : false;
	if (ver) {
		if (withApp) {
			// Need to bring the app name, complete output
			return ver ? ver[0] : ''
		} else {
			return ver ? ver[1] : ''
		}
	} else {
		if (isApp) {
			// is the specified client but the version number is unknown
			return false
		} else {
			// Not a designated client
			return null
		}
	}
}

export default getAppVersion
