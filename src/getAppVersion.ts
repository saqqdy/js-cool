/**
 * 获取APP版本号
 *
 * @param appName - app名称
 * @param withApp - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
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
			// 需要带上app名称，完整输出
			return ver ? ver[0] : ''
		} else {
			return ver ? ver[1] : ''
		}
	} else {
		if (isApp) {
			// 是指定客户端但是版本号未知
			return false
		} else {
			// 不是指定客户端
			return null
		}
	}
}

export default getAppVersion
