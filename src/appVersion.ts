import inBrowser from './inBrowser'

/**
 * Get the APP version from navigator.userAgent, support 'x.x.x' & 'x.x.x-tagname.x'
 *
 * @example
 * ```js
 * // navigator.userAgent => '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 AppName/1.0.0-beta.8'
 * appVersion('Chrome') // 114.0.0.0
 * appVersion('Safari') // 537.36
 * appVersion('appname', false) // null
 * appVersion('appname') // 1.0.0-beta.8
 * ```
 * @since 5.1.0
 * @param appName - app name
 * @param ua - ua or any ua like string, allowed to be undefined, default is navigator.userAgent
 * @param ignoreCase - whether to ignore case
 * @return string|null
 */
function appVersion(appName: string): string | null
function appVersion(appName: string, ua: string): string | null
function appVersion(appName: string, ua: boolean): string | null
function appVersion(appName: string, ua: string, ignoreCase: boolean): string | null
function appVersion(appName: string, ua?: string | boolean, ignoreCase?: boolean): string | null {
	if (!appName || typeof appName !== 'string') {
		console.info('appName is required')
		return null
	} else if (typeof ua === 'boolean' || !ua) {
		// us=undefined|true|false
		if (!inBrowser) {
			console.info('ua is required')
			return null
		}
		if (typeof ua === 'boolean') ignoreCase = ua
		ua = navigator.userAgent
	}
	if (typeof ignoreCase !== 'boolean') ignoreCase = true

	const reg = new RegExp(`${appName}\/(\\d+(?:.\\d+)*(?:-\\w+.\\d+)*)`, ignoreCase ? 'i' : '')
	const match = ua.match(reg)

	return match ? match[1] : null
}

export default appVersion
