import inBrowser from './inBrowser'

export interface BrowserVersion {
	name:
		| 'Safari'
		| 'Chrome'
		| 'IE'
		| 'Edge'
		| 'Firefox'
		| 'Firefox Focus'
		| 'Chromium'
		| 'Opera'
		| 'Vivaldi'
		| 'Yandex'
		| 'Arora'
		| 'Lunascape'
		| 'QupZilla'
		| 'Coc Coc'
		| 'Kindle'
		| 'Iceweasel'
		| 'Konqueror'
		| 'Iceape'
		| 'SeaMonkey'
		| 'Epiphany'
		| '360'
		| '360SE'
		| '360EE'
		| 'Maxthon'
		| 'QQBrowser'
		| 'QQ'
		| 'Baidu'
		| 'UC'
		| 'Sogou'
		| 'Liebao'
		| 'LBBROWSER'
		| '2345Explorer'
		| '115Browser'
		| 'TheWorld'
		| 'XiaoMi'
		| 'Vivo'
		| 'Quark'
		| 'Qiyu'
		| 'Wechat'
		| 'WechatWork'
		| 'Taobao'
		| 'Alipay'
		| 'Weibo'
		| 'Douban'
		| 'Suning'
		| 'iQiYi'
		| 'DingTalk'
		| 'Huawei'
	version: string
}

/**
 * Get the browser name and version
 *
 * @example
 * ```
 * // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
 * browserVersion() // \{ name: 'Chrome', version: '114.0.0.0' \}
 * ```
 * @since 5.2.0
 * @param ua - ua or any ua like string, allowed to be undefined, default is navigator.userAgent
 * @return BrowserVersion|null
 */
function browserVersion(ua?: string): BrowserVersion | null {
	if (!ua) {
		if (!inBrowser) {
			console.info('url is required')
			return null
		}
		ua = navigator.userAgent
	}

	const BROWSER_REG_MAP = {
		Safari: /Version\/([\d.]+)/,
		Chrome: /(?:Chrome|CriOS)\/([\d.]+)/,
		IE: /(?:MSIE |rv:)([\d.]+)/,
		Edge: /Edge\/([\d.]+)/,
		Firefox: /(?:Firefox|FxiOS)\/([\d.]+)/,
		'Firefox Focus': /Focus\/([\d.]+)/,
		Chromium: /Chromium\/([\d.]+)/,
		Opera: /(?:Opera|OPR)\/([\d.]+)/,
		Vivaldi: /Vivaldi\/([\d.]+)/,
		Yandex: /YaBrowser\/([\d.]+)/,
		Arora: /Arora\/([\d.]+)/,
		Lunascape: /Lunascape[\/\s]([\d.]+)/,
		QupZilla: /QupZilla[\/\s]([\d.]+)/,
		'Coc Coc': /coc_coc_browser\/([\d.]+)/,
		Kindle: /Version\/([\d.]+)/,
		Iceweasel: /Iceweasel\/([\d.]+)/,
		Konqueror: /Konqueror\/([\d.]+)/,
		Iceape: /Iceape\/([\d.]+)/,
		SeaMonkey: /SeaMonkey\/([\d.]+)/,
		Epiphany: /Epiphany\/([\d.]+)/,
		'360': /QihooBrowser\/([\d.]+)/,
		'360SE': /Chrome\/([\d.]+)/,
		'360EE': /Chrome\/([\d.]+)/,
		Maxthon: /Maxthon\/([\d.]+)/,
		QQBrowser: /QQBrowser\/([\d.]+)/,
		QQ: /QQ\/([\d.]+)/,
		Baidu: /BIDUBrowser[\s\/]([\d.]+)/,
		UC: /UC?Browser\/([\d.]+)/,
		Sogou: /(?:SE |SogouMobileBrowser\/)([\d.X]+)/,
		Liebao: /(?:LieBaoFast|Chrome)\/([\d.]+)/,
		LBBROWSER: /(?:LieBaoFast|Chrome)\/([\d.]+)/,
		'2345Explorer': /2345Explorer\/([\d.]+)/,
		'115Browser': /115Browser\/([\d.]+)/,
		TheWorld: /TheWorld ([\d.]+)/,
		XiaoMi: /MiuiBrowser\/([\d.]+)/,
		Vivo: /VivoBrowser\/([\d.]+)/,
		Quark: /Quark\/([\d.]+)/,
		Qiyu: /Qiyu\/([\d.]+)/,
		Wechat: /MicroMessenger\/([\d.]+)/,
		WechatWork: /wxwork\/([\d.]+)/,
		Taobao: /AliApp\(TB\/([\d.]+)/,
		Alipay: /AliApp\(AP\/([\d.]+)/,
		Weibo: /weibo__([\d.]+)/,
		Douban: /com.douban.frodo\/([\d.]+)/,
		Suning: /SNEBUY-APP([\d.]+)/,
		iQiYi: /IqiyiVersion\/([\d.]+)/,
		DingTalk: /DingTalk\/([\d.]+)/,
		Huawei: /(?:Version|HuaweiBrowser|HBPC)\/([\d.]+)/
	} as const
	let key: keyof typeof BROWSER_REG_MAP

	for (key in BROWSER_REG_MAP) {
		const match = ua.match(BROWSER_REG_MAP[key])
		if (!match) continue
		else {
			let version = (match[1] || '').replace(/_/g, '.')
			if (key === '360SE') {
				const VERSION_MAP = {
					'63': '10.0',
					'55': '9.1',
					'45': '8.1',
					'42': '8.0',
					'31': '7.0',
					'21': '6.3'
				}
				version = VERSION_MAP[version as keyof typeof VERSION_MAP] || version
			} else if (key === '360EE') {
				const VERSION_MAP = {
					'69': '11.0',
					'63': '9.5',
					'55': '9.0',
					'50': '8.7',
					'30': '7.5'
				}
				version = VERSION_MAP[version as keyof typeof VERSION_MAP] || version
			} else if (['Liebao', 'LBBROWSER'].includes(key)) {
				const VERSION_MAP = {
					'57': '6.5',
					'49': '6.0',
					'46': '5.9',
					'42': '5.3',
					'39': '5.2',
					'34': '5.0',
					'29': '4.5',
					'21': '4.0'
				}
				version = VERSION_MAP[version as keyof typeof VERSION_MAP] || version
			}
			return {
				name: key,
				version
			}
		}
	}

	return null
}

export default browserVersion
